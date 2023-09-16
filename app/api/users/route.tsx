import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET(req: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "George" },
    { id: 2, name: "david" },
    { id: 3, name: "Heloo" },
    { id: 4, name: "TEst" },
  ]);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
