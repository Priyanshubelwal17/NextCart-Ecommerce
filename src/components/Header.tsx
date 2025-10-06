import React from "react";
import AuthDisplay from "./AuthDisplay";
import Link from "next/link";
import { auth } from "@/auth";
import SignOut from "./sign-out";
import Image from "next/image";
import SignIn from "./sign-in";
import SearchBox from "./SearchBox";
import CartIcon from "./CartIcon";

async function Header() {
  const session = await auth();
  return (
    <header className="flex justify-between items-center mb-10 border border-gray-700 pb-4">
      <Link href="/" className="text-4xl font-bold text-cyan-400">
        NextCart
      </Link>
      <p className="text-sm text-gray-300">Welcome, {session?.user?.name}</p>
      <div className="flex items-center gap-5">
        <CartIcon />
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

            <Link
              href="/contact"
              className="text-sm font-semibold text-gray-300 hover:text-white"
            >
              Contact us
            </Link>
            <div>
              <SearchBox />
            </div>
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
