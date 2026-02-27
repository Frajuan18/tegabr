// src/components/VerifyEmail.jsx
import { useState, useEffect } from "react";
import { FaArrowLeft, FaEnvelopeOpen, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, sendVerificationEmail, logout, refreshUser, applyActionCode } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Check if there's a verification code in the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');
    const mode = queryParams.get('mode');

    console.log("VerifyEmail - URL params:", { mode, oobCode });

    // If there's a verification code in URL, apply it
    if (oobCode && mode === 'verifyEmail') {
      handleVerificationCode(oobCode);
    }
  }, [location]);

  // Handle verification code from email link
  const handleVerificationCode = async (oobCode) => {
    setIsLoading(true);
    setError("");
    
    try {
      console.log("Applying verification code:", oobCode);
      await applyActionCode(oobCode);
      console.log("Code applied successfully");
      
      // Refresh user to get updated verification status
      await refreshUser();
      
      if (currentUser?.emailVerified) {
        setIsVerified(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setMessage("Email verified! You can now continue.");
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (err) {
      console.error("Verification error:", err);
      if (err.message.includes("expired")) {
        setError("This verification link has expired. Please request a new one below.");
      } else if (err.message.includes("already verified")) {
        setMessage("Your email is already verified! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setError("Failed to verify email. Please try again or request a new link.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Check verification status periodically
  useEffect(() => {
    const checkVerification = async () => {
      if (currentUser) {
        await refreshUser();
        if (currentUser.emailVerified) {
          setIsVerified(true);
          setTimeout(() => navigate("/dashboard"), 2000);
        }
      }
    };

    // Check immediately
    checkVerification();

    // Then check every 3 seconds
    const interval = setInterval(checkVerification, 3000);
    return () => clearInterval(interval);
  }, [currentUser, navigate, refreshUser]);

  const handleResendEmail = async () => {
    setIsLoading(true);
    setError("");
    setMessage("");
    
    try {
      await sendVerificationEmail();
      setMessage("✅ Verification email sent! Please check your inbox (including spam folder).");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // If already verified
  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7] px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-[0_8px_0_#E5E5EA] mb-6">
            <FaCheckCircle className="text-4xl text-[#4CAF50]" />
          </div>
          <h1 className="text-3xl font-bold text-[#111111] mb-2">Email Verified!</h1>
          <p className="text-[#6B6B70] mb-4">Your email has been successfully verified.</p>
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-[#1C1C1E] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#1C1C1E] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-[#1C1C1E] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
          <p className="text-sm text-[#9A9AA0]">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7] px-4 py-8">
      <div className="w-full max-w-md">
        <button
          onClick={handleLogout}
          className="flex items-center text-[#6B6B70] hover:text-[#1C1C1E] mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to login
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-[0_10px_0_#E5E5EA]">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#F2F2F7] mb-4">
              <FaEnvelopeOpen className="text-4xl text-[#1C1C1E]" />
            </div>
            <h1 className="text-2xl font-bold text-[#111111] mb-2">Verify your email</h1>
            <p className="text-[#6B6B70] break-all">
              We sent a verification link to:<br />
              <span className="font-semibold text-[#111111]">{currentUser?.email || "your email"}</span>
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-4 p-4 bg-[#4CAF50] bg-opacity-10 border-2 border-[#4CAF50] rounded-2xl text-[#111111]">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-[#FF7A7A] bg-opacity-10 border-2 border-[#FF7A7A] rounded-2xl">
              <div className="flex items-start">
                <FaExclamationTriangle className="text-[#FF7A7A] mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-[#111111]">{error}</p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-[#F2F2F7] rounded-2xl p-4 mb-6">
            <h2 className="font-semibold text-[#111111] mb-3">📧 Next steps:</h2>
            <ol className="space-y-2 text-sm text-[#6B6B70]">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1C1C1E] text-white text-xs font-bold mr-2 mt-0.5">1</span>
                <span>Open your email inbox (check spam folder too)</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1C1C1E] text-white text-xs font-bold mr-2 mt-0.5">2</span>
                <span>Click the verification link in the email</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1C1C1E] text-white text-xs font-bold mr-2 mt-0.5">3</span>
                <span>Return here and you'll be automatically verified</span>
              </li>
            </ol>
          </div>

          {/* Resend Button */}
          <button
            onClick={handleResendEmail}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#1C1C1E] text-white rounded-2xl font-semibold shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all disabled:opacity-50 mb-3"
          >
            {isLoading ? "Sending..." : "Resend verification email"}
          </button>

          {/* Change email link */}
          <p className="text-center text-sm text-[#6B6B70]">
            Wrong email?{' '}
            <button
              onClick={handleLogout}
              className="font-semibold text-[#111111] hover:underline"
            >
              Sign up again
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}