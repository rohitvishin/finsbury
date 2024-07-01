"use client";
import { useAppContext } from "@/context";

export default function Test() {
    const { speciesArr, setSpeciesArr } = useAppContext();

    const handleClick = () => {
        // Flatten the array when updating the state
        setSpeciesArr([...speciesArr, 1, 2, 3,4,5,6,7]);
    };

    return (
        <div>
            {/* Render array elements properly */}
            <p>{speciesArr.join(", ")}</p>
            <button onClick={handleClick}>Click</button>
        </div>
    );
}
