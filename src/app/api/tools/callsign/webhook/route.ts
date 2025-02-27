import {NextRequest, NextResponse} from "next/server";
import {Client, Databases, Query} from "node-appwrite";
import crypto from "crypto";
import {exec} from "child_process";

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_CALLSIGN_PROJ_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_CALLSIGN_DATABASE_ID!;
const COLLECTION_ID = process.env.APPWRITE_CALLSIGN_QUEUE_COLLECTION_ID!;
const SECRET_KEY = process.env.APPWRITE_WEBHOOKS_SIG_KEY!;

// Verify webhook
async function verifySignature(req: NextRequest, body: string) {
    const signatureHeader = req.headers.get("x-appwrite-webhook-signature");
    const webhookUrl = req.headers.get("x-appwrite-webhook-url") || req.nextUrl.toString();
    const expectedSignature = crypto.createHmac("sha1", SECRET_KEY).update(webhookUrl + body).digest("base64");

    return signatureHeader === expectedSignature;
}

function executeShellCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr}`);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

async function processQueue() {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderAsc("$createdAt"),
            Query.limit(1),
        ]);

        if (response.documents.length === 0) return null;

        const {$id, callsign} = response.documents[0];

        console.log("Processing:", callsign);
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // actual docker processing stuff here
        const echoedCallsign = await executeShellCommand(`echo ${callsign}`);
        console.log("Echoed Callsign:", echoedCallsign); // You can use this result for further actions if needed


        console.log("✅ Processed:", callsign);
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, $id);

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
