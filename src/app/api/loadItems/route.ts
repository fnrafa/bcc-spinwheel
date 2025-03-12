import {loadItems} from "@/utils/itemsHandler";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const data = loadItems();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({error: `Failed to load items. ${error.message}`}, {status: 500});
    }
}
