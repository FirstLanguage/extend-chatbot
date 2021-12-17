# Extend Chatbot with FristLanguage API

If you are an existing customer of Chatbot or new, you can make use of our Classification API to extend your Chatbot.

You can inlcude sentiment analysis or general text classification usign the same API. We have given how to implement sentiment analysis with our API below.

## Chatbot
If you are new to Chatbot check out there site at [Chatbot](https://www.chatbot.com/)

## Let's jump into the implementation

We will be using the Webhook integration method provided by Chatbot

### Create a Webhook Server
This repo contains a sample Express server which provides a webhook endpoint for sentiment analysis.

Clone the repo in your system and run below command to install all dependencies

```
npm install
```

Once above is done, you need to open 'webhook.js' file and replace 'CHATBOT_VERIFICATION_TOKEN' with the verification code you entered while creating the webhook in Chatbot console.
This is required to ensure your webhook is authentic and working. In this code, we’re checking if your verification token is correct with the one sent in the request. 

You also need to replace 'FIRSTLANGUAGE_API_KEY' with your apiKey to access FirstLanguage APIs. If you do not have one, head to [FirstLanguage](https://www.firstlanguage.in)  to get one for free.

Once the Chatbot is published in chatbot console, you need to copy the JS embed code and replace the line 
"TODO: Copy the Chatbot published code here \" with the script code.

Once that is done, just run 

```
node webhook
```

to start serving responses

You can use NGROK to expose your localhost server to Chatbot. Run the below command if you are running on port 3000

```
ngrok http 3000
```

## Chatbot console operations

We are assuming the steps to create Chatbot stories and other fucntions are known. If not please refer thier documentation page. 

Below are few screenshots for your reference:

PFB a sampel Story for our Chatbot to work

![Story](/images/chatbot2.png)

Select the webhook you craeted in the Integerations window.

![Webhook](/images/chatbot3.png)

User input can be configured like below

![User Input](/images/chatbot4.png)

Final output of our Chatbot app

![Chatbot](/images/chatbot1.png)
