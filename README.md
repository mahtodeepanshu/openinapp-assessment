# Gmail Vacation Email Responder

This application is designed to be run as a background process, periodically checking for new emails and sending vacation replies to their respective senders. Using the Gmail API, this Node.js application automates vacation replies for unseen emails.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Assignment Overview](#assignment-overview)
- [Scope for Improvement](#scope-for-improvement)
- [Author](#author)

## Tech Stack 

- Backend - `NodeJS`
- API - `GMail API`

## Requirements
- The app should **check for new emails in a given Gmail ID**.
- The app should send replies to Emails that have **no prior replies**.
- The app should **add a Label to the email and move the email to the label**.
- The app should repeat this sequence of steps 1-3 in random intervals of **45 - 120 seconds**.
- The app should make sure that **no double replies are sent to any email at any point**. Every email that qualifies the criterion should be replied back with one and only one auto reply.

## Getting Started

1. Clone the repository.
```bash

```
2. Install dependencies using `npm install`.
```bash
npm install
```

3. Set Gmail API credentials (CLIENT_ID, CLIENT_SECRET, REDIRECT_URI) and PORT in the `.env` file.
```bash
# .env
PORT = ###
CLIENT_ID = ###
CLIENT_SECRET = ###
REDIRECT_URI = ###
```

4. Run the script using `npm start`.
```bash
npm start
```

## Project Structure

<pre>
/
├── README.md
├── package.json
├── package-lock.json
├── .gitignore
├── .env
├── app.js
├── index.js
├── node_modules/
└── utils/
    ├── createLabel.js
    ├── extractSenderEmail.js
    ├── getUnreadMessages.js
    ├── modufyAndLabelEmail.js
    ├── processEmail.js
    ├── sendReply.js
    └── startCheckingEmails.js

</pre>

## Assignment Overview

For explaination video - [Click Here](https://drive.google.com/file/d/13p2Dnvo5Tpr53ydBEEpr8cTYqGDzi4Sa/view?usp=sharing)

## Scope for Improvement

- App can be published and verified by google for use. 
- Option can be provided to chose a label name for the user
- Testing can be done against the edge cases.
- Enhanced error handling to gracefully manage API failures, network issues, or other unexpected scenarios can be done.
- Code modularity can be improved

## Author

Made with ❤️ by Deepanshu Mahto
