import React, { useState, useEffect } from "react";
import "../App.css";
import { Menu, Dropdown, Input, Button } from 'antd';
import { EllipsisOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import axios from "./axios";
import Picker from 'emoji-picker-react';

function ChatLayout() {

  const [messages, setMessage] = useState(["Demo message"]);
  const [Name, setName] = useState(() => "");
  const [pickerVisible, setPickerVisible] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setName(Name + emojiObject.emoji);
    setPickerVisible(false);
  };

  useEffect(() => {
    setInterval(() => {
      axios.get("/chats")
        .then((res) => {
          setMessage(res.data);
        });
    }, 1000);
  }, []);

  const onSendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/chats", {
      text: Name,
      meetingId: "id",
      senderId: "0"
    })
      .then((res) => {
        setName("");
      });
  };

  const menu = (
    <Menu items={[
      {
        label: (
          <div className="chat-option">
            <a >Warn<a className="warning"></a></a>
          </div>
        ),
      },
      {
        label: (
          <div className="chat-option">
            <a>Block <a className="block"></a></a>
          </div>
        ),
      },
    ]} />
  );

  return (
    <div className="Chat-body">
      <div className="chatBubble-body">{messages.map((data) => (
        <p className="chatBubble">
          <p>
            <div className="chat-bubble-button">
              <h6>
                {data.senderId === "0"
                  ? "admin "
                  : `(${data.senderId})`}</h6>
              <Dropdown overlay={menu} placement="top" arrow>
                <EllipsisOutlined />
              </Dropdown>
            </div>
            <p>{data.text}</p>
          </p>
        </p>
      ))}
      </div>
      <div className="chatInput">
        {pickerVisible && (
          <Picker
            pickerStyle={{
              position: "absolute",
              bottom: "100px",
            }}
            onEmojiClick={onEmojiClick}
          />
        )}
        <Button shape="circle" size="large"
          style={{ margin: "0px 5px 5px 0px" }} icon={<SmileOutlined />} onClick={() => setPickerVisible(!pickerVisible)} />
        <Input type="text" placeholder="Type here" value={Name} onChange={(event) => {
          setName(event.target.value)
        }} />
        <Button shape="circle" type="primary" size="large" style={{ margin: "0px" }}
          onClick={onSendMessage} icon={<SendOutlined />} />
      </div>
    </div>
  )
}

export default ChatLayout;