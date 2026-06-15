"use client";
import React, { createContext } from "react";
export const FeatureFlagContext = createContext({});
export function FeatureFlagProvider({ children }: { children: React.ReactNode }) {
  return <FeatureFlagContext.Provider value={{}}>{children}</FeatureFlagContext.Provider>;
}
