import {NextRequest, NextResponse} from "next/server";
import {Client, Databases, ID, Query} from "node-appwrite";

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJ_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);
const APPWRITE_QSO_DATABASE_ID = process.env.APPWRITE_QSO_DATABASE_ID!;
const APPWRITE_QSO_QUEUE_COLLECTION_ID = process.env.APPWRITE_QSO_QUEUE_COLLECTION_ID!;
const APPWRITE_QSO_LOGS_COLLECTION_ID = process.env.APPWRITE_QSO_LOGS_COLLECTION_ID!;
const APPWRITE_QSO_COMPLETE_COLLECTION_ID = process.env.APPWRITE_QSO_COMPLETE_COLLECTION_ID!;

export async function POST(req: NextRequest) {
    try {
        let {callsign, operator} = await req.json();

        if (!callsign || !operator) {
            return NextResponse.json({error: "Missing callsign or operator"}, {status: 400});
        }

        // probably good to not kill myself
        callsign = callsign?.trim().toUpperCase();
        operator = operator?.trim().toUpperCase();

        // check if length is valid
        if (callsign.length < 2 || callsign.length > 10 || operator.length < 2 || operator.length > 10) {
            return NextResponse.json({error: "Invalid callsign or operator length"}, {status: 400});
        }

        // Ensure both values are alphanumeric
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        if (!alphanumericRegex.test(callsign) || !alphanumericRegex.test(operator)) {
            return NextResponse.json({error: "Callsign and operator must be alphanumeric"}, {status: 400});
        }

        // if it was already processed
        const processedResponse = await databases.listDocuments(APPWRITE_QSO_DATABASE_ID, APPWRITE_QSO_COMPLETE_COLLECTION_ID, [
            Query.equal("callsign", callsign),
            Query.equal("operator", operator),
        ]);
        if (processedResponse.documents.length > 0) {
            return NextResponse.json({error: "Callsign already processed"}, {status: 409});
        }

        // If the callsign is not in the main log
        const existingResponse = await databases.listDocuments(APPWRITE_QSO_DATABASE_ID, APPWRITE_QSO_LOGS_COLLECTION_ID, [
            Query.equal("callsign", callsign),
            Query.equal("operator", operator),
        ]);
        if (existingResponse.documents.length === 0) {
            return NextResponse.json({error: "Callsign not found"}, {status: 404});
        }

        // add to queue
        const document = await databases.createDocument(APPWRITE_QSO_DATABASE_ID, APPWRITE_QSO_QUEUE_COLLECTION_ID, ID.unique(), {
            callsign,
            operator,
        });

        console.log("Queued:", document.$id, callsign, operator);

        return NextResponse.json({message: "Callsign queued", id: document.$id}, {status: 201});

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Failed to queue"}, {status: 500});
    }
}