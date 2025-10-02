"use client";

import toast from "react-hot-toast";
import updateProfile from "../actions/user";
import { useTransition } from "react";

export default function AccountForm({ user }: { user: User } | null) {
  const [isPending, startTranistion] = useTransition();
  const clientAction = async (formData: FormData) => {
    startTranistion(async () => {
      const result = await updateProfile(formData);
      if (result.success) {
        toast.success(result.success);
      } else if (result.error) {
        toast.error(result.error);
      }
    });
  };

  return (
    <form
      action={clientAction}
      className="bg-gray-800 p-8 rounded-xl shadow-lg  space-y-6"
    >
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Username
        </label>
        <input
          defaultValue={user?.name ?? ""}
          type="text"
          name="username"
          id="username"
          className=" block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>
      <div>
        <label
          htmlFor="nationality"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Nationality
        </label>
        <input
          type="text"
          name="nationality"
          id="nationality"
          defaultValue={user?.nationality ?? ""}
          className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none foucs:ring-2 focus:ring-cyan-500"
        />
      </div>
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-300"
        >
          Address
        </label>
        <textarea
          name="address"
          id="adresss"
          rows={4}
          defaultValue={user?.address ?? ""}
          className="block w-full  bg-gray-700 border border-gray-600 rouded-md shadow-sm py-2 px-3 text-white focus:outline-none foucs:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        ></textarea>
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={oncancel}
          className="w-full flex justify-center py-3 px-4 border border-gray-600 rounded-md shadow-sm text0sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          disabled={isPending}
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 foucs:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          {isPending ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}
