// src/components/ResetPassword.jsx
import { useState, useEffect } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');
    
    if (!oobCode) {
      setError("Invalid reset link");
      return;
    }

    // Verify the code
    verifyPasswordResetCode(auth, oobCode)
      .then((email) => {
        setEmail(email);
        setIsValid(true);
        sessionStorage.setItem('resetCode', oobCode);
      })
      .catch((error) => {
        setError("This reset link has expired. Please request a new one.");
      });
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const oobCode = sessionStorage.getItem('resetCode');
      await confirmPasswordReset(auth, oobCode, newPassword);
      sessionStorage.removeItem('resetCode');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValid && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
        <div className="animate-spin h-8 w-8 border-4 border-[#1C1C1E] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] px-4 py-12 font-outfit">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-[#111111] mb-2">Set new password</h1>
        {email && <p className="text-center text-[#6B6B70] mb-8">for {email}</p>}

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-2xl">
            {error}
            <Link to="/forgot-password" className="block mt-2 font-semibold underline">
              Request new link
            </Link>
          </div>
        )}

        {isValid && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white p-6 rounded-3xl shadow-[0_10px_0_#E5E5EA]">
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#6B6B70] mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 border-2 border-[#E5E5EA] rounded-2xl bg-[#F2F2F7] pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B6B70] mb-2">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border-2 border-[#E5E5EA] rounded-2xl bg-[#F2F2F7]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#1C1C1E] text-white rounded-2xl font-semibold shadow-[0_8px_0_#000000] hover:translate-y-1 transition-all"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}