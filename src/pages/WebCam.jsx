import Webcam from "react-webcam";
import { useEffect, useRef } from "react";
import * as cam from "@mediapipe/camera_utils";
import { Hands } from "@mediapipe/hands";
import * as mHands from "@mediapipe/hands";
import * as mDraw from "@mediapipe/drawing_utils";

export default function WebCam(params) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let camera = null;
  //   const connect = drawConnectors;

  const videoConstraints = {
    facingMode: "user",
  };

  function onResults(results) {
    // const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        // console.log(landmarks)
        mDraw.drawConnectors(canvasCtx, landmarks, mHands.HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        mDraw.drawLandmarks(canvasCtx, landmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });
      }
      canvasCtx.restore();
    }
  }

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    hands.onResults(onResults);

    let currCamRef = webcamRef.current;

    if (typeof currCamRef !== "undefined" && currCamRef !== null) {
      camera = new cam.Camera(currCamRef.video, {
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
          className="col-5 border d-hidden d-none"
          mirrored={true}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <canvas className="output_canvas col border" ref={canvasRef}></canvas>
      </div>
    </>
  );
}
