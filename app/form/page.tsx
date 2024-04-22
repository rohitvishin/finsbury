"use client";
import React, { useEffect, useState } from "react";
export default function Form() {
  const [speId, setSpeId] = useState<any>(null);
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const species = urlParams.get("species");
    setSpeId(species)
  }, [])
  
  return (
    <div
      style={{
        backgroundImage: `url("rothamsted/gradient.webp")`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p
        onClick={()=>window.location.href='/camera?spe_id='+speId}
          style={{
            backgroundColor:'#fff',
            borderRadius: "10px",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          CONNECT WITH ANOTHER SPECIES
        </p>
        <p
        onClick={()=>window.location.href='/contact'}
          style={{
            backgroundColor:'#fff',
            marginTop: "20px",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          SIGN THE TREATY
        </p>
      </div>
    </div>
  );
}
