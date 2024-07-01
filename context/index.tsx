"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define types for your context
interface AppContextType {
    speciesArr: number[]; // Adjust this type as per your actual data
    setSpeciesArr: (arr: number[]) => void;
}

// Create context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
    const [speciesArr, setSpeciesArr] = useState<number[]>(() => {
        try {
            const saved = localStorage.getItem("speciesArr");
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Failed to parse localStorage item:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("speciesArr", JSON.stringify(speciesArr));
        } catch (error) {
            console.error("Failed to set localStorage item:", error);
        }
    }, [speciesArr]);

    return (
        <AppContext.Provider value={{ speciesArr, setSpeciesArr }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppWrapper");
    }
    return context;
}
