"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { speciesList } from "../constant/species";
const Species = () => {
  const [species, setSpecies] = useState(null)
  const [showModal, setShowModal] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isDropped, setIsDropped] = useState(false);
  
  const audioUrl = "drop.wav";
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.play();
    const dropTimeout = setTimeout(() => {
      setIsDropped(true)
    }, 800);
    return () => {
      clearTimeout(dropTimeout);
      // Cleanup audio when component unmounts
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audioUrl]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  
  const staticYear = 2050;
  const formattedDateTime = currentDateTime.toLocaleString('en-US', dateOptions);
  const hour = currentDateTime.toLocaleString('en-US', options);

  const finalFormattedDate = formattedDateTime.replace(
    currentDateTime.getFullYear(),
    staticYear
  );
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const spec = urlParams.get("name");

    const speciesName = speciesList.data.find((obj) => obj.name === spec);

    if (speciesName) {
      setSpecies(speciesName);
    }
    return () => {
    };
  }, []);
  const handleClick = (side, future, data) => {
    console.log(side);
    if (data !== null && side !== null) {
      const videoElement = document.createElement("video");
      videoElement.src = side;
      videoElement.height = window.innerHeight;
      videoElement.width = window.innerWidth;
      videoElement.controls = true;
      videoElement.autoplay = true;

      const handleFullscreenChange = () => {
        if(document.fullScreenElement || document.webkitIsFullScreen == true || document.mozFullScreen || document.msFullscreenElement ){
        } else {
            document.body.removeChild(videoElement);
            window.location.href = `/form?future=${future}&species=${data.name}`;
            //do whatever you want on fullscreen close, like pause or mute
        }
      };
      videoElement.addEventListener("ended", () => {
        document.body.removeChild(videoElement);
        window.location.href = `/form?future=${future}&species=${data.name}`;
      });
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      videoElement.addEventListener("webkitfullscreenchange", handleFullscreenChange);
      videoElement.addEventListener("webkitendfullscreen", handleFullscreenChange);
      document.addEventListener("mozfullscreenchange", handleFullscreenChange);
      document.addEventListener("MSFullscreenChange", handleFullscreenChange);

      document.body.appendChild(videoElement);

      videoElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen", err);
      });
    }
  };

  const handleVideoEnd = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {species ? (
        <>
          <Modal
            className="bg-img background"
            show={showModal}
            onHide={handleModalClose}
          >
            <Modal.Body>
              <div style={{display:'flex',justifyContent:'center',textAlign:'center',marginTop:35,flexDirection:'column'}}>
              <h2>{finalFormattedDate}</h2>
              <h1 style={{fontSize:80,fontWeight:'bold'}}>{hour}</h1>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center">
                      <div
                        className="mb-3"
                        onClick={() => handleClick(species.bright, "bright", species)}
                        style={{
                          marginTop: '60%',
                          borderRadius: 12,
                          backgroundColor: isDropped ? '#e5edd6' : 'rgba(252, 252, 252, 0.0)',
                          transition: 'transform 0.5s ease',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          transform: isDropped ? 'translateY(80px)' : 'translateY(0)',
                          padding: 12,
                          fontSize: 20,
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <p style={{ fontSize: 18, fontWeight: 'bold' }}>Bright future</p>
                          <p style={{ marginRight: 5,color:'gray',fontSize:16 }}>now</p>
                        </div>
                        <p style={{ fontSize: 16 }}>We are contacting you from a bright future..</p>
                      </div>
                      <hr />
                      <div
                        onClick={() => handleClick(species.dark, "dark", species)}
                        style={{
                          borderRadius: 12,
                          backgroundColor: isDropped ? '#e5edd6' : 'rgba(252, 252, 252, 0.0)',
                          transition: 'transform 0.5s ease',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          transform: isDropped ? 'translateY(50px)' : 'translateY(0)',
                          padding: 12,
                          fontSize: 20,
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <p style={{ fontSize: 18, fontWeight: 'bold' }}>Dark future</p>
                          <p style={{ marginRight: 5,color:'gray',fontSize:16 }}>now</p>
                        </div>
                        <p style={{ fontSize: 16 }}>We are contacting you from a dark future..</p>
                      </div>
                    </div>
            </Modal.Body>
            <style>
              {`
                .bg-img{
                  background-image: url("rothamsted/gradient.webp");
                }
                .modal-content {
                  background-color: rgba(255, 255, 255, 0);
                  border: none;
                }
              `}
            </style>
          </Modal>
        </>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
};

export default Species;