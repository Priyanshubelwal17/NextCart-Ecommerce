import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // 1. Get the search query from the URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("search");

    // 2. Create a 'where' object for the Prisma query
    const whereClause = query
      ? {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive", // Case-insensitive search
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

    // 3. Use the 'where' object in the findMany call
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
