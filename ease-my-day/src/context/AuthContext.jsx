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
  applyActionCode,
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

  // Sign up
  async function signup(email, password, username, phone) {
    try {
      setError("");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: username
      });
      
      await sendVerificationEmail(userCredential.user);
      
      return userCredential;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Login
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

  // Google Login
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

  // Send password reset email
  async function resetPassword(email) {
    try {
      setError("");
      const actionCodeSettings = {
        url: 'https://tegabr.vercel.app/action',
        handleCodeInApp: true
      };
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Verify password reset code
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

  // Confirm password reset
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

  // Apply action code (for email verification)
  async function applyActionCode(oobCode) {
    try {
      setError("");
      await applyActionCode(auth, oobCode);
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Send email verification
  async function sendVerificationEmail(user = null) {
    try {
      setError("");
      const userToVerify = user || currentUser;
      if (!userToVerify) throw new Error("No user to verify");
      
      const actionCodeSettings = {
        url: 'https://tegabr.vercel.app/action',
        handleCodeInApp: true
      };
      
      await sendEmailVerification(userToVerify, actionCodeSettings);
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Update password for logged-in user
  async function updateUserPassword(currentPassword, newPassword) {
    try {
      setError("");
      if (!currentUser) throw new Error("No user logged in");

      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Refresh user
  async function refreshUser() {
    if (currentUser) {
      await currentUser.reload();
      setCurrentUser({ ...currentUser });
    }
  }

  // Check if email is verified
  function isEmailVerified() {
    return currentUser?.emailVerified || false;
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
    applyActionCode,
    sendVerificationEmail,
    updateUserPassword,
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