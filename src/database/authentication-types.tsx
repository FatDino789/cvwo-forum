export type AuthContextType = {
  jwtToken: string;
  setJwtToken: (token: string) => void;
};
