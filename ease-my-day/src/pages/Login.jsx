// src/components/Login.jsx
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithGoogle, error, setError } = useAuth();
  const navigate = useNavigate();

  const toggleShow = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await login(email, password);
      navigate("/dashboard"); // or wherever you want to redirect
    } catch (error) {
      // Error is already set in context
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] px-4 py-12 font-outfit">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#111111] mb-2 tracking-tight">Welcome back</h1>
          <p className="text-lg text-[#6B6B70]">Please enter your details to sign in</p>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-2xl bg-[#FF7A7A] bg-opacity-10 border-2 border-[#FF7A7A] text-[#111111] text-sm">
            {error}
          </div>
        )}

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
                disabled={isLoading}
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
                disabled={isLoading}
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
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl text-white bg-[#1C1C1E] font-semibold text-base shadow-[0_8px_0_#000000,0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#000000,0_12px_24px_rgba(0,0,0,0.3)] hover:translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[0_8px_0_#000000,0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in...
              </div>
            ) : (
              "Sign in"
            )}
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
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3.5 px-4 rounded-2xl bg-white text-[#111111] font-semibold text-base shadow-[0_8px_0_#E5E5EA,0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] hover:translate-y-1 disabled:opacity-50 transition-all duration-200"
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