// index.js
import express from "express";
import { config } from 'dotenv';
import { handleAuthCallback, initializeApp } from "./app.js";

config();

const app = express();

initializeApp(app);

app.get('/auth/callback', handleAuthCallback);

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});