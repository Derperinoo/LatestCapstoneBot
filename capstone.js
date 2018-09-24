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
	  	if(sum == 0 || sum <= 4){
	  		analysis = "Free flow of traffic";
	  	}else if(sum == 4 || sum <= 8){
	  		analysis = "Sluggish flow of traffic";
	  	}else if(sum == 8 || sum <= 9){
	  		analysis = "Slow flow of traffic";
	  	}else if(sum == 10){
	  		analysis = "Traffic stopped or Road closed"
	  	}else{
	  		analysis = "Cannot compute"
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
	  	if(aveq == 0 || aveq <= 4){
	  		analysis = "Free flow of traffic";
	  	}else if(aveq == 4 || aveq <= 8){
	  		analysis = "Sluggish flow of traffic";
	  	}else if(aveq == 8 || aveq <= 9){
	  		analysis = "Slow flow of traffic";
	  	}else if(aveq == 10){
	  		analysis = "Traffic stopped or Road closed"
	  	}else{
	  		analysis = "Cannot compute"
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
	  	if(avejp1 <= 0 || avejp1 <= 4){
	  	analysis1 = "Free flow of traffic";
	  	}else if(avejp1 <= 4 || avejp1 <= 8){
	  		analysis1 = "Sluggish flow of traffic";
	  	}else if(avejp1 <= 8 || avejp1 <= 9){
	  		analysis1 = "Slow flow of traffic";
	  	}else if(avejp1 == 10){
	  		analysis1 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis1 = "Cannot compute"
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
	  	if(varjp <= 0 || varjp <= 4){
	  	analysis1 = "Free flow of traffic";
	  	}else if(varjp <= 4 || varjp <= 8){
	  		analysis1 = "Sluggish flow of traffic";
	  	}else if(varjp <= 8 || varjp <= 9){
	  		analysis1 = "Slow flow of traffic";
	  	}else if(varjp == 10){
	  		analysis1 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis1 = "Cannot compute"
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
	  	if(avemc <= 0 || avemc <= 4){
	  	analysis2 = "Free flow of traffic";
	  	}else if(avemc <= 4 || avemc <= 8){
	  		analysis2 = "Sluggish flow of traffic";
	  	}else if(avemc <= 8 || avemc <= 9){
	  		analysis2 = "Slow flow of traffic";
	  	}else if(avemc == 10){
	  		analysis2 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis2 = "Cannot compute"
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
	    if(avemcm <= 0 || avemcm <= 4){
	  	analysis3 = "Free flow of traffic";
	  	}else if(avemcm <= 4 || avemcm <= 8){
	  		analysis3 = "Sluggish flow of traffic";
	  	}else if(avemcm <= 8 || avemcm <= 9){
	  		analysis3 = "Slow flow of traffic";
	  	}else if(avemcm == 10){
	  		analysis3 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis3 = "Cannot compute"
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
	  	if(ecowest <= 0 || ecowest <= 4){
	  	analysis4 = "Free flow of traffic";
	  	}else if(ecowest <= 4 || ecowest <= 8){
	  		analysis4 = "Sluggish flow of traffic";
	  	}else if(ecowest <= 8 || ecowest <= 9){
	  		analysis4 = "Slow flow of traffic";
	  	}else if(ecowest == 10){
	  		analysis4 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis4 = "Cannot compute"
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
	  	if(ecowestdr <= 0 || ecowestdr <= 4){
	  	analysis5 = "Free flow of traffic";
	  	}else if(ecowestdr <= 4 || ecowestdr <= 8){
	  		analysis5 = "Sluggish flow of traffic";
	  	}else if(ecowestdr <= 8 || ecowestdr <= 9){
	  		analysis5 = "Slow flow of traffic";
	  	}else if(ecowestdr == 10){
	  		analysis5 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis5 = "Cannot compute"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streeteec, intee1: intee1, jfee1: jfee1,  intee2: intee2, jfee2: jfee2, analysis5: analysis5 }));
	



	  
	});


});

app.get('/ecoland-',function(_req, _res){

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
	  	if(ecolands <= 0 || ecolands <= 4){
	  	analysis6 = "Free flow of traffic";
	  	}else if(ecolands <= 4 || ecolands <= 8){
	  		analysis6 = "Sluggish flow of traffic";
	  	}else if(ecolands <= 8 || ecolands <= 9){
	  		analysis6 = "Slow flow of traffic";
	  	}else if(ecolands == 10){
	  		analysis6 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis6 = "Cannot compute"
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
	  	if(aplaya <= 0 || aplaya <= 4){
	  	analysis7 = "Free flow of traffic";
	  	}else if(aplaya <= 4 || aplaya <= 8){
	  		analysis7 = "Sluggish flow of traffic";
	  	}else if(aplaya <= 8 || aplaya <= 9){
	  		analysis7 = "Slow flow of traffic";
	  	}else if(aplaya == 10){
	  		analysis7 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis7 = "Cannot compute"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetm, intm1: intm1, jfm1: jfm1,  intm2: intm2, jfm2: jfm2, intm3: intm3, jfm3: jfm3, intm4:intm4, jfm4:jfm4, analysis7: analysis7 }));
	



	  
	});


});

app.get('/matinaaplaya-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetm = body.RWS[0].RW[10].DE;
	  	const intm1 = body.RWS[0].RW[10].FIS[0].FI[0].TMC.DE;
	  	const jfm1 = body.RWS[0].RW[10].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intm2 = body.RWS[0].RW[10].FIS[0].FI[1].TMC.DE;
	  	const jfm2 = body.RWS[0].RW[10].FIS[0].FI[1].CF[0].JF;

	  	const intm3 = body.RWS[0].RW[10].FIS[0].FI[2].TMC.DE;
	  	const jfm3 = body.RWS[0].RW[10].FIS[0].FI[2].CF[0].JF;

	  	const intm4 = body.RWS[0].RW[10].FIS[0].FI[3].TMC.DE;
	  	const jfm4 = body.RWS[0].RW[10].FIS[0].FI[3].CF[0].JF;

	  	

	  	var p = 4
	  
	  	var matina2 = jfm1 + jfm2 + jfm3+ jfm4;

	  	var aplaya2 = matina2/p;
	  	
	  	let analysis8 = "";

	  	if(aplaya2 == 0 || aplaya2 < 4){
	  		analysis8 = "Free flow of traffic";
	  	}else if(aplaya2 == 4 || aplaya2 < 8){
	  		analysis8 = "Sluggish flow of traffic";
	  	}else if(aplaya2 == 8 || aplaya2 < 10){
	  		analysis8 = "Slow flow of traffic";
	  	}else if(aplaya2 == 10){
	  		analysis8 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis8 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetm, intm1: intm1, jfm1: jfm1,  intm2: intm2, jfm2: jfm2, intm3: intm3, jfm3: jfm3, intm4:intm4, jfm4:jfm4, analysis8: analysis8 }));
	



	  
	});


});


app.get('/ecoland',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[11].DE;
	  	const intc1 = body.RWS[0].RW[11].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[11].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[11].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[11].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[11].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[11].FIS[0].FI[2].CF[0].JF;

	  	

	  	var p = 3
	  
	  	var ecoplus = jfc1 + jfc2 + jfc3;

	  	var ecolandplus = ecoplus/p;
	  	
	  	let analysis9 = "";
	  	
	  	if(ecolandplus == 0 || ecolandplus <= 4){
	  		analysis9 = "Free flow of traffic";
	  	}else if(ecolandplus == 4 || ecolandplus <= 8){
	  		analysis9 = "Sluggish flow of traffic";
	  	}else if(ecolandplus == 8 || ecolandplus <= 9){
	  		analysis9 = "Slow flow of traffic";
	  	}else if(ecolandplus == 10){
	  		analysis9 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis9 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, analysis9: analysis9 }));
	



	  
	});


});

app.get('/tulipdr-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[12].DE;
	  	const intc1 = body.RWS[0].RW[12].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[12].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[12].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[12].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[12].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[12].FIS[0].FI[2].CF[0].JF;

	  	

	  	var p = 3
	  
	  	var tulip = jfc1 + jfc2 + jfc3 ;

	  	var tulipdrive = tulip/p;
	  	
	  	let analysis10 = "";
	  	
	  	if(tulipdrive == 0 || tulipdrive <= 4){
	  		analysis10 = "Free flow of traffic";
	  	}else if(tulipdrive == 4 || tulipdrive <= 8){
	  		analysis10 = "Sluggish flow of traffic";
	  	}else if(tulipdrive == 8 || tulipdrive <= 9){
	  		analysis10 = "Slow flow of traffic";
	  	}else if(tulipdrive == 10){
	  		analysis10 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis10 = "Cannot compute"
	  	}

	  	

	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, analysis10: analysis10 }));
	



	  
	});


});
app.get('/tulipdr',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[13].DE;
	  	const intc1 = body.RWS[0].RW[13].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[13].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[13].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[13].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[13].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[13].FIS[0].FI[2].CF[0].JF;

	  	

	  	var p = 3
	  
	  	var tulipp = jfc1 + jfc2 + jfc3 ;

	  	var tulippdrive = tulipp/p;
	  	
	  	let analysis11 = "";
	  	
	  	if(tulippdrive == 0 || tulippdrive <= 4){
	  		analysis11 = "Free flow of traffic";
	  	}else if(tulippdrive == 4 || tulippdrive <= 8){
	  		analysis11 = "Sluggish flow of traffic";
	  	}else if(tulippdrive == 8 || tulippdrive <= 9){
	  		analysis11 = "Slow flow of traffic";
	  	}else if(tulippdrive == 10){
	  		analysis11 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis11 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, analysis11: analysis11 }));
	



	  
	});


});

app.get('/sandawa-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[14].DE;
	  	const intc1 = body.RWS[0].RW[14].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[14].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[14].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[14].FIS[0].FI[1].CF[0].JF;
	  	

	  	var p = 2
	  
	  	var sandawaa = jfc1 + jfc2;

	  	var sandawaas = sandawaa/p;
	  	
	  	let analysis12 = "";
	  	
	  	if(sandawaas == 0 || sandawaas <= 4){
	  		analysis12 = "Free flow of traffic";
	  	}else if(sandawaas == 4 || sandawaas <= 8){
	  		analysis12 = "Sluggish flow of traffic";
	  	}else if(sandawaas == 8 || sandawaas <= 9){
	  		analysis12 = "Slow flow of traffic";
	  	}else if(sandawaas == 10){
	  		analysis12 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis12 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, analysis12: analysis12 }));
	



	  
	});


});

app.get('/quimpoblvd-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[15].DE;
	  	const intc1 = body.RWS[0].RW[15].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[15].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[15].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[15].FIS[0].FI[1].CF[0].JF;

	    const intc3 = body.RWS[0].RW[15].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[15].FIS[0].FI[2].CF[0].JF;

	  	const intc4 = body.RWS[0].RW[15].FIS[0].FI[3].TMC.DE;
	  	const jfc4 = body.RWS[0].RW[15].FIS[0].FI[3].CF[0].JF;


	  	var p = 4
	  
	  	var quimpo = jfc1 + jfc2 + jfc3 + jfc4 ;

	  	var quimpoo = quimpo/p;
	  	
	  	let analysis13 = "";
	  	
	  	if(quimpoo == 0 || quimpoo <=4){
	  		analysis13 = "Free flow of traffic";
	  	}else if(quimpoo == 4 || quimpoo <=8){
	  		analysis13 = "Sluggish flow of traffic";
	  	}else if(quimpoo == 8 || quimpoo <=9){
	  		analysis13 = "Slow flow of traffic";
	  	}else if(quimpoo == 10){
	  		analysis13 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis13 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4, analysis13: analysis13 }));
	



	  
	});


});

app.get('/sandawa',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[16].DE;
	  	const intc1 = body.RWS[0].RW[16].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[16].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[16].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[16].FIS[0].FI[1].CF[0].JF;
	  	

	  	var p = 2
	  
	  	var sandawaaa = jfc1 + jfc2;

	  	var sandawaaas = sandawaaa/p;
	  	
	  	let analysis14 = "";
	  	
	  	if(sandawaaas == 0 || sandawaaas <= 4){
	  		analysis14 = "Free flow of traffic";
	  	}else if(sandawaaas == 4 || sandawaaas <= 8){
	  		analysis14 = "Sluggish flow of traffic";
	  	}else if(sandawaaas == 8 || sandawaaas <= 9){
	  		analysis14 = "Slow flow of traffic";
	  	}else if(sandawaaas == 10){
	  		analysis14 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis14 = "Cannot compute"
	  	}

	  	

	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, analysis14: analysis14 }));
	



	  
	});


});

app.get('/quimpoblvd',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[17].DE;
	  	const intc1 = body.RWS[0].RW[17].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[17].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[17].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[17].FIS[0].FI[1].CF[0].JF;

	    const intc3 = body.RWS[0].RW[17].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[17].FIS[0].FI[2].CF[0].JF;

	  	const intc4 = body.RWS[0].RW[17].FIS[0].FI[3].TMC.DE;
	  	const jfc4 = body.RWS[0].RW[17].FIS[0].FI[3].CF[0].JF;


	  	var p = 4
	  
	  	var quimpoo = jfc1 + jfc2 + jfc3 + jfc4 ;

	  	var quimpooo = quimpoo/p;

	  	let analysis15 = "";
	  	
	  	if(quimpooo == 0 || quimpooo <= 4){
	  		analysis15 = "Free flow of traffic";
	  	}else if(quimpooo == 4 || quimpooo <= 8){
	  		analysis15 = "Sluggish flow of traffic";
	  	}else if(quimpooo == 8 || quimpooo <= 9){
	  		analysis15 = "Slow flow of traffic";
	  	}else if(quimpooo == 10){
	  		analysis15 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis15 = "Cannot compute"
	  	}

	  	

	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4, analysis15: analysis15 }));
	



	  
	});


});


app.get('/quezonblvd-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[18].DE;
	  	const intc1 = body.RWS[0].RW[18].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[18].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[18].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[18].FIS[0].FI[1].CF[0].JF;

	    const intc3 = body.RWS[0].RW[18].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[18].FIS[0].FI[2].CF[0].JF;

	  	const intc4 = body.RWS[0].RW[18].FIS[0].FI[3].TMC.DE;
	  	const jfc4 = body.RWS[0].RW[18].FIS[0].FI[3].CF[0].JF;

	  	const intc5 = body.RWS[0].RW[18].FIS[0].FI[4].TMC.DE;
	  	const jfc5 = body.RWS[0].RW[18].FIS[0].FI[4].CF[0].JF;


	  	var p = 5
	  
	  	var quezon = jfc1 + jfc2 + jfc3 + jfc4 + jfc5;

	  	var quezonb = quezon/p;
	  	
	  	let analysis16 = "";
	  	
	  	if(quezonb == 0 || quezonb <= 4){
	  		analysis16 = "Free flow of traffic";
	  	}else if(quezonb == 4 || quezonb <= 8){
	  		analysis16 = "Sluggish flow of traffic";
	  	}else if(quezonb == 8 || quezonb <=9){
	  		analysis16 = "Slow flow of traffic";
	  	}else if(quezonb == 10){
	  		analysis16 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis16 = "Cannot compute"
	  	}

	  	

	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4, intc5: intc5, jfc5:jfc5, analysis16: analysis16 }));
	



	  
	});


});
app.get('/quezonblvd',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[19].DE;
	  	const intc1 = body.RWS[0].RW[19].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[19].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[19].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[19].FIS[0].FI[1].CF[0].JF;

	    const intc3 = body.RWS[0].RW[19].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[19].FIS[0].FI[2].CF[0].JF;

	  	const intc4 = body.RWS[0].RW[19].FIS[0].FI[3].TMC.DE;
	  	const jfc4 = body.RWS[0].RW[19].FIS[0].FI[3].CF[0].JF;

	  	const intc5 = body.RWS[0].RW[19].FIS[0].FI[4].TMC.DE;
	  	const jfc5 = body.RWS[0].RW[19].FIS[0].FI[4].CF[0].JF;


	  	var p = 5
	  
	  	var quezonn = jfc1 + jfc2 + jfc3 + jfc4 + jfc5;

	  	var quezonnb = quezonn/p;
	  	
	  	let analysis17 = "";
	  	
	  	if(quezonnb == 0 || quezonnb <=4){
	  		analysis17 = "Free flow of traffic";
	  	}else if(quezonnb == 4 || quezonnb <=8){
	  		analysis17 = "Sluggish flow of traffic";
	  	}else if(quezonnb == 8 || quezonnb <=9){
	  		analysis17 = "Slow flow of traffic";
	  	}else if(quezonnb == 10){
	  		analysis17 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis17 = "Cannot compute"
	  	}


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4, intc5: intc5, jfc5:jfc5, analysis17: analysis17 }));
	



	  
	});


});

app.get('/cabaguioave-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[20].DE;
	  	const intc1 = body.RWS[0].RW[20].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[20].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[20].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[20].FIS[0].FI[1].CF[0].JF;


	  	var p = 2
	  
	  	var cabaguio = jfc1 + jfc2;

	  	var cabaguioa = cabaguio/p;
	  	
	  	let analysis18 = "";
	  	
	  	if(cabaguioa == 0 || cabaguioa <=4){
	  		analysis18 = "Free flow of traffic";
	  	}else if(cabaguioa == 4 || cabaguioa <=8){
	  		analysis18 = "Sluggish flow of traffic";
	  	}else if(cabaguioa == 8 || cabaguioa <=9){
	  		analysis18 = "Slow flow of traffic";
	  	}else if(cabaguioa == 10){
	  		analysis18 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis18 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, analysis18: analysis18 }));
	



	  
	});


});
app.get('/mlquezonblvd-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[21].DE;
	  	const intc1 = body.RWS[0].RW[21].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[21].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[21].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[21].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[21].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[21].FIS[0].FI[2].CF[0].JF;

	  	const intc4 = body.RWS[0].RW[21].FIS[0].FI[3].TMC.DE;
	  	const jfc4 = body.RWS[0].RW[21].FIS[0].FI[3].CF[0].JF;

	  	const intc5 = body.RWS[0].RW[21].FIS[0].FI[4].TMC.DE;
	  	const jfc5 = body.RWS[0].RW[21].FIS[0].FI[4].CF[0].JF;

	  	const intc6 = body.RWS[0].RW[21].FIS[0].FI[5].TMC.DE;
	  	const jfc6 = body.RWS[0].RW[21].FIS[0].FI[5].CF[0].JF;


	  	var p = 6
	  
	  	var mlquezon = jfc1 + jfc2 + jfc3 + jfc4 + jfc5 + jfc6;

	  	var mlquezonb = mlquezon/p;
	  	
	  	let analysis19 = "";
	  	
	  	if(mlquezonb == 0 || mlquezonb <=4){
	  		analysis19 = "Free flow of traffic";
	  	}else if(mlquezonb == 4 || mlquezonb <=8){
	  		analysis19 = "Sluggish flow of traffic";
	  	}else if(mlquezonb == 8 || mlquezonb <=9){
	  		analysis19 = "Slow flow of traffic";
	  	}else if(mlquezonb == 10){
	  		analysis19 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis19 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2,  intc3: intc3, jfc3: jfc3,  intc4: intc4, jfc4: jfc4, intc5: intc5, jfc5: jfc5,  intc6: intc6, jfc6: jfc6, analysis19: analysis19 }));
	



	  
	});


});
app.get('/mlquezonblvd',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[22].DE;
	  	const intc1 = body.RWS[0].RW[22].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[22].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[22].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[22].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[22].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[22].FIS[0].FI[2].CF[0].JF;

	  	const intc4 = body.RWS[0].RW[22].FIS[0].FI[3].TMC.DE;
	  	const jfc4 = body.RWS[0].RW[22].FIS[0].FI[3].CF[0].JF;

	  	const intc5 = body.RWS[0].RW[22].FIS[0].FI[4].TMC.DE;
	  	const jfc5 = body.RWS[0].RW[22].FIS[0].FI[4].CF[0].JF;

	  	const intc6 = body.RWS[0].RW[22].FIS[0].FI[5].TMC.DE;
	  	const jfc6 = body.RWS[0].RW[22].FIS[0].FI[5].CF[0].JF;


	  	var p = 6
	  
	  	var mlquezonn = jfc1 + jfc2 + jfc3 + jfc4 + jfc5 + jfc6;

	  	var mlquezonnb = mlquezonn/p;
	  	
	  	let analysis20 = "";
	  	
	  	if(mlquezonnb == 0 || mlquezonnb <=4){
	  		analysis20 = "Free flow of traffic";
	  	}else if(mlquezonnb == 4 || mlquezonnb <=8){
	  		analysis20 = "Sluggish flow of traffic";
	  	}else if(mlquezonnb == 8 || mlquezonnb <=9){
	  		analysis20 = "Slow flow of traffic";
	  	}else if(mlquezonnb == 10){
	  		analysis20 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis20 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2,  intc3: intc3, jfc3: jfc3,  intc4: intc4, jfc4: jfc4, intc5: intc5, jfc5: jfc5,  intc6: intc6, jfc6: jfc6, analysis20: analysis20 }));
	



	  
	});


});
app.get('/cabaguioave',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[23].DE;
	  	const intc1 = body.RWS[0].RW[23].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[23].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[23].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[23].FIS[0].FI[1].CF[0].JF;


	  	var p = 2
	  
	  	var cabaguioo = jfc1 + jfc2;

	  	var cabaguiooa = cabaguioo/p;
	  	
	  	let analysis21 = "";
	  	
	  	if(cabaguiooa == 0 || cabaguiooa <=4){
	  		analysis21 = "Free flow of traffic";
	  	}else if(cabaguiooa == 4 || cabaguiooa <=8){
	  		analysis21 = "Sluggish flow of traffic";
	  	}else if(cabaguiooa == 8 || cabaguiooa <= 9){
	  		analysis21 = "Slow flow of traffic";
	  	}else if(cabaguiooa == 10){
	  		analysis21 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis21 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, analysis21: analysis21 }));
	



	  
	});


});

app.get('/dacudaoave-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[24].DE;
	  	const intc1 = body.RWS[0].RW[24].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[24].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[24].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[24].FIS[0].FI[1].CF[0].JF;


	  	var p = 2
	  
	  	var dacudao = jfc1 + jfc2;

	  	var dacudaoa = dacudao/p;
	  	
	  	let analysis22 = "";
	  	
	  	if(dacudaoa == 0 || dacudaoa <=4){
	  		analysis22 = "Free flow of traffic";
	  	}else if(dacudaoa == 4 || dacudaoa <=8){
	  		analysis22 = "Sluggish flow of traffic";
	  	}else if(dacudaoa == 8 || dacudaoa <=9){
	  		analysis22 = "Slow flow of traffic";
	  	}else if(dacudaoa == 10){
	  		analysis22 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis22 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, analysis22: analysis22 }));
	



	  
	});


});
app.get('/dacudaoave',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[25].DE;
	  	const intc1 = body.RWS[0].RW[25].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[25].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[25].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[25].FIS[0].FI[1].CF[0].JF;


	  	var p = 2
	  
	  	var dacudaoo = jfc1 + jfc2;

	  	var dacudaooa = dacudaoo/p;
	  	
	  	let analysis23 = "";
	  	
	  	if(dacudaooa == 0 || dacudaooa <=4){
	  		analysis23 = "Free flow of traffic";
	  	}else if(dacudaooa == 4 || dacudaooa <=8){
	  		analysis23 = "Sluggish flow of traffic";
	  	}else if(dacudaooa == 8 || dacudaooa <=9){
	  		analysis23 = "Slow flow of traffic";
	  	}else if(dacudaooa == 10){
	  		analysis23 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis23 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, analysis23: analysis23 }));
	



	  
	});


});
app.get('/pichonst',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[26].DE;
	  	const intc1 = body.RWS[0].RW[26].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[26].FIS[0].FI[0].CF[0].JF;
	  	
	
	  	var p = 1
	  
	  	var pichon = jfc1;

	  	var pichons = pichon/p;
	  	
	  	let analysis24 = "";
	  	
	  	if(pichons == 0 || pichons <=4){
	  		analysis24 = "Free flow of traffic";
	  	}else if(pichons == 4 || pichons <=8){
	  		analysis24 = "Sluggish flow of traffic";
	  	}else if(pichons == 8 || pichons <=9){
	  		analysis24 = "Slow flow of traffic";
	  	}else if(pichons == 10){
	  		analysis24 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis24 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, analysis24: analysis24 }));
	



	  
	});


});

app.get('/sanpedro',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[28].DE;
	  	const intc1 = body.RWS[0].RW[28].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[28].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[28].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[28].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[28].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[28].FIS[0].FI[2].CF[0].JF;

	  	const intc4 = body.RWS[0].RW[28].FIS[0].FI[3].TMC.DE;
	  	const jfc4 = body.RWS[0].RW[28].FIS[0].FI[3].CF[0].JF;

	
	  	var p = 4
	  
	  	var sanped = jfc1 + jfc2 + jfc3 + jfc4 ;

	  	var sanpedroo = sanped/p;
	  	
	  	let analysis26 = "";
	  	
	  	if(sanpedroo == 0 || sanpedroo <=4){
	  		analysis26 = "Free flow of traffic";
	  	}else if(sanpedroo == 4 || sanpedroo <=8){
	  		analysis26 = "Sluggish flow of traffic";
	  	}else if(sanpedroo == 8 || sanpedroo <=9){
	  		analysis26 = "Slow flow of traffic";
	  	}else if(sanpedroo == 10){
	  		analysis26 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis26 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4, analysis26: analysis26 }));
	



	  
	});


});

app.get('/pichonst-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[27].DE;
	  	const intc1 = body.RWS[0].RW[27].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[27].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[27].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[27].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[27].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[27].FIS[0].FI[2].CF[0].JF;

	  	const intc4 = body.RWS[0].RW[27].FIS[0].FI[3].TMC.DE;
	  	const jfc4 = body.RWS[0].RW[27].FIS[0].FI[3].CF[0].JF;

	  	const intc5 = body.RWS[0].RW[27].FIS[0].FI[4].TMC.DE;
	  	const jfc5 = body.RWS[0].RW[27].FIS[0].FI[4].CF[0].JF;
	  	
	
	  	var p = 5
	  
	  	var pichonn = jfc1 + jfc2 + jfc3 + jfc4 + jfc5;

	  	var pichonns = pichonn/p;
	  	
	  	let analysis25 = "";
	  	
	  	if(pichonns == 0 || pichonns <=4){
	  		analysis25 = "Free flow of traffic";
	  	}else if(pichonns == 4 || pichonns <=8){
	  		analysis25 = "Sluggish flow of traffic";
	  	}else if(pichonns == 8 || pichonns <=9){
	  		analysis25 = "Slow flow of traffic";
	  	}else if(pichonns == 10){
	  		analysis25 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis25 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4, intc5: intc5, jfc5: jfc5, analysis25: analysis25 }));
	



	  
	});


});


app.get('/geo',function(req, res){
	
	axios.get(' https://cryptic-eyrie-21978.herokuapp.com/equirino')
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
	

	axios.get(' https://cryptic-eyrie-21978.herokuapp.com/equirino-')
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
	

	axios.get(' https://cryptic-eyrie-21978.herokuapp.com/mcarthur')
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
	

	axios.get(' https://cryptic-eyrie-21978.herokuapp.com/mcarthur-')
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
	

	axios.get(' https://cryptic-eyrie-21978.herokuapp.com/jplaurel')
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
	

	axios.get(' https://cryptic-eyrie-21978.herokuapp.com/jplaurel-')
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
	

	axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ecowestdr')
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
	

	axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ecowestdr-')
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
	

	axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ecoland-')
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
	

	axios.get(' https://cryptic-eyrie-21978.herokuapp.com/matinaaplaya')
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
	

	axios.get(' https://cryptic-eyrie-21978.herokuapp.com/matinaaplaya-')
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
	

	axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ecoland')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/tulipdr')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/tulipdr-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/sandawa-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/quimpoblvd-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/sandawa')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/quimpoblvd')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/quezonblvd')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/quezonblvd-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/cabaguioave')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/mlquezonblvd')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/mlquezonblvd-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/cabaguioave-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/dacudaoave')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/dacudaoave-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/pichonst')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/pichonst-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/sanpedro')
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
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/equirino')
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
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/jplaurel')
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
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/mcarthur')
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
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/mcarthur-')
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
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ecowestdr')
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
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ecowestdr-')
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
			if(text.includes("ecoland-")){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ecoland-')
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

			if(text=='matina aplaya'){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/matinaaplaya')
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

			if(text=='matina aplaya-'){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/matinaaplaya-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis8;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			if(text=='ecoland'){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ecoland')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis9;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}

			if(text=='tulip drive-')
			// if(text.includes("tulip dr"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/tulipdr-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis10;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			if(text=='tulip drive')
			// if(text.includes("tulip drive-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/tulipdr')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis11;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}

			if(text=='sandawa-')
			// if(text.includes("sandawa"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/sandawa-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis12;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			if(text=='quimpo boulevard-')
			// if(text.includes("quimpo boulevard"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/quimpoblvd-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis13;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}

			if(text=='sandawa')
			// if(text.includes("sandawa-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/sandawa')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis14;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			if(text=='quimpo boulevard')
			// if(text.includes("quimpo boulevard-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/quimpoblvd')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis15;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}

			if(text=='quezon boulevard-')
			// if(text.includes("quezon boulevard"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/quezonblvd-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis16;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			if(text=='quezon boulevard')
			// if(text.includes("quezon boulevard-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/quezonblvd')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis17;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}

			if(text=='cabaguio avenue-')
			// if(text.includes("cabaguio avenue"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/cabaguioave-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis18;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			if(text=='ml quezon boulevard-')
			// if(text.includes("ml quezon boulevard"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/mlquezonblvd-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis19;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			if(text=='ml quezon boulevard')
			// if(text.includes("ml quezon boulevard-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/mlquezonblvd')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis20;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			if(text=='cabaguio avenue')
			// if(text.includes("cabaguio avenue-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/cabaguioave')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis21;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}

				if(text=='dacudao avenue-')
			// if(text.includes("dacudao avenue"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/dacudaoave-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis22;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			if(text=='dacudao avenue')
			// if(text.includes("dacudao avenue-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/dacudaoave')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis23;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			if(text=='pichon street')
			// if(text.includes("pichon street"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/pichonst')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis24;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}
			if(text=='pichon street-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/pichonst-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis25;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}

			if(text=='san pedro street')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/sanpedro')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis26;
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