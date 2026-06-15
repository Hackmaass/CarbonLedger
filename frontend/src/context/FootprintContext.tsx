import { createContext, useContext, ReactNode } from "react";
import { useFootprint } from "../hooks/useFootprint";

type FootprintContextType = ReturnType<typeof useFootprint>;

const FootprintContext = createContext<FootprintContextType | undefined>(undefined);

export function FootprintProvider({ children }: { children: ReactNode }) {
  const footprintState = useFootprint();
  return (
    <FootprintContext.Provider value={footprintState}>
      {children}
    </FootprintContext.Provider>
  );
}

export function useGlobalFootprint() {
  const context = useContext(FootprintContext);
  if (context === undefined) {
    throw new Error("useGlobalFootprint must be used within a FootprintProvider");
  }
  return context;
}
