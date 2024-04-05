"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export default function Landing() {
  const router = useRouter();
  const [Headphone, setHeadphone] = useState(false);
  const camera = async () => {
    try {
      const newStream: MediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setTimeout(() => {
        setHeadphone(true);
      }, 3000);
    } catch (error) {
      console.error("Error accessing camera:", error);

      // Check if the error is due to user denying camera access
      if ((error as any).name === "NotAllowedError") {
        alert("camera permission is mendatory");
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      camera();
    }, 1000);
  }, [Headphone]);
  if (typeof window !== "undefined") {
    if (window.innerWidth <= 768) {
      return (
        <div
          style={{
            backgroundImage: 'url("finsbury/BG.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Headphone && (
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                height: "100vh",
                width: "100vw",
              }}
              onClick={()=>{
                return router.push('/home')
              }}
            >
              <p
                style={{
                  color: "white",
                  flexDirection: "column",
                  display: "flex",
                  padding: "30px",
                  textAlign: "end",
                }}
                onClick={()=>{
                  return router.push('/home')
                }}
              >
                Skip
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "150px",
                }}
              >
                <img
                  src="/rothamsted/Headphone_Icon.png"
                  height={100}
                  width={100}
                  style={{paddingBottom:45}}
                  alt="Headphone"
                />
                <p style={{ color: "white" }}>
                  THIS APP IS BEST EXPERIENCED 
                </p>
                <p style={{ color: "white" }}>WITH HEADPHONES</p>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <>
          <h2>Pls use mobile</h2>
        </>
      );
    }
  }
}
