import React, {useEffect, useRef, useState} from 'react';
import {FaTimes} from "react-icons/fa";
import ChatBox from "../../common/ChatBox";
import {TiAttachment} from "react-icons/ti";
import {IoMdSend} from "react-icons/io";
import earth from "../../../../../../assets/messages/earth.gif"
const Index = () => {
    const [messages, setMessages] = useState([]);
    const messageBoxRef = useRef(null);

    let count = 0;
    const handleSendMessage = (e) => {
        e.preventDefault();

        if (e.target.message.value) {
            const message = {
                id: count,
                message: e.target.message.value,
                type: "me"
            }
            setMessages([...messages, message]);
        }

        if (messageBoxRef.current) {
            messageBoxRef.current.scrollIntoView({behavior: 'smooth'});
        }

        e.target.reset();
    }

    useEffect(() => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <div className="chat-header">
                <img className='global-icon' src={earth} alt="" />
                <h4 className="active-user">  Communication (100)</h4>
            </div>
            
            <div ref={messageBoxRef} className="chat-box">
                {messages?.map((msg) => <ChatBox key={msg.id} msg={msg}/>)}
            </div>
            <div className="send-message">
                <div className="attached-file">
                    <label htmlFor="files">
                        <TiAttachment className="icon"/>
                    </label>
                    <input type="file" multiple className="file-input" name="files"/>

                </div>
                <form onSubmit={(e) => handleSendMessage(e)} action="#" className="message-form">
                    <input className="message-input" type="text" placeholder="Type your text here.." name="message"
                           autoComplete="off"/>
                    <button className="message-btn"><IoMdSend/></button>
                </form>
            </div>
        </>
    );
};

export default Index;