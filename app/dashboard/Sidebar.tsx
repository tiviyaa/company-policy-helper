import { useState } from "react";
import { MdDashboard, MdOutlinePendingActions, MdMenu } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { SlEnvolopeLetter } from "react-icons/sl";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      className={`bg-[#2c3d5e] text-white ${
        isExpanded ? "w-64" : "w-20"
      } min-h-screen p-4 transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-center mb-5">
        {isExpanded ? (
          <div className="flex items-center space-x-2 mr-4">
            <img src="/assistant.svg" alt="Assistant" className="w-8 h-8" />
            <h2 className="text-xl font-bold">SmartHR</h2>
          </div>
        ) : (
          <button onClick={toggleSidebar} className="text-white">
            <MdMenu size={30} />
          </button>
        )}
        {isExpanded && (
          <button onClick={toggleSidebar} className="text-white">
            <MdMenu size={30} />
          </button>
        )}
      </div>

      <div className="border-b border-white/20 mb-6"></div>

      {/* Navigation */}
      <nav className="space-y-6">
        <a
          href="/dashboard"
          className="flex items-center space-x-3 justify-center rounded hover:bg-orange-500 transition text-white"
        >
          <MdDashboard size={30} />
          {isExpanded && <span>Dashboard</span>}
        </a>
        <a
          href="/transactions"
          className="flex items-center space-x-3 justify-center rounded hover:bg-orange-500 transition text-white"
        >
          <FaPeopleGroup size={30} />
          {isExpanded && <span>Policies</span>}
        </a>
        <a
          href="/budget"
          className="flex items-center space-x-3 justify-center rounded hover:bg-orange-500 transition text-white"
        >
          <MdOutlinePendingActions size={30} />
          {isExpanded && <span>Leave Management</span>}
        </a>
        <a
          href="/reports"
          className="flex items-center space-x-3 justify-center rounded hover:bg-orange-500 transition text-white"
        >
          <SlEnvolopeLetter size={30} />
          {isExpanded && <span>Policy Helper AI</span>}
        </a>
      </nav>
    </aside>
  );
}
