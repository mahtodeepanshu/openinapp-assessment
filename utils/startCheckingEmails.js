import { getUnreadMessages } from "./getUnreadMessages.js";
import { createLabel } from "./createLabel.js";
import { processEmail} from "./processEmail.js"

// Main function for checking emails
export const startCheckingEmails = async (oAuth2Client, repliedUsers) => {
    const labelId = await createLabel(oAuth2Client);

    setInterval(async () => {
        const messages = await getUnreadMessages(oAuth2Client);

        if (messages && messages.length > 0) {
            for (const message of messages) {
                await processEmail(oAuth2Client, repliedUsers, labelId, message);
            }
        }
    }, Math.floor(Math.random() * (120 - 45 + 1) + 45) * 1000);
};