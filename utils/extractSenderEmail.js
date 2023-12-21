// Function to extract sender email from headers
export const extractSenderEmail = (senderEmailHeader) => {
    if (senderEmailHeader) {
        const match = senderEmailHeader.value.match(/<([^>]+)>/);
        return match ? match[1] : senderEmailHeader.value;
    }
    return null;
};