import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center gap-6 border-gray-700">
      <div className="bg-gray-700">{icon}</div>
      <div>
        <p className="text-sm text-gray-400 font-medium"> {title}</p>
        <p className="text-2xl font-bold text-white"> {value} </p>
      </div>
    </div>
  );
}

export default StatCard;
