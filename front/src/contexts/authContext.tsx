import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, FirebaseUser, googleProvider } from "../firebase";

type ContextType = {
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void> | undefined;
  updatePassword: (password: string) => Promise<void> | undefined;
  loginWithGoogle: () => Promise<any>;
  currentUser: FirebaseUser | null;
};
const defaultValue = {
  signUp: () => new Promise<any>((resolve, reject) => {}),
  signIn: () => new Promise<any>((resolve, reject) => {}),
  signOut: () => new Promise<void>((resolve, reject) => {}),
  resetPassword: () => new Promise<void>((resolve, reject) => {}),
  updateEmail: () => new Promise<void>((resolve, reject) => {}),
  updatePassword: () => new Promise<void>((resolve, reject) => {}),
  loginWithGoogle: () => new Promise<any>((resolve, reject) => {}),
  currentUser: null,
};

const AuthContext = createContext<ContextType>(defaultValue);

export const useAuth = () => {
  return useContext(AuthContext);
};

export type Props = {
  children: ReactNode;
};

export const AuthProvider = (props: Props) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  function signUp(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signIn(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signOut() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email: string) {
    return currentUser?.updateEmail(email);
  }

  function updatePassword(password: string) {
    return currentUser?.updatePassword(password);
  }

  function loginWithGoogle() {
    return auth.signInWithPopup(googleProvider);
  }

  const value = {
    currentUser,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateEmail,
    updatePassword,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
