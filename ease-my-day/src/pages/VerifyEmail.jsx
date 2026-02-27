// src/components/VerifyEmail.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../lib/firebase";
import { applyActionCode } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function VerifyEmail() {
  const [status, setStatus] = useState("verifying");
  const { refreshUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');

    if (!oobCode) {
      setStatus("error");
      return;
    }

    // Apply the verification code
    applyActionCode(auth, oobCode)
      .then(async () => {
        await refreshUser();
        setStatus("success");
        setTimeout(() => navigate("/dashboard"), 2000);
      })
      .catch(() => {
        setStatus("error");
      });
  }, [location, navigate, refreshUser]);

  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#1C1C1E] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-[#6B6B70]">Verifying your email...</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-[#111111] mb-2">Email Verified!</h1>
          <p className="text-[#6B6B70]">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
      <div className="text-center">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-[#111111] mb-2">Verification Failed</h1>
        <p className="text-[#6B6B70]">The link may have expired.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-[#1C1C1E] text-white rounded-xl"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}