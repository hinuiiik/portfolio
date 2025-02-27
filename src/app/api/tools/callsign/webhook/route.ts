import {NextRequest, NextResponse} from "next/server";
import {Client, Databases, Query, ID} from "node-appwrite";
import crypto from "crypto";
import {exec} from "child_process";

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJ_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);
const APPWRITE_QSO_DATABASE_ID = process.env.APPWRITE_QSO_DATABASE_ID!;
const APPWRITE_QSO_QUEUE_COLLECTION_ID = process.env.APPWRITE_QSO_QUEUE_COLLECTION_ID!;
const APPWRITE_QSO_WEBHOOK_SIG_KEY = process.env.APPWRITE_QSO_WEBHOOK_SIG_KEY!;
const APPWRITE_QSO_LOGS_COLLECTION_ID = process.env.APPWRITE_QSO_LOGS_COLLECTION_ID!;
const APPWRITE_QSO_COMPLETE_COLLECTION_ID = process.env.APPWRITE_QSO_COMPLETE_COLLECTION_ID!;


// Verify webhook
async function verifySignature(req: NextRequest, body: string) {
    const signatureHeader = req.headers.get("x-appwrite-webhook-signature");
    const webhookUrl = "https://www.vikramk.dev/api/tools/callsign/webhook";

    if (!signatureHeader) return false;

    const expectedHmac = crypto.createHmac("sha1", APPWRITE_QSO_WEBHOOK_SIG_KEY).update(webhookUrl + body).digest("base64");

    return signatureHeader === expectedHmac;
}

function getCommand(operator: string): string {
    // access the environment variable using the operator
    const command = process.env[`CMD_${operator}`];

    if (command) {
        return command;
    } else {
        return '';
    }
}


function executeShellCommand(text: string, operator: string): Promise<string> {
    const pass_str = getCommand(operator);
    exec(`echo "${text}" > temp.adi`);
    const command = `tqsl -x -a abort -d ${pass_str} temp.adi`;
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            exec(`echo "${stdout}\n" >> diag.adi`);
            exec(`echo "${stderr}\n\n" >> diag.adi`);
            if (error) {
                reject(`Error: ${stderr}`);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

// async function fetchAndFormatQSO(callsign: string, operator: string): Promise<string> {
//     try {
//         const response = await databases.listDocuments(APPWRITE_QSO_DATABASE_ID, APPWRITE_QSO_LOGS_COLLECTION_ID, [
//             Query.equal("callsign", callsign),
//             Query.equal("operator", operator)
//         ]);
//
//         if (response.documents.length === 0) {
//             throw new Error(`No QSO records found for callsign: ${callsign}`);
//         }
//
//         const lines = response.documents.map(doc => {
//             const {
//                 callsign,
//                 qso_date,
//                 time_on,
//                 time_off,
//                 band,
//                 mode,
//                 dxcc,
//                 cqz,
//                 qsl_rcvd,
//                 operator,
//                 gridsquare,
//                 rst_sent,
//                 rst_rcvd,
//                 freq
//             } = doc;
//
//             const fields = [
//                 `<CALL:${callsign.length}>${callsign}`,
//                 `<QSO_DATE:8>${qso_date}`,
//                 time_on ? `<TIME_ON:${time_on.length}>${time_on}` : null,
//                 time_off ? `<TIME_OFF:${time_off.length}>${time_off}` : null,
//                 `<BAND:${band.length}>${band}`,
//                 `<MODE:${mode.length}>${mode}`,
//                 dxcc ? `<DXCC:${dxcc.toString().length}>${dxcc}` : null,
//                 cqz ? `<CQZ:${cqz.toString().length}>${cqz}` : null,
//                 qsl_rcvd !== undefined ? `<QSL_RCVD:1>${qsl_rcvd}` : null,
//                 operator ? `<OPERATOR:${operator.length}>${operator}` : null,
//                 gridsquare ? `<GRIDSQUARE:${gridsquare.length}>${gridsquare}` : null,
//                 rst_sent ? `<RST_SENT:${rst_sent.length}>${rst_sent}` : null,
//                 rst_rcvd ? `<RST_RCVD:${rst_rcvd.length}>${rst_rcvd}` : null,
//                 freq ? `<FREQ:${freq.toFixed(4).length}>${freq.toFixed(4)}` : null,
//                 `<EOR>`
//             ];
//
//             return fields.filter(Boolean).join("");
//         });
//
//         return lines.join("\n");
//     } catch (error) {
//         console.error("Error fetching QSO data:", error);
//         return "";
//     }
// }

async function fetchAndFormatQSO(callsign: string, operator: string): Promise<string> {
    const response = await databases.listDocuments(APPWRITE_QSO_DATABASE_ID, APPWRITE_QSO_LOGS_COLLECTION_ID, [
        Query.equal("callsign", callsign),
        Query.equal("operator", operator),
    ]);

    if (response.documents.length === 0) {
        return Promise.reject(`No QSO records found for callsign: ${callsign}`);
    }

    return response.documents.map(doc => doc.body).join("\n");
}


async function processQueue() {
    try {
        const response = await databases.listDocuments(APPWRITE_QSO_DATABASE_ID, APPWRITE_QSO_QUEUE_COLLECTION_ID, [
            Query.orderAsc("$createdAt"),
            Query.limit(1),
        ]);

        if (response.documents.length === 0) return null;

        const {$id, callsign, operator} = response.documents[0];

        console.log("Processing:", callsign);
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // actual docker processing stuff here
        const text = await fetchAndFormatQSO(callsign, operator);
        await executeShellCommand(text, operator);

        console.log("✅ Processed:", callsign);

        await databases.createDocument(APPWRITE_QSO_DATABASE_ID, APPWRITE_QSO_COMPLETE_COLLECTION_ID, ID.unique(), { // write to completed db
            callsign,
            time: new Date(Date.now()),
            operator,
        });

        await databases.deleteDocument(APPWRITE_QSO_DATABASE_ID, APPWRITE_QSO_QUEUE_COLLECTION_ID, $id); // delete from queue db


        return callsign;
    } catch (error) {
        console.error("Queue processing error:", error);
        return null;
    }
}

export async function POST(req: NextRequest) {
    const body = await req.text();

    // Validate webhook
    if (!(await verifySignature(req, body))) {
        return NextResponse.json({error: "Invalid webhook signature"}, {status: 403});
    }

    const processedCallsign = await processQueue();

    if (!processedCallsign) {
        return NextResponse.json({error: "No pending callsigns"}, {status: 200});
    }

    return NextResponse.json({message: `Processed: ${processedCallsign}`}, {status: 200});
}
