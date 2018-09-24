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

	  	var y = 5
	  
	  	var sum1 = jf1 + jf2 + jf3 + jf4 + jf5 ;

	  	var sum = sum1/y;
	  	
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
    	_res.send(JSON.stringify({ street: street, int1: int1, jf1: jf1,  int2: int2, jf2: jf2,  int3: int3, jf3: jf3, 
    		int4: int4, jf4: jf4,  int5: int5, jf5: jf5,  analysis: analysis }));
	



	  
	});


});

app.get('/equirino-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  	// console.log(body.url);
	  	// console.log(body.explanation);

	  	

	  	const street = body.RWS[0].RW[1].DE;
	  	const inte1 = body.RWS[0].RW[1].FIS[0].FI[0].TMC.DE;
	  	const jfe1 = body.RWS[0].RW[1].FIS[0].FI[0].CF[0].JF;
	  	
	  	const inte2 = body.RWS[0].RW[1].FIS[0].FI[1].TMC.DE;
	  	const jfe2 = body.RWS[0].RW[1].FIS[0].FI[1].CF[0].JF;

	  	const inte3 = body.RWS[0].RW[1].FIS[0].FI[2].TMC.DE;
	  	const jfe3 = body.RWS[0].RW[1].FIS[0].FI[2].CF[0].JF;

	  	const inte4 = body.RWS[0].RW[1].FIS[0].FI[3].TMC.DE;
	  	const jfe4 = body.RWS[0].RW[1].FIS[0].FI[3].CF[0].JF;

	  	const inte5 = body.RWS[0].RW[1].FIS[0].FI[4].TMC.DE;
	  	const jfe5 = body.RWS[0].RW[1].FIS[0].FI[4].CF[0].JF;

	  	var y = 5
	  
	  	var ave = jfe1 + jfe2 + jfe3 + jfe4 + jfe5;

	  	var aveq = ave/y;

	  	
	  	let analysis = "";
	  	if(aveq <= 4){
	  		analysis = "Free flow of traffic";
	  	}else if(aveq <= 3){
	  		analysis = "Free flow of traffic";
	  	}else if(aveq <= 2){
	  		analysis = "Free flow of traffic";
	  	}else if(aveq <= 3){
	  		analysis = "Free flow of traffic";
	  	}else if(aveq <= 2){
	  		analysis = "Free flow of traffic";
	  	}else if(aveq <= 1){
	  		analysis = "Free flow of traffic";
	  	}else if(aveq <= 0){
	  		analysis = "Free flow of traffic";
	  	}else if(aveq <= 8){
	  		analysis = "Sluggish flow of traffic";
	  	}else if(aveq <= 7){
	  		analysis = "Sluggish flow of traffic"
	  	}else if(aveq <= 6){
	  		analysis = "Sluggish flow of traffic"
	  	}else if(aveq <= 5){
	  		analysis = "Sluggish flow of traffic"
	  	}else if(aveq <= 4){
	  		analysis = "Sluggish flow of traffic"
	  	}else if(aveq <= 8){
	  		analysis = "Slow flow of traffic"
	  	}else if(aveq <= 9){
	  		analysis = "Slow flow of traffic"
	  	}else if(aveq <= 10){
	  		analysis = "Slow flow of traffic"
	  	}else{
	  		analysis = "traffi8c kaayo di makaya"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: street, inte1: inte1, jfe1: jfe1,  inte2: inte2, jfe2: jfe2,  inte3: inte3, jfe3: jfe3, 
    		inte4: inte4, jfe4: jfe4,  inte5: inte5, jfe5: jfe5,  analysis: analysis }));

	  
	});


});
app.get('/jplaurel',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  	

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
	  
	  	var avejp = jf01 + jf02 + jf03 + jf04 + jf05 + jf06;
	  	var avejp1 = avejp/x;

	  	
	  	let analysis1 = "";
	  	if(avejp1 <= 4){
	  		analysis1 = "Free flow of traffic";
	  	}else if(avejp1 <= 3){
	  		analysis1 = "Free flow of traffic";
	  	}else if(avejp1 <= 2){
	  		analysis1 = "Free flow of traffic";
	  	}else if(avejp1 <= 3){
	  		analysis1 = "Free flow of traffic";
	  	}else if(avejp1 <= 2){
	  		analysis1 = "Free flow of traffic";
	  	}else if(avejp1 <= 1){
	  		analysis1 = "Free flow of traffic";
	  	}else if(avejp1 <= 0){
	  		analysis1 = "Free flow of traffic";
	  	}else if(avejp1 <= 8){
	  		analysis1 = "Sluggish flow of traffic";
	  	}else if(avejp1 <= 7){
	  		analysis1 = "Sluggish flow of traffic"
	  	}else if(avejp1 <= 6){
	  		analysis1 = "Sluggish flow of traffic"
	  	}else if(avejp1 <= 5){
	  		analysis1 = "Sluggish flow of traffic"
	  	}else if(avejp1 <= 4){
	  		analysis1 = "Sluggish flow of traffic"
	  	}else if(avejp1 <= 8){
	  		analysis1 = "Slow flow of traffic"
	  	}else if(avejp1 <= 9){
	  		analysis1 = "Slow flow of traffic"
	  	}else if(avejp1 <= 10){
	  		analysis1 = "Slow flow of traffic"
	  	}else{
	  		analysis1 = "dili nako ma computer"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street1: street1,  int01: int01, jf01: jf01,  int02: int02, jf02: jf02,  int03: int03, jf03: jf03,  
    		int04: int04, jf04: jf04,  int05: int05, jf05: jf05,  analysis1: analysis1 }));
	



	  
	});


});

app.get('/jplaurel-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  	
	

	  	const street1 = body.RWS[0].RW[3].DE;
	  	const int01 = body.RWS[0].RW[3].FIS[0].FI[0].TMC.DE;
	  	const jf01 = body.RWS[0].RW[3].FIS[0].FI[0].CF[0].JF;
	  	
	  	const int02 = body.RWS[0].RW[3].FIS[0].FI[1].TMC.DE;
	  	const jf02 = body.RWS[0].RW[3].FIS[0].FI[1].CF[0].JF;

	  	const int03 = body.RWS[0].RW[3].FIS[0].FI[2].TMC.DE;
	  	const jf03 = body.RWS[0].RW[3].FIS[0].FI[2].CF[0].JF;

	  	const int04 = body.RWS[0].RW[3].FIS[0].FI[3].TMC.DE;
	  	const jf04 = body.RWS[0].RW[3].FIS[0].FI[3].CF[0].JF;

	  	const int05 = body.RWS[0].RW[3].FIS[0].FI[4].TMC.DE;
	  	const jf05 = body.RWS[0].RW[3].FIS[0].FI[4].CF[0].JF;

	  	const int06 = body.RWS[0].RW[3].FIS[0].FI[5].TMC.DE;
	  	const jf06 = body.RWS[0].RW[3].FIS[0].FI[5].CF[0].JF;

	  	const x = 6
	  
	  	var varj = jf01 + jf02 + jf03 + jf04 + jf05 + jf06 ;
	  	var varjp = varj/x;

	  	
	  	let analysis1 = "";
	  	if(varjp <= 4){
	  		analysis1 = "Free flow of traffic";
	  	}else if(varjp <= 3){
	  		analysis1 = "Free flow of traffic";
	  	}else if(varjp <= 2){
	  		analysis1 = "Free flow of traffic";
	  	}else if(varjp <= 3){
	  		analysis1 = "Free flow of traffic";
	  	}else if(varjp <= 2){
	  		analysis1 = "Free flow of traffic";
	  	}else if(varjp <= 1){
	  		analysis1 = "Free flow of traffic";
	  	}else if(varjp <= 0){
	  		analysis1 = "Free flow of traffic";
	  	}else if(varjp <= 8){
	  		analysis1 = "Sluggish flow of traffic";
	  	}else if(varjp <= 7){
	  		analysis1 = "Sluggish flow of traffic"
	  	}else if(varjp <= 6){
	  		analysis1 = "Sluggish flow of traffic"
	  	}else if(varjp <= 5){
	  		analysis1 = "Sluggish flow of traffic"
	  	}else if(varjp <= 4){
	  		analysis1 = "Sluggish flow of traffic"
	  	}else if(varjp <= 8){
	  		analysis1 = "Slow flow of traffic"
	  	}else if(varjp <= 9){
	  		analysis1 = "Slow flow of traffic"
	  	}else if(varjp <= 10){
	  		analysis1 = "Slow flow of traffic"
	  	}else{
	  		analysis1 = "dili nako ma computer"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street1: street1,  int01: int01, jf01: jf01,  int02: int02, jf02:  jf02 ,int03: int03, jf03: jf03, int04: int04, jf04: jf04,  int05: int05, jf05: jf05,  analysis1: analysis1 }));
	});

	});



app.get('/mcarthur',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  	
	  	

	  	const streetmm = body.RWS[0].RW[4].DE;
	  	const intm = body.RWS[0].RW[4].FIS[0].FI[0].TMC.DE;
	  	const jfm = body.RWS[0].RW[4].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intm1 = body.RWS[0].RW[4].FIS[0].FI[1].TMC.DE;
	  	const jf02 = body.RWS[0].RW[4].FIS[0].FI[1].CF[0].JF;

	  	const intm2 = body.RWS[0].RW[4].FIS[0].FI[2].TMC.DE;
	  	const jfm2 = body.RWS[0].RW[4].FIS[0].FI[2].CF[0].JF;

	  	const intm3 = body.RWS[0].RW[4].FIS[0].FI[3].TMC.DE;
	  	const jfm3 = body.RWS[0].RW[4].FIS[0].FI[3].CF[0].JF;

	  	const intm4 = body.RWS[0].RW[4].FIS[0].FI[4].TMC.DE;
	  	const jfm4 = body.RWS[0].RW[4].FIS[0].FI[4].CF[0].JF;

	  	const intm5 = body.RWS[0].RW[4].FIS[0].FI[5].TMC.DE;
	  	const jfm5 = body.RWS[0].RW[4].FIS[0].FI[5].CF[0].JF;

	  	const intm6 = body.RWS[0].RW[4].FIS[0].FI[6].TMC.DE;
	  	const jfm6 = body.RWS[0].RW[4].FIS[0].FI[6].CF[0].JF;

	  	const intm7 = body.RWS[0].RW[4].FIS[0].FI[7].TMC.DE;
	  	const jfm7 = body.RWS[0].RW[4].FIS[0].FI[7].CF[0].JF;

	  	const intm8 = body.RWS[0].RW[4].FIS[0].FI[8].TMC.DE;
	  	const jfm8 = body.RWS[0].RW[4].FIS[0].FI[8].CF[0].JF;

	  	const intm9 = body.RWS[0].RW[4].FIS[0].FI[9].TMC.DE;
	  	const jfm9 = body.RWS[0].RW[4].FIS[0].FI[9].CF[0].JF;

	  	const intm10 = body.RWS[0].RW[4].FIS[0].FI[10].TMC.DE;
	  	const jfm10  = body.RWS[0].RW[4].FIS[0].FI[10].CF[0].JF;
	  		
	  	const intm11 = body.RWS[0].RW[4].FIS[0].FI[11].TMC.DE;
	  	const jfm11 = body.RWS[0].RW[4].FIS[0].FI[11].CF[0].JF;
	  	
	  	const intm12 = body.RWS[0].RW[4].FIS[0].FI[12].TMC.DE;
	  	const jfm12 = body.RWS[0].RW[4].FIS[0].FI[12].CF[0].JF;
	  	
	  	const intm13 = body.RWS[0].RW[4].FIS[0].FI[13].TMC.DE;
	  	const jfm13 = body.RWS[0].RW[4].FIS[0].FI[13].CF[0].JF;

	  	const x = 14
	  
	  	var avem = jfm + jf02 + jfm2 + jfm3 + jfm4 + jfm5 + jfm6 + jfm8
	  	+ jfm9 + jfm10 + jfm11 + jfm12 + jfm13  ;

	  	var avemc = avem/x;

	  	
	  	let analysis2 = "";
	  	if(avemc <= 4){
	  		analysis2 = "Free flow of traffic";
	  	}else if(avemc <= 3){
	  		analysis2 = "Free flow of traffic";
	  	}else if(avemc <= 2){
	  		analysis2 = "Free flow of traffic";
	  	}else if(avemc <= 3){
	  		analysis2 = "Free flow of traffic";
	  	}else if(avemc <= 2){
	  		analysis2 = "Free flow of traffic";
	  	}else if(avemc <= 1){
	  		analysis2 = "Free flow of traffic";
	  	}else if(avemc <= 0){
	  		analysis2 = "Free flow of traffic";
	  	}else if(avemc <= 8){
	  		analysis2 = "Sluggish flow of traffic";
	  	}else if(avemc <= 7){
	  		analysis2 = "Sluggish flow of traffic"
	  	}else if(avemc <= 6){
	  		analysis2 = "Sluggish flow of traffic"
	  	}else if(avemc <= 5){
	  		analysis2 = "Sluggish flow of traffic"
	  	}else if(avemc <= 4){
	  		analysis2 = "Sluggish flow of traffic"
	  	}else if(avemc <= 8){
	  		analysis2 = "Slow flow of traffic"
	  	}else if(avemc <= 9){
	  		analysis2 = "Slow flow of traffic"
	  	}else if(avemc <= 10){
	  		analysis2 = "Slow flow of traffic"
	  	}else{
	  		analysis2 = "dili nako ma computer"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ streetmm: streetmm,  intm1: intm1, jf02: jf02,  intm2: intm2, jfm2: jfm2,  intm3: intm3, 
    		jfm3: jfm3,  
    		intm4: intm4, jfm4: jfm4,  intm5: intm5, jfm5: jfm5,  intm6: intm6, jfm6: jfm6,  intm7: intm7, 
    		jfm7: jfm7,  intm8: intm8, jfm8: jfm8,  intm9: intm9, jfm9: jfm9, intm10: intm10, jfm10: jfm10, 
    		intm11: intm11, jfm11: jfm11, intm12: intm12, jfm12: jfm12,  intm13: intm13, jfm13: jfm13, analysis2: analysis2 }));
	



	  
	});


});

app.get('/mcarthur-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  	
	  	

	  	const streetmmm = body.RWS[0].RW[5].DE;
	  	const intmm = body.RWS[0].RW[5].FIS[0].FI[0].TMC.DE;
	  	const jfmm = body.RWS[0].RW[5].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intmm1 = body.RWS[0].RW[5].FIS[0].FI[1].TMC.DE;
	  	const jfm02 = body.RWS[0].RW[5].FIS[0].FI[1].CF[0].JF;

	  	const intmm2 = body.RWS[0].RW[5].FIS[0].FI[2].TMC.DE;
	  	const jfmm2 = body.RWS[0].RW[5].FIS[0].FI[2].CF[0].JF;

	  	const intmm3 = body.RWS[0].RW[5].FIS[0].FI[3].TMC.DE;
	  	const jfmm3 = body.RWS[0].RW[5].FIS[0].FI[3].CF[0].JF;

	  	const intmm4 = body.RWS[0].RW[5].FIS[0].FI[4].TMC.DE;
	  	const jfmm4 = body.RWS[0].RW[5].FIS[0].FI[4].CF[0].JF;

	  	const intmm5 = body.RWS[0].RW[5].FIS[0].FI[5].TMC.DE;
	  	const jfmm5 = body.RWS[0].RW[5].FIS[0].FI[5].CF[0].JF;

	  	const intmm6 = body.RWS[0].RW[5].FIS[0].FI[6].TMC.DE;
	  	const jfmm6 = body.RWS[0].RW[5].FIS[0].FI[6].CF[0].JF;

	  	const intmm7 = body.RWS[0].RW[5].FIS[0].FI[7].TMC.DE;
	  	const jfmm7 = body.RWS[0].RW[5].FIS[0].FI[7].CF[0].JF;

	  	const intmm8 = body.RWS[0].RW[5].FIS[0].FI[8].TMC.DE;
	  	const jfmm8 = body.RWS[0].RW[5].FIS[0].FI[8].CF[0].JF;

	  	const intmm9 = body.RWS[0].RW[5].FIS[0].FI[9].TMC.DE;
	  	const jfmm9 = body.RWS[0].RW[5].FIS[0].FI[9].CF[0].JF;

	  	const intmm10 = body.RWS[0].RW[5].FIS[0].FI[10].TMC.DE;
	  	const jfmm10  = body.RWS[0].RW[5].FIS[0].FI[10].CF[0].JF;
	  		
	  	const intmm11 = body.RWS[0].RW[5].FIS[0].FI[11].TMC.DE;
	  	const jfmm11 = body.RWS[0].RW[5].FIS[0].FI[11].CF[0].JF;
	  	
	  	const intmm12 = body.RWS[0].RW[5].FIS[0].FI[12].TMC.DE;
	  	const jfmm12 = body.RWS[0].RW[5].FIS[0].FI[12].CF[0].JF;
	  	
	  	const intmm13 = body.RWS[0].RW[5].FIS[0].FI[13].TMC.DE;
	  	const jfmm13 = body.RWS[0].RW[5].FIS[0].FI[13].CF[0].JF;

	  	const xm = 13
	  
	  	var avemm = jfmm + jfm02 + jfmm2 + jfmm3 + jfmm4 + jfmm5 + jfmm6 + jfmm8
	  	+ jfmm9 + jfmm10 + jfmm11 + jfmm12 + jfmm13  ;

	  	var avemcm = avemm/xm;

	  	
	  	let analysis3 = "";
	  	if(avemcm <= 4){
	  		analysis3 = "Free flow of traffic";
	  	}else if(avemcm <= 3){
	  		analysis3 = "Free flow of traffic";
	  	}else if(avemcm <= 2){
	  		analysis3 = "Free flow of traffic";
	  	}else if(avemcm <= 3){
	  		analysis3 = "Free flow of traffic";
	  	}else if(avemcm <= 2){
	  		analysis3 = "Free flow of traffic";
	  	}else if(avemcm <= 1){
	  		analysis3 = "Free flow of traffic";
	  	}else if(avemcm <= 0){
	  		analysis3 = "Free flow of traffic";
	  	}else if(avemcm <= 8){
	  		analysis3 = "Sluggish flow of traffic";
	  	}else if(avemcm <= 7){
	  		analysis3 = "Sluggish flow of traffic"
	  	}else if(avemcm <= 6){
	  		analysis3 = "Sluggish flow of traffic"
	  	}else if(avemcm <= 5){
	  		analysis3 = "Sluggish flow of traffic"
	  	}else if(avemcm <= 4){
	  		analysis3 = "Sluggish flow of traffic"
	  	}else if(avemcm <= 8){
	  		analysis3 = "Slow flow of traffic"
	  	}else if(avemcm <= 9){
	  		analysis3 = "Slow flow of traffic"
	  	}else if(avemcm <= 10){
	  		analysis3 = "Slow flow of traffic"
	  	}else{
	  		analysis3 = "dili nako ma computer"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ streetmmm: streetmmm,  intmm1: intmm1, jfm02: jfm02,  intmm2: intmm2, jfmm2: jfmm2,  intmm3: intmm3, 
    		jfmm3: jfmm3, intmm4: intmm4, jfmm4: jfmm4,  intmm5: intmm5, jfmm5: jfmm5,  intmm6: intmm6, jfmm6: jfmm6,  intmm7: intmm7, 
    		jfmm7: jfmm7,  intmm8: intmm8, jfmm8: jfmm8,  intmm9: intmm9, jfmm9: jfmm9, intmm10: intmm10, jfmm10: jfmm10, 
    		intmm11: intmm11, jfmm11: jfmm11, intmm12: intmm12, jfmm12: jfmm12,  intmm13: intmm13, jfmm13: jfmm13, analysis3: analysis3 }));
	



	  
	});


});

app.get('/ecowestdr',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  	// console.log(body.url);
	  	// console.log(body.explanation);
	  	console.log(body.RWS[0].RW);
	  	console.log("###################");
	  	console.log(body.RWS[0].RW[0].DE);
	  	console.log(body.RWS[0].RW[0].FIS[0].FI[0].TMC.DE);
	  	

	  	
	  	

	  	const streetec = body.RWS[0].RW[6].DE;
	  	const inte1 = body.RWS[0].RW[6].FIS[0].FI[0].TMC.DE;
	  	const jfe1 = body.RWS[0].RW[6].FIS[0].FI[0].CF[0].JF;
	  	
	  	const inte2 = body.RWS[0].RW[6].FIS[0].FI[1].TMC.DE;
	  	const jfe2 = body.RWS[0].RW[6].FIS[0].FI[1].CF[0].JF;

	  	

	  	var w = 2
	  
	  	var eco = jfe1 + jfe2 ;

	  	var ecowest = eco/w;
	  	
	  	let analysis4 = "";
	  	if(ecowest <= 4){
	  		analysis4 = "Free flow of traffic";
	  	}else if(ecowest <= 3){
	  		analysis4 = "Free flow of traffic";
	  	}else if(ecowest <= 2){
	  		analysis4 = "Free flow of traffic";
	  	}else if(ecowest <= 3){
	  		analysis4 = "Free flow of traffic";
	  	}else if(ecowest <= 2){
	  		analysis4 = "Free flow of traffic";
	  	}else if(ecowest <= 1){
	  		analysis4 = "Free flow of traffic";
	  	}else if(ecowest <= 0){
	  		analysis4 = "Free flow of traffic";
	  	}else if(ecowest <= 8){
	  		analysis4 = "Sluggish flow of traffic";
	  	}else if(ecowest <= 7){
	  		analysis4 = "Sluggish flow of traffic"
	  	}else if(ecowest <= 6){
	  		analysis4 = "Sluggish flow of traffic"
	  	}else if(ecowest <= 5){
	  		analysis4 = "Sluggish flow of traffic"
	  	}else if(ecowest <= 4){
	  		analysis4 = "Sluggish flow of traffic"
	  	}else if(ecowest <= 8){
	  		analysis4 = "Slow flow of traffic"
	  	}else if(ecowest <= 9){
	  		analysis4 = "Slow flow of traffic"
	  	}else if(ecowest <= 10){
	  		analysis4 = "Slow flow of traffic"
	  	}else{
	  		analysis = "traffi8c kaayo di makaya"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetec, inte1: inte1, jfe1: jfe1,  inte2: inte2, jfe2: jfe2, analysis4: analysis4 }));
	



	  
	});


});
app.get('/ecowestdr-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  	// console.log(body.url);
	  	// console.log(body.explanation);
	  	console.log(body.RWS[0].RW);
	  	console.log("###################");
	  	console.log(body.RWS[0].RW[0].DE);
	  	console.log(body.RWS[0].RW[0].FIS[0].FI[0].TMC.DE);
	  	

	  	
	  	

	  	const streeteec = body.RWS[0].RW[7].DE;
	  	const intee1 = body.RWS[0].RW[7].FIS[0].FI[0].TMC.DE;
	  	const jfee1 = body.RWS[0].RW[7].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intee2 = body.RWS[0].RW[7].FIS[0].FI[1].TMC.DE;
	  	const jfee2 = body.RWS[0].RW[7].FIS[0].FI[1].CF[0].JF;

	  	

	  	var z = 2
	  
	  	var ecoeco = jfee1 + jfee2 ;

	  	var ecowestdr = ecoeco/z;
	  	
	  	let analysis5 = "";
	  	if(ecowestdr <= 4){
	  		analysis5 = "Free flow of traffic";
	  	}else if(ecowestdr <= 3){
	  		analysis5 = "Free flow of traffic";
	  	}else if(ecowestdr <= 2){
	  		analysis5 = "Free flow of traffic";
	  	}else if(ecowestdr <= 3){
	  		analysis5 = "Free flow of traffic";
	  	}else if(ecowestdr <= 2){
	  		analysis5 = "Free flow of traffic";
	  	}else if(ecowestdr <= 1){
	  		analysis5 = "Free flow of traffic";
	  	}else if(ecowestdr <= 0){
	  		analysis5 = "Free flow of traffic";
	  	}else if(ecowestdr <= 8){
	  		analysis5 = "Sluggish flow of traffic";
	  	}else if(ecowestdr <= 7){
	  		analysis5 = "Sluggish flow of traffic"
	  	}else if(ecowestdr <= 6){
	  		analysis5 = "Sluggish flow of traffic"
	  	}else if(ecowestdr <= 5){
	  		analysis5 = "Sluggish flow of traffic"
	  	}else if(ecowestdr <= 4){
	  		analysis5 = "Sluggish flow of traffic"
	  	}else if(ecowestdr <= 8){
	  		analysis5 = "Slow flow of traffic"
	  	}else if(ecowestdr <= 9){
	  		analysis5 = "Slow flow of traffic"
	  	}else if(ecowestdr <= 10){
	  		analysis5 = "Slow flow of traffic"
	  	}else{
	  		analysis5 = "traffi8c kaayo di makaya"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streeteec, intee1: intee1, jfee1: jfee1,  intee2: intee2, jfee2: jfee2, analysis5: analysis5 }));
	



	  
	});


});

app.get('/ecoland',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[8].DE;
	  	const intc1 = body.RWS[0].RW[8].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[8].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[8].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[8].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[8].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[8].FIS[0].FI[2].CF[0].JF;

	  	

	  	var p = 3
	  
	  	var ecoland = jfc1 + jfc2 ;

	  	var ecolands = ecoland/p;
	  	
	  	let analysis6 = "";
	  	if(ecolands <= 4){
	  		analysis6 = "Free flow of traffic";
	  	}else if(ecolands <= 3){
	  		analysis6 = "Free flow of traffic";
	  	}else if(ecolands <= 2){
	  		analysis6 = "Free flow of traffic";
	  	}else if(ecolands <= 3){
	  		analysis6 = "Free flow of traffic";
	  	}else if(ecolands <= 2){
	  		analysis6 = "Free flow of traffic";
	  	}else if(ecolands <= 1){
	  		analysis6 = "Free flow of traffic";
	  	}else if(ecolands <= 0){
	  		analysis6 = "Free flow of traffic";
	  	}else if(ecolands <= 8){
	  		analysis6 = "Sluggish flow of traffic";
	  	}else if(ecolands <= 7){
	  		analysis6 = "Sluggish flow of traffic"
	  	}else if(ecolands <= 6){
	  		analysis6 = "Sluggish flow of traffic"
	  	}else if(ecolands <= 5){
	  		analysis6 = "Sluggish flow of traffic"
	  	}else if(ecolands <= 4){
	  		analysis6 = "Sluggish flow of traffic"
	  	}else if(ecolands <= 8){
	  		analysis6 = "Slow flow of traffic"
	  	}else if(ecolands <= 9){
	  		analysis6 = "Slow flow of traffic"
	  	}else if(ecolands <= 10){
	  		analysis6 = "Slow flow of traffic"
	  	}else{
	  		analysis6 = "traffi8c kaayo di makaya"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, analysis6: analysis6 }));
	



	  
	});


});

app.get('/matinaaplaya',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetm = body.RWS[0].RW[9].DE;
	  	const intm1 = body.RWS[0].RW[9].FIS[0].FI[0].TMC.DE;
	  	const jfm1 = body.RWS[0].RW[9].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intm2 = body.RWS[0].RW[9].FIS[0].FI[1].TMC.DE;
	  	const jfm2 = body.RWS[0].RW[9].FIS[0].FI[1].CF[0].JF;

	  	const intm3 = body.RWS[0].RW[9].FIS[0].FI[2].TMC.DE;
	  	const jfm3 = body.RWS[0].RW[9].FIS[0].FI[2].CF[0].JF;

	  	const intm4 = body.RWS[0].RW[9].FIS[0].FI[3].TMC.DE;
	  	const jfm4 = body.RWS[0].RW[9].FIS[0].FI[3].CF[0].JF;

	  	

	  	var p = 4
	  
	  	var matina = jfm1 + jfm2 + jfm3+ jfm4;

	  	var aplaya = matina/p;
	  	
	  	let analysis7 = "";
	  	if(aplaya <= 4){
	  		analysis7 = "Free flow of traffic";
	  	}else if(aplaya <= 3){
	  		analysis7 = "Free flow of traffic";
	  	}else if(aplaya <= 2){
	  		analysis7 = "Free flow of traffic";
	  	}else if(aplaya <= 3){
	  		analysis7 = "Free flow of traffic";
	  	}else if(aplaya <= 2){
	  		analysis7 = "Free flow of traffic";
	  	}else if(aplaya <= 1){
	  		analysis7 = "Free flow of traffic";
	  	}else if(aplaya <= 0){
	  		analysis7 = "Free flow of traffic";
	  	}else if(aplaya <= 8){
	  		analysis7 = "Sluggish flow of traffic";
	  	}else if(aplaya <= 7){
	  		analysis7 = "Sluggish flow of traffic"
	  	}else if(aplaya <= 6){
	  		analysis7 = "Sluggish flow of traffic"
	  	}else if(aplaya <= 5){
	  		analysis7 = "Sluggish flow of traffic"
	  	}else if(aplaya <= 4){
	  		analysis7 = "Sluggish flow of traffic"
	  	}else if(aplaya <= 8){
	  		analysis7 = "Slow flow of traffic"
	  	}else if(aplaya <= 9){
	  		analysis7 = "Slow flow of traffic"
	  	}else if(aplaya <= 10){
	  		analysis7 = "Slow flow of traffic"
	  	}else{
	  		analysis7 = "traffi8c kaayo di makaya"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetm, intm1: intm1, jfm1: jfm1,  intm2: intm2, jfm2: jfm2, intm3: intm3, jfm3: jfm3, intm4:intm4, jfm4:jfm4, analysis7: analysis7 }));
	



	  
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
	

	axios.get('https://polar-castle-83452.herokuapp.com/equirino-')
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
	

	axios.get('https://polar-castle-83452.herokuapp.com/mcarthur')
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
	

	axios.get('https://polar-castle-83452.herokuapp.com/mcarthur-')
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
app.get('/geo',function(req, res){
	

	axios.get('https://polar-castle-83452.herokuapp.com/jplaurel-')
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
	

	axios.get('https://polar-castle-83452.herokuapp.com/ecowestdr')
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
	

	axios.get('https://polar-castle-83452.herokuapp.com/ecowestdr-')
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
	

	axios.get('https://polar-castle-83452.herokuapp.com/ecoland')
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
	

	axios.get('https://polar-castle-83452.herokuapp.com/matinaaplaya')
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
			if(text.includes("mcarthur")){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://polar-castle-83452.herokuapp.com/mcarthur')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis2;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			if(text.includes("mcarthur-")){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://polar-castle-83452.herokuapp.com/mcarthur-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis3;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}

			if(text.includes("ecowestdr")){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://polar-castle-83452.herokuapp.com/ecowestdr')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis4;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			if(text.includes("ecowestdr-")){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://polar-castle-83452.herokuapp.com/ecowestdr-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis5;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			if(text.includes("ecoland")){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://polar-castle-83452.herokuapp.com/ecoland')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis6;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}

			if(text.includes("matina aplaya")){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://polar-castle-83452.herokuapp.com/matinaaplaya')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis7;
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