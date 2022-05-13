import React from "react";
import "../App.css";
import ChatLayout from "./chatLayout";
import AskQuestion from "./askQuestion";
import RiseHand from "./riseHand";
import SettingSideBar from "./settingsSideBar"

const SideNavLayout = (props) => {
    return(
        <div className="App">
            {(() => {
                switch(props.buttonName) {
                    case 'chat':
                        return <ChatLayout />
                    case 'askQuestions':
                        return <AskQuestion />
                    case 'riseHand':
                        return <RiseHand />
                    case 'settings':
                        return <SettingSideBar />
                    default:
                        return null
                }
            })()}
        </div>
    )
}

export default SideNavLayout;