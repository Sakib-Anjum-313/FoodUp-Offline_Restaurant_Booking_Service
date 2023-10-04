import React, { createContext } from "react";
import useFireBase from "../Hooks/useFirebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  const authInfo = useFireBase();
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
