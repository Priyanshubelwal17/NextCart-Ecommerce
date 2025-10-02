import { auth } from "@/auth";
import dynamic from "next/dynamic";

import StatCard from "@/src/components/dashboard/StatCard";
import { prisma } from "@/src/lib/prisma";
import { CreditCard } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import SalesChart from "@/src/components/dashboard/SalesChart";
import Link from "next/link";

async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const productCount = await prisma.product.count();
  const userCount = await prisma.user.count();
  const totalSales = 0;
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/dashboard/products/new"
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          {" "}
          + Add New Product{" "}
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Sales"
          value={`$${totalSales}`}
          icon={<CreditCard className="w-8 h-8 text-cyan-400" />}
        />
        <StatCard
          title="Total Products"
          value={`$${productCount}`}
          icon={<CreditCard className="w-8 h-8 text-cyan-400" />}
        />
        <StatCard
          title="Total Users"
          value={`$${userCount}`}
          icon={<CreditCard className="w-8 h-8 text-cyan-400" />}
        />
      </div>
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Sales Overview</h2>
        <div style={{ width: "100%", height: "384px" }}>
          <SalesChart />
        </div>
      </div>
    </main>
  );
}

export default Page;
