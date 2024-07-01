"use client";
import { createContext,useContext,useState } from "react";
const AppContext = createContext<any>(undefined);

export function AppWrapper({children}:{
    children:React.ReactNode;
}){
   const [speciesArr, setSpeciesArr] = useState(50);
    return (
        <AppContext.Provider value={{speciesArr,setSpeciesArr}}>
        {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppWrapper");
    }
    return context;
}