import React, { useState } from "react";
import { Row, Col } from "antd";
import "./App.css";
import VideoLayout from "./components/videoLayout";
import SideBar from "./components/sideBar";


function App() {

  const [child, setChild] = useState(false);

  return (
    <div className="App">
      <Row>
        <Col span={18} className="classDetails">
          <div className="head-grid">
            <div className="Course-img"></div>
            <div className="details-grid">
            <h5>Course Title</h5>
            <p>Video Title</p>
            </div>
          </div>
          <div className="head-grid">
            <div className="faculty-img"></div>
            <div className="details-grid">
            <h5>Faculity Name</h5>
            <p>Watch time</p>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <SideBar setChild={setChild} />
        </Col>
      </Row>
      <VideoLayout shrinkLayout={child} />
    </div>
  );
}

export default App;
