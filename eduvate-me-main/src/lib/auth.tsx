import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authAPI, getAuthToken } from "./api";

type User = {
  id: number;
  email: string;
  name?: string;
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
    const initAuth = async () => {
      try {
        const token = getAuthToken();
        if (token) {
          const data = await authAPI.getProfile();
          setUser(data.user);
        }
      } catch (e) {
        console.error('Failed to load user profile:', e);
        authAPI.signout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    const data = await authAPI.signin(email, password);
    setUser(data.user);
    localStorage.setItem(authStorageKey, JSON.stringify(data.user));
  };

  const signUp = async (email: string, password: string) => {
    const data = await authAPI.signup(email, password);
    setUser(data.user);
    localStorage.setItem(authStorageKey, JSON.stringify(data.user));
  };

  const signOut = () => {
    authAPI.signout();
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
