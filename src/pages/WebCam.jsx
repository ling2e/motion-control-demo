import React, { useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Webcam from "react-webcam";

export default function WebCam() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const videoConstraints = {
    facingMode: "user",
    aspectRatio: 1.777777778,
    height: 844,
    width: 300,
  };

//   const buttonClicked  = () =>{
//     let curWebcam = webcamRef.current;
//     mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
//         mimeType: "video/mp4"
//       });
//       mediaRecorderRef.current.addEventListener(
//         "dataavailable",
//         handleDataAvailable
//       );
//       mediaRecorderRef.current.start();
//     console.log(mediaRecorderRef)
//   }

    const handleStartCaptureClick = React.useCallback(() => {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );

    const handleStopCaptureClick = React.useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
      console.log(recordedChunks)
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleDownload = React.useCallback(() => {
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        const url = URL.createObjectURL(blob);
        // console.log(url)
        console.log(blob.arrayBuffer())
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "react-webcam-stream-capture.webm";
        // a.click();
        // console.log(a)
        window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
      }
    }, [recordedChunks]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        width={"300"}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      ></Webcam>

      {/* <Button className="w-100 d-block fw-bold" onClick={buttonClicked}>Click me</Button> */}

      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
    </>
  );
}
