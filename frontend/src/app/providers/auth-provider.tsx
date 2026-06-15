"use client";
import React, { createContext } from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}
