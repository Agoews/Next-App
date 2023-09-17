import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Product does not exist" },
      { status: 400 }
    );
  }

  return NextResponse.json(product);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Product does not exist" },
      { status: 400 }
    );
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: product.id,
    },
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json(updatedProduct);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 400 });
  }

  prisma.product.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({});
}
