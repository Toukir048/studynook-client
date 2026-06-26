import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
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

const defaultPhotoURL = "https://i.ibb.co/2KQnYp7/default-avatar.png";

const normalizeUser = (backendUser) => {
  if (!backendUser) return null;

  return {
    ...backendUser,
    displayName: backendUser.name || backendUser.displayName,
    photoURL: backendUser.photoURL || defaultPhotoURL,
  };
};

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("studynook-user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getStoredUser);
  const [authLoading, setAuthLoading] = useState(true);

  const setUser = (userData) => {
    const normalizedUser = normalizeUser(userData);

    setUserState(normalizedUser);

    if (normalizedUser) {
      localStorage.setItem("studynook-user", JSON.stringify(normalizedUser));
    } else {
      localStorage.removeItem("studynook-user");
    }
  };

  const createUser = async (name, email, photoURL, password) => {
    setAuthLoading(true);

    try {
      const firebaseCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(firebaseCredential.user, {
        displayName: name,
        photoURL: photoURL || defaultPhotoURL,
      });

      const data = await registerUserInDB({
        name,
        email,
        photoURL: photoURL || defaultPhotoURL,
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

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch {
        try {
          const firebaseCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          await updateProfile(firebaseCredential.user, {
            displayName: data.user?.name || "StudyNook User",
            photoURL: data.user?.photoURL || defaultPhotoURL,
          });
        } catch {
          // Firebase persistence failed, but backend login is already successful.
        }
      }

      setUser(data.user);
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
        photoURL: firebaseUser.photoURL || defaultPhotoURL,
      });

      setUser(data.user);
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
      } catch {
        // Ignore Firebase logout error.
      }

      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setAuthLoading(true);

      try {
        if (firebaseUser?.email) {
          const data = await googleLoginInDB({
            name: firebaseUser.displayName || "StudyNook User",
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL || defaultPhotoURL,
          });

          setUser(data.user);
          return;
        }

        const data = await getLoggedInUser();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
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