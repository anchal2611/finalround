import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
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

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  async function createUserDocument(
    firebaseUser,
    extraData = {}
  ) {
    try {
      const userRef = doc(
        db,
        "users",
        firebaseUser.uid
      );

      const userSnap =
        await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: firebaseUser.uid,

          email:
            firebaseUser.email || "",

          displayName:
            firebaseUser.displayName ||
            extraData.name ||
            "",

          createdAt:
            new Date().toISOString(),

          // Resume

          resumeUploaded: false,
          resumeUrl: "",

          resumeScore: 0,
          atsScore: 0,

          strengths: [],
          improvements: [],

          // Dashboard Stats

          interviewsCompleted: 0,
          totalSessions: 0,
          averageScore: 0,

          // User Info

          roleType:
            extraData.roleType ||
            "Student",

          targetRole:
            extraData.targetRole ||
            "Software Engineer",
        });
      }
    } catch (error) {
      console.error(
        "Create user doc error:",
        error
      );
    }
  }

  async function signup(
    email,
    password,
    userData = {}
  ) {
    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await createUserDocument(
      result.user,
      userData
    );

    return result;
  }

  async function login(
    email,
    password
  ) {
    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  async function googleLogin() {
    const result =
      await signInWithPopup(
        auth,
        googleProvider
      );

    await createUserDocument(
      result.user
    );

    return result;
  }

  async function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          if (firebaseUser) {
            await createUserDocument(
              firebaseUser
            );
          }

          setUser(firebaseUser);
          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,

    signup,
    login,
    logout,
    googleLogin,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {!loading &&
        children}
    </AuthContext.Provider>
  );
}