"use server";

import { auth } from "@/auth";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

interface ReviewData {
  productId: string;
  rating: number;
  text: string;
}

export default async function submitReview(data: ReviewData) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      error: "You must be logged in to submit a review.",
    };
  }

  try {
    await prisma.review.create({
      data: {
        rating: data.rating,
        text: data.text,
        productId: data.productId,
        userId: session?.user?.id,
      },
    });

    revalidatePath(`/products/${data.productId}`);
    return { success: true, message: "Review submitted successfully!" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to submit review" };
  }
}
