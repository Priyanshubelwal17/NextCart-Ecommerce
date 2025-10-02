import { auth } from "@/auth";
import updateProfile from "@/src/actions/user";
import AccountForm from "@/src/components/AccountForm";
import AccountPageClient from "@/src/components/AccountPageClient";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

async function Page() {
  const session = await auth();
  if (!session) redirect("/");
  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
  });

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-8"> My account </h1>
      <AccountPageClient user={user} />
    </main>
  );
}

export default Page;
