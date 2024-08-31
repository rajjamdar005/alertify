// src/SmsSender.tsx
import React, { useState } from 'react';
import { sendSMS } from './smsService';

const SmsSender: React.FC = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSendSMS = async () => {
        if (mobileNumber && message) {
            await sendSMS(mobileNumber, message);
        } else {
            alert('Please enter both mobile number and message.');
        }
    };

    return (
        <div>
            <h1>Send SMS Alert</h1>
            <input
                type="text"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
            />
            <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendSMS}>Send SMS</button>
        </div>
    );
};

export default SmsSender;