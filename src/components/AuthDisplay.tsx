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
        <SignOut />
      </div>
    );
  } else {
    return <SignIn />;
  }
}

export default AuthDisplay;
