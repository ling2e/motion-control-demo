import ImgSlider from "./component/ImgSlider";
import Navigation from "./component/Navigation";
import {Routes , Route} from "react-router-dom";
import WebCam from "./pages/WebCam.jsx";

export default function App() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm overflowX-hidden">
            <Navigation></Navigation>
            <h1 className="text-center fs-1 bg-primary">Demo</h1>
            <Routes>
              <Route path="/" element={<ImgSlider></ImgSlider>} />
              <Route path="/WebCam" element={<WebCam></WebCam>} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
