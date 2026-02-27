// src/components/ForgotPassword.jsx
import { useState } from "react";
import { FaArrowLeft, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');
  const mode = searchParams.get('mode');
  
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(oobCode ? 3 : 1); // 1: request, 2: email sent, 3: reset form, 4: success
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  
  const { resetPassword, verifyPasswordResetCode, confirmPasswordReset, error, setError } = useAuth();
  const navigate = useNavigate();

  // Handle request password reset
  const handleRequestReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await resetPassword(email);
      setStep(2);
    } catch (error) {
      console.error("Reset request failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reset password with code
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
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
      await confirmPasswordReset(oobCode, newPassword);
      setStep(4);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Password reset failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Verify reset code on component mount
  useState(() => {
    if (oobCode && mode === 'resetPassword') {
      verifyPasswordResetCode(oobCode)
        .then(email => {
          setResetEmail(email);
          setStep(3);
        })
        .catch(() => {
          setError("Invalid or expired reset link");
        });
    }
  }, [oobCode, mode]);

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

        {/* Step 1: Request Password Reset */}
        {step === 1 && (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] mb-6">
                <FaLock className="h-8 w-8 text-[#1C1C1E]" />
              </div>
              <h1 className="text-3xl font-extrabold text-[#111111] mb-2 tracking-tight">Forgot password?</h1>
              <p className="text-lg text-[#6B6B70]">
                No worries! Enter your phone number or email and we'll send you reset instructions.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-4 rounded-2xl bg-[#FF7A7A] bg-opacity-10 border-2 border-[#FF7A7A] text-[#111111] text-sm">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleRequestReset}>
              <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                    Phone number or Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0]">
                      <FaEnvelope className="h-4 w-4" />
                    </div>
                    <input
                      id="email"
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border-2 border-[#E5E5EA] bg-[#F2F2F7] pl-10 pr-5 py-3.5 text-base text-[#111111] placeholder-[#9A9AA0] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10 focus:outline-none transition-all duration-200"
                      placeholder="+1 (555) 000-0000 or you@example.com"
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
                    Sending...
                  </div>
                ) : (
                  "Send reset instructions"
                )}
              </button>
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
              We've sent reset instructions to <br />
              <span className="font-semibold text-[#111111]">{email}</span>
            </p>
            
            <div className="bg-[#E5E5EA] bg-opacity-30 rounded-2xl p-4 mb-6 border-2 border-[#E5E5EA]">
              <p className="text-sm text-[#6B6B70]">
                <span className="font-bold text-[#1C1C1E]">📧 Didn't receive it?</span> Check your spam folder or{' '}
                <button 
                  onClick={() => setStep(1)} 
                  className="text-[#1C1C1E] font-semibold hover:underline"
                >
                  try again
                </button>
              </p>
            </div>

            <Link
              to="/login"
              className="inline-block py-3.5 px-8 rounded-2xl bg-white text-[#111111] font-semibold text-base shadow-[0_8px_0_#E5E5EA,0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] hover:translate-y-1 transition-all duration-200"
            >
              Back to login
            </Link>
          </div>
        )}

        {/* Step 3: Reset Password Form */}
        {step === 3 && (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] mb-6">
                <FaLock className="h-8 w-8 text-[#1C1C1E]" />
              </div>
              <h1 className="text-3xl font-extrabold text-[#111111] mb-2 tracking-tight">Set new password</h1>
              <p className="text-lg text-[#6B6B70]">
                For <span className="font-semibold text-[#111111]">{resetEmail}</span>
              </p>
            </div>

            {error && (
              <div className="mb-4 p-4 rounded-2xl bg-[#FF7A7A] bg-opacity-10 border-2 border-[#FF7A7A] text-[#111111] text-sm">
                {error}
              </div>
            )}

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
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0] hover:text-[#1C1C1E]"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
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
          </>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center">
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
        )}
      </div>
    </div>
  );
}