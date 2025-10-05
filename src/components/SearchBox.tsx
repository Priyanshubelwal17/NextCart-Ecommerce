"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent } from "react";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/?search=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="bg-gray-700 text-white rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
    </form>
  );
}
