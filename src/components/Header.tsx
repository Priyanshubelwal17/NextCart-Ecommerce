import React from "react";
import AuthDisplay from "./AuthDisplay";

function Header() {
  return (
    <header className="flex justify-between items-center mb-10">
      <h1 className="text-4xl font-bold text-cyan-400">NextCart</h1>
      <AuthDisplay />
    </header>
  );
}

export default Header;
