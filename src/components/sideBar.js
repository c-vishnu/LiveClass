import React from "react";
import "../App.css";
import {Button, Space} from 'antd';
import { ReactComponent as Chat} from '../icons/chat.svg';
import { ReactComponent as Ask_Doubt} from '../icons/Ask_Doubt.svg';
import { ReactComponent as Hand} from '../icons/hand.svg';
import { ReactComponent as Settings} from '../icons/Setting.svg';
import { ReactComponent as FullScreen} from '../icons/FullScreen.svg';

const SideBar = () => {
    return(
        <div className="sideMenu">
            <Space size={20}>
            <Button type="link" icon={<Chat />} />
            <Button type="link" icon={<Ask_Doubt />} />
            <Button type="link" icon={<Hand />} />
            <Button type="link" icon={<Settings />} />
            <Button type="link" icon={<FullScreen />} />
          </Space>
        </div>
    )
}

export default SideBar