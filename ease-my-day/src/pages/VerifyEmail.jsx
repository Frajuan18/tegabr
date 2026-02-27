// src/components/VerifyEmail.jsx
import { useState, useEffect } from "react";
import { FaArrowLeft, FaEnvelopeOpen, FaRedoAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { currentUser, sendVerificationEmail, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");
  const [checkingVerification, setCheckingVerification] = useState(false);

  // Get user email from currentUser
  const userEmail = currentUser?.email || "your email";

  // Check if email is already verified
  useEffect(() => {
    if (currentUser?.emailVerified) {
      setIsVerified(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [currentUser, navigate]);

  // Function to check verification status
  const checkVerificationStatus = async () => {
    setCheckingVerification(true);
    setVerificationError("");
    
    try {
      // Reload user to get latest emailVerified status
      await currentUser.reload();
      
      if (currentUser.emailVerified) {
        setIsVerified(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setVerificationError("Email not verified yet. Please check your inbox and click the verification link.");
      }
    } catch (error) {
      setVerificationError(error.message);
    } finally {
      setCheckingVerification(false);
    }
  };

  // Handle resend verification email
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

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] px-4 py-12 font-outfit">
      <div className="w-full max-w-md">
        {/* Back button - only show if not verified */}
        {!isVerified && (
          <button
            onClick={handleLogout}
            className="inline-flex items-center text-[#6B6B70] hover:text-[#1C1C1E] mb-6 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2 h-4 w-4" /> Back to login
          </button>
        )}

        {!isVerified ? (
          <>
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

            {/* Instructions card */}
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
                  <span>Return here and click "I've verified my email"</span>
                </li>
              </ol>
            </div>

            {/* Error/Success messages */}
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

            {/* Tip box */}
            <div className="bg-[#E5E5EA] bg-opacity-30 rounded-2xl p-4 mb-6 border-2 border-[#E5E5EA]">
              <p className="text-sm text-[#6B6B70] flex items-start">
                <span className="text-[#1C1C1E] font-bold mr-2">💡</span>
                Didn't receive the email? Check your spam folder or click "Resend email" below.
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              {/* Check verification button */}
              <button
                onClick={checkVerificationStatus}
                disabled={checkingVerification}
                className="w-full py-3.5 px-4 rounded-2xl text-white bg-[#1C1C1E] font-semibold text-base shadow-[0_8px_0_#000000,0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#000000,0_12px_24px_rgba(0,0,0,0.3)] hover:translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[0_8px_0_#000000,0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-200"
              >
                {checkingVerification ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Checking...
                  </div>
                ) : (
                  "I've verified my email"
                )}
              </button>

              {/* Resend email button */}
              <button
                onClick={handleResendEmail}
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3.5 px-4 rounded-2xl bg-white text-[#111111] font-semibold text-base shadow-[0_8px_0_#E5E5EA,0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] hover:translate-y-1 disabled:opacity-50 transition-all duration-200"
              >
                <FaRedoAlt className={`mr-3 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? "Sending..." : "Resend verification email"}
              </button>
            </div>

            {/* Change email link */}
            <p className="mt-6 text-center text-[#6B6B70] text-sm">
              Wrong email address?{' '}
              <button
                onClick={handleLogout}
                className="font-semibold text-[#111111] hover:underline transition-colors duration-200"
              >
                Sign up again
              </button>
            </p>
          </>
        ) : (
          /* Success state with celebration */
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[#F2F2F7] mb-6">
                <svg className="h-12 w-12 text-[#1C1C1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-[#111111] mb-3">Email verified! 🎉</h2>
              <p className="text-lg text-[#6B6B70] mb-6">
                Your email has been successfully verified.
              </p>
              
              {/* Celebration animation */}
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#1C1C1E] animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-3 h-3 rounded-full bg-[#1C1C1E] animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-3 h-3 rounded-full bg-[#1C1C1E] animate-bounce" style={{ animationDelay: "300ms" }}></div>
                <div className="w-3 h-3 rounded-full bg-[#1C1C1E] animate-bounce" style={{ animationDelay: "450ms" }}></div>
              </div>
              
              <p className="text-sm text-[#9A9AA0]">
                Redirecting you to dashboard...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}