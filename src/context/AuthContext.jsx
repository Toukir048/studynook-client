import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../api/firebase";
import {
  getLoggedInUser,
  googleLoginInDB,
  loginUserInDB,
  logoutUserFromDB,
  registerUserInDB,
} from "../api/authApi";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const normalizeUser = (backendUser) => {
  if (!backendUser) return null;

  return {
    ...backendUser,
    displayName: backendUser.name,
    photoURL: backendUser.photoURL,
  };
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const createUser = async (name, email, photoURL, password) => {
    setAuthLoading(true);

    try {
      const data = await registerUserInDB({
        name,
        email,
        photoURL,
        password,
      });

      return data;
    } finally {
      setAuthLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    setAuthLoading(true);

    try {
      const data = await loginUserInDB({ email, password });
      setUser(normalizeUser(data.user));
      return data;
    } finally {
      setAuthLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setAuthLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      const data = await googleLoginInDB({
        name: firebaseUser.displayName || "StudyNook User",
        email: firebaseUser.email,
        photoURL:
          firebaseUser.photoURL ||
          "https://i.ibb.co/2KQnYp7/default-avatar.png",
      });

      setUser(normalizeUser(data.user));
      return data;
    } finally {
      setAuthLoading(false);
    }
  };

  const logoutUser = async () => {
    setAuthLoading(true);

    try {
      await logoutUserFromDB();

      try {
        await signOut(auth);
      } catch (error) {
        // Firebase signout may fail if user used email/password backend login.
      }

      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const data = await getLoggedInUser();
        setUser(normalizeUser(data.user));
      } catch (error) {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkLoggedInUser();
  }, []);

  const authInfo = {
    user,
    authLoading,
    createUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;