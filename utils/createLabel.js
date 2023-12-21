import { google } from "googleapis"

export const createLabel = async (auth) => {
    const gmail = google.gmail({ version: "v1", auth });

    const labelName = "Vacation-Emails"
    
    try {
        const response = await gmail.users.labels.create({
            userId: "me",
            requestBody: {
                name: labelName,
                labelListVisibility: "labelShow",
                messageListVisibility: "show",
            },
        });
        return response.data.id;
    } catch (error) {
        if (error.code === 409) {
            const response = await gmail.users.labels.list({
                userId: "me",
            });
            const label = response.data.labels.find(
                (label) => label.name === labelName
            );
            return label.id;
        } else {
            throw error;
        }
    }
}