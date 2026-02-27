// src/components/ForgotPassword.jsx
import { useState } from "react";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      console.log("Password reset email sent to:", email);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] px-4 py-12 font-outfit">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link 
          to="/login" 
          className="inline-flex items-center text-[#6B6B70] hover:text-[#1C1C1E] mb-6 transition-colors duration-200"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" /> Back to login
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] mb-6">
            <FaEnvelope className="h-8 w-8 text-[#1C1C1E]" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#111111] mb-2 tracking-tight">Forgot password?</h1>
          <p className="text-lg text-[#6B6B70]">
            {!submitted 
              ? "No worries! Enter your email and we'll send you reset instructions." 
              : "Check your email for reset instructions"}
          </p>
        </div>

        {!submitted ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Card container with Duolingo shadow */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
              <div>
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
                  Sending...
                </div>
              ) : (
                "Send reset instructions"
              )}
            </button>
          </form>
        ) : (
          /* Success state with Duolingo card */
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F2F2F7] mb-4">
                <svg className="h-8 w-8 text-[#1C1C1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#111111] mb-2">Email sent!</h2>
              <p className="text-[#6B6B70] mb-4">
                We've sent reset instructions to <span className="font-semibold text-[#111111]">{email}</span>
              </p>
              <p className="text-sm text-[#9A9AA0]">
                Didn't receive it? Check your spam folder or{' '}
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="text-[#1C1C1E] font-semibold hover:underline"
                >
                  try again
                </button>
              </p>
            </div>

            <Link
              to="/login"
              className="block w-full text-center py-3.5 px-4 rounded-2xl bg-white text-[#111111] font-semibold text-base shadow-[0_8px_0_#E5E5EA,0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] hover:translate-y-1 transition-all duration-200"
            >
              Return to login
            </Link>
          </div>
        )}

        <p className="mt-8 text-center text-[#6B6B70] text-sm">
          Remember your password?{' '}
          <Link to="/login" className="font-semibold text-[#111111] hover:text-[#1C1C1E] transition-colors duration-200">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}