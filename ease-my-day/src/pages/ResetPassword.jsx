// src/components/ResetPassword.jsx
import { useState, useEffect } from "react";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { verifyPasswordResetCode, confirmPasswordReset } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');

    if (!oobCode) {
      setError("Invalid reset link");
      return;
    }

    verifyPasswordResetCode(oobCode)
      .then((email) => {
        setEmail(email);
        setIsValid(true);
        sessionStorage.setItem('resetCode', oobCode);
      })
      .catch(() => {
        setError("This reset link has expired. Please request a new one.");
      });
  }, [location, verifyPasswordResetCode]);

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
    
    try {
      const oobCode = sessionStorage.getItem('resetCode');
      await confirmPasswordReset(oobCode, password);
      sessionStorage.removeItem('resetCode');
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
        <div className="text-center">
          <FaCheckCircle className="text-6xl text-[#4CAF50] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#111111] mb-2">Password Reset!</h1>
          <p className="text-[#6B6B70]">Redirecting to login...</p>
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
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl">
              {error}
              <Link to="/forgot-password" className="block mt-2 font-semibold underline">
                Request new link
              </Link>
            </div>
          )}

          {isValid && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#6B6B70] mb-2">New Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9AA0]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 p-3 border-2 border-[#E5E5EA] rounded-2xl bg-[#F2F2F7]"
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

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#6B6B70] mb-2">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full p-3 border-2 border-[#E5E5EA] rounded-2xl bg-[#F2F2F7]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#1C1C1E] text-white rounded-2xl font-semibold shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all"
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