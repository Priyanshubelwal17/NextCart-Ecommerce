"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../lib/redux/cartSlice";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
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
          <div
            key={product.id}
            className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex flex-col"
          >
            <h3 className="font-bold text-lg text-white ">{product.name}</h3>
            <p className="text-cyan-400 font-semibold">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-400 text-sm mt-2 flex flex-grow">
              {product.description}
            </p>
            <button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
