"use client";
import React, { useEffect,useRef, useState } from "react";
export default function Success() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      // Start auto-scrolling interval
      const interval = setInterval(() => {
        if (container.scrollTop !== container.scrollHeight - container.clientHeight) {
          container.scrollTop += 1;
        } else {
          clearInterval(interval); // Stop scrolling when reached the bottom
        }
      }, 50); // Adjust scroll speed as needed

      setScrollInterval(interval);

      // Clean up on unmount
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, []);

  const handleTouchStart = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
    }
  };


  return (
    <div>
      <div
      style={{
        marginTop: 100,
        marginLeft: 20,
        marginRight: 20,
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        borderRadius: 10,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <style>
          {`
              body {
                  background-color: #f0f0f0;
              }
          `}
        </style>
        <p style={{ fontSize: "40px", fontWeight: "bold", marginTop: 50 }}>
          Success!
        </p>
        <img src="Check_Icon.png" style={{ height: "100px", margin: 30 }} />
        <p style={{ fontSize: 20 }}>Thank you for pledging</p>
        <p style={{ fontSize: 16,height:150,overflowY: 'auto' }} onTouchStart={handleTouchStart} ref={containerRef}>
          Your one small step can bring big changes in the future!
          <div style={{margin: '10px 10px 15px',display: 'flex',flexDirection: 'column',justifyContent: 'center'}}>
            <img src="finsbury/furtherfield.png" style={{ height: "80px"}} />
            <strong>Supported By</strong>
            <img src="finsbury/new_design_congress.png" style={{ height: "100px"}} />
            <img src="finsbury/haringey.png" style={{ height: "35px",marginBottom:15 }} />
            <img src="finsbury/creatures.jpeg" style={{ height: "25px" }} />
          </div>
          The Treaty of Finsbury Park 2025 is based on an initial concept by Ruth Catlow and Cade Diem
          <br/>
          <br/> Co-authored by Ruth Catlow and Charlotte Frost with Bea Xu, Max Dovey, and Leky Leidecker with contributions by hundreds of players and hosts.<br/><br/> Mentor species illustrations are by Sajan Rai, music is by Matt Catlow, and digital face filters by PopulAR.<br/><br/> This app also includes performances by Viktor Bedö and Kate Genevieve and park sounds by <a href="https://freesound.org/people/loljames/sounds/95292">loljames on freesound</a> under a CC 3.0 license.<br/><br/>
          The project was developed within, and partly funded by, the CreaTures project, with embedded researchers Ann Light and Lara Houston.<br/><br/> The Creative Practices for Transformational Futures (CreaTures) project received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 870759. The Treaty of Finsbury Park was also supported by Arts Council England, and Haringey Council.
          
        </p>
      </div>
      <p
        style={{
          marginTop: 5,
          backgroundImage: `url("rothamsted/gradient.webp")`,
          padding: "10px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          color: "#fff",
        }}
      >
        Share the app with a friend
      </p>
    </div>
    <a
    href="https://docs.google.com/forms/d/e/1FAIpQLScJTjECZjADr0enkSsgQdHKR1YdEuIakSpCUOWOAfomRr_lsA/viewform"
        style={{
          marginTop: 15,
          marginLeft:20,
          marginRight:20,
          borderRadius:10,
          padding: "10px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          border:'1px solid #46df46'
        }}
      >
        Feedback on the experience
      </a>
    </div>
  );
}
