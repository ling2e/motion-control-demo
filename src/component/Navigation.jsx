import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <Nav
        defaultActiveKey="/home"
        as="ul"
        // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item as="li">
          <Link to="/" className="nav-link">Home</Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Link to="/Webcam" className="nav-link">WebCam</Link>
        </Nav.Item>
      </Nav>
    </>
  );
}
