import React, { useState } from "react";
import "../App.css";
import { Button, Space } from 'antd';
import { ReactComponent as Chat } from '../icons/chat.svg';
import { ReactComponent as Ask_Doubt } from '../icons/Ask_Doubt.svg';
import { ReactComponent as Hand } from '../icons/hand.svg';
import { ReactComponent as Settings } from '../icons/Setting.svg';
import { ReactComponent as FullScreen } from '../icons/FullScreen.svg';
import SideNavLayout from "./sideNavLayouts";

const SideBar = (props) => {

    const [toggleNav, setToggleNav] = useState(false);
    const [buttonName, setButtonName] = useState();

    const toggleClassName = () => {
        setToggleNav(!toggleNav);
    }

    return (
        <div className="side-nav-bar">
            {props.setChild(toggleNav)}
            <div className="nav-button-group">
                <Button className="main-nav-button" type="link" icon={toggleNav?<FullScreen />:<Chat />} onClick={toggleClassName} />
            </div>
            <div className={`sideMenu ${toggleNav? "visible":"hidden"}`}>
                <Space size={20} className="side-layout">
                    <Button type="link" onClick={()=>setButtonName('chat')} icon={<Chat />} />
                    <Button type="link" onClick={()=>setButtonName('askQuestions')} icon={<Ask_Doubt />} />
                    <Button type="link" onClick={()=>setButtonName('riseHand')} icon={<Hand />} />
                    <Button type="link" onClick={()=>setButtonName('settings')} icon={<Settings />} />
                </Space>
                <SideNavLayout buttonName={buttonName} />
            </div>
        </div>
    )
}

export default SideBar