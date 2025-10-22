import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("activeUser")) || null
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("activeUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("activeUser");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
