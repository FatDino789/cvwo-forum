import { FC, createContext, useContext, useState, ReactNode } from "react";
import { AuthContextType } from "../database/authentication-types";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [jwtToken, setJwtToken] = useState<string>(
    () => localStorage.getItem("jwtToken") || ""
  );

  return (
    <AuthContext.Provider value={{ jwtToken, setJwtToken }}>
      {children}
    </AuthContext.Provider>
  );
};
