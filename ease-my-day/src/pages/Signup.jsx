// src/components/Register.jsx
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaUser, FaPhone, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  
  const { signup, loginWithGoogle, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear field-specific error when user types
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Pass username, fullName, phone, email, and password to signup
      await signup(
        formData.email,
        formData.password,
        formData.username,
        formData.fullName,
        formData.phone
      );
      
      // Redirect to email verification page
      navigate("/verify-email");
    } catch (error) {
      console.error("Registration failed:", error);
      // Error is already set in context
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Google signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: "No password", color: "bg-[#9A9AA0]" };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/(?=.*[a-z])/.test(password)) strength += 1;
    if (/(?=.*[A-Z])/.test(password)) strength += 1;
    if (/(?=.*\d)/.test(password)) strength += 1;
    if (/(?=.*[!@#$%^&*])/.test(password)) strength += 1;
    
    const strengthMap = {
      0: { label: "Very weak", color: "bg-[#FF7A7A]" },
      1: { label: "Weak", color: "bg-[#FF9F6B]" },
      2: { label: "Fair", color: "bg-[#FFB86B]" },
      3: { label: "Good", color: "bg-[#4EC5B1]" },
      4: { label: "Strong", color: "bg-[#4CAF50]" },
      5: { label: "Very strong", color: "bg-[#4CAF50]" }
    };
    
    return { 
      strength: Math.min(strength, 5), 
      label: strengthMap[Math.min(strength, 5)].label,
      color: strengthMap[Math.min(strength, 5)].color
    };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] px-4 py-12 font-outfit">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#111111] mb-2 tracking-tight">Create account</h1>
          <p className="text-lg text-[#6B6B70]">Join our community today</p>
        </div>

        {/* Error message */}
        {(error || Object.keys(errors).length > 0) && (
          <div className="mb-4 p-4 rounded-2xl bg-[#FF7A7A] bg-opacity-10 border-2 border-[#FF7A7A] text-[#111111] text-sm">
            {error || "Please fix the errors below"}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Card container with Duolingo shadow */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
            
            {/* Username field */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0]">
                  <FaUser className="h-4 w-4" />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full rounded-2xl border-2 bg-[#F2F2F7] pl-10 pr-5 py-3.5 text-base text-[#111111] placeholder-[#9A9AA0] focus:outline-none transition-all duration-200 ${
                    errors.username 
                      ? "border-[#FF7A7A] focus:border-[#FF7A7A] focus:ring-2 focus:ring-[#FF7A7A]/10" 
                      : "border-[#E5E5EA] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10"
                  }`}
                  placeholder="johndoe123"
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-xs text-[#FF7A7A]">{errors.username}</p>
              )}
            </div>

            {/* Full Name field */}
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0]">
                  <FaUser className="h-4 w-4" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full rounded-2xl border-2 bg-[#F2F2F7] pl-10 pr-5 py-3.5 text-base text-[#111111] placeholder-[#9A9AA0] focus:outline-none transition-all duration-200 ${
                    errors.fullName 
                      ? "border-[#FF7A7A] focus:border-[#FF7A7A] focus:ring-2 focus:ring-[#FF7A7A]/10" 
                      : "border-[#E5E5EA] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10"
                  }`}
                  placeholder="John Doe"
                  disabled={isLoading}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-xs text-[#FF7A7A]">{errors.fullName}</p>
              )}
            </div>

            {/* Phone number field */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0]">
                  <FaPhone className="h-4 w-4" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full rounded-2xl border-2 bg-[#F2F2F7] pl-10 pr-5 py-3.5 text-base text-[#111111] placeholder-[#9A9AA0] focus:outline-none transition-all duration-200 ${
                    errors.phone 
                      ? "border-[#FF7A7A] focus:border-[#FF7A7A] focus:ring-2 focus:ring-[#FF7A7A]/10" 
                      : "border-[#E5E5EA] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10"
                  }`}
                  placeholder="+1 (555) 000-0000"
                  disabled={isLoading}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-[#FF7A7A]">{errors.phone}</p>
              )}
            </div>

            {/* Email field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0]">
                  <FaEnvelope className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-2xl border-2 bg-[#F2F2F7] pl-10 pr-5 py-3.5 text-base text-[#111111] placeholder-[#9A9AA0] focus:outline-none transition-all duration-200 ${
                    errors.email 
                      ? "border-[#FF7A7A] focus:border-[#FF7A7A] focus:ring-2 focus:ring-[#FF7A7A]/10" 
                      : "border-[#E5E5EA] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10"
                  }`}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-[#FF7A7A]">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div className="relative mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0]">
                  <FaLock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full rounded-2xl border-2 bg-[#F2F2F7] pl-10 pr-12 py-3.5 text-base text-[#111111] placeholder-[#9A9AA0] focus:outline-none transition-all duration-200 ${
                    errors.password 
                      ? "border-[#FF7A7A] focus:border-[#FF7A7A] focus:ring-2 focus:ring-[#FF7A7A]/10" 
                      : "border-[#E5E5EA] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10"
                  }`}
                  placeholder="Create a password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0] hover:text-[#1C1C1E] transition-colors duration-200"
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex space-x-1 flex-1">
                      {[1, 2, 3, 4, 5].map((level) => (
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
              
              {errors.password && (
                <p className="mt-1 text-xs text-[#FF7A7A]">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password field */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#6B6B70] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0]">
                  <FaLock className="h-4 w-4" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full rounded-2xl border-2 bg-[#F2F2F7] pl-10 pr-12 py-3.5 text-base text-[#111111] placeholder-[#9A9AA0] focus:outline-none transition-all duration-200 ${
                    errors.confirmPassword 
                      ? "border-[#FF7A7A] focus:border-[#FF7A7A] focus:ring-2 focus:ring-[#FF7A7A]/10" 
                      : "border-[#E5E5EA] focus:border-[#1C1C1E] focus:ring-2 focus:ring-[#1C1C1E]/10"
                  }`}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#9A9AA0] hover:text-[#1C1C1E] transition-colors duration-200"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-[#FF7A7A]">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Terms and conditions */}
          <p className="text-xs text-[#9A9AA0] text-center px-4">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-[#1C1C1E] font-semibold hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-[#1C1C1E] font-semibold hover:underline">
              Privacy Policy
            </Link>
          </p>

          {/* Primary button with Duolingo stacked shadow */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl text-white bg-[#1C1C1E] font-semibold text-base shadow-[0_8px_0_#000000,0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#000000,0_12px_24px_rgba(0,0,0,0.3)] hover:translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[0_8px_0_#000000,0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating account...
              </div>
            ) : (
              "Create account"
            )}
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-[#E5E5EA]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#F2F2F7] text-[#9A9AA0] font-medium">or sign up with</span>
            </div>
          </div>

          {/* Google sign up button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3.5 px-4 rounded-2xl bg-white text-[#111111] font-semibold text-base shadow-[0_8px_0_#E5E5EA,0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_0_#E5E5EA,0_8px_16px_rgba(0,0,0,0.1)] hover:translate-y-1 disabled:opacity-50 transition-all duration-200"
          >
            <FaGoogle className="mr-3 text-[#5B6CFF]" /> Continue with Google
          </button>

          <p className="mt-8 text-center text-[#6B6B70]">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#111111] hover:text-[#1C1C1E] transition-colors duration-200">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}