// src/components/ForgotPassword.jsx
import { useState } from "react";
import { FaArrowLeft, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: request form, 2: email sent confirmation
  const [isLoading, setIsLoading] = useState(false);
  
  const { resetPassword, error, setError } = useAuth();

  // Handle request password reset
  const handleRequestReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Validate email/phone input
      if (!email.trim()) {
        throw new Error("Please enter your email or phone number");
      }

      await resetPassword(email);
      setStep(2); // Move to email sent confirmation
    } catch (error) {
      console.error("Reset request failed:", error);
      // Error is already set in context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] px-4 py-12 font-outfit">
      <div className="w-full max-w-md">
        {/* Back button - only show on first step */}
        {step === 1 && (
          <Link 
            to="/login" 
            className="inline-flex items-center text-[#6B6B70] hover:text-[#1C1C1E] mb-6 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2 h-4 w-4" /> Back to login
          </Link>
        )}

        {/* Step 1: Request Password Reset Form */}
        {step === 1 && (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] mb-6">
                <FaEnvelope className="h-8 w-8 text-[#1C1C1E]" />
              </div>
              <h1 className="text-3xl font-extrabold text-[#111111] mb-2 tracking-tight">Forgot password?</h1>
              <p className="text-lg text-[#6B6B70]">
                Enter your email address and we'll send you a password reset link.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-4 rounded-2xl bg-[#FF7A7A] bg-opacity-10 border-2 border-[#FF7A7A] text-[#111111] text-sm">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleRequestReset}>
              {/* Card container with Duolingo shadow */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0]">
                      <FaEnvelope className="h-4 w-4" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border-2 border-[#E5E5EA] bg-[#F2F2F7] pl-10 pr-5 py-3.5 text-base text-[#111111] placeholder-[#9A9AA0] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10 focus:outline-none transition-all duration-200"
                      placeholder="you@university.edu"
                      disabled={isLoading}
                    />
                  </div>
                  <p className="mt-2 text-xs text-[#9A9AA0]">
                    We'll send a password reset link to this email.
                  </p>
                </div>
              </div>

              {/* Send reset link button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl text-white bg-[#1C1C1E] font-semibold text-base shadow-[0_8px_0_#000000,0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#000000,0_12px_24px_rgba(0,0,0,0.3)] hover:translate-y-1 disabled:opacity-50 transition-all duration-200"
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
                  "Send reset link"
                )}
              </button>

              {/* Sign up link */}
              <p className="text-center text-[#6B6B70] text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-[#111111] hover:underline transition-colors duration-200">
                  Sign up
                </Link>
              </p>
            </form>
          </>
        )}

        {/* Step 2: Email Sent Confirmation */}
        {step === 2 && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] mb-6">
              <FaCheckCircle className="h-8 w-8 text-[#4CAF50]" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#111111] mb-2 tracking-tight">Check your inbox</h1>
            <p className="text-lg text-[#6B6B70] mb-4">
              We've sent a password reset link to <br />
              <span className="font-semibold text-[#111111] break-all">{email}</span>
            </p>
            
            {/* Instructions card */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] mb-6">
              <h2 className="text-lg font-bold text-[#111111] mb-3">📧 What happens next?</h2>
              <ol className="space-y-3 text-left text-[#6B6B70]">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1C1C1E] text-white text-xs font-bold mr-3 mt-0.5">1</span>
                  <span>Open the email we just sent you</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1C1C1E] text-white text-xs font-bold mr-3 mt-0.5">2</span>
                  <span>Click the <span className="font-semibold text-[#1C1C1E]">"Reset password"</span> button in the email</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1C1C1E] text-white text-xs font-bold mr-3 mt-0.5">3</span>
                  <span>You'll be taken to a secure page to create a new password</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1C1C1E] text-white text-xs font-bold mr-3 mt-0.5">4</span>
                  <span>Sign in with your new password</span>
                </li>
              </ol>
            </div>

            {/* Tip box */}
            <div className="bg-[#E5E5EA] bg-opacity-30 rounded-2xl p-4 mb-6 border-2 border-[#E5E5EA]">
              <p className="text-sm text-[#6B6B70] flex items-start">
                <span className="text-[#1C1C1E] font-bold mr-2">💡</span>
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setStep(1)} 
                  className="text-[#1C1C1E] font-semibold hover:underline ml-1"
                >
                  try again
                </button>
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <Link
                to="/login"
                className="block w-full py-3.5 px-4 rounded-2xl bg-white text-[#111111] font-semibold text-base shadow-[0_8px_0_#E5E5EA,0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] hover:translate-y-1 transition-all duration-200"
              >
                Back to login
              </Link>
              
              <button
                onClick={() => setStep(1)}
                className="text-sm text-[#6B6B70] hover:text-[#1C1C1E] transition-colors duration-200"
              >
                ← Use a different email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}