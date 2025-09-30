import { auth } from "@/auth";
import React from "react";
import SignOut from "./sign-out";
import SignIn from "./sign-in";
import Link from "next/link";

async function AuthDisplay() {
  const session = await auth();
  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-300">Welcome, {session.user?.name}</p>
        <Link
          className="text-cyan-400 hover:text-cyan-200 text-sm font-semibold"
          href="/dashboard"
        >
          Dashboard
        </Link>
        <SignOut />
      </div>
    );
  } else {
    return <SignIn />;
  }
}

export default AuthDisplay;
