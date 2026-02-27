// src/components/Dashboard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaBook, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle,
  FaGraduationCap,
  FaChartLine,
  FaUsers,
  FaFileAlt,
  FaVideo,
  FaBell,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEllipsisV,
  FaArrowRight,
  FaStar,
  FaRegClock
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { currentUser, getDisplayName } = useAuth();
  const [greeting, setGreeting] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // Mock data - replace with real data from your backend
  const courses = [
    { id: 1, code: "CS101", name: "Intro to Programming", progress: 75, color: "from-[#6C63FF] to-[#4EC5B1]" },
    { id: 2, code: "MATH202", name: "Calculus II", progress: 60, color: "from-[#FF6B6B] to-[#FF9F6B]" },
    { id: 3, code: "PHY150", name: "Physics", progress: 45, color: "from-[#4EC5B1] to-[#6C63FF]" },
    { id: 4, code: "ENG101", name: "English Literature", progress: 90, color: "from-[#FFB86B] to-[#FF7A7A]" }
  ];

  const assignments = [
    { id: 1, title: "Programming Assignment 3", course: "CS101", due: "2024-03-15", priority: "high", status: "pending" },
    { id: 2, title: "Calculus Problem Set", course: "MATH202", due: "2024-03-14", priority: "medium", status: "in-progress" },
    { id: 3, title: "Physics Lab Report", course: "PHY150", due: "2024-03-16", priority: "low", status: "not-started" },
    { id: 4, title: "Essay Draft", course: "ENG101", due: "2024-03-13", priority: "high", status: "pending" },
    { id: 5, title: "Quiz Preparation", course: "CS101", due: "2024-03-17", priority: "medium", status: "not-started" }
  ];

  const upcomingEvents = [
    { id: 1, title: "CS101 Lecture", time: "10:00 AM - 11:30 AM", location: "Room 201", type: "class" },
    { id: 2, title: "Study Group", time: "2:00 PM - 4:00 PM", location: "Library", type: "study" },
    { id: 3, title: "Office Hours", time: "4:30 PM - 5:30 PM", location: "Zoom", type: "meeting" }
  ];

  const recentActivity = [
    { id: 1, action: "Submitted assignment", course: "CS101", time: "2 hours ago" },
    { id: 2, action: "Joined study group", course: "MATH202", time: "5 hours ago" },
    { id: 3, action: "Downloaded lecture notes", course: "PHY150", time: "1 day ago" }
  ];

  const stats = [
    { label: "Current GPA", value: "3.8", icon: FaGraduationCap, change: "+0.2", color: "from-[#6C63FF] to-[#4EC5B1]" },
    { label: "Assignments", value: "5", icon: FaFileAlt, change: "3 due soon", color: "from-[#FF6B6B] to-[#FF9F6B]" },
    { label: "Study Hours", value: "12.5", icon: FaClock, change: "this week", color: "from-[#4EC5B1] to-[#6C63FF]" },
    { label: "Courses", value: "4", icon: FaBook, change: "active", color: "from-[#FFB86B] to-[#FF7A7A]" }
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-[#FF7A7A] bg-[#FF7A7A] bg-opacity-10';
      case 'medium': return 'text-[#FFB86B] bg-[#FFB86B] bg-opacity-10';
      case 'low': return 'text-[#4CAF50] bg-[#4CAF50] bg-opacity-10';
      default: return 'text-[#6B6B70] bg-[#E5E5EA]';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <FaExclamationTriangle className="text-[#FF7A7A]" />;
      case 'in-progress': return <FaRegClock className="text-[#FFB86B]" />;
      case 'completed': return <FaCheckCircle className="text-[#4CAF50]" />;
      default: return <FaClock className="text-[#6B6B70]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111111]">
              {greeting}, {getDisplayName()}! 👋
            </h1>
            <p className="text-[#6B6B70] mt-1">
              Here's what's happening with your courses today.
            </p>
          </div>
          
          {/* Search and Filter - Hidden on mobile, shown on desktop */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0] h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border-2 border-[#E5E5EA] rounded-2xl bg-white focus:border-[#6C63FF] focus:outline-none transition-colors w-64"
              />
            </div>
            <button className="p-2 border-2 border-[#E5E5EA] rounded-2xl bg-white hover:border-[#6C63FF] transition-colors">
              <FaFilter className="h-5 w-5 text-[#6B6B70]" />
            </button>
            <button className="p-2 border-2 border-[#E5E5EA] rounded-2xl bg-white hover:border-[#6C63FF] transition-colors relative">
              <FaBell className="h-5 w-5 text-[#6B6B70]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF7A7A] rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.15)] hover:translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-[#4CAF50]">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-[#111111]">{stat.value}</p>
                <p className="text-sm text-[#6B6B70]">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Courses and Assignments */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Courses Section */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#111111]">My Courses</h2>
                <Link to="/courses" className="text-sm text-[#6C63FF] font-semibold hover:underline flex items-center">
                  View all <FaArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
                    <div className="relative p-4 border-2 border-[#E5E5EA] rounded-2xl hover:border-[#6C63FF] transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-sm font-bold text-[#6C63FF]">{course.code}</span>
                          <h3 className="font-semibold text-[#111111]">{course.name}</h3>
                        </div>
                        <button className="text-[#9A9AA0] hover:text-[#111111]">
                          <FaEllipsisV className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#6B6B70]">Progress</span>
                          <span className="font-semibold text-[#111111]">{course.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#E5E5EA] rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${course.color}`} 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments Section */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#111111]">Upcoming Assignments</h2>
                <div className="flex items-center gap-2">
                  <select 
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="text-sm border-2 border-[#E5E5EA] rounded-xl px-3 py-1 bg-white focus:border-[#6C63FF] focus:outline-none"
                  >
                    <option value="all">All Courses</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.code}>{c.code}</option>
                    ))}
                  </select>
                  <button className="p-2 bg-[#6C63FF] text-white rounded-xl hover:bg-[#5A52E0] transition-colors">
                    <FaPlus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 border-2 border-[#E5E5EA] rounded-2xl hover:border-[#6C63FF] transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#F2F2F7] flex items-center justify-center">
                        {getStatusIcon(assignment.status)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#111111] text-sm sm:text-base">{assignment.title}</h3>
                        <p className="text-xs text-[#6B6B70]">{assignment.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-[#6B6B70] flex items-center">
                        <FaRegClock className="mr-1 h-3 w-3" />
                        {new Date(assignment.due).toLocaleDateString()}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityColor(assignment.priority)}`}>
                        {assignment.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Schedule and Activity */}
          <div className="space-y-6">
            
            {/* Today's Schedule */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#111111]">Today's Schedule</h2>
                <span className="text-xs text-[#6B6B70] bg-[#F2F2F7] px-2 py-1 rounded-full">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 border-2 border-[#E5E5EA] rounded-2xl hover:border-[#6C63FF] transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      event.type === 'class' ? 'bg-[#6C63FF] bg-opacity-10 text-[#6C63FF]' :
                      event.type === 'study' ? 'bg-[#4EC5B1] bg-opacity-10 text-[#4EC5B1]' :
                      'bg-[#FFB86B] bg-opacity-10 text-[#FFB86B]'
                    }`}>
                      {event.type === 'class' ? <FaBook /> :
                       event.type === 'study' ? <FaUsers /> :
                       <FaVideo />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#111111] text-sm">{event.title}</h3>
                      <p className="text-xs text-[#6B6B70] mt-1">{event.time}</p>
                      <p className="text-xs text-[#6C63FF] mt-1">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-center text-sm text-[#6C63FF] font-semibold hover:underline py-2">
                View full calendar
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
              <h2 className="text-lg font-bold text-[#111111] mb-4">Recent Activity</h2>
              
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-[#6C63FF]"></div>
                    <div>
                      <p className="text-sm text-[#111111]">{activity.action}</p>
                      <p className="text-xs text-[#6B6B70]">
                        {activity.course} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-center text-sm text-[#6C63FF] font-semibold hover:underline py-2">
                View all activity
              </button>
            </div>

            {/* Study Streak */}
            <div className="bg-gradient-to-r from-[#1C1C1E] to-[#6C63FF] rounded-3xl p-6 shadow-[0_10px_0_#000000,0_12px_24px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between text-white mb-4">
                <div>
                  <p className="text-sm opacity-80">Study Streak</p>
                  <p className="text-3xl font-bold">15 days</p>
                </div>
                <FaStar className="h-8 w-8 text-[#FFB86B]" />
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-2">
                <div className="w-3/4 h-full bg-[#FFB86B] rounded-full"></div>
              </div>
              <p className="text-xs text-white/80">5 more days to beat your record!</p>
            </div>
          </div>
        </div>

        {/* Mobile Quick Actions - Visible only on mobile */}
        <div className="fixed bottom-6 left-0 right-0 flex justify-center px-4 md:hidden">
          <div className="bg-[#1C1C1E] rounded-2xl p-2 shadow-[0_8px_0_#000000,0_12px_24px_rgba(0,0,0,0.3)] flex gap-2">
            <button className="px-4 py-2 bg-white text-[#111111] rounded-xl font-semibold text-sm">
              <FaSearch className="h-4 w-4" />
            </button>
            <button className="px-4 py-2 bg-white text-[#111111] rounded-xl font-semibold text-sm">
              <FaFilter className="h-4 w-4" />
            </button>
            <button className="px-4 py-2 bg-white text-[#111111] rounded-xl font-semibold text-sm relative">
              <FaBell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF7A7A] rounded-full text-white text-[8px] flex items-center justify-center">
                3
              </span>
            </button>
            <button className="px-4 py-2 bg-[#6C63FF] text-white rounded-xl font-semibold text-sm">
              <FaPlus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}