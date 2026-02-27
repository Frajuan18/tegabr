// src/components/HowItWorksSection.jsx
import { Link } from "react-router-dom";
import { FaUserPlus, FaRocket, FaCalendarCheck, FaChartLine } from "react-icons/fa";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: FaUserPlus,
      title: "Create Account",
      description: "Sign up in under 2 minutes with your university email."
    },
    {
      icon: FaRocket,
      title: "Set Up Dashboard",
      description: "Add your courses and let AI organize your schedule."
    },
    {
      icon: FaCalendarCheck,
      title: "Track Tasks",
      description: "Get smart reminders and never miss a deadline."
    },
    {
      icon: FaChartLine,
      title: "Monitor Progress",
      description: "Track GPA and get insights to improve."
    }
  ];

  return (
    <div className="bg-[#F2F2F7] font-outfit py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-2xl px-4 py-2 shadow-[0_4px_8px_rgba(0,0,0,0.05)] mb-4">
            <span className="text-sm font-medium text-[#6B6B70]">⚡ Simple Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mb-4">
            How it <span className="text-[#6C63FF]">works</span>
          </h2>
          <p className="text-lg text-[#6B6B70] max-w-2xl mx-auto">
            Get started in minutes with our simple 4-step process.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="bg-white rounded-3xl p-6 text-center shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_5px_0_#E5E5EA,0_15px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#4EC5B1] flex items-center justify-center shadow-lg">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-[#E5E5EA] mb-2">0{index + 1}</div>
                <h3 className="text-lg font-bold text-[#111111] mb-2">{step.title}</h3>
                <p className="text-sm text-[#6B6B70]">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 bg-[#1C1C1E] text-white rounded-2xl font-semibold shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}