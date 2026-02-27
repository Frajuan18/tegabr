// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { auth } from "../lib/firebase";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Sign up with email and password (for phone-based signup)
  async function signup(email, password, username, phone) {
    try {
      setError("");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with username
      await updateProfile(userCredential.user, {
        displayName: username
      });
      
      // Send email verification
      await sendVerificationEmail(userCredential.user);
      
      return userCredential;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Login with email and password
  async function login(email, password) {
    try {
      setError("");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Login with Google
  async function loginWithGoogle() {
    try {
      setError("");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Logout
  async function logout() {
    try {
      setError("");
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // ============= PASSWORD RESET FUNCTIONS =============

  // 1. Send password reset email
  async function resetPassword(email) {
    try {
      setError("");
      const actionCodeSettings = {
        // URL to redirect back to after password reset
        url: 'http://tegabr.vercel.app/login', // Change to your production URL
        handleCodeInApp: true
      };
      
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // 2. Verify password reset code (when user clicks the link)
  async function verifyPasswordResetCode(oobCode) {
    try {
      setError("");
      const email = await verifyPasswordResetCode(auth, oobCode);
      return email;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // 3. Confirm password reset with new password
  async function confirmPasswordReset(oobCode, newPassword) {
    try {
      setError("");
      await confirmPasswordReset(auth, oobCode, newPassword);
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // 4. Update password for logged-in user
  async function updateUserPassword(currentPassword, newPassword) {
    try {
      setError("");
      
      if (!currentUser) {
        throw new Error("No user logged in");
      }

      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      
      await reauthenticateWithCredential(currentUser, credential);
      
      // Update password
      await updatePassword(currentUser, newPassword);
      
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // 5. Check if password reset code is valid
  async function checkPasswordResetCode(oobCode) {
    try {
      setError("");
      const email = await verifyPasswordResetCode(auth, oobCode);
      return { isValid: true, email };
    } catch (error) {
      return { isValid: false, error: error.message };
    }
  }

  // Send email verification
  async function sendVerificationEmail(user = null) {
    try {
      setError("");
      const userToVerify = user || currentUser;
      
      if (!userToVerify) {
        throw new Error("No user to verify");
      }
      
      const actionCodeSettings = {
        url: 'http://localhost:3000/login', // Change to your production URL
        handleCodeInApp: true
      };
      
      await sendEmailVerification(userToVerify, actionCodeSettings);
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Check if email is verified
  function isEmailVerified() {
    return currentUser?.emailVerified || false;
  }

  // Force refresh user to get latest status
  async function refreshUser() {
    if (currentUser) {
      await currentUser.reload();
      setCurrentUser({ ...currentUser });
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    error,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    verifyPasswordResetCode,
    confirmPasswordReset,
    updateUserPassword,
    checkPasswordResetCode,
    sendVerificationEmail,
    isEmailVerified,
    refreshUser,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}