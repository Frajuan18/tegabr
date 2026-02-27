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

  // ============= SIGNUP =============
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

  // ============= LOGIN =============
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

  // ============= GOOGLE LOGIN =============
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

  // ============= LOGOUT =============
  async function logout() {
    try {
      setError("");
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // ============= SEND PASSWORD RESET EMAIL =============
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

  // ============= VERIFY PASSWORD RESET CODE =============
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

  // ============= CONFIRM PASSWORD RESET =============
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

  // ============= APPLY ACTION CODE (EMAIL VERIFICATION) =============
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

  // ============= SEND EMAIL VERIFICATION =============
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

  // ============= UPDATE PASSWORD (WHEN LOGGED IN) =============
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

  // ============= UPDATE USER PROFILE =============
  async function updateUserProfile(profileData) {
    try {
      setError("");
      if (!currentUser) throw new Error("No user logged in");
      
      await updateProfile(currentUser, profileData);
      await refreshUser();
      
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  // ============= CHECK IF EMAIL IS VERIFIED =============
  function isEmailVerified() {
    return currentUser?.emailVerified || false;
  }

  // ============= REFRESH USER DATA =============
  async function refreshUser() {
    if (currentUser) {
      await currentUser.reload();
      setCurrentUser({ ...currentUser });
    }
  }

  // ============= GET USER DISPLAY NAME =============
  function getDisplayName() {
    if (!currentUser) return null;
    
    if (currentUser.displayName) {
      return currentUser.displayName;
    } else if (currentUser.email) {
      // For phone-based signups
      const emailParts = currentUser.email.split('@');
      if (emailParts[0] && emailParts[1] === 'tegbar.phone') {
        // Format phone number
        const phone = emailParts[0];
        if (phone.length === 10) {
          return `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6)}`;
        }
        return phone;
      }
      return emailParts[0];
    }
    return "User";
  }

  // ============= GET USER INITIALS =============
  function getUserInitials() {
    const name = getDisplayName();
    if (!name) return "U";
    
    if (name.includes('@') || name.includes('(')) {
      return name.substring(0, 2).toUpperCase();
    }
    
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  // ============= LISTEN FOR AUTH STATE CHANGES =============
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    // User state
    currentUser,
    loading,
    error,
    
    // Auth functions
    signup,
    login,
    loginWithGoogle,
    logout,
    
    // Password reset functions
    resetPassword,
    verifyPasswordResetCode,
    confirmPasswordReset,
    updateUserPassword,
    
    // Email verification functions
    sendVerificationEmail,
    applyActionCode,
    isEmailVerified,
    
    // Profile functions
    updateUserProfile,
    refreshUser,
    getDisplayName,
    getUserInitials,
    
    // Error handling
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}