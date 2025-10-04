"use client";

import toast from "react-hot-toast";
import updateProfile from "../actions/user";
import { useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import { CountryDropdown } from "react-country-region-selector";
import { count } from "console";
import axios from "axios";

type Country = {
  name: string;
  flag: string;
};

interface AccountFormProps {
  user: User | null;
  onCancel: () => void;
}

export default function AccountForm({ user, onCancel }: AccountFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isDetecting, setIsDetecting] = useState(false);
  const [nationality, setNationality] = useState(user?.nationality ?? "");
  const [address, setAddress] = useState(user?.address ?? "");

  const { data: countries, isLoading: isLoadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const { data } = await axios.get<Country[]>("/api/countries");
      return data;
    },
  });

  const clientAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await updateProfile(formData);
      if (result.success) {
        toast.success(result.success);
        onCancel();
      } else if (result.error) {
        toast.error(result.error);
      }
    });
  };

  const handleDetectionLocation = async () => {
    setIsDetecting(true);
    toast.loading("Detecting your location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (!response.ok) throw new Error("Falied to fetch address.");
          const data = await response.json();
          setAddress(data.display_name || "Could not find address.");
          toast.dismiss();
          toast.success("Location detected");
        } catch (error) {
          toast.dismiss();
          toast.error("Could not find address.");
        } finally {
          setIsDetecting(false);
        }
      },
      () => {
        toast.dismiss();
        toast.error(
          "Unable to retrieve your location. Please enable location services in your browser"
        );
        setIsDetecting(false);
      }
    );
  };

  const selectedCountryFlag = countries?.find(
    (c) => c.name === nationality
  )?.flag;

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
        <div className="flex items-center gap-3 mt-1">
          {selectedCountryFlag && (
            <img
              src={selectedCountryFlag}
              alt="flag"
              className="w-8 h-auto border border-gray-600"
            />
          )}
          <select
            name="nationality"
            id="name"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            disabled={isLoadingCountries}
            className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
          >
            <option value="">
              {isLoadingCountries ? "Loading countries" : "Select a country"}
            </option>

            {countries?.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Adress Field */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-300"
          >
            Address
          </label>
          <button
            type="button"
            onClick={handleDetectionLocation}
            disabled={isDetecting}
            className="text-xs text-cyan-400 hover:text-cyan-300 disabled:opacity-50"
          >
            {isDetecting ? "Detecting..." : "Detect My Location"}
          </button>
        </div>
        <textarea
          name="address"
          id="adresss"
          rows={4}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="block w-full  bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        ></textarea>
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="w-full flex justify-center py-3 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          disabled={isPending}
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          {isPending ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}
