// src/pages/TimelinePage.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { 
  FaCalendarDay, 
  FaCalendarWeek, 
  FaRegCalendarAlt,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

export default function TimelinePage() {
  const [view, setView] = useState("daily");
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    switch(view) {
      case "daily":
        newDate.setDate(newDate.getDate() - 1);
        break;
      case "weekly":
        newDate.setDate(newDate.getDate() - 7);
        break;
      case "monthly":
        newDate.setMonth(newDate.getMonth() - 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    switch(view) {
      case "daily":
        newDate.setDate(newDate.getDate() + 1);
        break;
      case "weekly":
        newDate.setDate(newDate.getDate() + 7);
        break;
      case "monthly":
        newDate.setMonth(newDate.getMonth() + 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getDateHeader = () => {
    switch(view) {
      case "daily":
        return currentDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        });
      case "weekly":
        const start = new Date(currentDate);
        const end = new Date(currentDate);
        const day = currentDate.getDay();
        start.setDate(currentDate.getDate() - day);
        end.setDate(start.getDate() + 6);
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      case "monthly":
        return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] font-outfit -ml-10 lg:ml-2">
      <Sidebar />
      
      <div className="lg:ml-64 ml-0 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl m-auto">
          
          {/* Header */}
          <div className="mb-6 mt-14 lg:mt-0  lg:ml-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111111]">Timeline Views</h1>
            <p className="text-[#6B6B70] mt-1">See all your deadlines in one place</p>
          </div>

          {/* View Toggle */}
          <div className="flex flex-wrap items-center gap-2 bg-white rounded-2xl p-1 mb-6 shadow-[0_4px_8px_rgba(0,0,0,0.05)] w-fit">
            <button
              onClick={() => setView("daily")}
              className={`relative flex items-center gap-2 px-3 py-2 sm:px-4 rounded-xl transition-all ${
                view === "daily" 
                  ? 'bg-[#1C1C1E] text-white shadow-[0_4px_0_#000000] -translate-y-0.5' 
                  : 'text-[#6B6B70] hover:bg-[#F2F2F7]'
              }`}
            >
              <FaCalendarDay className="h-4 w-4" />
              <span className="text-sm font-medium whitespace-nowrap">Daily</span>
            </button>
            <button
              onClick={() => setView("weekly")}
              className={`relative flex items-center gap-2 px-3 py-2 sm:px-4 rounded-xl transition-all ${
                view === "weekly" 
                  ? 'bg-[#1C1C1E] text-white shadow-[0_4px_0_#000000] -translate-y-0.5' 
                  : 'text-[#6B6B70] hover:bg-[#F2F2F7]'
              }`}
            >
              <FaCalendarWeek className="h-4 w-4" />
              <span className="text-sm font-medium whitespace-nowrap">Weekly</span>
            </button>
            <button
              onClick={() => setView("monthly")}
              className={`relative flex items-center gap-2 px-3 py-2 sm:px-4 rounded-xl transition-all ${
                view === "monthly" 
                  ? 'bg-[#1C1C1E] text-white shadow-[0_4px_0_#000000] -translate-y-0.5' 
                  : 'text-[#6B6B70] hover:bg-[#F2F2F7]'
              }`}
            >
              <FaRegCalendarAlt className="h-4 w-4" />
              <span className="text-sm font-medium whitespace-nowrap">Monthly</span>
            </button>
          </div>

          {/* Date Navigation */}
          <div className="bg-white rounded-3xl p-4 mb-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                className="p-2 hover:bg-[#F2F2F7] rounded-xl transition-colors"
              >
                <FaChevronLeft className="h-5 w-5 text-[#6B6B70]" />
              </button>

              <div className="flex-1 min-w-0 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-4 px-2">
                <h2 className="text-base sm:text-lg font-semibold text-[#111111] truncate text-center sm:text-left min-w-0">{getDateHeader()}</h2>
                <button
                  onClick={handleToday}
                  className="px-3 py-1 text-sm bg-[#F2F2F7] text-[#6B6B70] rounded-xl hover:bg-[#E5E5EA] transition-colors"
                >
                  Today
                </button>
              </div>

              <button
                onClick={handleNext}
                className="p-2 hover:bg-[#F2F2F7] rounded-xl transition-colors"
              >
                <FaChevronRight className="h-5 w-5 text-[#6B6B70]" />
              </button>
            </div>
          </div>

          {/* Timeline Content - No sample data */}
          <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
            <div className="text-center">
              <FaCalendarAlt className="h-12 w-12 sm:h-16 sm:w-16 text-[#E5E5EA] mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-[#111111] mb-2">No deadlines yet</h3>
              <p className="text-[#6B6B70]">
                Your assignments and tasks will appear here once you add them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}