import React, { useState, useEffect } from "react";
import "../App.css";
import { Input, Button } from "antd";
import axios from "./axios";
import { SendOutlined } from "@ant-design/icons";

function AskQuestion() {
    const [answer, setAnswer] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [reply, setReply] = useState();
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

    // const actionButton = () => {
    //     setHidden(!hidden)

    // }

    return (
        <div className="questionBubble-body">
            {questions.map((data) => (
                <p className={`que-bubble ${colour ==="green" ? 'answer-action' : colour==="red" ? 'reject-action': }`}>
                    <p style={{ margin: "0px" }}>
                        <h6>{data.senderId}</h6>
                        <p style={{ margin: "0px" }}>{data.text}</p>
                        {hidden ? <div className="que-bubble-button">
                            <button
                                key={data._id}
                                onClick={() => {
                                    setAnswer(!answer);
                                    setReply(data._id);
                                    setColour("green");
                                    // actionButton();
                                }}>
                                <h6 style={{ color: "green" }}>Answer</h6>
                            </button>
                            <button
                                onClick={() => {
                                    setColour("red");
                                }}>
                                <h6 style={{ color: "red" }}>Reject</h6>
                            </button>
                        </div> : null}
                        <div>
                            {answer && reply === data._id ? (
                                <div className="answer-body">
                                    <div className="answer-content">
                                        <Input type="text" placeholder="Type answer" />
                                        <Button
                                            type="primary"
                                            size="large"
                                            icon={<SendOutlined />} />
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </p>
                </p>

            ))}
        </div>
    );
}

export default AskQuestion;
