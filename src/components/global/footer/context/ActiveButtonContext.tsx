import React, { createContext, useContext, useState, ReactNode } from "react";

interface ActiveButtonContextProps {
    activeButton: string;
    setActiveButton: (label: string) => void;
}

const ActiveButtonContext = createContext<ActiveButtonContextProps | undefined>(undefined);

export function ActiveButtonProvider({ children }: { children: ReactNode }) {
    const [activeButton, setActiveButton] = useState<string>("Home");

    return (
        <ActiveButtonContext.Provider value={{ activeButton, setActiveButton }}>
            {children}
        </ActiveButtonContext.Provider>
    );
}

export function useActiveButton() {
    const context = useContext(ActiveButtonContext);
    if (!context) {
        throw new Error("useActiveButton must be used within an ActiveButtonProvider");
    }
    return context;
}
