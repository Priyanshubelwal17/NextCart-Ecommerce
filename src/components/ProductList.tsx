"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../lib/redux/cartSlice";
import { Image } from "lucide-react";
import Link from "next/link";
import product from "../app/products/[id]/page";
import { prisma } from "../lib/prisma";
import toast from "react-hot-toast";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  description: string | null;
};

function ProductList() {
  const dispatch = useDispatch();

  const {
    isLoading,
    isError,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("/api/products");
      return data as Product[];
    },
  });

  const handleAddCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    // FIX 4: Stop the click from navigating the parent Link
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success(`${product.name} added to car!`);
  };

  if (isLoading) {
    return <span>Loading products...</span>;
  }

  if (isError) {
    return <span>Error fetching products.</span>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="group"
          >
            <div
              key={product.id}
              className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex flex-col"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded"
              />

              <div className="p-4 flex flex-col grow">
                <h3 className="font-bold text-lg text-white ">
                  {product.name}
                </h3>
                <p className="text-cyan-400 font-semibold">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-400 text-sm mt-2 flex flex-grow">
                  {product.description}
                </p>
                <button
                  onClick={(e) => handleAddCart(e, product)}
                  className="mt-4 bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-700  transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
