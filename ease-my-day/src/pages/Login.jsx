// src/components/Login.jsx
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleShow = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt with:", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] px-4 py-12 font-outfit">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#111111] mb-2 tracking-tight">Welcome back</h1>
          <p className="text-lg text-[#6B6B70]">Please enter your details to sign in</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Card container with Duolingo shadow */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border-2 border-[#E5E5EA] bg-[#F2F2F7] px-5 py-3.5 text-base text-[#111111] placeholder-[#9A9AA0] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10 focus:outline-none transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>

            <div className="relative mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border-2 border-[#E5E5EA] bg-[#F2F2F7] px-5 py-3.5 pr-12 text-base text-[#111111] placeholder-[#9A9AA0] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10 focus:outline-none transition-all duration-200"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={toggleShow}
                className="absolute right-4 bottom-3.5 text-[#9A9AA0] hover:text-[#1C1C1E] transition-colors duration-200"
                tabIndex={-1}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-end mt-2">
              <Link 
                to="/forgot-password" 
                className="text-sm font-medium text-[#6B6B70] hover:text-[#1C1C1E] transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Primary button with Duolingo stacked shadow */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl text-white bg-[#1C1C1E] font-semibold text-base shadow-[0_8px_0_#000000,0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#000000,0_12px_24px_rgba(0,0,0,0.3)] hover:translate-y-1 transition-all duration-200"
          >
            Sign in
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-[#E5E5EA]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#F2F2F7] text-[#9A9AA0] font-medium">or continue with</span>
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
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-[#111111] hover:text-[#1C1C1E] transition-colors duration-200">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}