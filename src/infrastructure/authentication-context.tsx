import { createContext, useContext, useState, ReactNode } from "react";

import { AuthContextType } from "../database/authentication-types";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [jwtToken, setJwtToken] = useState<string>(() => {
    return localStorage.getItem("jwtToken") || "";
  });

  return (
    <AuthContext.Provider value={{ jwtToken, setJwtToken }}>
      {children}
    </AuthContext.Provider>
  );
};
