import React, { useState } from "react";
import {Row, Col, Button, Space} from 'antd';
import '../App.css';
import { ReactComponent as Audio} from '../icons/Mic.svg';
import { ReactComponent as MuteAudio} from '../icons/mute.svg';
import { ReactComponent as Video} from '../icons/Video.svg';
import { ReactComponent as StopVideo} from '../icons/turnOfVideo.svg';
import { ReactComponent as ScreenShare} from '../icons/ShareScreen.svg';
import { ReactComponent as StopScreenShare} from '../icons/stopShareScreen.svg';
import { ReactComponent as Extra} from '../icons/Extra.svg';
import { ReactComponent as LeaveClass} from '../icons/LeaveC.svg';
import { ReactComponent as Participants} from '../icons/Participants.svg';
const VideoLayout = () =>{

    const[mic, setMic] = useState(false);
    const[camera, setCamera] = useState(false);
    const[ShareScreen, setShareScreen] = useState(false);

    const setMicEnable = () => {
        setMic(!mic)
    };
    const setCameraEnable = () => {
        setCamera(!camera)
    };
    const setScreenShare = () => {
        setShareScreen(!ShareScreen)
    };
    return(
        <div className="App">
            <Row>
                <Col span={24} className="video-layout">Col-24</Col>
            </Row>
            <Row>
                <Col span={24} className="button-layout">
                    <Space size={80}>
                    <Button type="link" icon={mic?<MuteAudio />:<Audio />} onClick={setMicEnable} />
                    <Button type="link" icon={camera?<StopVideo />:<Video />} onClick={setCameraEnable} />
                    <Button type="link" icon={ShareScreen?<StopScreenShare />:<ScreenShare />} onClick={setScreenShare} />
                    <Button type="link" icon={<Extra />} />
                    <Button type="link" icon={<LeaveClass />} />
                    </Space>
                    <div className="participants-btn">
                    <Button type="link" icon={<Participants/>} />
                    </div>
                    </Col>
            </Row>
        </div>
    )
}

export default VideoLayout;