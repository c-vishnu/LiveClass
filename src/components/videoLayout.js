import React, { useState } from "react";
import { Row, Col} from 'antd';
import '../App.css';
import { ReactComponent as Audio } from '../icons/Mic.svg';
import { ReactComponent as MuteAudio } from '../icons/mute.svg';
import { ReactComponent as Video } from '../icons/Video.svg';
import { ReactComponent as StopVideo } from '../icons/turnOfVideo.svg';
import { ReactComponent as ScreenShare } from '../icons/ShareScreen.svg';
import { ReactComponent as StopScreenShare } from '../icons/stopShareScreen.svg';
import { ReactComponent as Extra } from '../icons/Extra.svg';
import { ReactComponent as LeaveClass } from '../icons/LeaveC.svg';
import { ReactComponent as Participants } from '../icons/Participants.svg';
const VideoLayout = (props) => {

    const [mic, setMic] = useState(false);
    const [camera, setCamera] = useState(false);
    const [ShareScreen, setShareScreen] = useState(false);

    const setMicEnable = () => {
        setMic(!mic)
    };
    const setCameraEnable = () => {
        setCamera(!camera)
    };
    const setScreenShare = () => {
        setShareScreen(!ShareScreen)
    };
    return (
        <div className="App">
            <Row>
                <Col span={24}>
                    <div className={`${props.shrinkLayout ? "small-video" : "video-layout"}`}>
                        Col-24
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className={`${props.shrinkLayout ? "small-button-layout" : "button-layout"}`}>
                        <div className="foot-btn">
                            <button onClick={setMicEnable}>{mic ? <MuteAudio /> : <Audio />}</button>
                            <button onClick={setCameraEnable}>{camera ? <StopVideo /> : <Video />}</button>
                            <button onClick={setScreenShare}>{ShareScreen ? <StopScreenShare /> : <ScreenShare />}</button>
                            <button><Extra /></button>
                            <button><LeaveClass /></button>
                        </div>
                        <div className="participants-btn" >
                            <button><Participants /></button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default VideoLayout;