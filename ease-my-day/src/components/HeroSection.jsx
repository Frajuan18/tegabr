// src/components/HeroSection.jsx
import { Link } from "react-router-dom";
import { FaArrowRight, FaGraduationCap, FaClock, FaCheckCircle, FaBookOpen } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function HeroSection() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-[#F2F2F7] font-outfit flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle academic-themed background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1C1C1E] opacity-5 rounded-full blur-3xl hidden md:block"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#6C63FF] opacity-5 rounded-full blur-3xl hidden md:block"></div>
        {/* Floating graduation cap icons - very subtle */}
        <div className="absolute top-20 left-10 opacity-5 text-6xl hidden lg:block">📚</div>
        <div className="absolute bottom-20 right-10 opacity-5 text-6xl hidden lg:block">🎓</div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Left Content - Takes full width on mobile, half on desktop */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            
           
            {/* Main Heading - Student-focused messaging */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#111111] leading-tight mb-4 sm:mb-6">
              <span className="block">Ace Your</span>
              <span className="block bg-gradient-to-r from-[#1C1C1E] to-[#6C63FF] bg-clip-text text-transparent">
                Academic Journey
              </span>
            </h1>

            {/* Description - Student pain points and solution */}
            <p className="text-base sm:text-lg md:text-xl text-[#6B6B70] mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0">
              Stop juggling multiple apps. <span className="font-semibold text-[#1C1C1E]">Tegbar</span> helps you 
              manage assignments, track deadlines, collaborate on group projects, 
              and boost your GPA—all in one place.
            </p>

            {/* Student-focused stats - visible on all screens */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8">
              <div className="flex items-center bg-white rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm">
                <FaCheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#4CAF50] mr-1.5 sm:mr-2" />
                <span className="text-xs sm:text-sm text-[#6B6B70]"><span className="font-bold text-[#111111]">10K+</span> students</span>
              </div>
              <div className="flex items-center bg-white rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm">
                <FaClock className="h-3 w-3 sm:h-4 sm:w-4 text-[#FFB86B] mr-1.5 sm:mr-2" />
                <span className="text-xs sm:text-sm text-[#6B6B70]"><span className="font-bold text-[#111111]">2hrs</span> saved daily</span>
              </div>
              <div className="flex items-center bg-white rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm">
                <FaBookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-[#6C63FF] mr-1.5 sm:mr-2" />
                <span className="text-xs sm:text-sm text-[#6B6B70]"><span className="font-bold text-[#111111]">500+</span> universities</span>
              </div>
            </div>

            {/* CTA Buttons - Stack on mobile, side by side on larger screens */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
              {!currentUser ? (
                <>
                  <Link
                    to="/register"
                    className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-white bg-[#1C1C1E] font-semibold text-base sm:text-lg shadow-[0_8px_0_#000000,0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#000000,0_12px_24px_rgba(0,0,0,0.3)] hover:translate-y-1 transition-all duration-200 w-full sm:w-auto"
                  >
                    Start Studying Free
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white text-[#111111] font-semibold text-base sm:text-lg shadow-[0_8px_0_#E5E5EA,0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] hover:translate-y-1 transition-all duration-200 w-full sm:w-auto"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-white bg-[#1C1C1E] font-semibold text-base sm:text-lg shadow-[0_8px_0_#000000,0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#000000,0_12px_24px_rgba(0,0,0,0.3)] hover:translate-y-1 transition-all duration-200 w-full sm:w-auto"
                >
                  Go to Dashboard
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            {/* Trust badges - visible on all screens */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
              {/* University logos placeholders */}
              <div className="flex items-center space-x-4">
                <span className="text-xs sm:text-sm text-[#9A9AA0]">Trusted by students at</span>
                <div className="flex space-x-2">
                  <span className="text-xs sm:text-sm font-bold text-[#111111]">Harvard</span>
                  <span className="text-xs sm:text-sm font-bold text-[#111111]">Stanford</span>
                  <span className="text-xs sm:text-sm font-bold text-[#111111]">MIT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Student Dashboard Preview */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="bg-white rounded-3xl p-4 md:p-6 shadow-[0_20px_0_#E5E5EA,0_25px_50px_rgba(0,0,0,0.15)] transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-[#F2F2F7] rounded-2xl p-3 md:p-4">
                {/* Student Dashboard Preview */}
                <div className="space-y-4">
                  {/* Header with date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FF7A7A]"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FFB86B]"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#4CAF50]"></div>
                    </div>
                    <span className="text-[10px] md:text-xs font-medium text-[#6B6B70]">Spring Semester • 2024</span>
                  </div>
                  
                  {/* Today's schedule */}
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <h3 className="text-xs font-bold text-[#111111] mb-2">Today's Schedule</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-1 h-8 bg-[#6C63FF] rounded-full mr-2"></div>
                          <div>
                            <p className="text-xs font-medium text-[#111111]">CS101 - Lecture</p>
                            <p className="text-[10px] text-[#6B6B70]">10:00 AM - 11:30 AM</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-[#FF7A7A]">In 2h</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-1 h-8 bg-[#FFB86B] rounded-full mr-2"></div>
                          <div>
                            <p className="text-xs font-medium text-[#111111]">Study Group</p>
                            <p className="text-[10px] text-[#6B6B70]">2:00 PM - 4:00 PM</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-[#4CAF50]">Planned</span>
                      </div>
                    </div>
                  </div>

                  {/* Assignment deadlines */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-[#111111]">Upcoming Deadlines</h3>
                    {[
                      { course: "MATH202", task: "Problem Set 5", days: 2, urgent: true },
                      { course: "ENGL101", task: "Essay Draft", days: 4, urgent: false },
                      { course: "PHYS150", task: "Lab Report", days: 5, urgent: false }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-white rounded-lg p-2 shadow-sm">
                        <div className="flex items-center">
                          <div className={`w-1.5 h-1.5 rounded-full ${item.urgent ? 'bg-[#FF7A7A]' : 'bg-[#9A9AA0]'} mr-2`}></div>
                          <div>
                            <p className="text-xs font-medium text-[#111111]">{item.course}</p>
                            <p className="text-[10px] text-[#6B6B70]">{item.task}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-semibold ${item.urgent ? 'text-[#FF7A7A]' : 'text-[#6B6B70]'}`}>
                          {item.days}d left
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Productivity stats */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-lg p-2 text-center">
                      <p className="text-lg font-bold text-[#111111]">85%</p>
                      <p className="text-[10px] text-[#6B6B70]">Avg. Grade</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
                      <p className="text-lg font-bold text-[#111111]">12h</p>
                      <p className="text-[10px] text-[#6B6B70]">Study Time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only quick stats - visible only on mobile */}
      <div className="absolute bottom-8 left-0 right-0 flex sm:hidden items-center justify-center space-x-4 px-4">
        <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
          <FaGraduationCap className="h-3 w-3 text-[#6C63FF] mr-1" />
          <span className="text-xs font-medium text-[#111111]">10K+ students</span>
        </div>
        <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
          <span className="text-xs font-medium text-[#111111]">⭐ 4.9</span>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block animate-bounce">
        <div className="w-5 h-8 rounded-full border-2 border-[#6B6B70] flex justify-center">
          <div className="w-1 h-2 bg-[#1C1C1E] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}