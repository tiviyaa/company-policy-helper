"use client";

import { useState } from "react";
import { BiCalendar, BiCheck, BiX, BiDetail } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlinePendingActions } from "react-icons/md";
import Sidebar from "@/app/dashboard/Sidebar";
import DashboardHeader from "@/app/dashboard/DashboardHeader";
import DashboardFooter from "@/app/dashboard/DashboardFooter";

interface LeaveApplication {
  id: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export default function LeaveManagementPage() {
  const [applications, setApplications] = useState<LeaveApplication[]>([
    {
      id: "1",
      employeeName: "John Doe",
      leaveType: "Annual Leave",
      startDate: "2024-02-15",
      endDate: "2024-02-20",
      days: 5,
      reason: "Family vacation",
      status: "pending",
      appliedDate: "2024-01-28"
    },
    {
      id: "2",
      employeeName: "Jane Smith",
      leaveType: "Medical Leave",
      startDate: "2024-02-10",
      endDate: "2024-02-12",
      days: 3,
      reason: "Medical appointment",
      status: "approved",
      appliedDate: "2024-01-25"
    },
    {
      id: "3",
      employeeName: "Anne",
      leaveType: "Emergency Leave",
      startDate: "2025-07-29",
      endDate: "2025-07-29",
      days: 1,
      reason: "Car broke down",
      status: "rejected",
      appliedDate: "2025-07-29"
    }
  ]);

  const [selectedApplication, setSelectedApplication] = useState<LeaveApplication | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleStatusUpdate = (id: string, newStatus: 'approved' | 'rejected') => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    setShowModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const pendingCount = applications.filter(app => app.status === 'pending').length;
  const approvedCount = applications.filter(app => app.status === 'approved').length;
  const totalApplications = applications.length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <section className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Applications</h3>
                    <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
                  </div>
                  <BiCalendar className="text-2xl text-blue-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Pending Applications</h3>
                    <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                  </div>
                  <MdOutlinePendingActions className="text-2xl text-yellow-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Approved This Month</h3>
                    <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                  </div>
                  <BiCheck className="text-2xl text-green-500" />
                </div>
              </div>
            </div>

            {/* Leave Applications Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-3 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900">Leave Applications</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leave Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {applications.map((application) => (
                      <tr key={application.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{application.employeeName}</div>
                            <div className="text-sm text-gray-500">Applied: {application.appliedDate}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {application.leaveType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {application.startDate} to {application.endDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {application.days}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getStatusColor(application.status)}`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => {
                              setSelectedApplication(application);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <BiDetail className="inline w-4 h-4" />
                          </button>
                          {application.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(application.id, 'approved')}
                                className="text-green-600 hover:text-green-900"
                              >
                                <BiCheck className="inline w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(application.id, 'rejected')}
                                className="text-red-600 hover:text-red-900"
                              >
                                <BiX className="inline w-4 h-4" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <DashboardFooter />
      </div>

      {/* Modal for viewing application details */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-xs flex items-center justify-center z-50">
          <div className="relative bg-white border border-black rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
            {/* Close Icon */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <AiOutlineClose size={20} />
            </button>

            <h3 className="text-lg font-semibold mb-4">Leave Application Details</h3>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Employee</label>
                <p className="text-sm text-gray-900">{selectedApplication.employeeName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Leave Type</label>
                <p className="text-sm text-gray-900">{selectedApplication.leaveType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Duration</label>
                <p className="text-sm text-gray-900">
                  {selectedApplication.startDate} to {selectedApplication.endDate}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Reason</label>
                <p className="text-sm text-gray-900">{selectedApplication.reason}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getStatusColor(
                      selectedApplication.status
                    )}`}
                  >
                    {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {selectedApplication.status === 'pending' && (
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => handleStatusUpdate(selectedApplication.id, 'approved')}
                  className="px-3 py-1 bg-green-500 text-sm text-white rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedApplication.id, 'rejected')}
                  className="px-3 py-1 bg-red-500 text-sm text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}