"use client";
import React, { useEffect, useState } from "react";
export default function Thankyou() {
  const [namedata, setname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState<any>('');
  const [process, setProcess] = useState(false);
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setProcess(true);
    try {
      const response = await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstname:namedata,lastname:lastname,email:email}),
      });
      const data = await response.json();
      if (data.success) {
        window.location.href = "/success";
      } else {
        setMessage(data.error);
        setError(true);
      }
    } catch (error) {
      setMessage(error);
    }
    setProcess(false);
  };
  
  return (
    <div
      className="background"
      style={{
        marginTop:60,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: 25,
      }}
    >
      <p style={{ fontSize: "35px", fontWeight: "bold" }}>Thank you!</p>
      <p>
      By connecting with your interspecies community and making this commitment you have contributed to the bountiful biodiversity of all our futures!
      </p>
      <form style={{ marginTop: 38 }}>
        <input type="text" onChange={(e) => setname(e.target.value)}  placeholder="First Name" name="name" />
        <input type="text" onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" name="lastname" />
        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" name="email" />
      </form>
      <div className="button-container">
        {
          error && (
            <p style={{color:'red'}}>{message}</p>
          )
        }
        <button
          className="button"
          style={{
            backgroundImage: `url("rothamsted/gradient.webp")`,
            borderRadius: "10px",
            padding: "10px",
            width: '100%',
            color:'#fff'
          }}
          onClick={process ? undefined : handleSubmit}
        >
          {process ? 'processing..' : 'SUBMIT'}
        </button>
      </div>
      <p style={{marginTop:35}}>
        <h3 style={{fontWeight:600}}>Disclaimer :</h3>
        By giving us your details you are consenting to join our mailing list in order to receive a limited number of emails from the species you have pledged to support. Following this we may send you occasional marketing emails on our activities. Your details will be held in compliance with GDPR and you can opt out any time. If you have any questions please contact info@furtherfield.org.
      </p>
    </div>
  );
}
