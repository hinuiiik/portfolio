import {NextRequest, NextResponse} from "next/server";
import {Client, Databases, ID} from "node-appwrite";

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_CALLSIGN_PROJ_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_CALLSIGN_DATABASE_ID!;
const COLLECTION_ID = process.env.APPWRITE_CALLSIGN_QUEUE_COLLECTION_ID!;

export async function POST(req: NextRequest) {
    try {
        const {callsign} = await req.json();

        if (!callsign) {
            return NextResponse.json({error: "Missing callsign"}, {status: 400});
        }

        const document = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            callsign,
        });

        console.log("Queued:", document.$id, callsign);

        return NextResponse.json({message: "Callsign queued", id: document.$id}, {status: 201});

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Failed to queue"}, {status: 500});
    }
}
