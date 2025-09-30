import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
