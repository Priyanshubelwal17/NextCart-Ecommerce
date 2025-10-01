import React from "react";
import AuthDisplay from "./AuthDisplay";
import Link from "next/link";
import { auth } from "@/auth";

async function Header() {
  const session = await auth();
  return (
    <header className="flex justify-between items-center mb-10">
      <h1 className="text-4xl font-bold text-cyan-400">NextCart</h1>
      <p className="text-sm text-gray-300">Welcome, {session?.user?.name}</p>
      <Link href="/orders" className="text-cyan-400 hover:text-cyan-300 ">
        My Orders{" "}
      </Link>
      <Link
        className="text-cyan-400 hover:text-cyan-200 text-sm font-semibold"
        href="/dashboard"
      >
        Dashboard
      </Link>
      <AuthDisplay />
    </header>
  );
}

export default Header;
