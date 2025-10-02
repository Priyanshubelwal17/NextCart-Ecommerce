"use client";

import { useState } from "react";
import AccountForm from "./AccountForm";
import UserProfile from "./userProfile";

export default function AccountPageClient({ user }: { user: User | null }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      {isEditing ? (
        <AccountForm user={user} onCancel={() => setIsEditing(false)} />
      ) : (
        <UserProfile user={user} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
}
