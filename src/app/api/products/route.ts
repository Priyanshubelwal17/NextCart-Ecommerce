import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // 1. Get the search query from the URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("Search");

    // 2. Create a 'where' object for the Prisma query
    const whereClause = query
      ? {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        }
      : {};

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
