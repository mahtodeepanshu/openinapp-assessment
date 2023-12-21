import { google } from "googleapis";
import { extractSenderEmail } from "./extractSenderEmail.js";  
import { sendReply } from "./sendReply.js";  
import { modifyAndLabelEmail } from "./modifyAndLabelEmail.js";  

// Function to handle processing of a single email
export const processEmail = async (oAuth2Client, repliedUsers, labelId, message) => {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    // Retrieve the full data of the email message
    const messageData = await gmail.users.messages.get({
        auth: oAuth2Client,
        userId: "me",
        id: message.id,
    });

    // Extract information from the email data
    const email = messageData.data;
    const senderEmailHeader = email.payload.headers.find((header) => header.name === "From");
    const senderEmail = extractSenderEmail(senderEmailHeader);
    const subject = email.payload.headers.find((header) => header.name === "Subject").value;

    console.log("Received Email from:", senderEmail);

    // If the sender has already been replied to, log and skip
    if (repliedUsers.has(senderEmail)) {
        console.log("Already replied to:", senderEmail);
    } else {
        // If the sender hasn't been replied to, send a reply
        await sendReply(oAuth2Client, gmail, senderEmail, subject);
        console.log("Sent reply to:", senderEmail);
        repliedUsers.add(senderEmail);  // Add sender to the set of replied users
    }

    // Modify and label the email
    await modifyAndLabelEmail(gmail, oAuth2Client, labelId, message);
};
