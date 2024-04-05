"use client";
import React, { useState } from "react";
import axios from "axios";
import { speciesList } from "../constant/species";
export default function Thankyou() {
  const [namedata, setname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState(false);
  const [process, setProcess] = useState(false);
  const handleSubmit=async()=>{
    console.log("form")
    if(namedata=="" || lastname=="" || email==""){
      setError(true);
      return;
    }else{
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const spec = urlParams.get("name");
      const speciesName:any = speciesList.data.find((obj) => obj.name === spec);
      setProcess(true);
      setError(false);
      const formdata= new FormData();
      formdata.append('NAME',namedata)
      formdata.append('LAST NAME',lastname)
      formdata.append('EMAIL',email)
      formdata.append('PLEDGE',speciesName?.pledge_line)
      await axios.post('https://sheet.best/api/sheets/c5f8fa4d-7c21-4c76-88f3-61450c01bda2', formdata)
      .then(response => {
        console.log(response);
        setProcess(false);
      }).catch((err)=>{
        setProcess(false);
      });
      window.location.href = "/success";
    }
  }
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
        By making this pledge you have taken a positive step forward to a bright
        future. now submit the form below to complete your confirmation
      </p>
      <form style={{ marginTop: 38 }}>
        <input type="text" onChange={(e) => setname(e.target.value)}  placeholder="First Name" name="name" />
        <input type="text" onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" name="lastname" />
        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" name="email" />
      </form>
      <div className="button-container">
        {
          error && (
            <p style={{color:'red'}}>All fields are mendatory</p>
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
        By giving us your details you are consenting to receive a limited number of emails from the species you have pledged to support. These will be sent via Furtherfield but you will not be added to any marketing email lists at Furtherfield or Rothamsted Research. Your details will be held and deleted in compliance with GDPR. If you have any questions please contact info@furtherfield.org.
      </p>
    </div>
  );
}
