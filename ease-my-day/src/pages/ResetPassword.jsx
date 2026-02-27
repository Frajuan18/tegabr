// src/components/ResetPassword.jsx
import { useState, useEffect } from "react";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../lib/firebase";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyCode = async () => {
      const queryParams = new URLSearchParams(location.search);
      let oobCode = queryParams.get('oobCode');
      
      console.log("ResetPassword - Full URL:", window.location.href);
      console.log("ResetPassword - oobCode from URL:", oobCode);

      // Also check sessionStorage as backup
      const storedCode = sessionStorage.getItem('lastActionCode');
      const storedMode = sessionStorage.getItem('lastActionMode');
      
      console.log("ResetPassword - storedCode:", storedCode);
      console.log("ResetPassword - storedMode:", storedMode);

      // Use URL code first, then stored code
      const codeToUse = oobCode || storedCode;

      if (!codeToUse) {
        setError("No reset code found. Please request a new reset link.");
        return;
      }

      // Only proceed if this is for password reset
      if (storedMode === 'resetPassword' || oobCode) {
        try {
          console.log("Verifying reset code:", codeToUse);
          const resetEmail = await verifyPasswordResetCode(auth, codeToUse);
          console.log("Code valid for email:", resetEmail);
          
          setEmail(resetEmail);
          setIsValid(true);
          
          // Store the code for later use
          sessionStorage.setItem('resetCode', codeToUse);
          
          // Clear the action code from storage
          sessionStorage.removeItem('lastActionCode');
          sessionStorage.removeItem('lastActionMode');
        } catch (err) {
          console.error("Code verification failed:", err);
          if (err.code === 'auth/expired-action-code') {
            setError("This reset link has expired. Please request a new one.");
          } else if (err.code === 'auth/invalid-action-code') {
            setError("This reset link is invalid. Please request a new one.");
          } else {
            setError(err.message);
          }
        }
      }
    };

    verifyCode();
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const resetCode = sessionStorage.getItem('resetCode');
      console.log("Confirming reset with code:", resetCode);
      
      if (!resetCode) {
        throw new Error("Reset code not found. Please request a new link.");
      }
      
      await confirmPasswordReset(auth, resetCode, password);
      console.log("Password reset successful!");
      
      sessionStorage.removeItem('resetCode');
      setSuccess(true);
      
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error("Password reset failed:", err);
      if (err.code === 'auth/expired-action-code') {
        setError("This reset link has expired. Please request a new one.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
        <div className="text-center max-w-md px-4">
          <FaCheckCircle className="text-6xl text-[#4CAF50] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#111111] mb-2">Password Reset!</h1>
          <p className="text-[#6B6B70] mb-4">Your password has been successfully reset.</p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-[#1C1C1E] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#1C1C1E] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-[#1C1C1E] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
          <p className="text-sm text-[#9A9AA0] mt-4">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-3xl shadow-[0_10px_0_#E5E5EA]">
          <h1 className="text-2xl font-bold text-center text-[#111111] mb-2">Reset Password</h1>
          
          {email && <p className="text-center text-[#6B6B70] mb-6">for {email}</p>}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-red-600 mb-2">{error}</p>
              <Link 
                to="/forgot-password" 
                className="inline-block text-sm font-semibold text-[#1C1C1E] underline"
              >
                Request new reset link
              </Link>
            </div>
          )}

          {isValid && !error && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#6B6B70] mb-2">New Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9AA0]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 p-3 border-2 border-[#E5E5EA] rounded-2xl bg-[#F2F2F7] focus:border-[#1C1C1E] focus:outline-none"
                    placeholder="Enter new password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9AA0] hover:text-[#1C1C1E]"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#6B6B70] mb-2">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full p-3 border-2 border-[#E5E5EA] rounded-2xl bg-[#F2F2F7] focus:border-[#1C1C1E] focus:outline-none"
                  placeholder="Confirm new password"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#1C1C1E] text-white rounded-2xl font-semibold shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}