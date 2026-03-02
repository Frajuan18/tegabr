// src/pages/SmartRemindersPage.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { 
  FaBell, 
  FaClock, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaRegClock,
  FaCog,
  FaPlus,
  FaFilter,
  FaSearch,
  FaTrash,
  FaEdit,
  FaEye
} from "react-icons/fa";

export default function SmartRemindersPage() {
  const [filter, setFilter] = useState("all"); // all, upcoming, past
  const [searchTerm, setSearchTerm] = useState("");

  // Empty state - no reminders yet
  const hasReminders = false;

  return (
    <div className="min-h-screen bg-[#F2F2F7] font-outfit -ml-8 lg:ml-2">
      <Sidebar />
      
      <div className="lg:ml-64 ml-0 min-h-screen  p-4 sm:p-6 lg:p-8 sm:mt-3">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 mt-12 lg:mt-0 -ml-3 lg:ml-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111111]">Smart Reminders</h1>
              <p className="text-[#6B6B70] mt-1">Never miss a deadline with intelligent reminders</p>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1C1C1E] text-white rounded-xl shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all w-fit">
              <FaPlus className="h-4 w-4" />
              <span className="text-sm font-medium">New Reminder</span>
            </button>
          </div>

          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#6C63FF] bg-opacity-10 flex items-center justify-center">
                  <FaClock className="h-4 w-4 text-[#6C63FF]" />
                </div>
                <h3 className="font-semibold text-[#111111]">3 Days Before</h3>
              </div>
              <p className="text-xs text-[#6B6B70]">Get notified 3 days before deadlines to start early</p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFB86B] bg-opacity-10 flex items-center justify-center">
                  <FaExclamationTriangle className="h-4 w-4 text-[#FFB86B]" />
                </div>
                <h3 className="font-semibold text-[#111111]">Workload Alerts</h3>
              </div>
              <p className="text-xs text-[#6B6B70]">Alerts when you have too many tasks due</p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#FF7A7A] bg-opacity-10 flex items-center justify-center">
                  <FaRegClock className="h-4 w-4 text-[#FF7A7A]" />
                </div>
                <h3 className="font-semibold text-[#111111]">Collision Detection</h3>
              </div>
              <p className="text-xs text-[#6B6B70]">Know when multiple deadlines overlap</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0] h-4 w-4" />
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

          {/* Reminders List - Empty State */}
          {!hasReminders ? (
            <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
              <div className="text-center max-w-md mx-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#F2F2F7] flex items-center justify-center mx-auto mb-6">
                  <FaBell className="h-8 w-8 sm:h-10 sm:w-10 text-[#9A9AA0]" />
                </div>
                <h3 className="text-xl font-semibold text-[#111111] mb-2">No reminders yet</h3>
                <p className="text-[#6B6B70] mb-6">
                  Reminders will appear here when you have upcoming deadlines. 
                  They'll notify you 3 days before, when workload is heavy, 
                  and when deadlines collide.
                </p>
                <button className="px-6 py-3 bg-[#1C1C1E] text-white rounded-2xl font-semibold shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all">
                  Create Your First Reminder
                </button>
              </div>
            </div>
          ) : (
            /* Reminders List - When data exists */
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
              <div className="space-y-3">
                {/* Example of what a reminder would look like - commented out since no data */}
                {/* 
                <div className="flex items-center gap-4 p-4 border-2 border-[#E5E5EA] rounded-2xl hover:border-[#1C1C1E] transition-colors group">
                  <div className="w-1 h-12 rounded-full bg-[#6C63FF]"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-[#6B6B70]">CS101</span>
                      <span className="text-xs px-2 py-0.5 bg-[#FFB86B] bg-opacity-10 text-[#FFB86B] rounded-full">
                        3 days before
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#111111]">Programming Assignment 3 due in 3 days</h3>
                    <p className="text-xs text-[#6B6B70] mt-1">Start early to avoid last-minute rush</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-[#F2F2F7] rounded-lg transition-colors">
                      <FaEye className="h-4 w-4 text-[#6B6B70]" />
                    </button>
                    <button className="p-2 hover:bg-[#F2F2F7] rounded-lg transition-colors">
                      <FaEdit className="h-4 w-4 text-[#6B6B70]" />
                    </button>
                    <button className="p-2 hover:bg-[#F2F2F7] rounded-lg transition-colors">
                      <FaTrash className="h-4 w-4 text-[#FF7A7A]" />
                    </button>
                  </div>
                </div>
                */}
              </div>
            </div>
          )}

          {/* Settings Card */}
          <div className="mt-8 bg-[#F2F2F7] rounded-3xl p-6 border-2 border-[#E5E5EA]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1C1C1E] flex items-center justify-center flex-shrink-0">
                <FaCog className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#111111] mb-1">Reminder Settings</h3>
                <p className="text-sm text-[#6B6B70] mb-3">
                  Customize when and how you receive reminders
                </p>
                <button className="text-sm text-[#1C1C1E] font-medium hover:underline">
                  Configure settings →
                </button>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 text-sm text-[#6B6B70] bg-white rounded-2xl p-4 border border-[#E5E5EA]">
            <p className="flex items-start gap-2">
              <FaExclamationTriangle className="h-4 w-4 text-[#FFB86B] flex-shrink-0 mt-0.5" />
              <span>
                <span className="font-medium text-[#111111]">How it works:</span> Smart reminders are automatically created based on your assignment deadlines. You'll get notifications 3 days before, when workload is heavy, and when deadlines overlap.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}