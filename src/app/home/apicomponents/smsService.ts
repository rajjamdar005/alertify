// src/smsService.ts
import axios from 'axios';

const API_URL = 'https://api.smsalert.co.in/api/v1/send/';
const API_KEY = '66d3859a4dc14'; // Replace with your SMS Alert API key
const SENDER_ID = 'https://www.smsalert.co.in/api/senderlist.json?apikey=5dd7cd37e7239'; // Replace with your sender ID


export const sendSMS = async (mobileNumber: string, message: string): Promise<void> => {
    try {
        const payload = {
            apikey: API_KEY,
            sender: SENDER_ID,
            to: mobileNumber,
            message: message,
            type: 'text', // or 'flash' for flash messages
        };

        const response = await axios.post(API_URL, payload);

        if (response.status === 200) {
            console.log('SMS sent successfully!');
        } else {
            console.error('Failed to send SMS:', response.data);
        }
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
};