"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PickSlipContextType {
  isOpen: boolean;
  openPickSlip: () => void;
  closePickSlip: () => void;
}

const PickSlipContext = createContext<PickSlipContextType | undefined>(undefined);

export function PickSlipProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPickSlip = () => setIsOpen(true);
  const closePickSlip = () => setIsOpen(false);

  return (
    <PickSlipContext.Provider value={{ isOpen, openPickSlip, closePickSlip }}>
      {children}
    </PickSlipContext.Provider>
  );
}

export function usePickSlip() {
  const context = useContext(PickSlipContext);
  if (context === undefined) {
    throw new Error("usePickSlip must be used within a PickSlipProvider");
  }
  return context;
}
