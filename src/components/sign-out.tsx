import { signOut } from "@/auth";
import React from "react";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button>SignOut</button>
    </form>
  );
}

export default SignOut;
