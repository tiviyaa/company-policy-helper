import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";

export default function DashboardHeader() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-5 flex justify-between items-center">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        <h1 className="text-base sm:text-lg font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Right Side: Profile Icon & Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <CgProfile className="text-2xl text-gray-600" />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
            <a
              href="/account"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Account
            </a>
            <button
              onClick={() => {
                // Handle logout logic here
                alert("Logging out...");
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
