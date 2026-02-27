// src/components/ActionHandler.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ActionHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const { applyActionCode, verifyPasswordResetCode, refreshUser } = useAuth();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleAction = async () => {
      const queryParams = new URLSearchParams(location.search);
      const mode = queryParams.get('mode');
      const oobCode = queryParams.get('oobCode');

      console.log("Action Handler - Mode:", mode);
      console.log("Action Handler - oobCode:", oobCode);

      if (!oobCode) {
        setStatus("error");
        setMessage("No action code found in URL");
        return;
      }

      try {
        if (mode === 'verifyEmail') {
          setStatus("processing");
          await applyActionCode(oobCode);
          await refreshUser();
          setStatus("verified");
          setTimeout(() => navigate("/dashboard"), 2000);
        } 
        else if (mode === 'resetPassword') {
          setStatus("processing");
          const email = await verifyPasswordResetCode(oobCode);
          // Store in session storage
          sessionStorage.setItem('resetEmail', email);
          sessionStorage.setItem('resetOobCode', oobCode);
          // Navigate to reset password page
          navigate(`/reset-password?email=${encodeURIComponent(email)}`);
        } 
        else if (mode === 'recoverEmail') {
          navigate('/login');
        } 
        else {
          setStatus("error");
          setMessage(`Unknown action mode: ${mode}`);
        }
      } catch (error) {
        console.error("Action handling error:", error);
        setStatus("error");
        setMessage(error.message);
      }
    };

    handleAction();
  }, [location, navigate, applyActionCode, verifyPasswordResetCode, refreshUser]);

  if (status === "processing") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#1C1C1E] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-[#6B6B70]">Processing your request...</p>
        </div>
      </div>
    );
  }

  if (status === "verified") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] mb-6">
            <svg className="h-8 w-8 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#111111] mb-2">Email Verified!</h2>
          <p className="text-[#6B6B70] mb-4">Your email has been successfully verified.</p>
          <p className="text-sm text-[#9A9AA0]">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] mb-6">
            <svg className="h-8 w-8 text-[#FF7A7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#111111] mb-2">Something went wrong</h2>
          <p className="text-[#6B6B70] mb-4">{message}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[#1C1C1E] text-white rounded-2xl font-semibold"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return null;
}