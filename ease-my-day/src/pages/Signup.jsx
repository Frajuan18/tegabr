// src/components/Signup.jsx
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup attempt with:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] px-4 py-12 font-outfit">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#111111] mb-2 tracking-tight">Create account</h1>
          <p className="text-lg text-[#6B6B70]">Join us today and get started</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Card container with Duolingo shadow */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-2xl border-2 border-[#E5E5EA] bg-[#F2F2F7] px-5 py-3.5 text-base text-[#111111] placeholder-[#9A9AA0] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10 focus:outline-none transition-all duration-200"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-2xl border-2 border-[#E5E5EA] bg-[#F2F2F7] px-5 py-3.5 text-base text-[#111111] placeholder-[#9A9AA0] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10 focus:outline-none transition-all duration-200"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border-2 border-[#E5E5EA] bg-[#F2F2F7] px-5 py-3.5 text-base text-[#111111] placeholder-[#9A9AA0] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10 focus:outline-none transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>

            <div className="relative mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border-2 border-[#E5E5EA] bg-[#F2F2F7] px-5 py-3.5 pr-12 text-base text-[#111111] placeholder-[#9A9AA0] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10 focus:outline-none transition-all duration-200"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 bottom-3.5 text-[#9A9AA0] hover:text-[#1C1C1E] transition-colors duration-200"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-2xl border-2 border-[#E5E5EA] bg-[#F2F2F7] px-5 py-3.5 pr-12 text-base text-[#111111] placeholder-[#9A9AA0] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10 focus:outline-none transition-all duration-200"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-4 bottom-3.5 text-[#9A9AA0] hover:text-[#1C1C1E] transition-colors duration-200"
                tabIndex={-1}
              >
                {showConfirm ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Primary button with Duolingo stacked shadow */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl text-white bg-[#1C1C1E] font-semibold text-base shadow-[0_8px_0_#000000,0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#000000,0_12px_24px_rgba(0,0,0,0.3)] hover:translate-y-1 transition-all duration-200"
          >
            Create account
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-[#E5E5EA]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#F2F2F7] text-[#9A9AA0] font-medium">or sign up with</span>
            </div>
          </div>

          {/* Secondary button with Duolingo shadow */}
          <button
            type="button"
            className="w-full flex items-center justify-center py-3.5 px-4 rounded-2xl bg-white text-[#111111] font-semibold text-base shadow-[0_8px_0_#E5E5EA,0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] hover:translate-y-1 transition-all duration-200"
          >
            <FaGoogle className="mr-3 text-[#5B6CFF]" /> Continue with Google
          </button>

          <p className="mt-8 text-center text-[#6B6B70]">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#111111] hover:text-[#1C1C1E] transition-colors duration-200">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}