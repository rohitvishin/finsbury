"use client";
import React, { useEffect, useState } from "react";
import { speciesList } from "../constant/species";
export default function Contact(){
    const [species, setspecies] = useState<any | null>(null);
    useEffect(() => {
      setspecies(speciesList.data);
    }, [])
    
  return (
    <div className="background" style={{
        backgroundImage: 'url("rothamsted/gradient.webp")',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <div style={{marginBottom:25,marginTop:45,width:'340px'}}>
        <img
        src="rothamsted/Text_WelcomeTo.webp"
        style={{ height: 100, width: 350 }}
      />
        <p style={{padding:15}}>Make a pledge for your favourite species</p>
        </div>
        
        <div style={{maxHeight: '70%', overflowY: 'auto',padding:7}}>
        {
          speciesList.data.map((item,index)=>(
            <a key={index} href={'/thankyou?name='+item.name} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{margin:15,display:"flex",flexDirection:"row",backgroundColor:'#ebf5ca',padding:3,borderRadius:10}}>
              <img src={item.image} alt={item.name} height={80} width={80} />
              <div style={{marginLeft:10,marginRight:5,width:230,textAlign:'left'}}>
              <p>{item.pledge_line}</p>
              </div>
              <div style={{fontSize:30,padding:15,width:50,display:"flex",flexDirection:"row",backgroundColor:'#c1caa5',borderRadius:10}}>
                <a href={item.pledge_link}>?</a>                
              </div>
            </div>
              
            </a>
          ))
        }
        </div>

    </div>
  );
};
