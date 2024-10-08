import React from 'react';

const AIChatBubble = ({ avatar, sender, time, message, status }) => {
    return (
        <div className="chat chat-start">
            {/* Avatar */}
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt={`${sender} avatar`}
                        src={avatar}
                    />
                </div>
            </div>

            {/* Sender and Time */}
            <div className="chat-header">
                {sender}
                <time className="text-xs opacity-50 ml-2">{time}</time>
            </div>

            {/* Message */}
            <div className="chat-bubble">{message}</div>

            {/* Footer (optional status) */}
            {status && <div className="chat-footer opacity-50">{status}</div>}
        </div>
    );
};

export default AIChatBubble;
