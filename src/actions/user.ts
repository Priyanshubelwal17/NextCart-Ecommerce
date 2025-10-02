"use server";

import { auth } from "@/auth";
import { prisma } from "../lib/prisma";
import { error } from "console";
import { revalidatePath } from "next/cache";

export default async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to update your profile" };
  }
  try {
    const username = formData.get("username") as string;
    const nationality = formData.get("nationality") as string;
    const address = formData.get("address") as string;

    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        username,
        nationality,
        address,
      },
    });
    revalidatePath("/account");

    return { success: "Profile updated successfully" };
  } catch (error) {
    console.error(error);
    if (
      (error as any).code === "P2002" &&
      (error as any).meta?.target?.includes("username")
    ) {
      return { error: "This username is already taken" };
    }
    return { error: "Falied to update path" };
  }
}
