// src/pages/SmartRemindersPage.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  FaBell,
  FaClock,
  FaExclamationTriangle,
  FaRegClock,
  FaCog,
  FaPlus,
  FaFilter,
  FaSearch,
} from "react-icons/fa";

export default function SmartRemindersPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const hasReminders = false;

  return (
    <div className="min-h-screen bg-[#F2F2F7] font-outfit flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen pt-18 lg:pt-8 px-5 lg:px-8  pb-8">
        <div className="w-full lg:max-w-7xl lg:mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111111]">
                Smart Reminders
              </h1>
              <p className="text-[#6B6B70] mt-1">
                Never miss a deadline with intelligent reminders
              </p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-[#1C1C1E] text-white rounded-xl shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all w-fit">
              <FaPlus className="h-4 w-4" />
              <span className="text-sm font-medium">New Reminder</span>
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#6C63FF]/10 flex items-center justify-center">
                  <FaClock className="h-4 w-4 text-[#6C63FF]" />
                </div>
                <h3 className="font-semibold text-[#111111]">3 Days Before</h3>
              </div>
              <p className="text-sm text-[#6B6B70]">
                Get notified 3 days before deadlines to start early.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#FFB86B]/10 flex items-center justify-center">
                  <FaExclamationTriangle className="h-4 w-4 text-[#FFB86B]" />
                </div>
                <h3 className="font-semibold text-[#111111]">
                  Workload Alerts
                </h3>
              </div>
              <p className="text-sm text-[#6B6B70]">
                Alerts when you have too many tasks due at once.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#FF7A7A]/10 flex items-center justify-center">
                  <FaRegClock className="h-4 w-4 text-[#FF7A7A]" />
                </div>
                <h3 className="font-semibold text-[#111111]">
                  Collision Detection
                </h3>
              </div>
              <p className="text-sm text-[#6B6B70]">
                Know when multiple deadlines overlap.
              </p>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9AA0] h-4 w-4" />
              <input
                type="text"
                placeholder="Search reminders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#E5E5EA] rounded-2xl bg-white focus:border-[#1C1C1E] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-3 border-2 border-[#E5E5EA] rounded-2xl bg-white focus:border-[#1C1C1E] focus:outline-none transition-colors text-sm"
              >
                <option value="all">All Reminders</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>

              <button className="p-3 border-2 border-[#E5E5EA] rounded-2xl bg-white hover:border-[#1C1C1E] transition-colors">
                <FaFilter className="h-4 w-4 text-[#6B6B70]" />
              </button>
            </div>
          </div>

          {/* Empty State */}
          {!hasReminders && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#F2F2F7] flex items-center justify-center mx-auto mb-6">
                <FaBell className="h-8 w-8 sm:h-10 sm:w-10 text-[#9A9AA0]" />
              </div>

              <h3 className="text-xl font-semibold text-[#111111] mb-2">
                No reminders yet
              </h3>

              <p className="text-[#6B6B70] mb-6 max-w-md mx-auto">
                Reminders will appear here when you have upcoming deadlines.
              </p>

              <button className="px-6 py-3 bg-[#1C1C1E] text-white rounded-2xl font-semibold shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all">
                Create Your First Reminder
              </button>
            </div>
          )}

          {/* Settings Card */}
          <div className="mt-10 bg-[#F2F2F7] rounded-3xl p-6 border-2 border-[#E5E5EA]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1C1C1E] flex items-center justify-center">
                <FaCog className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#111111] mb-1">
                  Reminder Settings
                </h3>
                <p className="text-sm text-[#6B6B70] mb-3">
                  Customize when and how you receive reminders.
                </p>
                <button className="text-sm text-[#1C1C1E] font-medium hover:underline">
                  Configure settings →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
