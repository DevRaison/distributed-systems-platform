"use client";
import React, { createContext } from "react";

export const TelemetryContext = createContext({});

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  return (
    <TelemetryContext.Provider value={{}}>
      {children}
    </TelemetryContext.Provider>
  );
}
