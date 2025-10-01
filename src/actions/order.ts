"use server";

import { auth } from "@/auth";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

type cartItems = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default async function placeOrder(cartItems: cartItems[]) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User is not authenticated.");
  }
  const userId = session?.user.id;

  try {
    const createOrder = await prisma.$transaction(async (tx) => {
      const totalAmount = cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
      const order = await tx.order.create({
        data: {
          userId: userId,
          amount: totalAmount,
          currency: "USD",
          status: "pending",
        },
      });

      await tx.orderItem.createMany({
        data: cartItems.map((item) => ({
          orderId: order.id,
          productId: item.id,
          quantity: item.quantity,
        })),
      });
      return order;
    });
    revalidatePath("/orders");
    return { success: true, orderId: createOrder.id };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to place order." };
  }
}
