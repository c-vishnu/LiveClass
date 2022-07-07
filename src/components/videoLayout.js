import React, { useEffect, useState, useRef } from "react";

import { Row, Col } from "antd";
import { DesktopOutlined, CloseOutlined } from "@ant-design/icons";
import "../App.css";
import { ReactComponent as Audio } from "../icons/Mic.svg";
import { ReactComponent as MuteAudio } from "../icons/mute.svg";
import { ReactComponent as Video } from "../icons/Video.svg";
import { ReactComponent as StopVideo } from "../icons/turnOfVideo.svg";
import { ReactComponent as ScreenShare } from "../icons/ShareScreen.svg";
import { ReactComponent as StopScreenShare } from "../icons/stopShareScreen.svg";
import { ReactComponent as Extra } from "../icons/Extra.svg";
import { ReactComponent as LeaveClass } from "../icons/LeaveC.svg";
import { ReactComponent as Participants } from "../icons/Participants.svg";
const VideoLayout = (props) => {
    const [mic, setMic] = useState(false);
    const [camera, setCamera] = useState(false);
    const [ShareScreen, setShareScreen] = useState(false);

    const setMicEnable = () => {
        setMic(!mic);
        if (mic) {
            stopVoiceEnable();
        } else {
            EnableVoice();
        }
    };
    const setCameraEnable = () => {
        setCamera(!camera);
    };
    const setScreenShare = () => {
        setShareScreen(!ShareScreen);
    };
    const CAMERA_CONSTRAINTS = {
        audio: true,
        video: true,
    };
    const SCREEN_CONSTRAINTS = {
        audio: true,
        video: true,
    };
    const [connected, setConnected] = useState(false);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [streamKey, setStreamKey] = useState("");
    const [textOverlay, setTextOverlay] = useState("Live Stream");
    const [screenconnected, setScreenConnected] = useState(false);
    const [screenEnabled, setScreenEnabled] = useState(false);
    const [screenstreaming, setScreenStreaming] = useState(false);
    const [voiceStreaming, setVoiceStreaming] = useState(false);
    const [voiceConnected, setVoiceConnected] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const inputStreamRef = useRef();
    const voiceRef = useRef();
    const videoRef = useRef();
    const canvasRef = useRef();
    const wsRef = useRef();
    const mediaRecorderRef = useRef();
    const requestAnimationRef = useRef();
    const nameRef = useRef();

    //disable camera
    const stopcallStreaming = async () => {
        const stream = inputStreamRef.current;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ws = wsRef.current;
        const mediaRecorder = mediaRecorderRef.current;
        const requestAnimation = requestAnimationRef.current;
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        if (video) {
            video.srcObject = null;
        }
        if (canvas) {
            canvas.width = 0;
            canvas.height = 0;
        }
        if (ws) {
            ws.close();
        }
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
        if (requestAnimation) {
            cancelAnimationFrame(requestAnimation);
        }
        setScreenStreaming(false);
        setScreenConnected(false);
        setScreenEnabled(false);
        setStreamKey(null);
        setStreaming(false);
        setConnected(false);
        setCameraEnabled(false);
        setStreamKey(null);

        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        if (video) {
            video.srcObject = null;
        }
        if (canvas) {
            canvas.width = 0;
            canvas.height = 0;
        }
        if (ws) {
            ws.close();
        }
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
        if (requestAnimation) {
            cancelAnimationFrame(requestAnimation);
        }
    };
    const screenRecord = async () => {
        inputStreamRef.current = await navigator.mediaDevices.getDisplayMedia(
            SCREEN_CONSTRAINTS
        );
        voiceRef.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });

        videoRef.current.srcObject = inputStreamRef.current;

        await videoRef.current.play();

        // We need to set the canvas height/width to match the video element.
        canvasRef.current.height = videoRef.current.clientHeight;
        canvasRef.current.width = videoRef.current.clientWidth;

        requestAnimationRef.current = requestAnimationFrame(updateScreenCanvas);

        setScreenEnabled(true);
        // if (screenEnabled) {
        //     startStreaming();
        // } else {
        //     stopScreenStreaming();
        // }
    };
    const updateScreenCanvas = () => {
        if (videoRef.current.ended || videoRef.current.paused) {
            return;
        }

        const ctx = canvasRef.current.getContext("2d");

        ctx.drawImage(
            videoRef.current,
            0,
            0,
            videoRef.current.clientWidth,
            videoRef.current.clientHeight
        );

        ctx.fillStyle = "#FB3C4E";
        ctx.font = "50px Akkurat";
        ctx.fillText(nameRef.current, 10, 50, canvasRef.current.width - 20);

        requestAnimationRef.current = requestAnimationFrame(updateScreenCanvas);
    };

    const stopScreenStreaming = () => {
        if (mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
        }

        setScreenStreaming(false);
    };
    //stop voice stream
    const stopVoiceStreaming = () => {
        if (mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
        }
    };
    //stop enable voice
    const stopVoiceEnable = () => {
        if (voiceEnabled) {
            setVoiceEnabled(false);
        }
    };
    //enable voice
    const EnableVoice = async () => {
        inputStreamRef.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        });

        videoRef.current.srcObject = inputStreamRef.current;

        await videoRef.current.play();
        canvasRef.current.height = videoRef.current.clientHeight;
        canvasRef.current.width = videoRef.current.clientWidth;

        requestAnimationRef.current = requestAnimationFrame(updateScreenCanvas);
        setVoiceEnabled(true);
        // if (voiceEnabled) {
        //     startStreaming();
        // } else {
        //     stopVoiceStreaming();
        // }
    };
    //enable camera
    const enableCamera = async () => {
        inputStreamRef.current = await navigator.mediaDevices.getUserMedia(
            CAMERA_CONSTRAINTS
        );

        videoRef.current.srcObject = inputStreamRef.current;

        await videoRef.current.play();

        // We need to set the canvas height/width to match the video element.
        canvasRef.current.height = videoRef.current.clientHeight;
        canvasRef.current.width = videoRef.current.clientWidth;

        requestAnimationRef.current = requestAnimationFrame(updateCanvas);

        setCameraEnabled(true);
        // if (cameraEnabled) {
        //     startStreaming();
        // } else {
        //     stopStreaming();
        // }
    };

    const updateCanvas = () => {
        if (videoRef.current.ended || videoRef.current.paused) {
            return;
        }

        const ctx = canvasRef.current.getContext("2d");

        ctx.drawImage(
            videoRef.current,
            0,
            0,
            videoRef.current.clientWidth,
            videoRef.current.clientHeight
        );

        ctx.fillStyle = "#FB3C4E";
        ctx.font = "50px Akkurat";
        ctx.fillText(nameRef.current, 10, 50, canvasRef.current.width - 20);

        requestAnimationRef.current = requestAnimationFrame(updateCanvas);
    };

    const stopStreaming = () => {
        if (mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
        }

        setStreaming(false);
    };

    const startStreaming = () => {
        setStreaming(true);

        const protocol = window.location.protocol.replace("http", "ws");
        const wsUrl = `${protocol}//localhost:5004/rtmp?key=${streamKey}`;
        wsRef.current = new WebSocket(wsUrl);
        wsRef.current.addEventListener("open", function open() {
            setConnected(true);
        });

        wsRef.current.addEventListener("close", () => {
            setConnected(false);
            stopStreaming();
        });

        const videoOutputStream = canvasRef.current.captureStream(30); // 30 FPS
        // Let's do some extra work to get audio to join the party.
        // https://hacks.mozilla.org/2016/04/record-almost-everything-in-the-browser-with-mediarecorder/
        const audioStream = new MediaStream();
        const audioTracks = inputStreamRef.current.getAudioTracks();
        audioTracks.forEach(function (track) {
            audioStream.addTrack(track);
        });

        const outputStream = new MediaStream();
        [audioStream, videoOutputStream].forEach(function (s) {
            s.getTracks().forEach(function (t) {
                outputStream.addTrack(t);
            });
        });

        mediaRecorderRef.current = new MediaRecorder(outputStream, {
            mimeType: "video/webm",
            videoBitsPerSecond: 3000000,
        });

        mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
            wsRef.current.send(e.data);
        });

        mediaRecorderRef.current.addEventListener("stop", () => {
            stopStreaming();
            wsRef.current.close();
        });

        mediaRecorderRef.current.start(1000);
    };

    useEffect(() => {
        nameRef.current = textOverlay;
    }, [textOverlay]);

    useEffect(() => {
        return () => {
            cancelAnimationFrame(requestAnimationRef.current);
        };
    }, []);
    return (
        <div className="App">
            <Row>
                <Col span={24}>
                    <div
                        className={`${
                            props.shrinkLayout ? "small-video" : "video-layout"
                        }`}
                    >
                        <video
                            className={`${
                                props.shrinkLayout
                                    ? "small-video"
                                    : "video-layout"
                            }`}
                            ref={videoRef}
                            playsInline
                            muted
                        ></video>
                        <canvas ref={canvasRef} hidden></canvas>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div
                        className={`${
                            props.shrinkLayout
                                ? "small-button-layout"
                                : "button-layout"
                        }`}
                    >
                        <div className="foot-btn">
                            {cameraEnabled || screenEnabled || voiceEnabled ? (
                                streaming ||
                                screenstreaming ||
                                voiceStreaming ? (
                                    <div>
                                        <button
                                            hidden
                                            className="btn"
                                            style={{
                                                backgroundColor: "limegreen",
                                                color: "white",
                                                marginTop: "-3rem",
                                                marginRight: "5rem",
                                            }}
                                            disabled={streamKey}
                                            onClick={startStreaming}
                                        >
                                            Start Streaming
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <button
                                            // hidden
                                            className="btn"
                                            style={{
                                                backgroundColor: "limegreen",
                                                color: "white",
                                                marginBottom: "-6rem",
                                                marginTop: "-1rem",
                                                marginRight: "45rem",
                                            }}
                                            disabled={streamKey}
                                            onClick={startStreaming}
                                        >
                                            Start Streaming
                                        </button>
                                    </div>
                                )
                            ) : null}

                            <button onClick={setMicEnable}>
                                {mic ? <Audio /> : <MuteAudio />}
                            </button>
                            <button onClick={enableCamera}>
                                {camera ? <StopVideo /> : <Video />}
                            </button>
                            <button
                                onClick={() => {
                                    screenRecord();
                                }}
                            >
                                {ShareScreen && screenEnabled ? (
                                    <StopScreenShare />
                                ) : (
                                    <ScreenShare />
                                )}
                            </button>
                            <button>
                                <Extra />
                            </button>
                            <button onClick={stopcallStreaming}>
                                <LeaveClass />
                            </button>
                            <button
                                style={{
                                    position: "absolute",
                                    right: "0",
                                    paddingRight: "20px",
                                }}
                            >
                                <Participants />
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default VideoLayout;
