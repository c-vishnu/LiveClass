import React, {useEffect, useState} from "react";
import "../App.css";
import {Switch} from 'antd';

function RiseHand  () {

    const [checkedVideo, setCheckedVideo] = useState(false);

    const turnOnToggle =() =>{
        setCheckedVideo(!checkedVideo);
    }


    return(
        <div className="handRise-body">
            <p className="riseHand-bubble">
                <p>
                    <div className="rh-bubble-body">
                    <h4>Partcpt Name</h4>
                    <p>Raised Hand</p>
                    <p>time</p>
                    </div>
                    <div className="toggle-button-rh">
                        <p>Start Audio</p>
                        <Switch size="small"  defaultUnChecked /> 
                        <p id="start-video">Start Video</p>
                        <Switch  size="small" onClick={turnOnToggle} defaultUnChecked />
                    </div>
                    { checkedVideo?
                        <video className="videoLayout">
                            demo
                    </video>:null}
                </p>
            </p>
        </div>
    )
}

export default RiseHand;