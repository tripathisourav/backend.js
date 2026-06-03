nodemailer Installation with GoogleOauth complete process

setup documentation in github (ankurdotio) -> diffrence-backend-videos -> nodemailer

documentation is not complete we have to do some more steps for setup


Google OAuth2 Credentials

1. Go to the Google API Console:
-> Navigate to the Google API Console.
-> Create a new project or select an existing one.


2. Enable Gmail API:

-> Go to the Library section.
-> Search for Gmail API and enable it.

3. OAuth consent screen

-> get started, create application, App info name, support email particular email, external, email adress your email adress

4. Create OAuth2 Credentials:

-> Go to the Credentials section.
-> Click on Create Credentials and choose OAuth 2.0 Client IDs.
-> Set the application type to Web application.
-> Under Authorized redirect URIs, add http://localhost and https://developers.google.com/oauthplayground (or your application’s URL).
-> After creating, you'll get your ClientID and ClientSecret.


Generating the Refresh Token Using OAuth 2.0 Playground

1. Access OAuth 2.0 Playground:

-> Open the OAuth 2.0 Playground in your web browser.

2. Configure OAuth 2.0 Playground:

->In the top-right corner, click on the gear icon (settings).
-> Under OAuth 2.0 endpoints, select Use your own OAuth credentials tick the block.
-> Enter your ClientID and ClientSecret obtained from the Google Cloud Console.
-> Set the Access type to Offline to obtain a refresh token.

3. Select Scopes:

-> In Step 1 on the left panel, select the appropriate scopes for your application. Gmail Api v1 For Gmail, choose:
-> https://mail.google.com/

-> Go to google api console select your project move to credentials select web client 1 -> audience -> test user add user email adress -> save email adress added in test user should be the same email adress used to authorize apis
-> oAuth 2.0 playground authorize apis choose account -> continue
-> step 2 -> Exchange authorize codes for tokens -> copy refresh tokens

-> .env file GOOGLE_USER = email adress
