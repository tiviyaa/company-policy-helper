"use client";

import { useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import Sidebar from "@/app/dashboard/Sidebar";
import DashboardHeader from "@/app/dashboard/DashboardHeader";
import DashboardFooter from "@/app/dashboard/DashboardFooter";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<any[]>([]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <section className="flex-1 p-6">
          <span className="max-w-7xl mx-auto">
            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Total Staff Count
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">53</p>
                  </div>
                  <FaPeopleGroup className="text-2xl text-blue-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Total Leave Requests
                    </h3>
                    <p className="text-2xl font-bold text-green-600">2</p>
                  </div>
                  <SlEnvolopeLetter className="text-2xl text-green-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Pending Leave Application
                    </h3>
                    <p className="text-2xl font-bold text-blue-600">1</p>
                  </div>
                  <MdOutlinePendingActions className="text-2xl text-blue-500" />
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg shadow mb-4">
              <div className="p-3 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900">
                  Recent AI Q&A
                </h2>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500">No Q&A yet!</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow mb-4">
              <div className="p-3 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900">
                  Recent Activity Logs
                </h2>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500">No activity yet!</p>
              </div>
            </div>
          </span>
        </section>

        <DashboardFooter />
      </div>
    </div>
  );
}
