import { Camera } from "@mediapipe/camera_utils";
import { Hands } from "@mediapipe/hands";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import ImgSlider from "../component/ImgSlider";

import { webcamResult } from "../assets/Js";

export default function Combine() {
  const [isReady, setIsReady] = useState(false);
  const [swiper, setSwiper] = useState(null);

  function handleClick(sw) {
    return setSwiper(sw);
  }

  const webcamRef = useRef(null);
  let camera = null;

  const videoConstraints = {
    facingMode: "user",
  };

  useEffect(()=>{
    console.log("Camera is Preparing....")
    return console.log("Camera is Ready!!!")
  },[isReady])
  //   hands detection setup
  try{
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });
    hands.onResults((res) => {
      if(!isReady) setIsReady(true)
      let handsAction = webcamResult(res) || null;
      if(!handsAction) return
      let action = handsAction.action

      if (action === "moveNext") return swiper.slideNext();
      else if (action === "movePrev") return swiper.slidePrev();
    });

    let currCamRef = webcamRef.current;
    if (typeof currCamRef !== "undefined" && currCamRef !== null) {
      camera = new Camera(currCamRef.video, {
        onFrame: async () => {
          await hands.send({ image: currCamRef.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }catch(err){
    // console.log(err)
  }


  return (
    <>
      <ImgSlider handlerClick={handleClick}></ImgSlider>
      <Webcam
        ref={webcamRef}
        className="col border d-none"
        mirrored={true}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </>
  );
}
