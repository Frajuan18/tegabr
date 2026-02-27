// src/components/VerifyEmail.jsx
import { useState, useEffect } from "react";
import { FaArrowLeft, FaEnvelopeOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { currentUser, sendVerificationEmail, logout, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");

  // Check if email is already verified
  useEffect(() => {
    const checkVerification = async () => {
      if (currentUser) {
        await refreshUser();
        if (currentUser.emailVerified) {
          setIsVerified(true);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      }
    };
    
    checkVerification();
    
    // Poll for verification every 3 seconds
    const interval = setInterval(checkVerification, 3000);
    return () => clearInterval(interval);
  }, [currentUser, navigate, refreshUser]);

  const handleResendEmail = async () => {
    setIsLoading(true);
    setResendSuccess("");
    setVerificationError("");
    
    try {
      await sendVerificationEmail();
      setResendSuccess("Verification email sent successfully! Please check your inbox.");
    } catch (error) {
      setVerificationError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userEmail = currentUser?.email || "your email";

  if (isVerified) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] px-4 py-12 font-outfit">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] mb-6">
            <svg className="h-8 w-8 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#111111] mb-2">Email verified!</h2>
          <p className="text-[#6B6B70] mb-4">Your email has been successfully verified.</p>
          <p className="text-sm text-[#9A9AA0]">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] px-4 py-12 font-outfit">
      <div className="w-full max-w-md">
        <button
          onClick={handleLogout}
          className="inline-flex items-center text-[#6B6B70] hover:text-[#1C1C1E] mb-6 transition-colors duration-200"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" /> Back to login
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] mb-6">
            <FaEnvelopeOpen className="h-8 w-8 text-[#1C1C1E]" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#111111] mb-2 tracking-tight">Verify your email</h1>
          <p className="text-lg text-[#6B6B70] mb-2">
            We've sent a verification link to
          </p>
          <p className="text-xl font-semibold text-[#111111] bg-white py-2 px-4 rounded-2xl inline-block shadow-[0_4px_0_#E5E5EA]">
            {userEmail}
          </p>
        </div>

        {verificationError && (
          <div className="mb-4 p-4 rounded-2xl bg-[#FF7A7A] bg-opacity-10 border-2 border-[#FF7A7A] text-[#111111] text-sm">
            {verificationError}
          </div>
        )}

        {resendSuccess && (
          <div className="mb-4 p-4 rounded-2xl bg-[#4CAF50] bg-opacity-10 border-2 border-[#4CAF50] text-[#111111] text-sm">
            {resendSuccess}
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] mb-6">
          <h2 className="text-lg font-bold text-[#111111] mb-3">📧 Next steps:</h2>
          <ol className="space-y-3 text-[#6B6B70]">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1C1C1E] text-white text-xs font-bold mr-3 mt-0.5">1</span>
              <span>Open your email inbox</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1C1C1E] text-white text-xs font-bold mr-3 mt-0.5">2</span>
              <span>Find the verification email from Tegbar</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1C1C1E] text-white text-xs font-bold mr-3 mt-0.5">3</span>
              <span>Click the verification link in the email</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1C1C1E] text-white text-xs font-bold mr-3 mt-0.5">4</span>
              <span>Return here and you'll be automatically redirected</span>
            </li>
          </ol>
        </div>

        <div className="bg-[#E5E5EA] bg-opacity-30 rounded-2xl p-4 mb-6 border-2 border-[#E5E5EA]">
          <p className="text-sm text-[#6B6B70] flex items-start">
            <span className="text-[#1C1C1E] font-bold mr-2">💡</span>
            Didn't receive the email? Check your spam folder or click "Resend email" below.
          </p>
        </div>

        <button
          onClick={handleResendEmail}
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-2xl bg-white text-[#111111] font-semibold text-base shadow-[0_8px_0_#E5E5EA,0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] hover:translate-y-1 disabled:opacity-50 transition-all duration-200"
        >
          {isLoading ? "Sending..." : "Resend verification email"}
        </button>

        <p className="mt-6 text-center text-[#6B6B70] text-sm">
          Wrong email address?{' '}
          <button
            onClick={handleLogout}
            className="font-semibold text-[#111111] hover:underline"
          >
            Sign up again
          </button>
        </p>
      </div>
    </div>
  );
}