// Function to modify and label the email
export const modifyAndLabelEmail = async (gmail, oAuth2Client, labelId, message) => {
    await gmail.users.messages.modify({
        auth: oAuth2Client,
        userId: "me",
        id: message.id,
        resource: {
            addLabelIds: [labelId],
            removeLabelIds: ["INBOX"],
        },
    });
};