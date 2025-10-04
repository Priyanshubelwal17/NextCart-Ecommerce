"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="fixed top-5 left-5 z-50 flext items-center jusify-cener w-10 h-10 bg-gray-800 border border-gray-700 rounded-full text-gray-300 hover:text-white transition-colors"
      aria-label="Go Bck"
      onClick={() => router.back()}
    >
      <ArrowLeft />
    </button>
  );
}
