import { createContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = (props: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
};
