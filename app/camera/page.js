"use client";
import { useState, useEffect, useRef } from "react";
import "../camera.css";
import { speciesList } from "../constant/species";
import { useRouter } from "next/navigation";
import { useStore } from '../../lib/useStore'
export default function Camera() {
  const router = useRouter();
  const videoRef = useRef(null);
  const overlayVideo = useRef(null);
  const overlayImg = useRef(null);
  const overlayImg1 = useRef(null);
  const [stream, setStream] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isBarcode, setIsBarcode] = useState(false);
  const [isTapON, setIsTapON] = useState(false);
  const [randomSpecies, setRandomSpecies] = useState(false);
  const [species, setSpecies] = useState(null);
  const [clickIcon, setClickIcon] = useState(false);
  const value = useStore((state) => state.value);
  const setValue = useStore((state) => state.setValue);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const spec_id = urlParams.get("spe_id") ? parseInt(urlParams.get("spe_id")):0;
    const idsToAvoid = spec_id !== 0 ? [...value, spec_id] : value;
    const filteredSpeciesList = speciesList.data.filter(species => !idsToAvoid.includes(species.id));
    if(filteredSpeciesList.length>0){
      const randomIndex = Math.floor(Math.random() * filteredSpeciesList.length);
      const randomSpecie = filteredSpeciesList.data[randomIndex];
      setSpecies(randomSpecie);
      console.log(randomSpecie)
    }
    if (spec_id !== 0) {
      setValue(prevValue => [...new Set([...prevValue, spec_id])]); // Append new ID, avoid duplicates
    }
    console.log('inside camera')
  }, []);

  const startCamera = async () => {
    setIsConnecting(true);

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        setStream(newStream);

        setTimeout(() => {
          setIsConnecting(false);
          setIsTapON(true);
        }, 3000);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);

      if (error.name === "NotAllowedError") {
        setIsConnecting(false);
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      setStream(null);
    }
  };

  const handleCameraTap = () => {
    setIsTapON(false);
    console.log("Camera tapped, open scanner!");
    setIsBarcode(true);

    setTimeout(() => {
      setIsBarcode(false);
      setRandomSpecies(true);
    }, 6000);
  };
  const playVideo = () => {
    setClickIcon(true);
    const videoElement = document.createElement("video");
    videoElement.src = species.intro;
    videoElement.height = window.innerHeight;
    videoElement.width = window.innerWidth;
    videoElement.controls = true;
    videoElement.autoplay = true;

    const handleFullscreenChange = () => {
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ) {
      } else {
        document.body.removeChild(videoElement);
        router.push("/form?species=" + species.id);
      }
    };
    videoElement.addEventListener("ended", () => {
      document.body.removeChild(videoElement);
      router.push("/form?species=" + species.id);
    });
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    videoElement.addEventListener(
      "webkitfullscreenchange",
      handleFullscreenChange
    );
    videoElement.addEventListener("webkitendfullscreen", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    document.body.appendChild(videoElement);

    videoElement.requestFullscreen().catch((err) => {
      console.error("Error attempting to enable fullscreen", err);
    });
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    let hideTimeout;

    if (!isConnecting) {
      hideTimeout = setTimeout(() => {
        if (overlayImg.current) {
          overlayImg.current.style.display = "none";
        }
      }, 100);
    }

    return () => {
      clearTimeout(hideTimeout);
    };
  }, [isConnecting]);

  useEffect(() => {
    let hideTimeout;

    if (!isTapON) {
      hideTimeout = setTimeout(() => {
        if (overlayImg1.current) {
          overlayImg1.current.style.display = "none";
        }
      }, 100);
    }

    return () => {
      clearTimeout(hideTimeout);
    };
  }, [isTapON]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <style>
        {`
                body{
                  background-color:#000;
                }
               
              `}
      </style>
      {randomSpecies ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100vw", height: "100vh" }}
            onClick={playVideo}
          />
          <div className="connecting">
            <img
              src={species.image}
              alt={species.name}
              className="overlayImage"
              style={{
                cursor: "pointer",
                height: "230px",
                width: "230px",
                padding: "20px",
                borderRadius: "10px",
              }}
            />
            {clickIcon ? (
              <p className="connectingDots" style={{ fontSize: 14 }}>
              CONNECTING
            </p>
            ) : (
              <p className="connectingText" style={{ fontSize: 14 }}>
                TAP TO CONNECT
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <video
            onClick={handleCameraTap}
            onTouchStart={handleCameraTap}
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100vw", height: "100vh" }}
          />

          {isConnecting && (
            <>
              <div className="connecting">
                <img
                  ref={overlayImg}
                  src="Dial_Flat_Icon.gif" // Replace with the URL of your transparent image
                  alt="Overlay"
                  className="overlayImage"
                />
              </div>
              <p className="connectingText">CONNECTING TO SENTIENCE DIAL..</p>
            </>
          )}

          {isTapON && (
            <>
              <div className="connecting">
                <img
                  ref={overlayImg1}
                  src="White_box.png" // Replace with the URL of your transparent image
                  alt="Overlay"
                  className="overlayImage"
                  style={{ height: "700px", width: "340px" }}
                />
              </div>
            </>
          )}

          {isBarcode && (
            <div className="barCode">
              <img
                ref={overlayVideo}
                src="SentienceDial_ANM.gif"
                className="videoOverlay"
                style={{ height: "700px", width: "340px" }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
