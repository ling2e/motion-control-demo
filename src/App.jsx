import ImgSlider from "./component/ImgSlider";
import Navigation from "./component/Navigation";
import { Routes, Route } from "react-router-dom";
import { useRef , useState } from "react";
import { Button } from "react-bootstrap";

import Combine from "./pages/Combine";
import WebCam from "./pages/WebCam.jsx";


export default function App() {

  const [swiper , setSwiper] = useState(null)

  function handleClick(sw){
    return setSwiper(sw)
    
  }

  return (
    <>
      {/* <Button onClick={()=> swiper.slidePrev()}>Prev</Button>
      <Button onClick={()=> swiper.slideNext()}>Next</Button> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm overflowX-hidden">
            <Navigation></Navigation>
            <h1 className="text-center fs-1 bg-primary">Demo</h1>
            <Routes>
              <Route path="/" element={<Combine ></Combine>} />
              <Route path="/WebCam" element={<WebCam ></WebCam>} />
              <Route path="/Combine" element={<ImgSlider handlerClick={handleClick}></ImgSlider>} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

