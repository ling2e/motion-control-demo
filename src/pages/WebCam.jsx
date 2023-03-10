import { useEffect, useRef } from "react";
import Webcam from "react-webcam";
// ============= mediapipe ===========
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
// ========== Other =============
import { onResults } from "../assets/Js";

export default function WebCam({swiper}) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let camera = null;

  const videoConstraints = {
    facingMode: "user",
  };

  let canvasStyles = {
    
  }

  //   hands detection setup
  useEffect(() => {
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
    hands.onResults((res) => onResults(webcamRef, canvasRef, res));

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
  }, []);

  return (
    <>
      <div className="row justify-content-between">
        <Webcam
          ref={webcamRef}
          className="col border "
          mirrored={true}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <canvas
          className="output_canvas col border d-none"
          style={canvasStyles}
          ref={canvasRef}
        ></canvas>
      </div>
    </>
  );
}
