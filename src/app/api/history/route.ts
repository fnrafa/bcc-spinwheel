import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const historyFilePath = path.join(process.cwd(), "data/history.json");


export async function GET() {
    try {
        const history = JSON.parse(fs.readFileSync(historyFilePath, "utf-8"));
        return NextResponse.json({ history });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Failed to load history: ${error.message}` },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const { finalIndex } = await req.json();
        const history = JSON.parse(fs.readFileSync(historyFilePath, "utf-8"));

        history.push({ id: finalIndex, time: new Date().toISOString() });

        fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
        return NextResponse.json({ success: true, message: "History saved successfully!" });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Failed to save history: ${error.message}` },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    try {
        fs.writeFileSync(historyFilePath, JSON.stringify([], null, 2));
        return NextResponse.json({ success: true, message: "History cleared!" });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Failed to clear history: ${error.message}` },
            { status: 500 }
        );
    }
}
