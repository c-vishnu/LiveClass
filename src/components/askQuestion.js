import React, { useState, useEffect } from "react";
import "../App.css";
import { Input, Button } from "antd";
import axios from "./axios";
import { SendOutlined } from "@ant-design/icons";

function AskQuestion() {
    const [answer, setAnswer] = useState(false);
    const [AnswerData, setAnswerData] = useState(()=>"");
    const [answerbubble, setAnswerBubble] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [reply, setReply] = useState();
    const [repliedQuestions, setRepliedQuestions] = useState([]);
    const [rejectReplies, setRejectReplies] = useState([]);
    const [hiddenQuestions, setHiddenQuestions] = useState([]);
    const [colour, setColour] = useState("");
    const [qandaId, setQandaId] = useState(()=>"");
    useEffect(() => {
        setInterval(() => {
            axios.get("/qanda").then((res) => {
                setQuestions(res.data);
            });
        }, 1000);
    }, []);

    const onSendAnswer = async (e) => {
        console.log("qandaId", qandaId);
        await axios.patch(`/qanda/${qandaId}`,{
            answer: AnswerData,
       
        })
        .then((res)=>{
            setAnswerData("");
            // setColour("green");
        })
        .then((res)=>{
            setColour("green");
        })
    };

    const hideButton = (id) => {
        setHiddenQuestions([...hiddenQuestions, id]);
    };

    return (
        <div className="questionBubble-body">
            {questions.map((data) => (
                <>
                    <div
                        key={data._id}
                        className={`que-bubble ${repliedQuestions.includes(data._id) && colour === "green"
                            ? "answer-action"
                            : rejectReplies.includes(data._id) && colour === "red"
                                ? "reject-action"
                                : "default"
                            }`}
                    >
                        <h6>{data.senderId}</h6>
                        <p style={{ margin: "0px" }}>{data.text}</p>
                        {!hiddenQuestions.includes(data._id) ? (
                            <div className="que-bubble-button">
                                <button
                                    key={data._id}
                                    onClick={() => {
                                        setAnswer(!answer);
                                        setReply(data._id);
                                        setRepliedQuestions([...repliedQuestions, data._id]);
                                        setQandaId(data._id);
                                        setColour("green");
                                        hideButton(data._id);
                                    }}
                                >
                                    <h6 style={{ color: "green" }}>Answer</h6>
                                </button>
                                <button
                                    key={data._id}
                                    onClick={() => {
                                        setRejectReplies([...rejectReplies, data._id]);
                                        setColour("red");
                                        hideButton(data._id);
                                    }}
                                >
                                    <h6 style={{ color: "red" }}>Reject</h6>
                                </button>
                            </div>
                        ) : null}
                        <div>

                        </div>
                    </div>
                    {rejectReplies.includes(data._id) ? (
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
                                    type="submit"
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
                    {data.answer ? <div className="answer-bubble">
                        <div className="answer-head">
                            <p>Admin</p>
                            <a href="#">Copy Answer</a>
                        </div>
                        <div>
                            <p>{data.answer}</p>
                        </div>
                    </div> : null}
                </>
            ))}
        </div>
    );
}

export default AskQuestion;
