import React from "react";
import { Navigate, useLocation } from "react-router-dom";

type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const authStorageKey = "eduvate_auth_user";

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(authStorageKey);
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, _password: string) => {
    // mock sign in — replace with real API call
    const u = { email };
    localStorage.setItem(authStorageKey, JSON.stringify(u));
    setUser(u);
  };

  const signUp = async (email: string, _password: string) => {
    // mock sign up — replace with real API call
    const u = { email };
    localStorage.setItem(authStorageKey, JSON.stringify(u));
    setUser(u);
  };

  const signOut = () => {
    localStorage.removeItem(authStorageKey);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export const RequireAuth: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const auth = React.useContext(AuthContext);
  const location = useLocation();

  if (!auth) {
    // should not happen, but be safe
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  if (!auth.user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
