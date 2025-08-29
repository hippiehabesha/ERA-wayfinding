import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";

const db = new Database("public/data/ERA.sqlite");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { comment, user } = body;
    db.prepare("INSERT INTO comments (user, comment) VALUES (?, ?)").run(
      user,
      comment
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save comment" },
      { status: 500 }
    );
  }
}
