import { config } from 'dotenv';
import { google } from "googleapis";
import open from "open";
import { startCheckingEmails } from './utils/startCheckingEmails.js';

config()

const SCOPES = ["https://mail.google.com/"];

const repliedUsers = new Set();

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

export const initializeApp = async (app) => {
    
    const authUrl = await oAuth2Client.generateAuthUrl({
                        access_type: 'offline',
                        scope: SCOPES,
                        prompt: 'consent',
                    });

    open(authUrl, { wait: false });
}

export const handleAuthCallback = async (req, res) => {
    const code = req.query.code;

    try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        res.send('Authentication successful! You can close this window.');
        await startCheckingEmails(oAuth2Client, repliedUsers);
    } catch (error) {
        console.error('Error exchanging authorization code:', error);
        res.status(500).send('Error exchanging authorization code');
    }
}