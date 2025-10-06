"use client";

import { RootState } from "../lib/redux/store";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="h-6 w-6 text-gray-300 hover:text-white">
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-white">
            {totalItems}
          </span>
        )}
      </ShoppingCart>
    </Link>
  );
}
