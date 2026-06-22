import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  auth,
  db,
  googleProvider,
} from "../firebase/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // EMAIL SIGNUP
  const signup = async (
    email,
    password,
    additionalData = {}
  ) => {
    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await setDoc(
      doc(db, "users", result.user.uid),
      {
        uid: result.user.uid,
        email: result.user.email,
        createdAt: serverTimestamp(),
        ...additionalData,
      }
    );

    return result.user;
  };

  // EMAIL LOGIN
  const login = async (
    email,
    password
  ) => {
    const result =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    return result.user;
  };

  // GOOGLE LOGIN / SIGNUP
  const googleLogin = async () => {
    const result =
      await signInWithPopup(
        auth,
        googleProvider
      );

    await setDoc(
      doc(db, "users", result.user.uid),
      {
        uid: result.user.uid,
        email: result.user.email,
        name:
          result.user.displayName || "",
        photo:
          result.user.photoURL || "",
        createdAt: serverTimestamp(),
      },
      {
        merge: true,
      }
    );

    return result.user;
  };

  // LOGOUT
  const logout = async () => {
    await signOut(auth);
  };

  // LISTENER
  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);

  const value = {
    user,
    signup,
    login,
    logout,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}