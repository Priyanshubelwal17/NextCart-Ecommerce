import { auth } from "@/auth";
import React from "react";
import SignOut from "./sign-out";
import SignIn from "./sign-in";

async function AuthDisplay() {
  const session = await auth();
  return <>{session ? <SignOut /> : <SignIn />}</>;
}

export default AuthDisplay;
