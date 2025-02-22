import {
  FC,
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type User = {
  id: string;
  username: string;
  email: string;
  icon_index: number;
  color_index: number;
  likes: string[];
};

export type AuthContextType = {
  jwtToken: string;
  setJwtToken: (token: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
};

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

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (jwtToken) {
      localStorage.setItem("jwtToken", jwtToken);
    } else {
      localStorage.removeItem("jwtToken");
    }
  }, [jwtToken]);

  return (
    <AuthContext.Provider
      value={{
        jwtToken,
        setJwtToken,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
