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
	  	

	  	
	  	const sep = ("----------------------");

	  	const sep1 = ("----------------------");

	  	const sep2 = ("----------------------");

	  	const sep3 = ("----------------------");

	  	const sep4 = ("----------------------");

	  	const street = body.RWS[0].RW[0].DE;
	  	const int1 = body.RWS[0].RW[0].FIS[0].FI[0].TMC.DE;
	  	const jf1 = body.RWS[0].RW[0].FIS[0].FI[0].CF[0].JF;
	  	
	  	const int2 = body.RWS[0].RW[0].FIS[0].FI[1].TMC.DE;
	  	const jf2 = body.RWS[0].RW[0].FIS[0].FI[1].CF[0].JF;

	  	const int3 = body.RWS[0].RW[0].FIS[0].FI[2].TMC.DE;
	  	const jf3 = body.RWS[0].RW[0].FIS[0].FI[2].CF[0].JF;

	  	const int4 = body.RWS[0].RW[0].FIS[0].FI[3].TMC.DE;
	  	const jf4 = body.RWS[0].RW[0].FIS[0].FI[3].CF[0].JF;

	  	const int5 = body.RWS[0].RW[0].FIS[0].FI[4].TMC.DE;
	  	const jf5 = body.RWS[0].RW[0].FIS[0].FI[4].CF[0].JF;

	  	const y = 5
	  
	  	var sum = jf1 + jf2 + jf3 + jf4 + jf5 / y;

	  	
	  	let analysis = "";
	  	if(sum <= 4){
	  		analysis = "Free flow of traffic";
	  	}else if(sum <= 3){
	  		analysis = "Free flow of traffic";
	  	}else if(sum <= 2){
	  		analysis = "Free flow of traffic";
	  	}else if(sum <= 3){
	  		analysis = "Free flow of traffic";
	  	}else if(sum <= 2){
	  		analysis = "Free flow of traffic";
	  	}else if(sum <= 1){
	  		analysis = "Free flow of traffic";
	  	}else if(sum <= 0){
	  		analysis = "Free flow of traffic";
	  	}else if(sum <= 8){
	  		analysis = "Sluggish flow of traffic";
	  	}else if(sum <= 7){
	  		analysis = "Sluggish flow of traffic"
	  	}else if(sum <= 6){
	  		analysis = "Sluggish flow of traffic"
	  	}else if(sum <= 5){
	  		analysis = "Sluggish flow of traffic"
	  	}else if(sum <= 4){
	  		analysis = "Sluggish flow of traffic"
	  	}else if(sum <= 8){
	  		analysis = "Slow flow of traffic"
	  	}else if(sum <= 9){
	  		analysis = "Slow flow of traffic"
	  	}else if(sum <= 10){
	  		analysis = "Slow flow of traffic"
	  	}else{
	  		analysis = "traffi8c kaayo di makaya"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: street,sep1:sep1, int1: int1, jf1: jf1, sep: sep, int2: int2, jf2: jf2, sep2: sep2, int3: int3, jf3: jf3, sep3: sep3, 
    		int4: int4, jf4: jf4, sep4: sep4, int5: int5, jf5: jf5,  analysis: analysis }));
	



	  
	});


});
app.get('/jplaurel',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  	// console.log(body.url);
	  	// console.log(body.explanation);
	  	// console.log(body.RWS[0].RW);
	  	// console.log("###################");
	  	// console.log(body.RWS[0].RW[2].DE);
	  	// console.log(body.RWS[0].RW[0].FIS[0].FI[0].TMC.DE);
	  	

	  	
	  	const sep = ("----------------------");

	  	const sep1 = ("----------------------");

	  	const sep2 = ("----------------------");

	  	const sep3 = ("----------------------");

	  	const sep4 = ("----------------------");

	  	const street1 = body.RWS[0].RW[2].DE;
	  	const int01 = body.RWS[0].RW[2].FIS[0].FI[0].TMC.DE;
	  	const jf01 = body.RWS[0].RW[2].FIS[0].FI[0].CF[0].JF;
	  	
	  	const int02 = body.RWS[0].RW[2].FIS[0].FI[1].TMC.DE;
	  	const jf02 = body.RWS[0].RW[2].FIS[0].FI[1].CF[0].JF;

	  	const int03 = body.RWS[0].RW[2].FIS[0].FI[2].TMC.DE;
	  	const jf03 = body.RWS[0].RW[2].FIS[0].FI[2].CF[0].JF;

	  	const int04 = body.RWS[0].RW[2].FIS[0].FI[3].TMC.DE;
	  	const jf04 = body.RWS[0].RW[2].FIS[0].FI[3].CF[0].JF;

	  	const int05 = body.RWS[0].RW[2].FIS[0].FI[4].TMC.DE;
	  	const jf05 = body.RWS[0].RW[2].FIS[0].FI[4].CF[0].JF;

	  	const int06 = body.RWS[0].RW[2].FIS[0].FI[5].TMC.DE;
	  	const jf06 = body.RWS[0].RW[2].FIS[0].FI[5].CF[0].JF;

	  	const x = 6
	  
	  	var sum1 = jf01 + jf02 + jf03 + jf04 + jf05 + jf06 / x;

	  	
	  	let analysis1 = "";
	  	if(sum1 <= 4){
	  		analysis1 = "Free flow of traffic";
	  	}else if(sum1 <= 3){
	  		analysis1 = "Free flow of traffic";
	  	}else if(sum1 <= 2){
	  		analysis1 = "Free flow of traffic";
	  	}else if(sum1 <= 3){
	  		analysis1 = "Free flow of traffic";
	  	}else if(sum1 <= 2){
	  		analysis1 = "Free flow of traffic";
	  	}else if(sum1 <= 1){
	  		analysis1 = "Free flow of traffic";
	  	}else if(sum1 <= 0){
	  		analysis1 = "Free flow of traffic";
	  	}else if(sum1 <= 8){
	  		analysis1 = "Sluggish flow of traffic";
	  	}else if(sum1 <= 7){
	  		analysis1 = "Sluggish flow of traffic"
	  	}else if(sum1 <= 6){
	  		analysis1 = "Sluggish flow of traffic"
	  	}else if(sum1 <= 5){
	  		analysis1 = "Sluggish flow of traffic"
	  	}else if(sum1 <= 4){
	  		analysis1 = "Sluggish flow of traffic"
	  	}else if(sum1 <= 8){
	  		analysis1 = "Slow flow of traffic"
	  	}else if(sum1 <= 9){
	  		analysis1 = "Slow flow of traffic"
	  	}else if(sum1 <= 10){
	  		analysis1 = "Slow flow of traffic"
	  	}else{
	  		analysis1 = "dili nako ma computer"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street1: street1, sep1:sep1, int01: int01, jf01: jf01, sep: sep, int02: int02, jf02: jf02, sep2: sep2, int03: int03, jf03: jf03, sep3: sep3, 
    		int04: int04, jf04: jf04, sep4: sep4, int05: int05, jf05: jf05,  analysis1: analysis1 }));
	



	  
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

app.get('/geo',function(req, res){
	

	axios.get('https://polar-castle-83452.herokuapp.com/jplaurel')
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
			}

			if(text.includes("route2")){

				
				sendText(sender, "whats up ? how may I help you")
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
			if(text.includes("jplaurel")){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://polar-castle-83452.herokuapp.com/jplaurel')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis1;
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