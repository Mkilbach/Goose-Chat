import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../firebase";

type AuthContextValue = {
  user: User | null;
  initialAuthCheckFinished: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  initialAuthCheckFinished: false,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialAuthCheckFinished, setInitialAuthCheckFinished] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser);
      if (!initialAuthCheckFinished) setInitialAuthCheckFinished(true);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, initialAuthCheckFinished }}>{children}</AuthContext.Provider>;
};
