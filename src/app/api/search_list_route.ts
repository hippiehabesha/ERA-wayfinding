import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";

const db = new Database("public/data/ERA.sqlite");

export async function GET(req: NextRequest) {
  try {
    const rows = db.prepare("SELECT * FROM search_list").all();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch search list" },
      { status: 500 }
    );
  }
}
