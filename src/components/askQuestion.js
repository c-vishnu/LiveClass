import React from "react";
import "../App.css";

function AskQuestion ()  {
    return(
            <div className="questionBubble-body">
                <p className="que-bubble">
                    <p>
                        <h4>Name</h4>
                        <p>Question body</p>
                        <div className="que-bubble-button">
                        <h4 style={{color:"green"}}>Answer</h4>
                        <h4 style={{color:"red"}}>Reject</h4>
                        </div>
                    </p>
                </p>
            </div>
    )
}

export default AskQuestion;