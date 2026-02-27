// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireVerified = false }) {
  const { currentUser, loading, isEmailVerified } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white shadow-[0_8px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] mb-4">
            <svg className="animate-spin h-8 w-8 text-[#1C1C1E]" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <p className="text-[#6B6B70]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requireVerified && !isEmailVerified()) {
    return <Navigate to="/verify-email" />;
  }

  return children;
}