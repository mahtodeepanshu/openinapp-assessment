import express from "express";
import { config } from 'dotenv';  // dotenv is used for environment variable configuration
import { handleAuthCallback, initializeApp } from "./app.js";  // Import functions from the app module

// Load environment variables from a .env file if present
config();

// Create an Express application
const app = express();

initializeApp(app);

// Define a route for handling authentication callbacks
app.get('/auth/callback', handleAuthCallback);

// Start the Express server, listening on the specified port
app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
