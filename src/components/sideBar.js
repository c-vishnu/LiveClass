import React, { useState } from "react";
import "../App.css";
// import { Button, Space } from 'antd';
import { ReactComponent as Chat } from '../icons/chat.svg';
import { ReactComponent as AskDoubt } from '../icons/AskDoubt.svg';
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
                <button className="main-nav-button" onClick={toggleClassName}>{toggleNav?<FullScreen />:<Chat />}</button>
                {/* <Button className="main-nav-button" type="link" icon={toggleNav?<FullScreen />:<Chat />} onClick={toggleClassName} /> */}
            </div>
            <div className={`sideMenu ${toggleNav? "visible":"hidden"}`}>
            <button onClick={()=>setButtonName('chat')}><Chat /></button>
            <button onClick={()=>setButtonName('askQuestions')}><AskDoubt /></button>
            <button onClick={()=>setButtonName('riseHand')}><Hand /></button>
            <button onClick={()=>setButtonName('settings')}><Settings /></button>
                <SideNavLayout buttonName={buttonName} />
            </div>
        </div>
    )
}

export default SideBar