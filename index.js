'use strict'

'jquery.js'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https');
const axios = require('axios');

const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES

app.get('/', function(req, res) {
	res.send("Hi I am a chatbot")
})

// HERE

//source: https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

app.get('/equirino',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  	// console.log(body.url);
	  	// console.log(body.explanation);
	  	console.log(body.RWS[0].RW);
	  	console.log("###################");
	  	console.log(body.RWS[0].RW[0].DE);
	  	console.log(body.RWS[0].RW[0].FIS[0].FI[0].TMC.DE);
	  	console.log(body.RWS[0].RW[0].FIS[0].FI[0].CF[0].JF);

	  	const street = body.RWS[0].RW[0].DE;
	  	const int1 = body.RWS[0].RW[0].FIS[0].FI[0].TMC.DE;
	  	const jf1 = body.RWS[0].RW[0].FIS[0].FI[0].CF[0].JF;

	  	const street2 = body.RWS[0].RW[0].DE;
	  	const int2 = body.RWS[0].RW[0].FIS[0].FI[0].TMC.DE;
	  	const jf2 = body.RWS[0].RW[0].FIS[0].FI[0].CF[1].JF;
	  	
	  	let analysis = "";
	  	if(jf1 == 4){
	  		analysis = "Free flow of traffic";
	  	}else if(jf1 == 3){
	  		analysis = "Free flow of traffic";
	  	}else if(jf1 == 2){
	  		analysis = "Free flow of traffic";
	  	}else if(jf1 == 3){
	  		analysis = "Free flow of traffic";
	  	}else if(jf1 == 2){
	  		analysis = "Free flow of traffic";
	  	}else if(jf1 == 1){
	  		analysis = "Free flow of traffic";
	  	}else if(jf1 == 0){
	  		analysis = "Free flow of traffic";
	  	}else if(jf1 == 8){
	  		analysis = "Sluggish flow of traffic";
	  	}else if(jf1 == 7){
	  		analysis = "Sluggish flow of traffic"
	  	}else if(jf1 == 6){
	  		analysis = "Sluggish flow of traffic"
	  	}else if(jf1 == 5){
	  		analysis = "Sluggish flow of traffic"
	  	}else if(jf1 == 4){
	  		analysis = "Sluggish flow of traffic"
	  	}else if(jf1 == 8){
	  		analysis = "Slow flow of traffic"
	  	}else if(jf1 == 9){
	  		analysis = "Slow flow of traffic"
	  	}else if(jf1 == 10){
	  		analysis = "Slow flow of traffic"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: street, int1: int1, jf1: jf1, street2: street2, jf2: jf2,  analysis: analysis }));
	});

    
});

app.get('/geo',function(req, res){
	// res.send('Hi geo');
	// https.get('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', (resp) => {

	// 	//console.log(resp);
	//   let data = '';

	//   // A chunk of data has been recieved.
	//   resp.on('data', (chunk) => {
	//     data += chunk;
	//   });

	//   // The whole response has been received. Print out the result.
	//   resp.on('end', () => {
	//     console.log(JSON.parse(data).explanation);
	//   });

	// }).on("error", (err) => {
	//   console.log("Error: " + err.message);
	// });

	// request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	//   if (err) { return console.log(err); }
	//   // console.log(body.url);
	//   // console.log(body.explanation);
	//   console.log(body.RWS[0].RW);
	//   console.log("###################");
	//   console.log(body.RWS[0].RW[0].DE);
	//   console.log(body.RWS[0].RW[0].FIS[0].FI[0].TMC.DE);
	//   console.log(body.RWS[0].RW[0].FIS[0].FI[0].CF[0].JF);
	// });

	axios.get('https://polar-castle-83452.herokuapp.com/equirino')
	  .then(function (response) {
	    console.log(response.data);
	    //chatbotResponse = response.jf1;
	    //sendText(sender, chatbotResponse)
	  })
	  .catch(function (error) {
	    console.log(error);
	    //chatbotResponse = "not ok";
	    //sendText(sender, chatbotResponse)
	  });

})

let token = "EAAimrKFwRkIBADU9ZAgmFJPZBZB2hipmHHPdMFp0X8soLUq1ElyX0v20noVjGBvuyjppZBEHKaR1rhZAjCM9eI7nWG5JiRCaJISuLo8Oxfp9KDxx489dj5ukAReIgSc0c1IOcHmzTFEovaCvRhGZCcZCMDnJL2D251mkZCnJjs8uggZDZD"

// Facebook 

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "Hi") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text

			if(text.includes("good day chatbot")){
				sendText(sender, "whats up ? how may I help you")
			}else if (text.includes("what is the traffic status in davao city")){
				sendText(sender, "Well, Ok! are you a motorist or a commuter?")
			}else if (text.includes("I am a commuter")){
				sendText(sender, "Ok, so you are commuter. What route of jeep are you going to ride?")
			}else if (text.includes("I am a motorist")){
				sendText(sender, "Ok, so you are motorist. Where your location and where are you heading to? Example: PoceSt to Manila")
			}else if (text.includes("NO")){
				sendText(sender, "Ok! What now?")
			}else if (text.includes("help")){
				sendText(sender, "This are the necessary commands!,			good day chatbot, 					what is the traffic status in davao city, 					I am a commuter,				and I am a motorist")
			}
			if(text.includes("equirino")){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://polar-castle-83452.herokuapp.com/equirino')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			
		}
	}
	res.sendStatus(200)
})

function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}



app.listen(app.get('port'), function() {
	console.log("running: ", app.get('port'))
})