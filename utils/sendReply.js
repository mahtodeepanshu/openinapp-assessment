// Function to send a reply
export const sendReply = async (oAuth2Client, gmail, senderEmail, subject) => {
    const replyMessage = {
        userId: "me",
        resource: {
            raw: Buffer.from(
                `To: ${senderEmail}\r\n` +
                `Subject: Re: ${subject}\r\n` +
                `Content-Type: text/plain; charset="UTF-8"\r\n` +
                `Content-Transfer-Encoding: 7bit\r\n\r\n` +
                `Thank you for your email. I'm currently on vacation and will reply to you when I return.\r\n`
            ).toString("base64"),
        },
    };

    await gmail.users.messages.send(replyMessage);
};