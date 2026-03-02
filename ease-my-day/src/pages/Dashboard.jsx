import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F8F8FA] pl-12 lg:pl-0">
      {/* Sidebar - Fixed width of 72 (18rem / 288px) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className={`
          flex-1
          /* Mobile: Padding for the top bar (h-16 + a little extra) */
          pt-20 px-4 pb-8
          /* Desktop: Left padding MUST match sidebar width to prevent overlap */
          lg:pl-[240px] lg:pt-8 lg:pr-8
          transition-all duration-300
        `}>
          {/* Max-width container keeps content from stretching too far on huge monitors */}
          <div className="max-w-[1400px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}