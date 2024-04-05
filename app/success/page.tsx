"use client";
import React, { useEffect, useState } from "react";
export default function Success() {
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
        <p style={{ fontSize: 16 }}>
          Your one small step can bring big changes in the future!
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
    href="https://docs.google.com/forms/d/e/1FAIpQLScw42T8EXUrIABs_pXj9dyht4PwiWJaaDHvRAjMPK9V9KwBKA/viewform"
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
