'use strict';

import { Client, AdvancedAPIsController, ApiError } from "firstlanguage-typescript";
import express from 'express';
import bodyParser from 'body-parser';

const app = express().use(bodyParser.json()); 
const token = 'CHATBOT_VERIFICATION_TOKEN'; // your verification token

const client = new Client({
    timeout: 0,
    apikey: 'FIRSTLANGUAGE_API_KEY',
  })

const advAPIsController = new AdvancedAPIsController(client);

  
app.get('/', (req, res) => {
  //add simple web response
  res.writeHead(200, { 'Content-Type':'text/html'});
      res.end('<html><head></head><body><div><p>Test<p></div> \
            <!-- Start of ChatBot (www.chatbot.com) code -->   \
     TODO: Copy the Chatbot published code here \
      <!-- End of ChatBot code -->   \
      </body></html>');

});


app.get('/sentiment', (req, res) => {
    // check if verification token is correct
    if (req.query.token !== token) {
        return res.sendStatus(401);
    }
    console.log(req);
    // return challenge
    return res.end(req.query.challenge);
});

app.post('/sentiment', (req, res) => {
    // check if verification token is correct
    if (req.query.token !== token) {
        return res.sendStatus(401);
    }
  

    var obj =  req.body ;  
    //Create Classifcation input body 
    const msg = `{
      "input":{
       "text":"${obj['message']}",
       "lang":"en",
       "labels": [
        "positive",
        "negative"
        ]
     }
    }`;
    
    //Call FirstLanguage Classification API
    advAPIsController.getClassification(msg).then(response => {
      
      const obj = response.result;
      if(obj['labels'][0] === 'positive' && obj['scores'][0] > obj['scores'][1]){        
        const data = {
          responses: [
              {
                  type: 'text',
                  elements: ['Positive']
              }
          ]
        };
        //Sending sucess text response to webhook
        res.json(data);
      }
      if(obj['labels'][0] === 'negative' && obj['scores'][0] > obj['scores'][1]){      
        //throwing error so that webhook failure flow is triggered in the Chatbot Story  
        res.status(400);
        res.send('negative');
      }

    }).catch(error => {
           console.log(error); 
           if (error instanceof ApiError) {
                const errors = error.result;        
                res.status(400);
                res.send('Negative Sentiment');
             }
       });   
        
});

app.listen(3000, () => console.log('[BotEngine] Webhook is listening'));
