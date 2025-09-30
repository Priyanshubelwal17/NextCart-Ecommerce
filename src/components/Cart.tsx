"use client";

import { RootState } from "../lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../lib/redux/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  if (cartItems.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-4 text-white"> Shopping Cart</h2>
        <p className="text-gray-400">Your cart is empty.</p>
      </div>
    );
  }
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-4 text-white ">Shopping Cart</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-gray-800 p-4 rounded-lg"
          >
            <div>
              <h3 className="font-bold text-white"> {item.name}</h3>
              <p className="text-cyan-400"> ${item.price.toFixed(2)} </p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => dispatch(decrementQuantity(item.id))}>
                -
              </button>
              <span className="text-white">{item.quantity} </span>
              <button
                onClick={() => dispatch(incrementQuantity(item.id))}
                className="px-2 py-1 bg-gray-600 rounded"
              >
                +
              </button>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right">
        <h3 className="text-2xl font-bold text-white">
          Total: ${total.toFixed(2)}
        </h3>
      </div>
    </div>
  );
}
