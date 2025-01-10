import React, { useState, useEffect } from 'react';

const ChatUser = ({ msg }) => {
    const [displayName, setDisplayName] = useState('');
    useEffect(() => {
        const name = localStorage.getItem('displayName');
        if (name) {
            setDisplayName(name);
        }
    }, []);
    return (
        <div>
            {/* chat User */}
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="chat bubble component"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrT_BjEyf_LEpcvb225JX2qFCJcLz5-0RXLg&s"
                        />
                    </div>
                </div>
                <div className="chat-header">
                    {displayName}
                    {/* <time className="text-xs opacity-50">12:46</time> */}
                </div>
                <div className="chat-bubble">{msg}</div>
                {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
            </div>
        </div>
    );
};

export default ChatUser;
