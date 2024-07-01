"use client";
import { useAppContext } from "@/context";
export default function Test(){
    const {speciesArr,setSpeciesArr}=useAppContext();
    return (
        <div>
             {speciesArr} <p> test</p>
             <button onClick={()=>setSpeciesArr(20)}>Click</button>
        </div>
    )
}