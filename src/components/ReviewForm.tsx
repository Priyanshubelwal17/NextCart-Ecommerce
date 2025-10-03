"use client";

import React, { useRef } from "react";
import submitReview from "../actions/review";
import toast from "react-hot-toast";

function ReviewForm({ productId }: { productId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  async function handleFormSubmit(formdata: FormData) {
    const rating = Number(formdata.get("rating"));
    const text = formdata.get("text") as string;

    const result = await submitReview({ productId, rating, text });

    if (result.success) {
      toast.success(result.message || "Review submitted!");
      formRef.current?.reset();
    } else {
      toast.error(result.error || "Somethign went wrong.");
    }
  }

  return (
    <form
      ref={formRef}
      action={handleFormSubmit}
      className="mt-8 bg-gray-800 p-6 rounded-lg"
    >
      <h3 className="text-xl font-bold text-white mb-4">Write a Review </h3>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-300"
          >
            Rating
          </label>
          <select
            name="rating"
            id="rating"
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md text-white p-2"
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Stars</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-300"
          >
            Review
          </label>
          <textarea
            name="text"
            id="text"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white p-2"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg "
        >
          Submit Review
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
