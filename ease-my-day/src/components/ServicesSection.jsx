// src/components/ServicesSection.jsx
import { Link } from "react-router-dom";
import { 
  FaCalendarCheck, 
  FaUsers, 
  FaBrain, 
  FaFileAlt, 
  FaVideo, 
  FaRobot,
  FaChartBar,
  FaBell,
  FaCloudUploadAlt,
  FaMobileAlt,
  FaStar,
  FaHeadset,
  FaArrowRight,
  FaCheckCircle,
  FaGoogle,
  FaBook,
  FaChalkboardTeacher,
  FaVideo as FaVideoIcon,
  FaSlack,
  FaDropbox,
  FaCode,
  FaApple,
  FaAndroid,
  FaPlug,
  FaQuestionCircle
} from "react-icons/fa";

export default function ServicesSection() {
  const services = [
    {
      icon: FaCalendarCheck,
      title: "Smart Assignment Manager",
      description: "AI-powered deadline tracking that automatically organizes your assignments, sends reminders, and helps you prioritize tasks based on due dates and difficulty.",
      features: [
        "Auto-detect deadlines from syllabi",
        "Priority-based task sorting",
        "Custom reminder notifications",
        "Calendar integration (Google, Apple)"
      ],
      color: "from-[#6C63FF] to-[#4EC5B1]",
      popular: true
    },
    {
      icon: FaUsers,
      title: "Virtual Study Rooms",
      description: "Create or join study rooms with classmates for real-time collaboration, shared notes, and group video calls.",
      features: [
        "HD video conferencing",
        "Shared whiteboard",
        "Real-time document editing",
        "Screen sharing"
      ],
      color: "from-[#FF6B6B] to-[#FF9F6B]",
      popular: false
    },
    {
      icon: FaBrain,
      title: "AI Study Assistant",
      description: "Your personal AI tutor that helps you understand complex topics, generates practice questions, and provides instant explanations.",
      features: [
        "24/7 AI tutoring support",
        "Practice quiz generation",
        "Concept explanations",
        "Study material summaries"
      ],
      color: "from-[#4EC5B1] to-[#6C63FF]",
      popular: true
    },
    {
      icon: FaFileAlt,
      title: "Smart Note-Taking",
      description: "Powerful note-taking with rich formatting, cloud sync, and intelligent organization that automatically categorizes your notes by course.",
      features: [
        "Rich text & markdown support",
        "Auto-categorization",
        "Search across all notes",
        "Export to PDF/Word"
      ],
      color: "from-[#FFB86B] to-[#FF7A7A]",
      popular: false
    },
    {
      icon: FaVideo,
      title: "Lecture Recording & Transcription",
      description: "Never miss a detail with automatic lecture recording, real-time transcription, and smart summaries.",
      features: [
        "Auto-record lectures",
        "Real-time transcription",
        "Key point extraction",
        "Searchable transcripts"
      ],
      color: "from-[#5B6CFF] to-[#B8B5FF]",
      popular: false
    },
    {
      icon: FaRobot,
      title: "Plagiarism Checker",
      description: "Ensure your work is original with our advanced plagiarism detection that scans billions of sources.",
      features: [
        "Academic database scanning",
        "Citation suggestions",
        "Similarity reports",
        "Grammar checking"
      ],
      color: "from-[#FF9F6B] to-[#FF6B6B]",
      popular: true
    },
    {
      icon: FaChartBar,
      title: "GPA Calculator & Tracker",
      description: "Track your academic progress with an intuitive GPA calculator that shows what-if scenarios.",
      features: [
        "Real-time GPA tracking",
        "Grade projections",
        "What-if analysis",
        "Transcript generation"
      ],
      color: "from-[#4CAF50] to-[#4EC5B1]",
      popular: false
    },
    {
      icon: FaBell,
      title: "Smart Notification System",
      description: "Never miss an important update with intelligent notifications that learn your preferences.",
      features: [
        "Priority-based alerts",
        "Custom notification rules",
        "Email & push notifications",
        "Quiet hours mode"
      ],
      color: "from-[#B8B5FF] to-[#5B6CFF]",
      popular: false
    }
  ];

  const plans = [
    {
      name: "Student Basic",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Up to 5 courses",
        "Basic deadline tracking",
        "Simple note-taking",
        "Email support"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Student Pro",
      price: "$9.99",
      period: "per month",
      description: "Most popular for serious students",
      features: [
        "Unlimited courses",
        "AI study assistant",
        "Lecture recording",
        "Study rooms (up to 10 people)",
        "Priority support",
        "Plagiarism checker"
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Group Plan",
      price: "$29.99",
      period: "per month",
      description: "Perfect for study groups",
      features: [
        "Everything in Pro",
        "Up to 20 members",
        "Group video calls",
        "Shared workspace",
        "Admin controls",
        "Analytics dashboard"
      ],
      cta: "Start Group Trial",
      popular: false
    }
  ];

  const integrations = [
    { name: "Google Calendar", icon: FaGoogle },
    { name: "Canvas", icon: FaBook },
    { name: "Blackboard", icon: FaChalkboardTeacher },
    { name: "Zoom", icon: FaVideoIcon },
    { name: "Slack", icon: FaSlack },
    { name: "Dropbox", icon: FaDropbox }
  ];

  const apiFeatures = [
    { icon: FaCode, title: "REST API Access", description: "Build custom integrations" },
    { icon: FaApple, title: "iOS SDK", description: "Native iOS support" },
    { icon: FaAndroid, title: "Android SDK", description: "Native Android support" },
    { icon: FaPlug, title: "Webhooks", description: "Real-time notifications" }
  ];

  return (
    <div className="bg-[#F2F2F7] font-outfit py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center bg-white rounded-2xl px-4 py-2 shadow-[0_4px_8px_rgba(0,0,0,0.05)] mb-4">
            <span className="text-sm font-medium text-[#6B6B70]">⚡ Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] mb-4">
            Everything you need to <span className="bg-gradient-to-r from-[#1C1C1E] to-[#6C63FF] bg-clip-text text-transparent">excel</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#6B6B70] max-w-3xl mx-auto">
            Comprehensive tools and services designed specifically for university students.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_5px_0_#E5E5EA,0_15px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300"
              >
                {service.popular && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-[#FFB86B] to-[#FF7A7A] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <FaBell className="h-3 w-3 mr-1" />
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  {/* Icon with gradient */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#111111] mb-2">{service.title}</h3>
                    <p className="text-[#6B6B70] mb-4">{service.description}</p>
                    
                    {/* Feature list */}
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-[#6B6B70]">
                          <FaCheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Learn more link */}
                    <Link 
                      to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center text-[#1C1C1E] font-semibold group-hover:translate-x-2 transition-transform"
                    >
                      Learn more <FaArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Section */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-3">
              Simple, transparent pricing
            </h3>
            <p className="text-lg text-[#6B6B70]">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] ${
                  plan.popular ? 'scale-105 md:-translate-y-2' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#1C1C1E] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap flex items-center">
                    <FaStar className="h-3 w-3 mr-1 text-[#FFB86B]" />
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-[#111111] mb-2">{plan.name}</h4>
                  <div className="mb-2">
                    <span className="text-3xl font-extrabold text-[#111111]">{plan.price}</span>
                    {plan.price !== "$0" && (
                      <span className="text-[#6B6B70]">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-[#6B6B70]">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-[#6B6B70]">
                      <FaCheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`block w-full text-center py-3 px-4 rounded-2xl font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-[#1C1C1E] text-white shadow-[0_4px_0_#000000] hover:translate-y-1'
                      : 'bg-white text-[#111111] border-2 border-[#E5E5EA] hover:border-[#1C1C1E]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_15px_0_#E5E5EA,0_20px_40px_rgba(0,0,0,0.1)]">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-4">
                Works with your favorite tools
              </h3>
              <p className="text-lg text-[#6B6B70] mb-6">
                Tegbar seamlessly integrates with the platforms you already use, making the transition smooth and effortless.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {integrations.map((tool, idx) => {
                  const Icon = tool.icon;
                  return (
                    <div key={idx} className="text-center">
                      <div className="w-12 h-12 bg-[#F2F2F7] rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <Icon className="h-6 w-6 text-[#1C1C1E]" />
                      </div>
                      <span className="text-xs text-[#6B6B70]">{tool.name}</span>
                    </div>
                  );
                })}
              </div>
              
              <Link
                to="/integrations"
                className="inline-flex items-center text-[#1C1C1E] font-semibold hover:underline"
              >
                View all integrations <FaArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </div>
            
            <div className="bg-[#F2F2F7] rounded-3xl p-6">
              <h4 className="text-lg font-bold text-[#111111] mb-4">Developer Features</h4>
              <div className="space-y-4">
                {apiFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        <Icon className="h-6 w-6 text-[#1C1C1E]" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-[#111111]">{feature.title}</h5>
                        <p className="text-sm text-[#6B6B70]">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}