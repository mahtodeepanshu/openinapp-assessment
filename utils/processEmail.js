import { google } from "googleapis"
import { extractSenderEmail } from "./extractSenderEmail.js";
import { sendReply } from "./sendReply.js";
import { modifyAndLabelEmail } from "./modifyAndLabelEmail.js";

// Function to handle processing of a single email
export const processEmail = async (oAuth2Client, repliedUsers, labelId, message) => {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const messageData = await gmail.users.messages.get({
        auth: oAuth2Client,
        userId: "me",
        id: message.id,
    });

    const email = messageData.data;

    const senderEmailHeader = email.payload.headers.find((header) => header.name === "From");
    const senderEmail = extractSenderEmail(senderEmailHeader);

    const subject = email.payload.headers.find((header) => header.name === "Subject").value;

    console.log("Received Email from :", senderEmail);

    const hasReplied = email.payload.headers.some((header) => header.name === "In-Reply-To");

    if (repliedUsers.has(senderEmail)) {
        console.log("Already replied to : ", senderEmail);
    } else {
        await sendReply(oAuth2Client, gmail, senderEmail, subject);
        console.log("Sent reply to: ", senderEmail);
        repliedUsers.add(senderEmail);
    }

    await modifyAndLabelEmail(gmail, oAuth2Client, labelId, message);
};