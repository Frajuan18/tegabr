// src/components/ResetPassword.jsx
import { useState, useEffect } from "react";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const { verifyPasswordResetCode, confirmPasswordReset, error, setError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract oobCode from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');
    const mode = queryParams.get('mode');
    
    console.log("Reset params:", { oobCode, mode }); // Debug log

    if (!oobCode || mode !== 'resetPassword') {
      setError("Invalid or missing reset link");
      return;
    }

    // Verify the reset code is valid
    const verifyCode = async () => {
      try {
        const resetEmail = await verifyPasswordResetCode(oobCode);
        setEmail(resetEmail);
        setIsValid(true);
        // Store oobCode in session storage for later use
        sessionStorage.setItem('resetOobCode', oobCode);
      } catch (error) {
        console.error("Code verification failed:", error);
        setError("This reset link is invalid or has expired. Please request a new one.");
      }
    };

    verifyCode();
  }, [location, verifyPasswordResetCode, setError]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const oobCode = sessionStorage.getItem('resetOobCode');
      if (!oobCode) {
        throw new Error("Reset code not found. Please request a new reset link.");
      }
      
      await confirmPasswordReset(oobCode, newPassword);
      setResetSuccess(true);
      
      // Clear the stored code
      sessionStorage.removeItem('resetOobCode');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Password reset failed:", error);
      setError("Failed to reset password. The link may have expired.");
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!newPassword) return { strength: 0, label: "No password", color: "bg-[#9A9AA0]" };
    
    let strength = 0;
    if (newPassword.length >= 8) strength += 1;
    if (/(?=.*[a-z])/.test(newPassword)) strength += 1;
    if (/(?=.*[A-Z])/.test(newPassword)) strength += 1;
    if (/(?=.*\d)/.test(newPassword)) strength += 1;
    
    const strengthMap = {
      0: { label: "Very weak", color: "bg-[#FF7A7A]" },
      1: { label: "Weak", color: "bg-[#FF9F6B]" },
      2: { label: "Fair", color: "bg-[#FFB86B]" },
      3: { label: "Good", color: "bg-[#4EC5B1]" },
      4: { label: "Strong", color: "bg-[#4CAF50]" }
    };
    
    return { 
      strength: Math.min(strength, 4), 
      label: strengthMap[Math.min(strength, 4)].label,
      color: strengthMap[Math.min(strength, 4)].color
    };
  };

  const passwordStrength = getPasswordStrength();

  if (resetSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] px-4 py-12 font-outfit">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] mb-6">
            <FaCheckCircle className="h-8 w-8 text-[#4CAF50]" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#111111] mb-2 tracking-tight">Password reset!</h1>
          <p className="text-lg text-[#6B6B70] mb-6">
            Your password has been successfully reset.
          </p>
          
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#1C1C1E] animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-[#1C1C1E] animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-[#1C1C1E] animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
          
          <p className="text-sm text-[#9A9AA0]">
            Redirecting you to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] px-4 py-12 font-outfit">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] mb-6">
            <FaLock className="h-8 w-8 text-[#1C1C1E]" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#111111] mb-2 tracking-tight">Set new password</h1>
          {email && (
            <p className="text-lg text-[#6B6B70]">
              For <span className="font-semibold text-[#111111]">{email}</span>
            </p>
          )}
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-2xl bg-[#FF7A7A] bg-opacity-10 border-2 border-[#FF7A7A] text-[#111111] text-sm">
            {error}
            {!isValid && (
              <div className="mt-2">
                <Link 
                  to="/forgot-password" 
                  className="text-[#1C1C1E] font-semibold underline"
                >
                  Request a new reset link
                </Link>
              </div>
            )}
          </div>
        )}

        {isValid ? (
          <form className="space-y-6" onSubmit={handleResetPassword}>
            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0]">
                    <FaLock className="h-4 w-4" />
                  </div>
                  <input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-2xl border-2 border-[#E5E5EA] bg-[#F2F2F7] pl-10 pr-12 py-3.5 text-base text-[#111111] placeholder-[#9A9AA0] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10 focus:outline-none transition-all duration-200"
                    placeholder="Enter new password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0] hover:text-[#1C1C1E] transition-colors duration-200"
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Password strength indicator */}
                {newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex space-x-1 flex-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full ${
                              level <= passwordStrength.strength
                                ? passwordStrength.color
                                : "bg-[#E5E5EA]"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-xs font-medium text-[#6B6B70]">
                        {passwordStrength.label}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0]">
                    <FaLock className="h-4 w-4" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-2xl border-2 border-[#E5E5EA] bg-[#F2F2F7] pl-10 pr-12 py-3.5 text-base text-[#111111] placeholder-[#9A9AA0] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10 focus:outline-none transition-all duration-200"
                    placeholder="Confirm new password"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

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
                  Resetting...
                </div>
              ) : (
                "Reset password"
              )}
            </button>
          </form>
        ) : (
          !error && (
            <div className="text-center">
              <div className="bg-white rounded-3xl p-8 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
                <div className="animate-spin h-8 w-8 border-4 border-[#1C1C1E] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-[#6B6B70]">Verifying your reset link...</p>
              </div>
            </div>
          )
        )}

        <p className="mt-8 text-center text-[#6B6B70] text-sm">
          Remember your password?{' '}
          <Link to="/login" className="font-semibold text-[#111111] hover:underline transition-colors duration-200">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}