import { google } from "googleapis"

export const getUnreadMessages = async (auth) => {
    const gmail = google.gmail({ version: "v1", auth });
    const response = await gmail.users.messages.list({
        userId: "me",
        labelIds: ["INBOX"],
        q: "is:unread",
    });

    return response.data.messages || [];
}
