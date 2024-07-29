import React, { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("isLogin");
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem("isLogin", JSON.stringify(auth));
    } else {
      localStorage.removeItem("isLogin");
    }
  }, [auth]);

  const clearAuth = () => {
    setAuth(null);
    localStorage.removeItem("isLogin");
  };

  return (
    <MyContext.Provider value={{ auth, setAuth, clearAuth }}>
      {children}
    </MyContext.Provider>
  );
};

export default AuthProvider;
