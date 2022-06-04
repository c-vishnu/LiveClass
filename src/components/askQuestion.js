import React, { useState, useEffect } from "react";
import "../App.css";
import { Input, Button } from "antd";
import axios from "./axios";
import { SendOutlined } from "@ant-design/icons";

function AskQuestion() {
    const [answer, setAnswer] = useState(false);
    const [AnswerData, setAnswerData] = useState(()=>"");
    const [answerbubble, setAnswerBubble] = useState(false);
    const [reject, setReject] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [reply, setReply] = useState();
    const [rejectReply, setRejectReply] = useState();
    const [hidden, setHidden] = useState(true);
    const [colour, setColour] = useState("");

    useEffect(() => {
        setInterval(() => {
            axios.get("/qanda").then((res) => {
                console.log(res);
                setQuestions(res.data);
            });
        }, 1000);
    }, []);

    const onSendAnswer = async (e) => {
        e.preventDefault();
        await axios.post("/qanda",{
            text: AnswerData,
            meetingId: "Id",
            senderId: "0"
        })
        .then((res)=>{
            console.log(res);
            setAnswerData("");
        });
    };

    const actionButton = () => {
        setHidden(!hidden);
    };

    return (
        <div className="questionBubble-body">
            {questions.map((data) => (
                <>
                    <div
                        key={data._id}
                        className={`que-bubble ${reply === data._id && colour === "green"
                            ? "answer-action"
                            : rejectReply === data._id && colour === "red"
                                ? "reject-action"
                                : "default"
                            }`}
                    >
                        <h6>{data.senderId}</h6>
                        <p style={{ margin: "0px" }}>{data.text}</p>
                        {hidden ? (
                            <div className="que-bubble-button">
                                <button
                                    key={data._id}
                                    onClick={() => {
                                        setAnswer(!answer);
                                        setReply(data._id);
                                        setColour("green");
                                        actionButton();
                                    }}
                                >
                                    <h6 style={{ color: "green" }}>Answer</h6>
                                </button>
                                <button
                                    key={data._id}
                                    onClick={() => {
                                        setRejectReply(data._id);
                                        setReject(!reject);
                                        setColour("red");
                                        actionButton();
                                    }}
                                >
                                    <h6 style={{ color: "red" }}>Reject</h6>
                                </button>
                            </div>
                        ) : null}
                        <div>

                        </div>
                    </div>
                    {reject && rejectReply === data._id ? (
                        <p style={{ color: "red" }}></p>
                    ) : null}
                    {answer && reply === data._id ? (
                        <div className="answer-body">
                            <div className="answer-content">
                                <Input
                                    type="text"
                                    placeholder="Type answer"
                                    value={AnswerData}
                                    onChange={(event)=>{
                                        setAnswerData(event.target.value)
                                    }}
                                />
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={() => {
                                        setAnswer(!answer);
                                        setAnswerBubble(!answerbubble);
                                        onSendAnswer();
                                    }}
                                ><SendOutlined /></Button>
                            </div>
                        </div>
                    ) : null}
                    {answerbubble ? <div className="answer-bubble">
                        <div className="answer-head">
                            <p>Admin</p>
                            <a href="#">Copy Answer</a>
                        </div>
                        <div>
                            <p>{AnswerData}</p>
                        </div>
                    </div> : null}
                </>
            ))}
        </div>
    );
}

export default AskQuestion;
