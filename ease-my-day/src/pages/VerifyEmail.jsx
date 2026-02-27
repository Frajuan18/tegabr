// src/components/VerifyEmail.jsx
import { useState, useEffect } from "react";
import { FaArrowLeft, FaEnvelopeOpen, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../lib/firebase";
import { applyActionCode } from "firebase/auth";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, sendVerificationEmail, logout, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle verification directly in this component
  useEffect(() => {
    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(location.search);
      const oobCode = queryParams.get('oobCode');
      
      console.log("VerifyEmail - URL:", window.location.href);
      console.log("VerifyEmail - oobCode from URL:", oobCode);

      // Also check sessionStorage as backup
      const storedCode = sessionStorage.getItem('lastActionCode');
      const storedMode = sessionStorage.getItem('lastActionMode');
      
      console.log("VerifyEmail - storedCode:", storedCode);
      console.log("VerifyEmail - storedMode:", storedMode);

      const codeToUse = oobCode || storedCode;

      if (!codeToUse) {
        console.log("No verification code found");
        return;
      }

      // Only verify if this is from email verification mode
      if (storedMode === 'verifyEmail' || oobCode) {
        setIsLoading(true);
        setError("");
        
        try {
          console.log("Applying verification code:", codeToUse);
          await applyActionCode(auth, codeToUse);
          console.log("Code applied successfully");
          
          await refreshUser();
          console.log("User refreshed. Verified status:", currentUser?.emailVerified);
          
          setMessage("Email verified successfully! Redirecting to dashboard...");
          setIsVerified(true);
          
          // Clear stored data
          sessionStorage.removeItem('lastActionCode');
          sessionStorage.removeItem('lastActionMode');
          
          setTimeout(() => navigate("/dashboard"), 2000);
        } catch (err) {
          console.error("Verification error:", err);
          if (err.code === 'auth/expired-action-code') {
            setError("This verification link has expired. Please request a new one.");
          } else if (err.code === 'auth/invalid-action-code') {
            setError("This verification link is invalid. Please request a new one.");
          } else if (err.message.includes("already verified")) {
            setMessage("Your email is already verified! Redirecting...");
            setTimeout(() => navigate("/dashboard"), 2000);
          } else {
            setError(`Failed to verify email: ${err.message}`);
          }
        } finally {
          setIsLoading(false);
        }
      }
    };

    verifyEmail();
  }, [location, navigate, refreshUser, currentUser]);

  // Check verification status periodically
  useEffect(() => {
    const checkVerification = async () => {
      if (currentUser) {
        await refreshUser();
        if (currentUser?.emailVerified) {
          setIsVerified(true);
          setTimeout(() => navigate("/dashboard"), 2000);
        }
      }
    };

    const interval = setInterval(checkVerification, 3000);
    return () => clearInterval(interval);
  }, [currentUser, navigate, refreshUser]);

  const handleResendEmail = async () => {
    setIsLoading(true);
    setError("");
    setMessage("");
    
    try {
      await sendVerificationEmail();
      setMessage("✅ Verification email sent! Please check your inbox.");
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

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7] px-4">
        <div className="text-center max-w-md">
          <FaCheckCircle className="text-6xl text-[#4CAF50] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#111111] mb-2">Email Verified!</h1>
          <p className="text-[#6B6B70] mb-4">{message || "Redirecting to dashboard..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7] px-4 py-8">
      <div className="w-full max-w-md">
        <button
          onClick={handleLogout}
          className="flex items-center text-[#6B6B70] hover:text-[#1C1C1E] mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back to login
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-[0_10px_0_#E5E5EA]">
          <div className="text-center mb-6">
            <FaEnvelopeOpen className="text-5xl text-[#1C1C1E] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#111111] mb-2">Verify your email</h1>
            <p className="text-[#6B6B70]">
              We sent a link to:<br />
              <span className="font-semibold text-[#111111]">{currentUser?.email || "your email"}</span>
            </p>
          </div>

          {isLoading && (
            <div className="mb-4 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-[#1C1C1E] border-t-transparent rounded-full mx-auto"></div>
              <p className="text-[#6B6B70] mt-2">Verifying...</p>
            </div>
          )}

          {message && !isLoading && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-xl">
              {message}
            </div>
          )}

          {error && !isLoading && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl flex items-start">
              <FaExclamationTriangle className="mt-1 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!isLoading && !message && !error && (
            <button
              onClick={handleResendEmail}
              disabled={isLoading}
              className="w-full py-3 bg-[#1C1C1E] text-white rounded-2xl font-semibold shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all mb-3"
            >
              Resend verification email
            </button>
          )}

          {(error || message) && (
            <button
              onClick={handleResendEmail}
              disabled={isLoading}
              className="w-full py-3 bg-[#1C1C1E] text-white rounded-2xl font-semibold shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all mb-3"
            >
              {isLoading ? "Sending..." : "Resend verification email"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}