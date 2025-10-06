"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../lib/redux/cartSlice";
import Link from "next/link";
import product from "../app/products/[id]/page";
import { prisma } from "../lib/prisma";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { RootState } from "../lib/redux/store";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  description: string | null;
};

export default function ProductList() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  // 3. Get the current cart items from the Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const {
    isLoading,
    isError,
    data: products,
  } = useQuery({
    queryKey: ["products", search],
    queryFn: async () => {
      const { data } = await axios.get(`/api/products?search=${search || ""}`);
      return data as Product[];
    },
  });

  if (isLoading) return <span>Loading products...</span>;
  if (isError) return <span>Error fetching products.</span>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">
        {search ? `Results for "${search}"` : "Our Products"}
      </h2>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => {
            // 4. For each product, check if it's already in the cart
            const cartItem = cartItems.find((item) => item.id === product.id);

            return (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="bg-gray-800 border border-gray-700 rounded-lg flex flex-col h-full overflow-hidden transition-all duration-300 group-hover:border-cyan-500">
                  {product.image && (
                    <div className="relative w-full h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-white">
                      {product.name}
                    </h3>
                    <p className="text-cyan-400 font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-gray-400 text-sm mt-2 flex-grow">
                      {product.description}
                    </p>

                    {/* 5. Conditionally render the button or the quantity controller */}
                    <div className="mt-4">
                      {cartItem ? (
                        <div className="flex items-center justify-around">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(decrementQuantity(product.id));
                            }}
                            className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            -
                          </button>
                          <span className="font-bold text-white text-lg">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(incrementQuantity(product.id));
                            }}
                            className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(addToCart(product));
                            toast.success(`${product.name} added to cart!`);
                          }}
                          className="w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400">No products found.</p>
      )}
    </div>
  );
}
