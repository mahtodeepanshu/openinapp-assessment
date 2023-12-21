import { config } from 'dotenv';  // dotenv is used for environment variable configuration
import { google } from "googleapis";  // Google APIs library
import open from "open";  // Open a URL in the default browser
import { startCheckingEmails } from './utils/startCheckingEmails.js';  // Import a utility function

// Load environment variables from a .env file if present
config();

// Define the OAuth2 scopes required for accessing Gmail
const SCOPES = ["https://mail.google.com/"];

// Set to keep track of users who have already received a reply
const repliedUsers = new Set();

// Create an OAuth2 client with the provided credentials
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

export const initializeApp = async (app) => {
    // Generate the authentication URL with necessary parameters
    const authUrl = await oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent',
    });

    // Open the authentication URL in the default browser
    open(authUrl, { wait: false });
}

export const handleAuthCallback = async (req, res) => {
    // Retrieve the authorization code from the callback request
    const code = req.query.code;

    try {
        // Exchange the authorization code for tokens
        const { tokens } = await oAuth2Client.getToken(code);

        // Set the credentials for the OAuth2 client
        oAuth2Client.setCredentials(tokens);

        res.send('Authentication successful! You can close this window.');

        await startCheckingEmails(oAuth2Client, repliedUsers);
    } catch (error) {
        console.error('Error exchanging authorization code:', error);
        res.status(500).send('Error exchanging authorization code');
    }
}
