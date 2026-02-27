// src/components/ContactUsSection.jsx
import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

export default function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      content: "support@tegbar.com",
      sub: "We reply within 24 hours",
      color: "from-[#6C63FF] to-[#4EC5B1]"
    },
    {
      icon: FaPhone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      sub: "Mon-Fri, 9am-6pm EST",
      color: "from-[#FF6B6B] to-[#FF9F6B]"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      content: "123 University Ave",
      sub: "Stanford, CA 94305",
      color: "from-[#4EC5B1] to-[#6C63FF]"
    }
  ];

  return (
    <div className="bg-[#F2F2F7] font-outfit py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-2xl px-4 py-2 shadow-[0_4px_8px_rgba(0,0,0,0.05)] mb-4">
            <span className="text-sm font-medium text-[#6B6B70]">📬 Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mb-4">
            Contact <span className="text-[#6C63FF]">Us</span>
          </h2>
          <p className="text-lg text-[#6B6B70] max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our student support team.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Contact Info Cards */}
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="bg-white rounded-3xl p-6 text-center shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_5px_0_#E5E5EA,0_15px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#111111] mb-2">{info.title}</h3>
                <p className="text-[#6C63FF] font-semibold mb-1">{info.content}</p>
                <p className="text-sm text-[#6B6B70]">{info.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-8 shadow-[0_15px_0_#E5E5EA,0_20px_40px_rgba(0,0,0,0.1)]">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left side - Form */}
            <div>
              <h3 className="text-xl font-bold text-[#111111] mb-6">Send us a message</h3>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-[#4CAF50] bg-opacity-10 border-2 border-[#4CAF50] rounded-2xl flex items-center">
                  <FaCheckCircle className="text-[#4CAF50] mr-3 h-5 w-5" />
                  <p className="text-[#111111]">Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-[#6B6B70] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#E5E5EA] rounded-2xl bg-[#F2F2F7] focus:border-[#6C63FF] focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-[#6B6B70] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#E5E5EA] rounded-2xl bg-[#F2F2F7] focus:border-[#6C63FF] focus:outline-none transition-colors"
                    placeholder="john@university.edu"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-[#6B6B70] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#E5E5EA] rounded-2xl bg-[#F2F2F7] focus:border-[#6C63FF] focus:outline-none transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-[#6B6B70] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-[#E5E5EA] rounded-2xl bg-[#F2F2F7] focus:border-[#6C63FF] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about your question..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-6 py-3 bg-[#1C1C1E] text-white rounded-2xl font-semibold shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right side - Map/Illustration */}
            <div className="bg-[#F2F2F7] rounded-3xl p-6 flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#6C63FF] to-[#4EC5B1] rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                <FaEnvelope className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-lg font-bold text-[#111111] mb-2">Student Support</h4>
              <p className="text-center text-[#6B6B70] mb-4">
                Our team is available 24/7 to assist you with any questions about Tegbar.
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm">⚡ Fast response</span>
                <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm">🎓 Student-focused</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}