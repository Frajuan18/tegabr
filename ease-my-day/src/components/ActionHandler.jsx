// src/components/ActionHandler.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ActionHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get('mode');
    const oobCode = queryParams.get('oobCode');
    
    // Simply redirect based on mode
    if (mode === 'resetPassword') {
      // For password reset, go to reset page with code
      navigate(`/reset-password?oobCode=${oobCode}`);
    } else if (mode === 'verifyEmail') {
      // For email verification, go to verify page with code
      navigate(`/verify-email?oobCode=${oobCode}`);
    } else {
      // Default to home
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#1C1C1E] border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-[#6B6B70]">Redirecting...</p>
      </div>
    </div>
  );
}