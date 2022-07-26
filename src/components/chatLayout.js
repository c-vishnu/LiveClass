import React, { useState, useEffect } from "react";
import "../App.css";
import { Menu, Dropdown, Input, Button, Popover } from "antd";
import {
  EllipsisOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import axios from "./axios";
import Picker from "emoji-picker-react";

function ChatLayout() {
  const [messages, setMessage] = useState(["Demo message"]);
  const [Name, setName] = useState(() => "");
  const [pickerVisible, setPickerVisible] = useState(false);
  const [chatId, setChatId] = useState(() => "");
  const [clicked, setClicked] = useState(false);
  const [block, setBlock] = useState(false);
  const [warning, setWarning] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setName(Name + emojiObject.emoji);
    setPickerVisible(false);
  };

  useEffect(() => {
    setInterval(() => {
      axios.get("/chats").then((res) => {
        setMessage(res.data);
        // console.log(res.data);
      });
    }, 1000);
  }, []);

  const onSendMessage = async (e) => {
    e.preventDefault();
    await axios
      .post("/chats", {
        text: Name,
        meetingId: "id",
        senderId: "0",
      })
      .then((res) => {
        setName("");
      });
  };

  const onBlock = async (e) => {
    console.log("chats", chatId);
    await axios
      .patch(`/chats/${chatId}`, {
        isDeleted: block,
      })
      .then((res) => {
        setBlock(!block);
        setClicked(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onWarning = async (e) => {
    await axios
      .patch(`/chats/${chatId}`, {
        isHidden: warning,
      })
      .then((res) => {
        setWarning(!warning);
        setClicked(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <div className="chat-option">
              <Button
                onClick={() => {
                  onBlock();
                }}
              >
                Block
              </Button>
              <Button
                style={{ padding: "0px" }}
                onClick={() => {
                  onBlock();
                }}
              >
                <a className="warning"></a>
              </Button>
            </div>
          ),
        },
        {
          label: (
            <div className="chat-option">
              <Button
                onClick={() => {
                  onWarning();
                }}
              >
                Warn
              </Button>
              <Button
                style={{ padding: "0px" }}
                onClick={() => {
                  onWarning();
                }}
              >
                <a className="block"></a>
              </Button>
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <div className="Chat-body">
      <div className="chatBubble-body">
        {messages.map((data) => (
          <p className="chatBubble">
            <p>
              <div className="chat-bubble-button">
                <h6 style={{ marginTop: "5px" }}>
                  {data.senderId === "0" ? "admin " : `(${data.senderId})`}
                </h6>
                <Dropdown overlay={menu} placement="top" arrow>
                  <Button
                    style={{ margin: "0px" }}
                    onClick={() => {
                      setChatId(data._id);
                    }}
                  >
                    <EllipsisOutlined />
                  </Button>
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
        <Button
          shape="circle"
          size="large"
          style={{ margin: "0px 5px 5px 0px" }}
          icon={<SmileOutlined />}
          onClick={() => setPickerVisible(!pickerVisible)}
        />
        <Input
          type="text"
          placeholder="Type here"
          value={Name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <Button
          shape="circle"
          type="primary"
          size="large"
          style={{ margin: "0px" }}
          onClick={onSendMessage}
        >
          <SendOutlined />
        </Button>
      </div>
    </div>
  );
}

export default ChatLayout;

{
  /* <a className="block"></a> */
}
