import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export function GET(req: NextRequest, { params }: { params: { id: number } }) {
  return NextResponse.json({ id: params.id, name: "bananas", price: 4.4 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  return NextResponse.json({
    id: params.id,
    name: body.name,
    price: body.price,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  // const body = req.json();
  // const validation = schema.safeParse(body);

  if (params.id > 10) {
    return NextResponse.json({ error: "Product not found" }, { status: 400 });
  }

  return NextResponse.json({});
}
