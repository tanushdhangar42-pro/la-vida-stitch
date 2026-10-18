import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { login, register, getSession, saveSession, clearSession } from "@/services/api";

// Keeps track of who is logged in. The JWT token comes from the Spring Boot backend.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSession()); // { name, email, role, token }

  // api.js fires this event when the server says the token is no longer valid.
  useEffect(() => {
    const onLogout = () => setUser(null);
    window.addEventListener("lavida:logout", onLogout);
    return () => window.removeEventListener("lavida:logout", onLogout);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAdmin: user?.role === "ADMIN",
      async signIn(email, password) {
        const session = await login(email.trim().toLowerCase(), password);
        saveSession(session);
        setUser(session);
      },
      async signUp(name, email, password) {
        const session = await register(name.trim(), email.trim().toLowerCase(), password);
        saveSession(session);
        setUser(session);
      },
      signOut() {
        clearSession();
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
