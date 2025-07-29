import { useState } from "react";
import { MdOutlineSpaceDashboard, MdMenu } from "react-icons/md";
import { BiCalendar } from "react-icons/bi";
import { MdOutlinePolicy } from "react-icons/md";
import { TbMessageChatbot } from "react-icons/tb";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      className={`bg-[#2c3d5e] text-white ${
        isExpanded ? "w-64" : "w-20"
      } min-h-screen py-4 transition-all duration-300`}
    >
      {/* Header */}
      <div
        className={`mb-6 px-4 ${
          isExpanded ? "flex items-center justify-between" : "flex justify-center"
        }`}
      >
        {isExpanded && (
          <div className="flex items-center space-x-2 px-4">
            <img src="/assistant.svg" alt="Assistant" className="w-7 h-7" />
            <h2 className="text-lg font-bold">SmartHR</h2>
          </div>
        )}
        <button onClick={toggleSidebar} className="text-white">
          <MdMenu size={24} />
        </button>
      </div>

      <div className="border-b border-white/20 mb-6 mx-4"></div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 px-4">
        <a
          href="/dashboard"
          className="flex items-center space-x-3 rounded px-3 py-2 hover:bg-blue-500 transition text-white"
        >
          <MdOutlineSpaceDashboard size={20} />
          {isExpanded && <span className="text-sm">Dashboard</span>}
        </a>
        <a
          href="/transactions"
          className="flex items-center space-x-3 rounded px-3 py-2 hover:bg-blue-500 transition text-white"
        >
          <MdOutlinePolicy size={20} />
          {isExpanded && <span className="text-sm">Policies</span>}
        </a>
        <a
          href="/leave-management"
          className="flex items-center space-x-3 rounded px-3 py-2 hover:bg-blue-500 transition text-white"
        >
          <BiCalendar size={20} />
          {isExpanded && <span className="text-sm">Leave Management</span>}
        </a>
        <a
          href="/policy-helper"
          className="flex items-center space-x-3 rounded px-3 py-2 hover:bg-blue-500 transition text-white"
        >
          <TbMessageChatbot size={20} />
          {isExpanded && <span className="text-sm">Policy Helper AI</span>}
        </a>
      </nav>
    </aside>
  );
}
