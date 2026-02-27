// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  updateProfile
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

  // Reset password
  async function resetPassword(email) {
    try {
      setError("");
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // Send email verification - IMPROVED VERSION
  async function sendVerificationEmail(user = null) {
    try {
      setError("");
      const userToVerify = user || currentUser;
      
      if (!userToVerify) {
        throw new Error("No user to verify");
      }
      
      // You can customize the email action settings
      const actionCodeSettings = {
        // URL you want to redirect back to after verification
        url: 'http://localhost:3000/login', // Change to your production URL
        handleCodeInApp: true // This keeps the user in your app after clicking the link
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

  // Force refresh user to get latest emailVerified status
  async function refreshUser() {
    if (currentUser) {
      await currentUser.reload();
      setCurrentUser({ ...currentUser }); // Trigger re-render
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