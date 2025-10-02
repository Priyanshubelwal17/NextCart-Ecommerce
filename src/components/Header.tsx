import React from "react";
import AuthDisplay from "./AuthDisplay";
import Link from "next/link";
import { auth } from "@/auth";
import SignOut from "./sign-out";
import Image from "next/image";
import SignIn from "./sign-in";

async function Header() {
  const session = await auth();
  return (
    <header className="flex justify-between items-center mb-10">
      <h1 className="text-4xl font-bold text-cyan-400">NextCart</h1>
      <p className="text-sm text-gray-300">Welcome, {session?.user?.name}</p>
      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <Link href="/orders" className="text-cyan-400 hover:text-cyan-300 ">
              My Orders
            </Link>
            <Link
              className="text-cyan-400 hover:text-cyan-200 text-sm font-semibold"
              href="/dashboard"
            >
              Dashboard
            </Link>
            <SignOut />
            <Link href="/account">
              {session.user.image && (
                <Image
                  src={session?.user?.image}
                  alt={session.user.name || "User Avatar"}
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                />
              )}
            </Link>
          </>
        ) : (
          <SignIn />
        )}
      </div>
    </header>
  );
}

export default Header;
