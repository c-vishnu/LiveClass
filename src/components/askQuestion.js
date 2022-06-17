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
    const [reject, setReject] = useState();
    const [hidden, sethidden] = useState(true);

    useEffect(() => {
        setInterval(() => {
            axios.get("/qanda").then((res) => {
                setQuestions(res.data);
            });
        }, 1000);
    }, []);

    const onSendAnswer = async (e) => {
        // console.log("qandaId", qandaId);
        await axios.patch(`/qanda/${qandaId}`,{
            answer: AnswerData,
        })
        .then((res)=>{
            setAnswerData("");
            setColour("green");
        })
        .catch((error)=>{
            console.log(error);;
        })
    };

    const onReject = async (e) => {
        await axios.patch(`/qanda/${qandaId}`,{
          isrejected: reject,
        })
        .then((res)=> {
          setReject(true);
          setColour("red");
        })
        .catch((error)=>{
          console.log(error);
        })
      }

    const hideButton = (id) => {
        setHiddenQuestions([...hiddenQuestions, id]);
    };

    return (
        <div className="questionBubble-body">
            {questions.map((data) => (
                <>
                    <div
                        key={data._id}
                        className={`que-bubble ${data.answer ? "answer-action"
                            : data.isrejected === true ? "reject-action"
                            : "default"
                    }`}>
                        <h6>{data.senderId}</h6>
                        <p style={{ margin: "0px" }}>{data.text}</p>
                        {!data.answer ? (
                            <div className="que-bubble-button">
                                <button
                                    onClick={() => {
                                        setAnswer(!answer);
                                        setReply(data._id);
                                        setRepliedQuestions([...repliedQuestions, data._id]);
                                        setQandaId(data._id);
                                        setColour("green");
                                        hideButton(data._id);
                                        sethidden(!hidden);
                                    }}
                                >
                                    <p style={{ color: "green",
                                    fontWeight:"bold" }}>Answer</p>
                                </button>
                                <button
                                    onClick={() => {
                                        setRejectReplies([...rejectReplies, data._id]);
                                        setColour("red");
                                        hideButton(data._id);
                                        onReject();
                                    }}
                                >
                                    <p style={{ color: "red",
                                    fontWeight:"bold" }}>Reject</p>
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
                            <a href="/#">Copy Answer</a>
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
