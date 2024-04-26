"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { speciesList } from "../constant/species";
export default function Thankyou() {
  const [namedata, setname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState(false);
  const [process, setProcess] = useState(false);
  const handleSubmit=async()=>{
    var data = JSON.stringify({
      "collection": "users",
      "database": "sample_mflix",
      "dataSource": "Cluster0",
      "projection": {
          "_id": 1
      }
  });
   await axios.post('https://ap-south-1.aws.data.mongodb-api.com/app/data-raxlfyz/endpoint/data/v1/action/findOne', data,{
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'zxteh5xGOHDaq0s5z61U7F5t8aoXMTqUcVeHtV64BT799glxIXj1vzKq2kxu6sQE',
      }
    })
    .then(response => {
      console.log(response.data);
      setProcess(false);
    }).catch((err)=>{
      setProcess(false);
    });
  }
  useEffect(() => {
    handleSubmit();
  }, [])
  
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
        By giving us your details you are consenting to join our mailing list in order to receive a limited number of emails from the species you have pledged to support. Following this we may send you occasional marketing emails on our activities. Your details will be held in compliance with GDPR and you can opt out any time. If you have any questions please contact info@furtherfield.org.
      </p>
    </div>
  );
}
