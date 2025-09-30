"use client";

import { auth } from "@/auth";
import dynamic from "next/dynamic";

const SalesChart = dynamic(
  () => import("../../components/dashboard/SalesChart"),
  {
    ssr: false, // This is the key: it disables server-side rendering for the chart
    loading: () => <p>Loading chart...</p>, // Optional: show a loading message
  }
);
import StatCard from "@/src/components/dashboard/StatCard";
import { prisma } from "@/src/lib/prisma";
import { CreditCard } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

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
        <div className="h-96">
          <SalesChart />
        </div>
      </div>
    </main>
  );
}

export default Page;
