userVerification1 -> pehle user jb register pe request krega toh direct token bnne ki jgah uske email pe ek msg aayega verification ka usse pehle user ka verified status false rahega
userVerification2 -> phir jb user message pe click krega server pe request aayegi ki user ka status verified kr do or phir jb user login req krega tb uska token bnega 

setup nodemailer complete details in day 120 1:15:25 or read the setup documentation in ankurdotio -> diffrence-backend-videos -> nodemailer


how email is sent

there are two types of servers -> web servers - smtp servers

smtp server is responsible for which emails can come to user email, web servers can't directly send email they communicate with smtp servers to send email

When a web server sends an email to a user, it usually does not send the email directly. Instead, it uses an SMTP (Simple Mail Transfer Protocol) server.

Flow of Email Sending

User Action
     ↓
Web Browser
     ↓ HTTP Request
Web Server (Node.js, PHP, Django, etc.)
     ↓ SMTP
SMTP Server
     ↓
Recipient's Mail Server
     ↓
User's Inbox (Gmail, Outlook, Yahoo, etc.)


Why Use an SMTP Server?

Web servers are not trusted to send emails directly because:

Many ISPs block direct email sending.
Emails may be marked as spam.
SMTP servers handle authentication, retries, encryption, and delivery.


Langchain - AI service

langchain website - products - lanchain - read docs - typescript - models - google gemini - model class 
-> npm install @langchain/google-genai langchain
-> paste the model class code

mistral ai studio for mistral ai api key