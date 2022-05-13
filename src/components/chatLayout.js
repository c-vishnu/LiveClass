import React from "react";
import "../App.css";
import { EllipsisOutlined } from '@ant-design/icons';

function ChatLayout() {
    return (
        <div className="Chat-body">
            <div className="chatBubble-body">
                <p className="chatBubble">
                    <p>
                        <div className="chat-bubble-button">
                            <h4>Sender Name</h4>
                            <EllipsisOutlined />
                        </div>
                        <p>Text Body of chat</p>
                    </p>
                </p>
            </div>
        </div>
    )
}

export default ChatLayout;