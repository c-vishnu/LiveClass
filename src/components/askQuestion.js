import React, { useState, useEffect } from "react";
import "../App.css";
import { Input, Button } from "antd";
import axios from "./axios";
import { SendOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

function AskQuestion() {
    const [answer, setAnswer] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [reply, setReply] = useState();
    useEffect(() => {
        setInterval(() => {
            axios.get("/qanda").then((res) => {
                console.log(res);
                setQuestions(res.data);
            });
        }, 1000);
    }, []);

    return (
        <div className="questionBubble-body">
            {questions.map((data) => (
                <p className="que-bubble">
                    <p style={{ margin: "0px" }}>
                        <h6>{data.senderId}</h6>
                        <p style={{ margin: "0px" }}>{data.text}</p>
                        <div className="que-bubble-button">
                            <button
                                key={data._id}
                                onClick={() => {
                                    setAnswer(!answer);
                                    setReply(data._id);
                                }}>
                                <h6 style={{ color: "green" }}>Answer</h6>
                            </button>
                            <button>
                                <h6 style={{ color: "red" }}>Reject</h6>
                            </button>
                        </div>
                        <div>
                            {answer && reply===data._id ?  (
                                <div className="answer-body">
                                    <div className="answer-content">
                                        <Input type="text" placeholder="Type answer"/>
                                        <Button
                                            type="primary"
                                            size="large"
                                            icon={<SendOutlined />}/>
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
