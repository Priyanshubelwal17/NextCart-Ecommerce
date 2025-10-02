"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export default async function addProduct(formdata: FormData) {
  try {
    const name = formdata.get("name") as string;
    const description = formdata.get("description") as string;
    const price = parseFloat(formdata.get("price") as string);
    const image = formdata.get("image") as string;

    if (!name || !price) {
      throw new Error("Name and price are required.");
    }

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        image,
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/");
  revalidatePath("/dashboard");

  redirect("/dashboard");
}
