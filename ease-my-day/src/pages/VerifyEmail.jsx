// src/components/VerifyEmail.jsx
import { useState, useEffect } from "react";
import { FaArrowLeft, FaClock, FaEnvelopeOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Simulate email for display
  const userEmail = "john.doe@example.com";

  // Timer for resend cooldown
  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple digits
    if (value && !/^\d+$/.test(value)) return; // Only allow numbers

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("");
      const newCode = [...verificationCode];
      digits.forEach((digit, index) => {
        if (index < 6) newCode[index] = digit;
      });
      setVerificationCode(newCode);
      
      // Focus last filled or next empty
      const lastIndex = Math.min(digits.length - 1, 5);
      const nextInput = document.getElementById(`code-${lastIndex}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }, 1500);
  };

  const handleResendCode = () => {
    setCanResend(false);
    setTimer(60);
    // Simulate resending code
    console.log("New verification code sent to:", userEmail);
  };

  const isCodeComplete = verificationCode.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] px-4 py-12 font-outfit">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link 
          to="/signup" 
          className="inline-flex items-center text-[#6B6B70] hover:text-[#1C1C1E] mb-6 transition-colors duration-200"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" /> Back to sign up
        </Link>

        {!isVerified ? (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] mb-6">
                <FaEnvelopeOpen className="h-8 w-8 text-[#1C1C1E]" />
              </div>
              <h1 className="text-3xl font-extrabold text-[#111111] mb-2 tracking-tight">Verify your email</h1>
              <p className="text-lg text-[#6B6B70]">
                We've sent a 6-digit code to <br />
                <span className="font-semibold text-[#111111]">{userEmail}</span>
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleVerify}>
              {/* Card container with Duolingo shadow */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
                <label className="block text-sm font-medium text-[#6B6B70] mb-4 text-center">
                  Enter verification code
                </label>
                
                {/* Code input boxes */}
                <div className="flex justify-between gap-2 mb-4">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-14 text-center text-2xl font-bold rounded-2xl border-2 border-[#E5E5EA] bg-[#F2F2F7] text-[#111111] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10 focus:outline-none transition-all duration-200"
                    />
                  ))}
                </div>

                {/* Timer and resend */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-[#6B6B70]">
                    <FaClock className="mr-1 h-4 w-4" />
                    <span>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={!canResend}
                    className={`font-semibold transition-colors duration-200 ${
                      canResend 
                        ? "text-[#1C1C1E] hover:underline" 
                        : "text-[#9A9AA0] cursor-not-allowed"
                    }`}
                  >
                    Resend code
                  </button>
                </div>
              </div>

              {/* Verify button with Duolingo stacked shadow */}
              <button
                type="submit"
                disabled={!isCodeComplete || isVerifying}
                className="w-full py-3.5 px-4 rounded-2xl text-white bg-[#1C1C1E] font-semibold text-base shadow-[0_8px_0_#000000,0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#000000,0_12px_24px_rgba(0,0,0,0.3)] hover:translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[0_8px_0_#000000,0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-200"
              >
                {isVerifying ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Verifying...
                  </div>
                ) : (
                  "Verify email"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-[#6B6B70] text-sm">
              Wrong email?{' '}
              <button className="font-semibold text-[#111111] hover:underline transition-colors duration-200">
                Change email address
              </button>
            </p>
          </>
        ) : (
          /* Success state with celebration */
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#F2F2F7] mb-6">
                <svg className="h-10 w-10 text-[#1C1C1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#111111] mb-2">Email verified!</h2>
              <p className="text-[#6B6B70] mb-4">
                Your email has been successfully verified.
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#1C1C1E] animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-[#1C1C1E] animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-[#1C1C1E] animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
              <p className="text-sm text-[#9A9AA0] mt-4">
                Redirecting you to dashboard...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}