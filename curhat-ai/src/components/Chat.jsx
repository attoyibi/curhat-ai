import React from 'react';

const Chat = ({ msg }) => {
    return (
        <div>
            {/* chat User */}
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="chat bubble component"
                            src="./user_default.jpg"
                        />
                    </div>
                </div>
                <div className="chat-header">
                    Anakin
                    {/* <time className="text-xs opacity-50">12:46</time> */}
                </div>
                <div className="chat-bubble">{msg}</div>
                {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
            </div>
        </div>
    );
};

export default Chat;
