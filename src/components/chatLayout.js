import React from "react";
import "../App.css";
import {Menu, Dropdown} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

function ChatLayout() {

    const menu =(
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
              <a>Block <a className="block"></a></a>
            ), 
          },
        ]}/>
      );

    return (
        <div className="Chat-body">
            <div className="chatBubble-body">
                <p className="chatBubble">
                    <p>
                        <div className="chat-bubble-button">
                            <h4>Sender Name</h4>
                            <Dropdown overlay={menu} placement="top" arrow>
                            <EllipsisOutlined />
                            </Dropdown>
                        </div>
                        <p>Text Body of chat</p>
                    </p>
                </p>
            </div>
        </div>
    )
}

export default ChatLayout;