// src/components/FeaturesSection.jsx
import { Link } from "react-router-dom";
import { 
  FaRocket, 
  FaShieldAlt, 
  FaArrowRight, 
  FaChartLine, 
  FaStar, 
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaBook,
  FaCalendarAlt,
  FaPencilAlt,
  FaComments
} from "react-icons/fa";

export default function FeaturesSection() {
  const features = [
    {
      icon: FaClock,
      title: "Smart Deadline Tracking",
      description: "Never miss an assignment with intelligent deadline reminders and priority-based notifications.",
      color: "from-[#FF6B6B] to-[#FF9F6B]"
    },
    {
      icon: FaBook,
      title: "Course Organization",
      description: "Keep all your courses, materials, and notes in one beautifully organized space.",
      color: "from-[#4EC5B1] to-[#6C63FF]"
    },
    {
      icon: FaUsers,
      title: "Group Study Rooms",
      description: "Collaborate with classmates in virtual study rooms with shared notes and real-time chat.",
      color: "from-[#5B6CFF] to-[#B8B5FF]"
    },
    {
      icon: FaCalendarAlt,
      title: "Smart Schedule",
      description: "AI-powered schedule optimization that helps you plan your study sessions effectively.",
      color: "from-[#FFB86B] to-[#FF7A7A]"
    },
    {
      icon: FaPencilAlt,
      title: "Note Taking",
      description: "Powerful note-taking tools with rich formatting, cloud sync, and easy organization.",
      color: "from-[#6C63FF] to-[#4EC5B1]"
    },
    {
      icon: FaChartLine,
      title: "Progress Tracking",
      description: "Visual progress reports and GPA calculators to help you stay on top of your grades.",
      color: "from-[#FF9F6B] to-[#FF6B6B]"
    },
    {
      icon: FaComments,
      title: "Peer Support",
      description: "Connect with classmates, form study groups, and get help when you need it.",
      color: "from-[#B8B5FF] to-[#5B6CFF]"
    },
    {
      icon: FaShieldAlt,
      title: "Secure & Private",
      description: "Your academic data is encrypted and protected with enterprise-grade security.",
      color: "from-[#4CAF50] to-[#4EC5B1]"
    }
  ];

  const stats = [
    { value: "98%", label: "Student Satisfaction", icon: FaStar },
    { value: "50K+", label: "Assignments Completed", icon: FaCheckCircle },
    { value: "24/7", label: "Study Groups Active", icon: FaUsers },
    { value: "4.9★", label: "App Store Rating", icon: FaStar }
  ];

  return (
    <div className="bg-[#F2F2F7] font-outfit py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center bg-white rounded-2xl px-4 py-2 shadow-[0_4px_8px_rgba(0,0,0,0.05)] mb-4">
            <FaRocket className="h-4 w-4 text-[#6C63FF] mr-2" />
            <span className="text-sm font-medium text-[#6B6B70]">Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] mb-4">
            Everything you need to <span className="bg-gradient-to-r from-[#1C1C1E] to-[#6C63FF] bg-clip-text text-transparent">succeed</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#6B6B70] max-w-3xl mx-auto">
            Tegbar combines all the tools you need to excel in your studies into one seamless platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.15)] hover:translate-y-1 transition-all duration-300"
              >
                <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-[#6C63FF] mx-auto mb-2 sm:mb-3" />
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111111]">{stat.value}</p>
                <p className="text-xs sm:text-sm text-[#6B6B70]">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_5px_0_#E5E5EA,0_15px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon with gradient background */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-[#111111] mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-sm sm:text-base text-[#6B6B70] mb-4">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 rounded-full bg-[#1C1C1E] flex items-center justify-center">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        
      </div>
    </div>
  );
}