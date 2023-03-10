import {
  drawLandmarks,
  drawConnectors,
  drawRectangle,
} from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";

export function onResults(webcamRef, canvasRef, results) {
  try {
    // init webcam width and height
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // set canvas width and height same as webcam
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    // show the webcam frame on canvas
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

    if (results.multiHandLandmarks.length) {
      let hands = results.multiHandLandmarks[0];

      // draw the hand landmarks
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 2,
        });
        drawLandmarks(canvasCtx, landmarks, {
          color: "#FF0000",
          lineWidth: 0,
        });
        // drawRectangle(canvasCtx, landmarks, {
        //   color: "#FF0000",
        //   lineWidth: 0.5,
        // });
      }
      canvasCtx.restore();

      // detect left or right hand
      if (
        results.multiHandedness[0].label === "Left" &&
        checkHandPose(results, "left")
      ) {
        if (hands[8].x > 0.5 && hands[12].x < 1) return sliderGoNext();
      } else if (
        results.multiHandedness[0].label === "Right" &&
        checkHandPose(results, "right")
      ) {
        if (hands[8].x < 0.5 && hands[12].x > 0) return sliderGoPrev();
      }
    }
  } catch (err) {
    console.log(err);
  }
}

// detect hands pose is correct or not
function checkHandPose(results, whichHands) {
  let hands = results.multiHandLandmarks[0];

  // detect hand facing
  if (
    (whichHands.toLowerCase() == "right" && hands[5].x < hands[17].x) ||
    (whichHands.toLowerCase() == "left" && hands[5].x > hands[17].x)
  ) {
    // check hands pose
    if (
      hands[8].y < hands[6].y &&
      hands[12].y < hands[10].y &&
      hands[16].y > hands[14].y &&
      hands[20].y > hands[18].y
    ) {
      // check finger is stick or not
      if (
        (whichHands.toLowerCase() == "left" &&
          hands[8].x - hands[12].x < 0.043) ||
        (whichHands.toLowerCase() == "right" &&
          hands[12].x - hands[8].x < 0.043)
      )
        return true;
    }
  }
}

export function webcamResult(results,swiper) {

  if (results.multiHandLandmarks.length) {
    let hands = results.multiHandLandmarks[0];

    // detect left or right hand
    if ( results.multiHandedness[0].label === "Left" && checkHandPose(results, "left") ) {
      if (hands[8].x > 0.5 && hands[12].x < 1) return {action : "moveNext"};
    } else if ( results.multiHandedness[0].label === "Right" && checkHandPose(results, "right")
    ) { 
      if (hands[8].x < 0.5 && hands[12].x > 0) return {action : "movePrev"};
    }
  }

}

export function sliderGoNext(sw=null) {
  console.log("Nxt");
}
export function sliderGoPrev(sw = null) {
  console.log("Prev");
}
