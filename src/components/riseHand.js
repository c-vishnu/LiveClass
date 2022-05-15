import React from "react";
import "../App.css";
import {Switch} from 'antd';

function RiseHand  () {
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
                        <Switch size="small" defaultChecked />
                        <p>Start Video</p>
                        <Switch size="small" defaultChecked />
                    </div>
                </p>

            </p>
        </div>
    )
}

export default RiseHand;