import React, {useEffect, useRef, useState} from 'react';
import GlobalChatboxArea from "./GlobalChatboxArea";

const Index = () => {
    const [messages, setMessages] = useState([]);
    const messageBoxRef = useRef(null);
    const [turnOnChat, setTurnOnChat] = useState(false)
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
        <div className="global-chat">
            <GlobalChatboxArea/>
            {!turnOnChat && (
                <div className="turn-on-global-chat">
                    <button type='button' onClick={() => setTurnOnChat(true)} className="turn-on-btn">
                        {/*<p className="btn"></p>*/}
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Index;