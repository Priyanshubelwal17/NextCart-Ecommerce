import Image from "next/image";
import React from "react";

interface UserProfileProps {
  user: User | null;
  onEdit: () => void;
}

function UserProfile({ user, onEdit }: UserProfileProps) {
  return (
    <div className="bg-gray-800 p-8 shadow-lg space-y-6">
      <div className="flex flex-col items-center spae-y-4">
        {user?.image && (
          <Image
            src={user.image}
            alt="User Avatar"
            width={96}
            height={96}
            className="rounded-full"
          />
        )}
        <h2 className="text-2xl font-bold text-white">{user?.name} </h2>
        <p className="text-sm text-gray-400 ">{user?.email} </p>
      </div>
      <div className="border-t border-gray-700 pt-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-400">Username</span>
          <span className="text-sm text-white">
            {" "}
            {user?.username || "Not set"}{" "}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-400">Address </span>
          <span className="text-sm text-white text-right">
            {user?.address || "Not set"}
          </span>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
      >
        Edit Profile
      </button>
    </div>
  );
}

export default UserProfile;
