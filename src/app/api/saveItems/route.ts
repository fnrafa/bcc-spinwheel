import {saveItems} from "@/utils/itemsHandler";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const {title, items} = await req.json();
        saveItems(title, items);
        return NextResponse.json({success: true, message: "Items saved successfully!"});
    } catch (error: any) {
        return NextResponse.json({success: false, message: `Failed to save items! ${error.message}`}, {status: 500});
    }
}
