import { google } from "googleapis";

export const createLabel = async (auth) => {
    // Create a Gmail API client with the provided authentication
    const gmail = google.gmail({ version: "v1", auth });

    const labelName = "Vacation-Emails";

    try {
        // Attempt to create a new label
        const response = await gmail.users.labels.create({
            userId: "me",
            requestBody: {
                name: labelName,
                labelListVisibility: "labelShow",
                messageListVisibility: "show",
            },
        });

        // Return the ID of the newly created label
        return response.data.id;
    } catch (error) {
        // Handle the case where the label already exists (409 Conflict)
        if (error.code === 409) {
            // Retrieve the list of labels for the user
            const response = await gmail.users.labels.list({
                userId: "me",
            });

            // Find the existing label with the specified name
            const label = response.data.labels.find(
                (label) => label.name === labelName
            );

            // Return the ID of the existing label
            return label.id;
        } else {
            throw error;
        }
    }
};
