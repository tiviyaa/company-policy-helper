import React from "react";

export default function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-m font-semibold text-gray-800">Dashboard</h1>
      </div>
    </header>
  );
}
