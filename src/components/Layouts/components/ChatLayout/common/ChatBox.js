import React from 'react';
import {FaImage, FaRegUserCircle} from "react-icons/fa";
import {useSelector} from "react-redux";
import {convertToDate} from "../../../../../shared/functions/timeConverter"

const ChatBox = ({message, oppositeUser}) => {
    const user = useSelector(state => state?.auth?.user)

    return (

        <>
            {(message.senderID === user.id) ? (
                    <div className="me-user">
                        <div className="user-profile">
                            <FaRegUserCircle className="user-icon"/>
                        </div>
                        <div className="message-details">
                            <div className="message-wrapper">
                                <p className="message">{message.message}</p>
                            </div>
                            <span className="message-time">{convertToDate(message?.createdAt)}</span>
                        </div>
                    </div>
                ) :
                (
                    <div className="opposite-user">
                        <div className="user-profile">
                            <FaImage/>
                        </div>
                        <div className="message-details">
                            <div className="message-wrapper">
                                <p className="message">{message.message}</p>
                            </div>
                            <span className="message-time">{convertToDate(message?.createdAt)}</span>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default ChatBox;