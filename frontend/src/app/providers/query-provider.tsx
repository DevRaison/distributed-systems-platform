"use client";
import React, { createContext } from "react";

export const QueryContext = createContext({});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryContext.Provider value={{}}>
      {children}
    </QueryContext.Provider>
  );
}
