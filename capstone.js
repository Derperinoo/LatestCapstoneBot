'use strict'

'jquery.js'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https');
const axios = require('axios');
const natural = require('natural');

const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



app.get('/', function(req, res) {
	res.send("Hi I am a chatbot")
})

// HERE

//source: https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

app.get('/equirino',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  	
	  	// all equirino average
	  	const jfm = body.RWS[0].RW[4].FIS[0].FI[0].CF[0].JF;
		const jfc33 = body.RWS[0].RW[28].FIS[0].FI[2].CF[0].JF;
		const jfc34 = body.RWS[0].RW[27].FIS[0].FI[2].CF[0].JF;
		const jfc11 = body.RWS[0].RW[39].FIS[0].FI[0].CF[0].JF;

		const jfm13 = body.RWS[0].RW[5].FIS[0].FI[13].CF[0].JF;
		const jfc1 = body.RWS[0].RW[40].FIS[0].FI[0].CF[0].JF;
		// all equirino average

		//equirino intersections
		//mcarthur
		const jf01 = body.RWS[0].RW[0].FIS[0].FI[0].CF[0].JF;
		const jfe5 = body.RWS[0].RW[1].FIS[0].FI[4].CF[0].JF;

		//pichon st
		const jf02 = body.RWS[0].RW[0].FIS[0].FI[1].CF[0].JF;
	    const jfe4 = body.RWS[0].RW[1].FIS[0].FI[3].CF[0].JF;

	   //sanpedro
	   const jf03 = body.RWS[0].RW[0].FIS[0].FI[2].CF[0].JF;
	   const jfe3 = body.RWS[0].RW[1].FIS[0].FI[2].CF[0].JF;

	   //cbangoy
	   const jf04 = body.RWS[0].RW[0].FIS[0].FI[3].CF[0].JF;
	   	const jfe2 = body.RWS[0].RW[1].FIS[0].FI[1].CF[0].JF;

	   //jplaurel
		const jf05 = body.RWS[0].RW[0].FIS[0].FI[4].CF[0].JF;
		const jfe1 = body.RWS[0].RW[1].FIS[0].FI[0].CF[0].JF;
		//equirino intersections-
		
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

	  	var y = 6

	  	var mc = 2
	  	var mcarthur = jf01+jfe5;
	  	var mccarthur = mcarthur/mc;

	  	var pich = 2
	  	var pichon = jf02+jfe4;
	  	var pichonst = pichon/pich;

	  	var san = 2
	  	var sanpedro = jf03+jfe3;
	  	var sanpedrost = sanpedro/san;

	  	var bang = 2
	  	var cbangoy = jf04+jfe2;
	  	var ccbangoy = cbangoy/bang;

	  	var jp = 2
	  	var jplaurel = jf05+jfe1;
	  	var jjplaurel = jplaurel/jp;
	  
	  	var sum1 = jfm + jfc33 + jfc34 + jfc11+ jfm13+ jfc1;

	  	var sum = sum1/y;
	  	
	  	let analysis = "";
	  	if(sum == 0 || sum <= 4){
	  		analysis = "Free flow of traffic";
	  	}else if(sum > 4 || sum <= 8){
	  		analysis = "Sluggish flow of traffic";
	  	}else if(sum > 8 || sum >= 9){
	  		analysis = "Slow flow of traffic";
	  	}else if(sum == 10){
	  		analysis = "Traffic stopped or Road closed"
	  	}else{
	  		analysis = "Cannot compute"
	  	}

	  	let analysisjf1 = "";
	  	if(mccarthur == 0 || mccarthur <= 4){
	  		analysisjf1 = "Mac Arthur Hwy: Free flow of traffic";
	  	}else if(mccarthur > 4 || mccarthur <= 8){
	  		analysisjf1 = "Mac Arthur Hwy: Sluggish flow of traffic";
	  	}else if(mccarthur > 8 || mccarthur >= 9){
	  		analysisjf1 = "Mac Arthur Hwy: Slow flow of traffic";
	  	}else if(mccarthur == 10){
	  		analysisjf1 = "Mac Arthur Hwy: Traffic stopped or Road closed"
	  	}else{
	  		analysisjf1 = "Cannot compute"
	  	}

	  	let analysisjf2 = "";
	  	if(pichonst == 0 || pichonst <= 4){
	  		analysisjf2 = "Pichon St: Free flow of traffic";
	  	}else if(pichonst > 4 || pichonst <= 8){
	  		analysisjf2 = "Pichon St: Sluggish flow of traffic";
	  	}else if(pichonst > 8 || pichonst >= 9){
	  		analysisjf2 = "Pichon St: Slow flow of traffic";
	  	}else if(pichonst == 10){
	  		analysisjf2 = "Pichon St: Traffic stopped or Road closed"
	  	}else{
	  		analysisjf2 = "Cannot compute"
	  	}

	  	let analysisjf3 = "";
	  	if(sanpedrost == 0 || sanpedrost <= 4){
	  		analysisjf3 = "San Pedro: Free flow of traffic";
	  	}else if(sanpedrost > 4 || sanpedrost <= 8){
	  		analysisjf3 = "San Pedro: Sluggish flow of traffic";
	  	}else if(sanpedrost > 8 || sanpedrost >= 9){
	  		analysisjf3 = "San Pedro: Slow flow of traffic";
	  	}else if(sanpedrost == 10){
	  		analysisjf3 = "San Pedro: Traffic stopped or Road closed"
	  	}else{
	  		analysisjf3 = "Cannot compute"
	  	}

	  	let analysisjf4 = "";
	  	if(ccbangoy == 0 || ccbangoy <= 4){
	  		analysisjf4 = "C. Bangoy: Free flow of traffic";
	  	}else if(ccbangoy > 4 || ccbangoy <= 8){
	  		analysisjf4 = "C. Bangoy: Sluggish flow of traffic";
	  	}else if(ccbangoy > 8 || ccbangoy >= 9){
	  		analysisjf4 = "C. Bangoy: Slow flow of traffic";
	  	}else if(ccbangoy == 10){
	  		analysisjf4 = "C. Bangoy: Traffic stopped or Road closed"
	  	}else{
	  		analysisjf4 = "Cannot compute"
	  	}

	  	let analysisjf5 = "";
	  	if(jjplaurel == 0 || jjplaurel <= 4){
	  		analysisjf5 = "J.P Laurel Ave: Free flow of traffic";
	  	}else if(jjplaurel > 4 || jjplaurel <= 8){
	  		analysisjf5 = "J.P Laurel Ave: Sluggish flow of traffic";
	  	}else if(jjplaurel > 8 || jjplaurel >= 9){
	  		analysisjf5 = "J.P Laurel Ave: Slow flow of traffic";
	  	}else if(jjplaurel == 10){
	  		analysisjf5 = "J.P Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysisjf5 = "Cannot compute"
	  	}





	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: street, int1: int1, mccarthur: mccarthur,  int2: int2, pichonst: pichonst,  int3: int3, sanpedrost: sanpedrost, 
    		int4: int4, ccbangoy: ccbangoy,  int5: int5, jjplaurel: jjplaurel, analysisjf1: analysisjf1, analysisjf2: analysisjf2, analysisjf3:analysisjf3, analysisjf4:analysisjf4, 
    		analysisjf5:analysisjf5, analysis: analysis }));
	



	  
	});


});

app.get('/equirino-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  	
	  	// all equirino-
	  	const jfm13 = body.RWS[0].RW[5].FIS[0].FI[13].CF[0].JF;
		const jfc1 = body.RWS[0].RW[40].FIS[0].FI[0].CF[0].JF;
		// all equirino-
	  	

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
	  	}else if(aveq > 4 || aveq <= 8){
	  		analysis = "Sluggish flow of traffic";
	  	}else if(aveq > 8 || aveq >= 9){
	  		analysis = "Slow flow of traffic";
	  	}else if(aveq == 10){
	  		analysis = "Traffic stopped or Road closed"
	  	}else{
	  		analysis = "Cannot compute"
	  	}

	  	let analysisjf1 = "";
	  	if(jfe1 == 0 || jfe1 <= 4){
	  		analysisjf1 = "J.P Laurel Ave: Free flow of traffic";
	  	}else if(jfe1 > 4 || jfe1 <= 8){
	  		analysisjf1 = "J.P Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfe1 > 8 || jfe1 >= 9){
	  		analysisjf1 = "J.P Laurel Ave: Slow flow of traffic";
	  	}else if(jfe1 == 10){
	  		analysisjf1 = "J.P Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysisjf1 = "Cannot compute"
	  	}

	  	let analysisjf2 = "";
	  	if(jfe2 == 0 || jfe2 <= 4){
	  		analysisjf2 = "C. Bangoy: Free flow of traffic";
	  	}else if(jfe2 > 4 || jfe2 <= 8){
	  		analysisjf2 = "C. Bangoy: Sluggish flow of traffic";
	  	}else if(jfe2 > 8 || jfe2 >= 9){
	  		analysisjf2 = "C. Bangoy: Slow flow of traffic";
	  	}else if(jfe2 == 10){
	  		analysisjf2 = "C. Bangoy: Traffic stopped or Road closed"
	  	}else{
	  		analysisjf2 = "Cannot compute"
	  	}

	  	let analysisjf3 = "";
	  	if(jfe3 == 0 || jfe3 <= 4){
	  		analysisjf3 = "San Pedro: Free flow of traffic";
	  	}else if(jfe3 > 4 || jfe3 <= 8){
	  		analysisjf3 = "San Pedro: Sluggish flow of traffic";
	  	}else if(jfe3 > 8 || jfe3 >= 9){
	  		analysisjf3 = "San Pedro: Slow flow of traffic";
	  	}else if(jfe3 == 10){
	  		analysisjf3 = "San Pedro: Traffic stopped or Road closed"
	  	}else{
	  		analysisjf3 = "Cannot compute"
	  	}

	  	let analysisjf4 = "";
	  	if(jfe4 == 0 || jfe4 <= 4){
	  		analysisjf4 = "Pichon St: Free flow of traffic";
	  	}else if(jfe4 > 4 || jfe4 <= 8){
	  		analysisjf4 = "Pichon St: Sluggish flow of traffic";
	  	}else if(jfe4 > 8 || jfe4 >= 9){
	  		analysisjf4 = "Pichon St: Slow flow of traffic";
	  	}else if(jfe4 == 10){
	  		analysisjf4 = "Pichon St: Traffic stopped or Road closed"
	  	}else{
	  		analysisjf4 = "Cannot compute"
	  	}

	  	let analysisjf5 = "";
	  	if(jfe5 == 0 || jfe5 <= 4){
	  		analysisjf5 = "Mac Arthur Hwy: Free flow of traffic";
	  	}else if(jfe5 > 4 || jfe5 <= 8){
	  		analysisjf5 = "Mac Arthur Hwy: Sluggish flow of traffic";
	  	}else if(jfe5 > 8 || jfe5 >= 9){
	  		analysisjf5 = "Mac Arthur Hwy: Slow flow of traffic";
	  	}else if(jfe5 == 10){
	  		analysisjf5 = "Mac Arthur Hwy: Traffic stopped or Road closed"
	  	}else{
	  		analysisjf5 = "Cannot compute"
	  	}




	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: street, inte1: inte1, jfe1: jfe1,  inte2: inte2, jfe2: jfe2,  inte3: inte3, jfe3: jfe3, 
    		inte4: inte4, jfe4: jfe4,  inte5: inte5, jfe5: jfe5, analysisjf1: analysisjf1, analysisjf2: analysisjf2, analysisjf3:analysisjf3, analysisjf4:analysisjf4, 
    		analysisjf5:analysisjf5,  analysis: analysis }));

	  
	});


});
app.get('/jplaurel',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  	
		//jp laurel
		const jfc1 = body.RWS[0].RW[20].FIS[0].FI[0].CF[0].JF;
		const jfc2 = body.RWS[0].RW[24].FIS[0].FI[0].CF[0].JF;
		const jfc3 = body.RWS[0].RW[30].FIS[0].FI[0].CF[0].JF;
		const jfc4 = body.RWS[0].RW[43].FIS[0].FI[2].CF[0].JF;
		const jfc5 = body.RWS[0].RW[49].FIS[0].FI[0].CF[0].JF;
		const jfc6 = body.RWS[0].RW[56].FIS[0].FI[1].CF[0].JF;
		const jfc7 = body.RWS[0].RW[63].FIS[0].FI[2].CF[0].JF;
		const jfc8 = body.RWS[0].RW[76].FIS[0].FI[3].CF[0].JF;

		const jfc11 = body.RWS[0].RW[66].FIS[0].FI[0].CF[0].JF;
		const jfc22 = body.RWS[0].RW[23].FIS[0].FI[1].CF[0].JF;
		const jfc33 = body.RWS[0].RW[25].FIS[0].FI[1].CF[0].JF;
		const jfc44 = body.RWS[0].RW[32].FIS[0].FI[1].CF[0].JF;
		const jfc55 = body.RWS[0].RW[44].FIS[0].FI[0].CF[0].JF;
		const jfc66 = body.RWS[0].RW[55].FIS[0].FI[0].CF[0].JF;
		const jfc77 = body.RWS[0].RW[78].FIS[0].FI[0].CF[0].JF;
		//jplaurel-

		//jplaurel intersections
		//rcastillo
		const jf001 = body.RWS[0].RW[2].FIS[0].FI[0].CF[0].JF;
		const jf066 = body.RWS[0].RW[3].FIS[0].FI[5].CF[0].JF;

		//Angliongto
		const jf002 = body.RWS[0].RW[2].FIS[0].FI[1].CF[0].JF;
		const jf055 = body.RWS[0].RW[3].FIS[0].FI[4].CF[0].JF;

		//Cabaguio
		const jf003 = body.RWS[0].RW[2].FIS[0].FI[2].CF[0].JF;
		const jf044 = body.RWS[0].RW[3].FIS[0].FI[3].CF[0].JF;

		//Dacudao Ave/Buhangin
		const jf004 = body.RWS[0].RW[2].FIS[0].FI[3].CF[0].JF;
		const jf033 = body.RWS[0].RW[3].FIS[0].FI[2].CF[0].JF;

		//F. Torres
		const jf005 = body.RWS[0].RW[2].FIS[0].FI[4].CF[0].JF;
	   	const jf022 = body.RWS[0].RW[3].FIS[0].FI[1].CF[0].JF;

	   	//E. Quirino Ave/Sta. Ana Ave
	    const jf006 = body.RWS[0].RW[2].FIS[0].FI[5].CF[0].JF;
		const jf011 = body.RWS[0].RW[3].FIS[0].FI[0].CF[0].JF;
	
		//jplaurel intersections- 

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

	  
	  	const x = 15
	  
	  	var avejp = jfc1 + jfc2 + jfc3 + jfc4 + jfc5 +jfc6 +jfc7 +jfc8+jfc11+jfc22+jfc33+jfc44+jfc55+jfc66+jfc77;
	  	var avejp1 = avejp/x;

	  	var rcas = 2
	  	var rcastillo = jf001+jf06;
	  	var rrcastillo = jf001/rcas;

	  	
	  	let analysis1 = "";
	  	if(avejp1 == 0 || avejp1 <= 4){
	  	analysis1 = "Free flow of traffic";
	  	}else if(avejp1 > 4 || avejp1 <= 8){
	  		analysis1 = "Sluggish flow of traffic";
	  	}else if(avejp1 > 8 || avejp1 >= 9){
	  		analysis1 = "Slow flow of traffic";
	  	}else if(avejp1 == 10){
	  		analysis1 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis1 = "Cannot compute"
	  	}

	  	let analysisjp1 = "";
	  	if(rrcastillo == 0 || rrcastillo <= 4){
	  	analysisjp1 = "R. Castillo: Free flow of traffic";
	  	}else if(rrcastillo > 4 || rrcastillo <= 8){
	  		analysisjp1 = "R. Castillo: Sluggish flow of traffic";
	  	}else if(rrcastillo > 8 || rrcastillo >= 9){
	  		analysisjp1 = "R. Castillo: Slow flow of traffic";
	  	}else if(rrcastillo == 10){
	  		analysisjp1 = "R. Castillo: Traffic stopped or Road closed"
	  	}else{
	  		analysisjp1 = "Cannot compute"
	  	}

	  	let analysisjp2 = "";
	  	if(jf02 == 0 || jf02 <= 4){
	  	analysisjp2 = "Angliongto: Free flow of traffic";
	  	}else if(jf02 > 4 || jf02 <= 8){
	  		analysisjp2 = "Angliongto: Sluggish flow of traffic";
	  	}else if(jf02 > 8 || jf02 >= 9){
	  		analysisjp2 = "Angliongto: Slow flow of traffic";
	  	}else if(jf02 == 10){
	  		analysisjp2 = "Angliongto: Traffic stopped or Road closed"
	  	}else{
	  		analysisjp2 = "Cannot compute"
	  	}

	  	let analysisjp3 = "";
	  	if(jf03 == 0 || jf03 <= 4){
	  	analysisjp3 = "Cabaguio: Free flow of traffic";
	  	}else if(jf03 > 4 || jf03 <= 8){
	  		analysisjp3 = "Cabaguio: Sluggish flow of traffic";
	  	}else if(jf03 > 8 || jf03 >= 9){
	  		analysisjp3 = "Cabaguio: Slow flow of traffic";
	  	}else if(jf03 == 10){
	  		analysisjp3 = "Cabaguio: Traffic stopped or Road closed"
	  	}else{
	  		analysisjp3 = "Cannot compute"
	  	}

	  	let analysisjp4 = "";
	  	if(jf04 == 0 || jf04 <= 4){
	  	analysisjp4 = "Dacudao Ave/Buhangin: Free flow of traffic";
	  	}else if(jf04 > 4 || jf04 <= 8){
	  		analysisjp4 = "Dacudao Ave/Buhangin: Sluggish flow of traffic";
	  	}else if(jf04 > 8 || jf04 >= 9){
	  		analysisjp4 = "Dacudao Ave/Buhangin: Slow flow of traffic";
	  	}else if(jf04 == 10){
	  		analysisjp4 = "Dacudao Ave/Buhangin: Traffic stopped or Road closed"
	  	}else{
	  		analysisjp4 = "Cannot compute"
	  	}


	  	let analysisjp5 = "";
	  	if(jf05 == 0 || jf05 <= 4){
	  	analysisjp5 = "F. Torres: Free flow of traffic";
	  	}else if(jf05 > 4 || jf05 <= 8){
	  		analysisjp5 = "F. Torres: Sluggish flow of traffic";
	  	}else if(jf05 > 8 || jf05 >= 9){
	  		analysisjp5 = "F. Torres: Slow flow of traffic";
	  	}else if(jf05 == 10){
	  		analysisjp5 = "F. Torres: Traffic stopped or Road closed"
	  	}else{
	  		analysisjp5 = "Cannot compute"
	  	}

	  	let analysisjp6 = "";
	  	if(jf05 == 0 || jf05 <= 4){
	  	analysisjp5 = "E. Quirino Ave/Sta. Ana Ave: Free flow of traffic";
	  	}else if(jf05 > 4 || jf05 <= 8){
	  		analysisjp5 = "E. Quirino Ave/Sta. Ana Ave: Sluggish flow of traffic";
	  	}else if(jf05 > 8 || jf05 >= 9){
	  		analysisjp5 = "E. Quirino Ave/Sta. Ana Ave: Slow flow of traffic";
	  	}else if(jf05 == 10){
	  		analysisjp5 = "E. Quirino Ave/Sta. Ana Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysisjp5 = "Cannot compute"
	  	}




	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street1: street1,  int01: int01, rrcastillo: rrcastillo,  int02: int02, jf02: jf02,  int03: int03, jf03: jf03,  
    		int04: int04, jf04: jf04,  int05: int05, jf05: jf05, int06: int06,jf06:jf06, analysisjp1:analysisjp1, analysisjp2:analysisjp2, analysisjp3:analysisjp3,
    		analysisjp4:analysisjp4, analysisjp5:analysisjp5, analysis1: analysis1 }));
	



	  
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

	  

	  	const x = 5
	  
	  	var varj = jf01 + jf02 + jf03 + jf04 + jf05  ;
	  	var varjp = varj/x;

	  	
	  	let analysis1 = "";
	  	if(varjp == 0 || varjp <= 4){
	  	analysis1 = "Free flow of traffic";
	  	}else if(varjp > 4 || varjp <= 8){
	  		analysis1 = "Sluggish flow of traffic";
	  	}else if(varjp > 8 || varjp >= 9){
	  		analysis1 = "Slow flow of traffic";
	  	}else if(varjp == 10){
	  		analysis1 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis1 = "Cannot compute"
	  	}

	  let analysisjp1 = "";
	  	if(jf01 == 0 || jf01 <= 4){
	  	analysisjp1 = "E. Quirino Ave/Sta. Ana Ave: Free flow of traffic";
	  	}else if(jf01 > 4 || jf01 <= 8){
	  		analysisjp1 = "E. Quirino Ave/Sta. Ana Ave: Sluggish flow of traffic";
	  	}else if(jf01 > 8 || jf01 >= 9){
	  		analysisjp1 = "E. Quirino Ave/Sta. Ana Ave: Slow flow of traffic";
	  	}else if(jf01 == 10){
	  		analysisjp1 = "E. Quirino Ave/Sta. Ana Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysisjp1 = "Cannot compute"
	  	}

	  	let analysisjp2 = "";
	  	if(jf02 == 0 || jf02 <= 4){
	  	analysisjp2 = "F. Torres: Free flow of traffic";
	  	}else if(jf02 > 4 || jf02 <= 8){
	  		analysisjp2 = "F. Torres: Sluggish flow of traffic";
	  	}else if(jf02 > 8 || jf02 >= 9){
	  		analysisjp2 = "F. Torres: Slow flow of traffic";
	  	}else if(jf02 == 10){
	  		analysisjp2 = "F. Torres: Traffic stopped or Road closed"
	  	}else{
	  		analysisjp2 = "Cannot compute"
	  	}

	  	let analysisjp3 = "";
	  	if(jf03 == 0 || jf03 <= 4){
	  	analysisjp3 = "Dacudao Ave/Buhangin: Free flow of traffic";
	  	}else if(jf03 > 4 || jf03 <= 8){
	  		analysisjp3 = "Dacudao Ave/Buhangin: Sluggish flow of traffic";
	  	}else if(jf03 > 8 || jf03 >= 9){
	  		analysisjp3 = "Dacudao Ave/Buhangin: Slow flow of traffic";
	  	}else if(jf03 == 10){
	  		analysisjp3 = "Dacudao Ave/Buhangin: Traffic stopped or Road closed"
	  	}else{
	  		analysisjp3 = "Cannot compute"
	  	}

	  	let analysisjp4 = "";
	  	if(jf04 == 0 || jf04 <= 4){
	  	analysisjp4 = "Cabaguio: Free flow of traffic";
	  	}else if(jf04 > 4 || jf04 <= 8){
	  		analysisjp4 = "Cabaguio: Sluggish flow of traffic";
	  	}else if(jf04 > 8 || jf04 >= 9){
	  		analysisjp4 = "Cabaguio: Slow flow of traffic";
	  	}else if(jf04 == 10){
	  		analysisjp4 = "Cabaguio: Traffic stopped or Road closed"
	  	}else{
	  		analysisjp4 = "Cannot compute"
	  	}


	  	let analysisjp5 = "";
	  	if(jf05 == 0 || jf05 <= 4){
	  	analysisjp5 = "Angliongto: Free flow of traffic";
	  	}else if(jf05 > 4 || jf05 <= 8){
	  		analysisjp5 = "Angliongto: Sluggish flow of traffic";
	  	}else if(jf05 > 8 || jf05 >= 9){
	  		analysisjp5 = "Angliongto: Slow flow of traffic";
	  	}else if(jf05 == 10){
	  		analysisjp5 = "Angliongto: Traffic stopped or Road closed"
	  	}else{
	  		analysisjp5 = "Cannot compute"
	  	}

	    let analysisjp6 = "";
	  	if(jf06 == 0 || jf06 <= 4){
	  	analysisjp5 = "R. Castillo: Free flow of traffic";
	  	}else if(jf06 > 4 || jf06 <= 8){
	  		analysisjp5 = "R. Castillo: Sluggish flow of traffic";
	  	}else if(jf06 > 8 || jf06 >= 9){
	  		analysisjp5 = "R. Castillo: Slow flow of traffic";
	  	}else if(jf06 == 10){
	  		analysisjp5 = "R. Castillo: Traffic stopped or Road closed"
	  	}else{
	  		analysisjp5 = "Cannot compute"
	  	}


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street1: street1,  int01: int01, jf01: jf01,  int02: int02, jf02:  jf02 ,int03: int03, jf03: jf03, int04: int04, jf04: jf04,  int05: int05, jf05: jf05,
    		int06:int06,jf06:jf06, analysisjp6:analysisjp6,
		analysisjp1:analysisjp1, analysisjp2:analysisjp2, analysisjp3:analysisjp3,
    		analysisjp4:analysisjp4, analysisjp5:analysisjp5, analysis1: analysis1 }));
	});

	});



app.get('/mcarthur',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  	
	  	//all mcarthur


	  	//all mcarthur-

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
	  
	  	var avem = jfm + jf02 + jfm2 + jfm3 + jfm4 + jfm5 + jfm6 +jfm7 + jfm8
	  	+ jfm9 + jfm10 + jfm11 + jfm12 + jfm13  ;

	  	var avemc = avem/x;

	  	
	  	let analysis2 = "";
	  	if(avemc == 0 || avemc <= 4){
	  	analysis2 = "Free flow of traffic";
	  	}else if(avemc > 4 || avemc <= 8){
	  		analysis2 = "Sluggish flow of traffic";
	  	}else if(avemc > 8 || avemc >= 9){
	  		analysis2 = "Slow flow of traffic";
	  	}else if(avemc == 10){
	  		analysis2 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis2 = "Cannot compute"
	  	}

	  	let analysis22 = "";
	  	if(jf02 == 0 || jf02 <= 4){
	  	analysis22 = "Generoso I Brg: Free flow of traffic";
	  	}else if(jf02 > 4 || jf02 <= 8){
	  		analysis22 = "Generoso I Brg: Sluggish flow of traffic";
	  	}else if(jf02 > 8 || jf02 >= 9){
	  		analysis22 = "Generoso I Brg: Slow flow of traffic";
	  	}else if(jf02 == 10){
	  		analysis22 = "Generoso I Brg: Traffic stopped or Road closed"
	  	}else{
	  		analysis22 = "Cannot compute"
	  	}

	  	let analysis23 = "";
	  	if(jfm2 == 0 || jfm2 <= 4){
	  	analysis23 = "Sandawa Rd: Free flow of traffic";
	  	}else if(jfm2 > 4 || jfm2 <= 8){
	  		analysis23 = "Sandawa Rd: Sluggish flow of traffic";
	  	}else if(jfm2 > 8 || jfm2 >= 9){
	  		analysis23 = "Sandawa Rd: Slow flow of traffic";
	  	}else if(jfm2 == 10){
	  		analysis23 = "Sandawa Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis23 = "Cannot compute"
	  	}
	  	
	  	let analysis24 = "";
	  	if(jfm3 == 0 || jfm3 <= 4){
	  	analysis24 = "Ma-A Rd: Free flow of traffic";
	  	}else if(jfm3 > 4 || jfm3 <= 8){
	  		analysis24 = "Ma-A Rd: Sluggish flow of traffic";
	  	}else if(jfm3 > 8 || jfm3 >= 9){
	  		analysis24 = "Ma-A Rd: Slow flow of traffic";
	  	}else if(jfm3 == 10){
	  		analysis24 = "Ma-A Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis24 = "Cannot compute"
	  	}
	  	
	  	let analysis25 = "";
	  	if(jfm4 == 0 || jfm4 <= 4){
	  	analysis25 = "Tulip Dr: Free flow of traffic";
	  	}else if(jfm4 > 4 || jfm4 <= 8){
	  		analysis25 = "Tulip Dr: Sluggish flow of traffic";
	  	}else if(jfm4 > 8 || jfm4 >= 9){
	  		analysis25 = "Tulip Dr: Slow flow of traffic";
	  	}else if(jfm4 == 10){
	  		analysis25 = "Tulip Dr: Traffic stopped or Road closed"
	  	}else{
	  		analysis25 = "Cannot compute"
	  	}
	  	
	  	let analysis26 = "";
	  	if(jfm5 == 0 || jfm5 <= 4){
	  	analysis26 = "S Cuyugan/Shrine Hills Rd: Free flow of traffic";
	  	}else if(jfm5 > 4 || jfm5 <= 8){
	  		analysis26 = "S Cuyugan/Shrine Hills Rd: Sluggish flow of traffic";
	  	}else if(jfm5 > 8 || jfm5 >= 9){
	  		analysis26 = "S Cuyugan/Shrine Hills Rd :Slow flow of traffic";
	  	}else if(jfm5 == 10){
	  		analysis26 = "S Cuyugan/Shrine Hills Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis26 = "Cannot compute"
	  	}

	  	let analysis27 = "";
	  	if(jfm6 == 0 || jfm6 <= 4){
	  	analysis27 = "Quimpo Blvd: Free flow of traffic";
	  	}else if(jfm6 > 4 || jfm6 <= 8){
	  		analysis27 = "Quimpo Blvd: Sluggish flow of traffic";
	  	}else if(jfm6 > 8 || jfm6 >= 9){
	  		analysis27 = "Quimpo Blvd: Slow flow of traffic";
	  	}else if(jfm6 == 10){
	  		analysis27 = "Quimpo Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis27 = "Cannot compute"
	  	}

	  	let analysis28 = "";
	  	if(jfm7 == 0 || jfm7 <= 4){
	  	analysis28 = "Matina Pangi/Aplaya: Free flow of traffic";
	  	}else if(jfm7 > 4 || jfm7 <= 8){
	  		analysis28 = "Matina Pangi/Aplaya: Sluggish flow of traffic";
	  	}else if(jfm7 > 8 || jfm7 >= 9){
	  		analysis28 = "Matina Pangi/Aplaya: Slow flow of traffic";
	  	}else if(jfm7 == 10){
	  		analysis28 = "Matina Pangi/Aplaya: Traffic stopped or Road closed"
	  	}else{
	  		analysis28 = "Cannot compute"
	  	}

	  	let analysis29 = "";
	  	if(jfm8 == 0 || jfm8 <= 4){
	  	analysis29 = "Diversion Rd: Free flow of traffic";
	  	}else if(jfm8 > 4 || jfm8 <= 8){
	  		analysis29 = "Diversion Rd: Sluggish flow of traffic";
	  	}else if(jfm8 > 8 || jfm8 >= 9){
	  		analysis29 = "Diversion Rd: Slow flow of traffic";
	  	}else if(jfm8 == 10){
	  		analysis29 = "Diversion Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis29 = "Cannot compute"
	  	}

	  	let analysis30 = "";
	  	if(jfm9 == 0 || jfm9 <= 4){
	  	analysis30 = "Tolomo Ii Brg/Tolomo I Brg: Free flow of traffic";
	  	}else if(jfm9 > 4 || jfm9 <= 8){
	  		analysis30 = "Tolomo Ii Brg/Tolomo I Brg: Sluggish flow of traffic";
	  	}else if(jfm9 > 8 || jfm9 >= 9){
	  		analysis30 = "Tolomo Ii Brg/Tolomo I Brg: Slow flow of traffic";
	  	}else if(jfm9 == 10){
	  		analysis30 = "Tolomo Ii Brg/Tolomo I Brg: Traffic stopped or Road closed"
	  	}else{
	  		analysis30 = "Cannot compute"
	  	}

	  	let analysis31 = "";
	  	if(jfm10 == 0 || jfm10 <= 4){
	  	analysis31 = "Davao Bukidnon Rd: Free flow of traffic";
	  	}else if(jfm10 > 4 || jfm10 <= 8){
	  		analysis31 = "Davao Bukidnon Rd: Sluggish flow of traffic";
	  	}else if(jfm10 > 8 || jfm10 >= 9){
	  		analysis31 = "Davao Bukidnon Rd: Slow flow of traffic";
	  	}else if(jfm10 == 10){
	  		analysis31 = "Davao Bukidnon Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis31 = "Cannot compute"
	  	}

	  	let analysis32 = "";
	  	if(jfm11 == 0 || jfm11 <= 4){
	  	analysis32 = "Libby Rd: Free flow of traffic";
	  	}else if(jfm11 > 4 || jfm11 <= 8){
	  		analysis32 = "Libby Rd: Sluggish flow of traffic";
	  	}else if(jfm11 > 8 || jfm11 >= 9){
	  		analysis32 = "Libby Rd: Slow flow of traffic";
	  	}else if(jfm11 == 10){
	  		analysis32 = "Libby Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis32 = "Libby Rd"
	  	}

	  	let analysis33 = "";
	  	if(jfm12 == 0 || jfm12 <= 4){
	  	analysis33 = "Agton/Manggahan: Free flow of traffic";
	  	}else if(jfm12 > 4 || jfm12 <= 8){
	  		analysis33 = "Agton/Manggahan: Sluggish flow of traffic";
	  	}else if(jfm12 > 8 || jfm12 >= 9){
	  		analysis33 = "Agton/Manggahan: Slow flow of traffic";
	  	}else if(jfm12 == 10){
	  		analysis33 = "Agton/Manggahan: Traffic stopped or Road closed"
	  	}else{
	  		analysis33 = "Cannot compute"
	  	}

	  	let analysis34 = "";
	  	if(jfm13 == 0 || jfm13 <= 4){
	  	analysis34 = "Santa Cruz/Davao City Border: Free flow of traffic";
	  	}else if(jfm13 > 4 || jfm13 <= 8){
	  		analysis34 = "Santa Cruz/Davao City Border: Sluggish flow of traffic";
	  	}else if(jfm13 > 8 || jfm13 >= 9){
	  		analysis34 = "Santa Cruz/Davao City Border: Slow flow of traffic";
	  	}else if(jfm13 == 10){
	  		analysis34 = "Santa Cruz/Davao City Border: Traffic stopped or Road closed"
	  	}else{
	  		analysis34 = "Cannot compute"
	  	}

	  	let analysis35 = "";
	  	if(jfm == 0 || jfm <= 4){
	  	analysis35 = "E. Quirino Ave: Free flow of traffic";
	  	}else if(jfm > 4 || jfm <= 8){
	  		analysis35 = "E. Quirino Ave: Sluggish flow of traffic";
	  	}else if(jfm > 8 || jfm >= 9){
	  		analysis35 = "E. Quirino Ave: Slow flow of traffic";
	  	}else if(jfm == 10){
	  		analysis35 = "E. Quirino Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis35 = "Cannot compute"
	  	}

	  



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ streetmm: streetmm,  intm: intm, jfm:jfm, intm1: intm1, jf02: jf02, intm2: intm2, jfm2: jfm2,  intm3: intm3, 
    		jfm3: jfm3,  
    		intm4: intm4, jfm4: jfm4,  intm5: intm5, jfm5: jfm5,  intm6: intm6, jfm6: jfm6,  intm7: intm7, 
    		jfm7: jfm7,  intm8: intm8, jfm8: jfm8,  intm9: intm9, jfm9: jfm9, intm10: intm10, jfm10: jfm10, 
    		intm11: intm11, jfm11: jfm11, intm12: intm12, jfm12: jfm12,  intm13: intm13, jfm13: jfm13, analysis2: analysis2, analysis22: analysis22,
    		analysis23: analysis23, analysis24: analysis24, analysis25: analysis25, analysis26: analysis26, 
    		analysis27: analysis27, analysis28: analysis28, analysis29: analysis29, analysis30: analysis30, analysis31: analysis31,
    		analysis32: analysis32, analysis33: analysis33, analysis34: analysis34, analysis35: analysis35 }));
	



	  
	});


});

app.get('/mcarthur-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  	
	  	

	    const streetmm = body.RWS[0].RW[5].DE;
	  	const intm = body.RWS[0].RW[5].FIS[0].FI[0].TMC.DE;
	  	const jfm = body.RWS[0].RW[5].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intm1 = body.RWS[0].RW[5].FIS[0].FI[1].TMC.DE;
	  	const jf02 = body.RWS[0].RW[5].FIS[0].FI[1].CF[0].JF;

	  	const intm2 = body.RWS[0].RW[5].FIS[0].FI[2].TMC.DE;
	  	const jfm2 = body.RWS[0].RW[5].FIS[0].FI[2].CF[0].JF;

	  	const intm3 = body.RWS[0].RW[5].FIS[0].FI[3].TMC.DE;
	  	const jfm3 = body.RWS[0].RW[5].FIS[0].FI[3].CF[0].JF;

	  	const intm4 = body.RWS[0].RW[5].FIS[0].FI[4].TMC.DE;
	  	const jfm4 = body.RWS[0].RW[5].FIS[0].FI[4].CF[0].JF;

	  	const intm5 = body.RWS[0].RW[5].FIS[0].FI[5].TMC.DE;
	  	const jfm5 = body.RWS[0].RW[5].FIS[0].FI[5].CF[0].JF;

	  	const intm6 = body.RWS[0].RW[5].FIS[0].FI[6].TMC.DE;
	  	const jfm6 = body.RWS[0].RW[5].FIS[0].FI[6].CF[0].JF;

	  	const intm7 = body.RWS[0].RW[5].FIS[0].FI[7].TMC.DE;
	  	const jfm7 = body.RWS[0].RW[5].FIS[0].FI[7].CF[0].JF;

	  	const intm8 = body.RWS[0].RW[5].FIS[0].FI[8].TMC.DE;
	  	const jfm8 = body.RWS[0].RW[5].FIS[0].FI[8].CF[0].JF;

	  	const intm9 = body.RWS[0].RW[5].FIS[0].FI[9].TMC.DE;
	  	const jfm9 = body.RWS[0].RW[5].FIS[0].FI[9].CF[0].JF;

	  	const intm10 = body.RWS[0].RW[5].FIS[0].FI[10].TMC.DE;
	  	const jfm10  = body.RWS[0].RW[5].FIS[0].FI[10].CF[0].JF;
	  		
	  	const intm11 = body.RWS[0].RW[5].FIS[0].FI[11].TMC.DE;
	  	const jfm11 = body.RWS[0].RW[5].FIS[0].FI[11].CF[0].JF;
	  	
	  	const intm12 = body.RWS[0].RW[5].FIS[0].FI[12].TMC.DE;
	  	const jfm12 = body.RWS[0].RW[5].FIS[0].FI[12].CF[0].JF;
	  	
	  	const intm13 = body.RWS[0].RW[5].FIS[0].FI[13].TMC.DE;
	  	const jfm13 = body.RWS[0].RW[5].FIS[0].FI[13].CF[0].JF;


	  	const x = 14
	  
	  	var avem = jfm + jf02 + jfm2 + jfm3 + jfm4 + jfm5 + jfm6 +jfm7 + jfm8
	  	+ jfm9 + jfm10 + jfm11 + jfm12 + jfm13  ;

	  	var avemc = avem/x;

	  	
	  	let analysis2 = "";
	  	if(avemc == 0 || avemc <= 4){
	  	analysis2 = "Free flow of traffic";
	  	}else if(avemc > 4 || avemc <= 8){
	  		analysis2 = "Sluggish flow of traffic";
	  	}else if(avemc > 8 || avemc >= 9){
	  		analysis2 = "Slow flow of traffic";
	  	}else if(avemc == 10){
	  		analysis2 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis2 = "Cannot compute"
	  	}

		let analysis22 = "";
	  	if(jfm == 0 || jfm <= 4){
	  	analysis22 = "Santa Cruz/Davao City Border: Free flow of traffic";
	  	}else if(jfm > 4 || jfm <= 8){
	  		analysis22 = "Santa Cruz/Davao City Border: Sluggish flow of traffic";
	  	}else if(jfm > 8 || jfm >= 9){
	  		analysis22 = "Santa Cruz/Davao City Border: Slow flow of traffic";
	  	}else if(jfm == 10){
	  		analysis22 = "GSanta Cruz/Davao City Border: Traffic stopped or Road closed"
	  	}else{
	  		analysis22 = "Cannot compute"
	  	}

	  	let analysis23 = "";
	  	if(jf02 == 0 || jf02 <= 4){
	  	analysis23 = "Agton/Manggahan: Free flow of traffic";
	  	}else if(jf02 > 4 || jf02 <= 8){
	  		analysis23 = "Agton/Manggahan: Sluggish flow of traffic";
	  	}else if(jf02 > 8 || jf02 >= 9){
	  		analysis23 = "Agton/Manggahan: Slow flow of traffic";
	  	}else if(jf02 == 10){
	  		analysis23 = "Agton/Manggahan: Traffic stopped or Road closed"
	  	}else{
	  		analysis23 = "Cannot compute"
	  	}
	  	
	  	let analysis24 = "";
	  	if(jfm2 == 0 || jfm2 <= 4){
	  	analysis24 = "Libby Rd: Free flow of traffic";
	  	}else if(jfm2 > 4 || jfm2 <= 8){
	  		analysis24 = "Libby Rd: Sluggish flow of traffic";
	  	}else if(jfm2 > 8 || jfm2 >= 9){
	  		analysis24 = "Libby Rd: Slow flow of traffic";
	  	}else if(jfm2 == 10){
	  		analysis24 = "Libby Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis24 = "Cannot compute"
	  	}
	  	
	  	let analysis25 = "";
	  	if(jfm3 == 0 || jfm3 <= 4){
	  	analysis25 = "Davao Bukidnon Rd: Free flow of traffic";
	  	}else if(jfm3 > 4 || jfm3 <= 8){
	  		analysis25 = "Davao Bukidnon Rd: Sluggish flow of traffic";
	  	}else if(jfm3 > 8 || jfm3 >= 9){
	  		analysis25 = "Davao Bukidnon Rd: Slow flow of traffic";
	  	}else if(jfm3 == 10){
	  		analysis25 = "Davao Bukidnon Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis25 = "Cannot compute"
	  	}
	  	
	  	let analysis26 = "";
	  	if(jfm4 == 0 || jfm4 <= 4){
	  	analysis26 = "Tolomo Ii Brg/Tolomo I Brg: Free flow of traffic";
	  	}else if(jfm4 > 4 || jfm4 <= 8){
	  		analysis26 = "Tolomo Ii Brg/Tolomo I Brg: Sluggish flow of traffic";
	  	}else if(jfm4 > 8 || jfm4 >= 9){
	  		analysis26 = "Tolomo Ii Brg/Tolomo I Brg :Slow flow of traffic";
	  	}else if(jfm4 == 10){
	  		analysis26 = "Tolomo Ii Brg/Tolomo I Brg: Traffic stopped or Road closed"
	  	}else{
	  		analysis26 = "Cannot compute"
	  	}

	  	let analysis27 = "";
	  	if(jfm5 == 0 || jfm5 <= 4){
	  	analysis27 = "Diversion Rd: Free flow of traffic";
	  	}else if(jfm5 > 4 || jfm5 <= 8){
	  		analysis27 = "Diversion Rd: Sluggish flow of traffic";
	  	}else if(jfm5 > 8 || jfm5 >= 9){
	  		analysis27 = "Diversion Rd: Slow flow of traffic";
	  	}else if(jfm5 == 10){
	  		analysis27 = "Diversion Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis27 = "Cannot compute"
	  	}

	  	let analysis28 = "";
	  	if(jfm6 == 0 || jfm6 <= 4){
	  	analysis28 = "Matina Pangi/Aplaya: Free flow of traffic";
	  	}else if(jfm6 > 4 || jfm6 <= 8){
	  		analysis28 = "Matina Pangi/Aplaya: Sluggish flow of traffic";
	  	}else if(jfm6 > 8 || jfm6 >= 9){
	  		analysis28 = "Matina Pangi/Aplaya: Slow flow of traffic";
	  	}else if(jfm6 == 10){
	  		analysis28 = "Matina Pangi/Aplaya: Traffic stopped or Road closed"
	  	}else{
	  		analysis28 = "Cannot compute"
	  	}

	  	let analysis29 = "";
	  	if(jfm7 == 0 || jfm7 <= 4){
	  	analysis29 = "Quimpo Blvd: Free flow of traffic";
	  	}else if(jfm7 > 4 || jfm7 <= 8){
	  		analysis29 = "Quimpo Blvd: Sluggish flow of traffic";
	  	}else if(jfm7 > 8 || jfm7 >= 9){
	  		analysis29 = "Quimpo Blvd: Slow flow of traffic";
	  	}else if(jfm7 == 10){
	  		analysis29 = "Quimpo Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis29 = "Cannot compute"
	  	}

	  	let analysis30 = "";
	  	if(jfm8 == 0 || jfm8 <= 4){
	  	analysis30 = "S Cuyugan/Shrine Hills Rd: Free flow of traffic";
	  	}else if(jfm8 > 4 || jfm8 <= 8){
	  		analysis30 = "S Cuyugan/Shrine Hills Rd: Sluggish flow of traffic";
	  	}else if(jfm8 > 8 || jfm8 >= 9){
	  		analysis30 = "S Cuyugan/Shrine Hills Rd: Slow flow of traffic";
	  	}else if(jfm8 == 10){
	  		analysis30 = "S Cuyugan/Shrine Hills Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis30 = "Cannot compute"
	  	}

	  	let analysis31 = "";
	  	if(jfm9 == 0 || jfm9 <= 4){
	  	analysis31 = "Tulip Dr: Free flow of traffic";
	  	}else if(jfm9 > 4 || jfm9 <= 8){
	  		analysis31 = "Tulip Dr: Sluggish flow of traffic";
	  	}else if(jfm9 > 8 || jfm9 >= 9){
	  		analysis31 = "Tulip Dr: Slow flow of traffic";
	  	}else if(jfm9 == 10){
	  		analysis31 = "Tulip Dr: Traffic stopped or Road closed"
	  	}else{
	  		analysis31 = "Cannot compute"
	  	}

	  	let analysis32 = "";
	  	if(jfm10 == 0 || jfm10 <= 4){
	  	analysis32 = "Ma-A Rd: Free flow of traffic";
	  	}else if(jfm10 > 4 || jfm10 <= 8){
	  		analysis32 = "Ma-A Rd: Sluggish flow of traffic";
	  	}else if(jfm10 > 8 || jfm10 >= 9){
	  		analysis32 = "Ma-A Rd: Slow flow of traffic";
	  	}else if(jfm10 == 10){
	  		analysis32 = "Ma-A Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis32 = "Cannot compute"
	  	}

	  	let analysis33 = "";
	  	if(jfm11 == 0 || jfm11 <= 4){
	  	analysis33 = "Sandawa Rd: Free flow of traffic";
	  	}else if(jfm11 > 4 || jfm11 <= 8){
	  		analysis33 = "Sandawa Rd: Sluggish flow of traffic";
	  	}else if(jfm11 > 8 || jfm11 >= 9){
	  		analysis33 = "Sandawa Rd: Slow flow of traffic";
	  	}else if(jfm11 == 10){
	  		analysis33 = "Sandawa Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis33 = "Cannot compute"
	  	}

	  	let analysis34 = "";
	  	if(jfm12 == 0 || jfm12 <= 4){
	  	analysis34 = "Generoso I Brg: Free flow of traffic";
	  	}else if(jfm12 > 4 || jfm12 <= 8){
	  		analysis34 = "Generoso I Brg: Sluggish flow of traffic";
	  	}else if(jfm12 > 8 || jfm12 >= 9){
	  		analysis34 = "Generoso I Brg: Slow flow of traffic";
	  	}else if(jfm12 == 10){
	  		analysis34 = "Generoso I Brg: Traffic stopped or Road closed"
	  	}else{
	  		analysis34 = "Cannot compute"
	  	}

	  	let analysis35 = "";
	  	if(jfm13 == 0 || jfm13 <= 4){
	  	analysis35 = "E. Quirino Ave: Free flow of traffic";
	  	}else if(jfm13 > 4 || jfm13 <= 8){
	  		analysis35 = "E. Quirino Ave: Sluggish flow of traffic";
	  	}else if(jfm13 > 8 || jfm13 >= 9){
	  		analysis35 = "E. Quirino Ave: Slow flow of traffic";
	  	}else if(jfm13 == 10){
	  		analysis35 = "E. Quirino Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis35 = "Cannot compute"
	  	}



	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ streetmm: streetmm,  intm: intm, jfm:jfm, intm1: intm1, jf02: jf02, intm2: intm2, jfm2: jfm2,  intm3: intm3, 
    		jfm3: jfm3,  
    		intm4: intm4, jfm4: jfm4,  intm5: intm5, jfm5: jfm5,  intm6: intm6, jfm6: jfm6,  intm7: intm7, 
    		jfm7: jfm7,  intm8: intm8, jfm8: jfm8,  intm9: intm9, jfm9: jfm9, intm10: intm10, jfm10: jfm10, 
    		intm11: intm11, jfm11: jfm11, intm12: intm12, jfm12: jfm12,  intm13: intm13, jfm13: jfm13, analysis2: analysis2, analysis22: analysis22,
    		analysis23: analysis23, analysis24: analysis24, analysis25: analysis25, analysis26: analysis26, 
    		analysis27: analysis27, analysis28: analysis28, analysis29: analysis29, analysis30: analysis30, analysis31: analysis31,
    		analysis32: analysis32, analysis33: analysis33, analysis34: analysis34, analysis35: analysis35 }));
	


	  
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
	  	if(ecowest == 0 || ecowest <= 4){
	  	analysis4 = "Free flow of traffic";
	  	}else if(ecowest > 4 || ecowest <= 8){
	  		analysis4 = "Sluggish flow of traffic";
	  	}else if(ecowest > 8 || ecowest >= 9){
	  		analysis4 = "Slow flow of traffic";
	  	}else if(ecowest == 10){
	  		analysis4 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis4 = "Cannot compute"
	  	}

	  	let analysis5 = "";
	  	if(jfe1 == 0 || jfe1 <= 4){
	  	analysis5 = "Quimpo Blvd: Free flow of traffic";
	  	}else if(jfe1 > 4 || jfe1 <= 8){
	  		analysis5 = "Quimpo Blvd: Sluggish flow of traffic";
	  	}else if(jfe1 > 8 || jfe1 >= 9){
	  		analysis5 = "Quimpo Blvd: Slow flow of traffic";
	  	}else if(jfe1 == 10){
	  		analysis5 = "Quimpo Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis5 = "Cannot compute"
	  	}

	  	let analysis6 = "";
	  	if(jfe2 == 0 || jfe2 <= 4){
	  	    analysis6 = "Ecoland Dr/Ecoland: Free flow of traffic";
	  	}else if(jfe2 > 4 || jfe2 <= 8){
	  		analysis6 = "Ecoland Dr/Ecoland: Sluggish flow of traffic";
	  	}else if(jfe2 > 8 || jfe2 >= 9){
	  		analysis6 = "Ecoland Dr/Ecoland: Slow flow of traffic";
	  	}else if(jfe2 == 10){
	  		analysis6 = "Ecoland Dr/Ecoland: Traffic stopped or Road closed"
	  	}else{
	  		analysis6 = "Cannot compute"
	  	}





	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetec, inte1: inte1, jfe1: jfe1,  inte2: inte2, jfe2: jfe2, 
    		analysis5:analysis5, analysis6:analysis6, analysis4: analysis4 }));
	



	  
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
	  	

	  	 	

	  	const streetec = body.RWS[0].RW[7].DE;
	  	const inte1 = body.RWS[0].RW[7].FIS[0].FI[0].TMC.DE;
	  	const jfe1 = body.RWS[0].RW[7].FIS[0].FI[0].CF[0].JF;
	  	
	  	const inte2 = body.RWS[0].RW[7].FIS[0].FI[1].TMC.DE;
	  	const jfe2 = body.RWS[0].RW[7].FIS[0].FI[1].CF[0].JF;

	  	

	  	var w = 2
	  
	  	var eco = jfe1 + jfe2 ;

	  	var ecowest = eco/w;
	  	
	  	let analysis4 = "";
	  	if(ecowest == 0 || ecowest <= 4){
	  	analysis4 = "Free flow of traffic";
	  	}else if(ecowest > 4 || ecowest <= 8){
	  		analysis4 = "Sluggish flow of traffic";
	  	}else if(ecowest > 8 || ecowest >= 9){
	  		analysis4 = "Slow flow of traffic";
	  	}else if(ecowest == 10){
	  		analysis4 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis4 = "Cannot compute"
	  	}

	  	let analysis5 = "";
	  	if(jfe1 == 0 || jfe1 <= 4){
	  	analysis5 = "Ecoland Dr/Ecoland: Free flow of traffic";
	  	}else if(jfe1 > 4 || jfe1 <= 8){
	  		analysis5 = "Ecoland Dr/Ecoland: Sluggish flow of traffic";
	  	}else if(jfe1 > 8 || jfe1 >= 9){
	  		analysis5 = "Ecoland Dr/Ecoland: Slow flow of traffic";
	  	}else if(jfe1 == 10){
	  		analysis5 = "Ecoland Dr/Ecoland: Traffic stopped or Road closed"
	  	}else{
	  		analysis5 = "Cannot compute"
	  	}

	  	let analysis6 = "";
	  	if(jfe2 == 0 || jfe2 <= 4){
	  	    analysis6 = "Quimpo Blvd: Free flow of traffic";
	  	}else if(jfe2 > 4 || jfe2 <= 8){
	  		analysis6 = "Quimpo Blvd: Sluggish flow of traffic";
	  	}else if(jfe2 > 8 || jfe2 >= 9){
	  		analysis6 = "Quimpo Blvd: Slow flow of traffic";
	  	}else if(jfe2 == 10){
	  		analysis6 = "Quimpo Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis6 = "Cannot compute"
	  	}





	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetec, inte1: inte1, jfe1: jfe1,  inte2: inte2, jfe2: jfe2, 
    		analysis5:analysis5, analysis6:analysis6, analysis4: analysis4 }));
	



	  
	});


});

app.get('/ecoland-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[11].DE;
	  	const intc1 = body.RWS[0].RW[11].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[11].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[11].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[11].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[11].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[11].FIS[0].FI[2].CF[0].JF;

	  	
		var str = "Free flow of traffic";
		//var result = str.fontcolor("blue");


	//	string.fontcolor("red")
	  	
	  	var p = 3
	  
	  	var ecoland = jfc1 + jfc2 ;

	  	var ecolands = ecoland/p;

	   
	    let analysiscolor = "";
	  	if(ecolands == "Free flow of traffic"){
	  	analysiscolor = str.fontcolor("#0000FF");
	  	}
	  	
	  	let analysis6 = "";
	  	if(ecolands == 0 || ecolands <= 4){
	  	analysis6 = "Free flow of traffic";
	  	}else if(ecolands > 4 || ecolands <= 8){
	  		analysis6 = "Sluggish flow of traffic";
	  	}else if(ecolands > 8 || ecolands >= 9){
	  		analysis6 = "Slow flow of traffic";
	  	}else if(ecolands == 10){
	  		analysis6 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis6 = "Cannot compute"
	  	}

	  	let analysis7 = "";
	  	if(jfc1 == 0 || jfc1 <= 4){
	  	analysis7 = "Eco West D: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <= 8){
	  		analysis7 = "Eco West D: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >= 9){
	  		analysis7 = "Eco West D: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis7 = "Eco West D: Traffic stopped or Road closed"
	  	}else{
	  		analysis7 = "Cannot compute"
	  	}

	  	let analysis8 = "";
	  	if(jfc2 == 0 || jfc2 <= 4){
	  	analysis8 = "Tulip Dr: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <= 8){
	  		analysis8 = "Tulip Dr: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >= 9){
	  		analysis8 = "Tulip Dr: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis8 = "Tulip Dr: Traffic stopped or Road closed"
	  	}else{
	  		analysis8 = "Cannot compute"
	  	}

	  	let analysis9 = "";
	  	if(jfc3 == 0 || jfc3 <= 4){
	  	analysis9 = "Quimpo Blvd/Quezon Blvd: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <= 8){
	  		analysis9 = "Quimpo Blvd/Quezon Blvd: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >= 9){
	  		analysis9 = "Quimpo Blvd/Quezon Blvd: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis9 = "Quimpo Blvd/Quezon Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis9 = "Cannot compute"
	  	}




	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3,
    		jfc3: jfc3, analysis7:analysis7, analysis8:analysis8, analysis9:analysis9, analysis6: analysis6 ,analysiscolor:analysiscolor }));
	



	  
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
	  	if(aplaya == 0 || aplaya <= 4){
	  	analysis7 = "Free flow of traffic";
	  	}else if(aplaya > 4 || aplaya <= 8){
	  		analysis7 = "Sluggish flow of traffic";
	  	}else if(aplaya > 8 || aplaya >= 9){
	  		analysis7 = "Slow flow of traffic";
	  	}else if(aplaya == 10){
	  		analysis7 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis7 = "Cannot compute"
	  	}

	  	let analysis8 = "";
	  	if(jfm1 == 0 || jfm1 <= 4){
	  	analysis8 = "Mac Arthur Hwy: Free flow of traffic";
	  	}else if(jfm1 > 4 || jfm1 <= 8){
	  		analysis8 = "Mac Arthur Hwy: Sluggish flow of traffic";
	  	}else if(jfm1 > 8 || jfm1 >= 9){
	  		analysis8 = "Mac Arthur Hwy: Slow flow of traffic";
	  	}else if(jfm1 == 10){
	  		analysis8 = "Mac Arthur Hwy: Traffic stopped or Road closed"
	  	}else{
	  		analysis8 = "Cannot compute"
	  	}

		let analysis9 = "";
	  	if(jfm2 == 0 || jfm2 <= 4){
	  	analysis9 = "Jasmine St: Free flow of traffic";
	  	}else if(jfm2 > 4 || jfm2 <= 8){
	  		analysis9 = "Jasmine St: Sluggish flow of traffic";
	  	}else if(jfm2 > 8 || jfm2 >= 9){
	  		analysis9 = "Jasmine St: Slow flow of traffic";
	  	}else if(jfm2 == 10){
	  		analysis9 = "Jasmine St: Traffic stopped or Road closed"
	  	}else{
	  		analysis9 = "Cannot compute"
	  	}

		let analysis10 = "";
	  	if(jfm3 == 0 || jfm3 <= 4){
	  	analysis10 = "Punta Dumalag Rd: Free flow of traffic";
	  	}else if(jfm3 > 4 || jfm3 <= 8){
	  		analysis10 = "Punta Dumalag Rd: Sluggish flow of traffic";
	  	}else if(jfm3 > 8 || jfm3 >= 9){
	  		analysis10 = "Punta Dumalag Rd: Slow flow of traffic";
	  	}else if(jfm3 == 10){
	  		analysis10 = "Punta Dumalag Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis10 = "Cannot compute"
	  	}

		let analysis11 = "";
	  	if(jfm4 == 0 || jfm4 <= 4){
	  	analysis11 = "Eco West Dr: Free flow of traffic";
	  	}else if(jfm4 > 4 || jfm4 <= 8){
	  		analysis11 = "Eco West Dr: Sluggish flow of traffic";
	  	}else if(jfm4 > 8 || jfm4 >= 9){
	  		analysis11 = "Eco West Dr: Slow flow of traffic";
	  	}else if(jfm4 == 10){
	  		analysis11 = "Eco West Dr: Traffic stopped or Road closed"
	  	}else{
	  		analysis11 = "Cannot compute"
	  	}




	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetm, intm1: intm1, jfm1: jfm1,  intm2: intm2, jfm2: jfm2, intm3: intm3, jfm3: jfm3, intm4:intm4, jfm4:jfm4, 
    		analysis8:analysis8, analysis9:analysis9, analysis10: analysis10, analysis11: analysis11, analysis7: analysis7 }));
	



	  
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

	  	if(aplaya2 == 0 || aplaya2 <=4){
	  		analysis8 = "Free flow of traffic";
	  	}else if(aplaya2 > 4 || aplaya2 <=8){
	  		analysis8 = "Sluggish flow of traffic";
	  	}else if(aplaya2 > 8 || aplaya2 >=9){
	  		analysis8 = "Slow flow of traffic";
	  	}else if(aplaya2 == 10){
	  		analysis8 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis8 = "Cannot compute"
	  	}

	  	let analysis9 = "";
	  	if(jfm1 == 0 || jfm1 <= 4){
	  	analysis9 = "Eco West Dr: Free flow of traffic";
	  	}else if(jfm1 > 4 || jfm1 <= 8){
	  		analysis9 = "Eco West Dr: Sluggish flow of traffic";
	  	}else if(jfm1 > 8 || jfm1 >= 9){
	  		analysis9 = "Eco West Dr: Slow flow of traffic";
	  	}else if(jfm1 == 10){
	  		analysis9 = "Eco West Dr: Traffic stopped or Road closed"
	  	}else{
	  		analysis9 = "Cannot compute"
	  	}

		let analysis10 = "";
	  	if(jfm2 == 0 || jfm2 <= 4){
	  	analysis10 = "Punta Dumalag Rd: Free flow of traffic";
	  	}else if(jfm2 > 4 || jfm2 <= 8){
	  		analysis10 = "Punta Dumalag Rd: Sluggish flow of traffic";
	  	}else if(jfm2 > 8 || jfm2 >= 9){
	  		analysis10 = "Punta Dumalag Rd: Slow flow of traffic";
	  	}else if(jfm2 == 10){
	  		analysis10 = "Punta Dumalag Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis10 = "Cannot compute"
	  	}

		let analysis11 = "";
	  	if(jfm3 == 0 || jfm3 <= 4){
	  	analysis11 = "Jasmine St: Free flow of traffic";
	  	}else if(jfm3 > 4 || jfm3 <= 8){
	  		analysis11 = "Jasmine St: Sluggish flow of traffic";
	  	}else if(jfm3 > 8 || jfm3 >= 9){
	  		analysis11 = "Jasmine St: Slow flow of traffic";
	  	}else if(jfm3 == 10){
	  		analysis11 = "Jasmine St: Traffic stopped or Road closed"
	  	}else{
	  		analysis11 = "Cannot compute"
	  	}

		let analysis12 = "";
	  	if(jfm4 == 0 || jfm4 <= 4){
	  	analysis12 = "Mac Arthur Hwy: Free flow of traffic";
	  	}else if(jfm4 > 4 || jfm4 <= 8){
	  		analysis12 = "Mac Arthur Hwy: Sluggish flow of traffic";
	  	}else if(jfm4 > 8 || jfm4 >= 9){
	  		analysis12 = "Mac Arthur Hwy: Slow flow of traffic";
	  	}else if(jfm4 == 10){
	  		analysis12 = "Mac Arthur Hwy: Traffic stopped or Road closed"
	  	}else{
	  		analysis12 = "Cannot compute"
	  	}



	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetm, intm1: intm1, jfm1: jfm1,  intm2: intm2, jfm2: jfm2, intm3: intm3, jfm3: jfm3, intm4:intm4, jfm4:jfm4,
    	analysis9:analysis9, analysis10:analysis10, analysis11:analysis11, analysis12:analysis12, analysis8: analysis8 }));
	



	  
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
	  
	  	var ecoplus = jfc1 + jfc2 + jfc3;

	  	var ecolandplus = ecoplus/p;
	  	
	  	let analysis9 = "";
	  	if(ecolandplus == 0 || ecolandplus <= 4){
	  		analysis9 = "Free flow of traffic";
	  	}else if(ecolandplus > 4 || ecolandplus <= 8){
	  		analysis9 = "Sluggish flow of traffic";
	  	}else if(ecolandplus > 8 || ecolandplus >= 9){
	  		analysis9 = "Slow flow of traffic";
	  	}else if(ecolandplus == 10){
	  		analysis9 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis9 = "Cannot compute"
	  	}

	  	let analysis10 = "";
	  	if(jfc1 == 0 || jfc1 <= 4){
	  		analysis10 = "Quimpo Blvd/Quezon Blvd: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <= 8){
	  		analysis10 = "Quimpo Blvd/Quezon Blvd: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >= 9){
	  		analysis10 = "Quimpo Blvd/Quezon Blvd: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis10 = "Quimpo Blvd/Quezon Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis10 = "Cannot compute"
	  	}

	  	let analysis11 = "";
	  	if(jfc2 == 0 || jfc2 <= 4){
	  		analysis11 = "Tulip Dr: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <= 8){
	  		analysis11 = "Tulip Dr: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >= 9){
	  		analysis11 = "Tulip Dr: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis11 = "Tulip Dr: Traffic stopped or Road closed"
	  	}else{
	  		analysis11 = "Cannot compute"
	  	}

	  	let analysis12 = "";
	  	if(jfc3 == 0 || jfc3 <= 4){
	  		analysis12 = "Eco West Dr: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <= 8){
	  		analysis12 = "Eco West Dr: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >= 9){
	  		analysis12 = "Eco West Dr: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis12 = "Eco West Dr: Traffic stopped or Road closed"
	  	}else{
	  		analysis12 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3,
    	analysis10:analysis10, analysis11:analysis11, analysis12:analysis12 , analysis9: analysis9 }));
	



	  
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
	  	}else if(tulipdrive > 4 || tulipdrive <= 8){
	  		analysis10 = "Sluggish flow of traffic";
	  	}else if(tulipdrive > 8 || tulipdrive >= 9){
	  		analysis10 = "Slow flow of traffic";
	  	}else if(tulipdrive == 10){
	  		analysis10 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis10 = "Cannot compute"
	  	}

	  	let analysis11 = "";
	  	if(jfc1 == 0 || jfc1 <= 4){
	  		analysis11 = "Ecoland: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <= 8){
	  		analysis11 = "Ecoland: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >= 9){
	  		analysis11 = "Ecoland: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis11 = "Ecoland: Traffic stopped or Road closed"
	  	}else{
	  		analysis11 = "Cannot compute"
	  	}


		let analysis12 = "";
	  	if(jfc2 == 0 || jfc2 <= 4){
	  		analysis12 = "Quimpo Blvd: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <= 8){
	  		analysis12 = "Quimpo Blvd: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >= 9){
	  		analysis12 = "Quimpo Blvd: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis12 = "Quimpo Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis12 = "Cannot compute"
	  	}


		let analysis13 = "";
	  	if(jfc3 == 0 || jfc3 <= 4){
	  		analysis13 = "Mac Arthur Hwy: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <= 8){
	  		analysis13 = "Mac Arthur Hwy: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >= 9){
	  		analysis13 = "Mac Arthur Hwy: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis13 = "Mac Arthur Hwy: Traffic stopped or Road closed"
	  	}else{
	  		analysis13 = "Cannot compute"
	  	}


	  	

	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, 
    		analysis11:analysis11, analysis12:analysis12, analysis13:analysis13, analysis10: analysis10 }));
	



	  
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
	  	}else if(tulippdrive > 4 || tulippdrive <= 8){
	  		analysis11 = "Sluggish flow of traffic";
	  	}else if(tulippdrive > 8 || tulippdrive >= 9){
	  		analysis11 = "Slow flow of traffic";
	  	}else if(tulippdrive == 10){
	  		analysis11 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis11 = "Cannot compute"
	  	}

	  	let analysis12 = "";
	  	if(jfc1 == 0 || jfc1 <= 4){
	  		analysis12 = "Mac Arthur Hwy: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <= 8){
	  		analysis12 = "Mac Arthur Hwy: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >= 9){
	  		analysis12 = "Mac Arthur Hwy: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis12 = "Mac Arthur Hwy: Traffic stopped or Road closed"
	  	}else{
	  		analysis12 = "Cannot compute"
	  	}


		let analysis13 = "";
	  	if(jfc2 == 0 || jfc2 <= 4){
	  		analysis13 = "Quimpo Blvd: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <= 8){
	  		analysis13 = "Quimpo Blvd: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >= 9){
	  		analysis13 = "Quimpo Blvd: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis13 = "Quimpo Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis13 = "Cannot compute"
	  	}


		let analysis14 = "";
	  	if(jfc3 == 0 || jfc3 <= 4){
	  		analysis14 = "Ecoland: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <= 8){
	  		analysis14 = "Ecoland: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >= 9){
	  		analysis14 = "Ecoland: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis14 = "Ecoland: Traffic stopped or Road closed"
	  	}else{
	  		analysis14 = "Cannot compute"
	  	}


	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3,
    	analysis12:analysis12, analysis13:analysis13, analysis14:analysis14, analysis11: analysis11 }));
	



	  
	});


});

app.get('/sandawa-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[16].DE;
	  	const intc1 = body.RWS[0].RW[16].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[16].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[16].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[16].FIS[0].FI[1].CF[0].JF;
	  	

	  	var p = 2
	  
	  	var sandawaa = jfc1 + jfc2;

	  	var sandawaas = sandawaa/p;
	  	
	  	let analysis12 = "";
	  	if(sandawaas == 0 || sandawaas <= 4){
	  		analysis12 = "Free flow of traffic";
	  	}else if(sandawaas > 4 || sandawaas <= 8){
	  		analysis12 = "Sluggish flow of traffic";
	  	}else if(sandawaas > 8 || sandawaas >= 9){
	  		analysis12 = "Slow flow of traffic";
	  	}else if(sandawaas == 10){
	  		analysis12 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis12 = "Cannot compute"
	  	}

	  	let analysis13 = "";
	  	if(jfc1 == 0 || jfc1 <= 4){
	  		analysis13 = "Quezon Blvd: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <= 8){
	  		analysis13 = "Quezon Blvd: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >= 9){
	  		analysis13 = "Quezon Blvd: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis13 = "Quezon Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis13 = "Cannot compute"
	  	}

	  	let analysis14 = "";
	  	if(jfc2 == 0 || jfc2 <= 4){
	  		analysis14 = "Mac Arthur Hwy: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <= 8){
	  		analysis14 = "Mac Arthur Hwy: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >= 9){
	  		analysis14 = "Mac Arthur Hwy: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis14 = "Mac Arthur Hwy: Traffic stopped or Road closed"
	  	}else{
	  		analysis14 = "Cannot compute"
	  	}


	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, 
    		analysis13:analysis13, analysis14:analysis14, analysis12: analysis12 }));
	



	  
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
	  	}else if(quimpoo > 4 || quimpoo <=8){
	  		analysis13 = "Sluggish flow of traffic";
	  	}else if(quimpoo > 8 || quimpoo >=9){
	  		analysis13 = "Slow flow of traffic";
	  	}else if(quimpoo == 10){
	  		analysis13 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis13 = "Cannot compute"
	  	}

	  	let analysis14 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis14 = "Mac Arthur Hwy: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis14 = "Mac Arthur Hwy: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis14 = "Mac Arthur Hwy: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis14 = "Mac Arthur Hwy: Traffic stopped or Road closed"
	  	}else{
	  		analysis14 = "Cannot compute"
	  	}

	  	let analysis15 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis15 = "Eco West Dr: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis15 = "Eco West Dr: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis15 = "Eco West Dr: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis15 = "Eco West Dr: Traffic stopped or Road closed"
	  	}else{
	  		analysis15 = "Cannot compute"
	  	}

	  	let analysis16 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis16 = "Tulip Dr: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis16 = "Tulip Dr: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis16 = "Tulip Dr: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis16 = "Tulip Dr: Traffic stopped or Road closed"
	  	}else{
	  		analysis16 = "Cannot compute"
	  	}

	  	let analysis17 = "";
	  	if(jfc4 == 0 || jfc4 <=4){
	  		analysis17 = "Ecoland: Free flow of traffic";
	  	}else if(jfc4 > 4 || jfc4 <=8){
	  		analysis17 = "Ecoland: Sluggish flow of traffic";
	  	}else if(jfc4 > 8 || jfc4 >=9){
	  		analysis17 = "Ecoland: Slow flow of traffic";
	  	}else if(jfc4 == 10){
	  		analysis17 = "Ecoland: Traffic stopped or Road closed"
	  	}else{
	  		analysis17 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4, 
    		analysis14:analysis14, analysis15:analysis15, analysis16:analysis16, analysis17:analysis17, analysis13: analysis13 }));
	



	  
	});


});

app.get('/sandawa',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[14].DE;
	  	const intc1 = body.RWS[0].RW[14].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[14].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[14].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[14].FIS[0].FI[1].CF[0].JF;
	  	

	  	var p = 2
	  
	  	var sandawaaa = jfc1 + jfc2;

	  	var sandawaaas = sandawaaa/p;
	  	
	  	let analysis14 = "";
	  	if(sandawaaas == 0 || sandawaaas <= 4){
	  		analysis14 = "Free flow of traffic";
	  	}else if(sandawaaas > 4 || sandawaaas <= 8){
	  		analysis14 = "Sluggish flow of traffic";
	  	}else if(sandawaaas > 8 || sandawaaas >= 9){
	  		analysis14 = "Slow flow of traffic";
	  	}else if(sandawaaas == 10){
	  		analysis14 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis14 = "Cannot compute"
	  	}

	  	let analysis15 = "";
	  	if(jfc1 == 0 || jfc1 <= 4){
	  		analysis15 = "Mac Arthur Hwy: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <= 8){
	  		analysis15 = "Mac Arthur Hwy: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >= 9){
	  		analysis15 = "Mac Arthur Hwy: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis15 = "Mac Arthur Hwy: Traffic stopped or Road closed"
	  	}else{
	  		analysis15 = "Cannot compute"
	  	}

	  	let analysis16 = "";
	  	if(jfc2 == 0 || jfc2 <= 4){
	  		analysis16 = "Quezon Blvd: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <= 8){
	  		analysis16 = "Quezon Blvd: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >= 9){
	  		analysis16 = "Quezon Blvd: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis16 = "Quezon Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis16 = "Cannot compute"
	  	}

	  	

	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, 
    		analysis15:analysis15, analysis16:analysis16, analysis14: analysis14 }));
	



	  
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
	  	}else if(quimpooo > 4 || quimpooo <= 8){
	  		analysis15 = "Sluggish flow of traffic";
	  	}else if(quimpooo > 8 || quimpooo >= 9){
	  		analysis15 = "Slow flow of traffic";
	  	}else if(quimpooo == 10){
	  		analysis15 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis15 = "Cannot compute"
	  	}

	  	let analysis16 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis16 = "Ecoland: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis16 = "Ecoland: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis16 = "Ecoland: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis16 = "Ecoland: Traffic stopped or Road closed"
	  	}else{
	  		analysis16 = "Cannot compute"
	  	}

	  	let analysis17 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis17 = "Tulip Dr: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis17 = "Tulip Dr: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis17 = "Tulip Drr: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis17 = "Tulip Dr: Traffic stopped or Road closed"
	  	}else{
	  		analysis17 = "Cannot compute"
	  	}

	  	let analysis18 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis18 = "Eco West Dr: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis18 = "Eco West Dr: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis18 = "Eco West Dr: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis18 = "Eco West Dr: Traffic stopped or Road closed"
	  	}else{
	  		analysis18 = "Cannot compute"
	  	}

	  	let analysis19 = "";
	  	if(jfc4 == 0 || jfc4 <=4){
	  		analysis19 = "Mac Arthur Hwy: Free flow of traffic";
	  	}else if(jfc4 > 4 || jfc4 <=8){
	  		analysis19 = "Mac Arthur Hwy: Sluggish flow of traffic";
	  	}else if(jfc4 > 8 || jfc4 >=9){
	  		analysis19 = "Mac Arthur Hwy: Slow flow of traffic";
	  	}else if(jfc4 == 10){
	  		analysis19 = "Mac Arthur Hwy: Traffic stopped or Road closed"
	  	}else{
	  		analysis19 = "Cannot compute"
	  	}

	  	

	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4,
    	analysis16:analysis16, analysis17:analysis17, analysis18:analysis18, analysis19:analysis19, analysis15: analysis15 }));
	



	  
	});


});


app.get('/quezonblvd-',function(_req, _res){

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
	  
	  	var quezon = jfc1 + jfc2 + jfc3 + jfc4 + jfc5;

	  	var quezonb = quezon/p;
	  	
	  	let analysis16 = "";
	  	if(quezonb == 0 || quezonb <= 4){
	  		analysis16 = "Free flow of traffic";
	  	}else if(quezonb > 4 || quezonb <= 8){
	  		analysis16 = "Sluggish flow of traffic";
	  	}else if(quezonb > 8 || quezonb >=9){
	  		analysis16 = "Slow flow of traffic";
	  	}else if(quezonb == 10){
	  		analysis16 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis16 = "Cannot compute"
	  	}

	  	let analysis17 = "";
	  	if(jfc1 == 0 || jfc1 <= 4){
	  		analysis17 = "Ecoland: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <= 8){
	  		analysis17 = "Ecoland: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis17 = "Ecoland: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis17 = "Ecoland: Traffic stopped or Road closed"
	  	}else{
	  		analysis17 = "Cannot compute"
	  	}

	  	let analysis18 = "";
	  	if(jfc2 == 0 || jfc2 <= 4){
	  		analysis18 = "G. Torres Ave Formerly Sandawa Rd: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <= 8){
	  		analysis18 = "G. Torres Ave Formerly Sandawa Rd: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis18 = "G. Torres Ave Formerly Sandawa Rd: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis18 = "G. Torres Ave Formerly Sandawa Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis18 = "Cannot compute"
	  	}

	  	let analysis19 = "";
	  	if(jfc3 == 0 || jfc3 <= 4){
	  		analysis19 = "Bolton Brg: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <= 8){
	  		analysis19 = "Bolton Brg: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis19 = "Bolton Brg: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis19 = "Bolton Brg: Traffic stopped or Road closed"
	  	}else{
	  		analysis19 = "Cannot compute"
	  	}

	  	let analysis20 = "";
	  	if(jfc4 == 0 || jfc4 <= 4){
	  		analysis20 = "Pichon St: Free flow of traffic";
	  	}else if(jfc4 > 4 || jfc4 <= 8){
	  		analysis20 = "Pichon St: Sluggish flow of traffic";
	  	}else if(jfc4 > 8 || jfc4 >=9){
	  		analysis20 = "Pichon St: Slow flow of traffic";
	  	}else if(jfc4 == 10){
	  		analysis20 = "Pichon St: Traffic stopped or Road closed"
	  	}else{
	  		analysis16 = "Cannot compute"
	  	}

	  	let analysis21 = "";
	  	if(jfc5 == 0 || jfc5 <= 4){
	  		analysis21 = "San Pedro St: Free flow of traffic";
	  	}else if(jfc5 > 4 || jfc5 <= 8){
	  		analysis21 = "San Pedro St: Sluggish flow of traffic";
	  	}else if(jfc5 > 8 || jfc5 >=9){
	  		analysis21 = "San Pedro St: Slow flow of traffic";
	  	}else if(jfc5 == 10){
	  		analysis21 = "San Pedro St: Traffic stopped or Road closed"
	  	}else{
	  		analysis21 = "Cannot compute"
	  	}

	  	

	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4, intc5: intc5, jfc5:jfc5, 
    		analysis17:analysis17, analysis18:analysis18, analysis19:analysis19, analysis20:analysis20, analysis21:analysis21, analysis16: analysis16 }));
	



	  
	});


});
app.get('/quezonblvd',function(_req, _res){

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
	  
	  	var quezonn = jfc1 + jfc2 + jfc3 + jfc4 + jfc5;

	  	var quezonnb = quezonn/p;
	  	
	  	let analysis17 = "";
	  	if(quezonnb == 0 || quezonnb <=4){
	  		analysis17 = "Free flow of traffic";
	  	}else if(quezonnb > 4 || quezonnb <=8){
	  		analysis17 = "Sluggish flow of traffic";
	  	}else if(quezonnb > 8 || quezonnb >=9){
	  		analysis17 = "Slow flow of traffic";
	  	}else if(quezonnb == 10){
	  		analysis17 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis17 = "Cannot compute"
	  	}

	  	let analysis18 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis18 = "San Pedro St: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis18 = "San Pedro St: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis18 = "San Pedro St: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis18 = "San Pedro St: Traffic stopped or Road closed"
	  	}else{
	  		analysis17 = "Cannot compute"
	  	}

	  	let analysis19 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis19 = "Pichon St: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis19 = "Pichon St: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis19 = "Pichon St: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis19 = "Pichon St: Traffic stopped or Road closed"
	  	}else{
	  		analysis19 = "Cannot compute"
	  	}

	  	let analysis20 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis20 = "Bolton Brg: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis20 = "Bolton Brg: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis20 = "Bolton Brg: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis20 = "Bolton Brg: Traffic stopped or Road closed"
	  	}else{
	  		analysis20 = "Cannot compute"
	  	}

	  	let analysis21 = "";
	  	if(jfc4 == 0 || jfc4 <=4){
	  		analysis21 = "G. Torres Ave Formerly Sandawa Rd: Free flow of traffic";
	  	}else if(jfc4 > 4 || jfc4 <=8){
	  		analysis21 = "G. Torres Ave Formerly Sandawa Rd: Sluggish flow of traffic";
	  	}else if(jfc4 > 8 || jfc4 >=9){
	  		analysis21 = "G. Torres Ave Formerly Sandawa Rd: Slow flow of traffic";
	  	}else if(jfc4 == 10){
	  		analysis21 = "G. Torres Ave Formerly Sandawa Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis17 = "Cannot compute"
	  	}

	  	let analysis22 = "";
	  	if(jfc5 == 0 || jfc5 <=4){
	  		analysis22 = "Ecoland: Free flow of traffic";
	  	}else if(jfc5 > 4 || jfc5 <=8){
	  		analysis22 = "Ecoland: Sluggish flow of traffic";
	  	}else if(jfc5 > 8 || jfc5 >=9){
	  		analysis22 = "Ecoland: Slow flow of traffic";
	  	}else if(jfc5 == 10){
	  		analysis22 = "Ecoland: Traffic stopped or Road closed"
	  	}else{
	  		analysis22 = "Cannot compute"
	  	}


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4, intc5: intc5, jfc5:jfc5, 
    		analysis18:analysis18, analysis19:analysis19, analysis20:analysis20, analysis21:analysis21, analysis22:analysis22, analysis17: analysis17 }));
	



	  
	});


});

app.get('/cabaguioave-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[23].DE;
	  	
	  	const intc1 = body.RWS[0].RW[23].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[23].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[23].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[23].FIS[0].FI[1].CF[0].JF;


	  	var p = 2
	  
	  	var cabaguio = jfc1 + jfc2;

	  	var cabaguioa = cabaguio/p;
	  	
	  	let analysis18 = "";
	  	if(cabaguioa == 0 || cabaguioa <=4){
	  		analysis18 = "Free flow of traffic";
	  	}else if(cabaguioa > 4 || cabaguioa <=8){
	  		analysis18 = "Sluggish flow of traffic";
	  	}else if(cabaguioa > 8 || cabaguioa >=9){
	  		analysis18 = "Slow flow of traffic";
	  	}else if(cabaguioa == 10){
	  		analysis18 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis18 = "Cannot compute"
	  	}

	  	let analysis19 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis19 = "Lapu-Lapu/R. Castillo/Dacudao: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis19 = "Lapu-Lapu/R. Castillo/Dacudao: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis19 = "Lapu-Lapu/R. Castillo/Dacudao: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis19 = "Lapu-Lapu/R. Castillo/Dacudao: Traffic stopped or Road closed"
	  	}else{
	  		analysis19 = "Cannot compute"
	  	}

	  	let analysis20 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis20 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis20 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis20 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis20 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis20 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, 
    		analysis19:analysis19, analysis20:analysis20, analysis18: analysis18 }));
	



	  
	});


});
app.get('/mlquezonblvd-',function(_req, _res){

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
	  
	  	var mlquezon = jfc1 + jfc2 + jfc3 + jfc4 + jfc5 + jfc6;

	  	var mlquezonb = mlquezon/p;
	  	
	  	let analysis19 = "";
	  	if(mlquezonb == 0 || mlquezonb <=4){
	  		analysis19 = "Free flow of traffic";
	  	}else if(mlquezonb > 4 || mlquezonb <=8){
	  		analysis19 = "Sluggish flow of traffic";
	  	}else if(mlquezonb > 8 || mlquezonb >=9){
	  		analysis19 = "Slow flow of traffic";
	  	}else if(mlquezonb == 10){
	  		analysis19 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis19 = "Cannot compute"
	  	}

	  	let analysis20 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis20 = "San Pedro St: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis20 = "San Pedro St: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis20 = "San Pedro St: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis20 = "San Pedro St: Traffic stopped or Road closed"
	  	}else{
	  		analysis20 = "Cannot compute"
	  	}


		let analysis21 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis21 = "A. Bonifacio St: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis21 = "A. Bonifacio St: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis21 = "A. Bonifacio St: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis21 = "A. Bonifacio St: Traffic stopped or Road closed"
	  	}else{
	  		analysis21 = "Cannot compute"
	  	}


		let analysis22 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis22 = "M. Roxas: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis22 = "M. Roxas: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis22 = "M. Roxas: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis22 = "M. Roxas: Traffic stopped or Road closed"
	  	}else{
	  		analysis22 = "Cannot compute"
	  	}


		let analysis23 = "";
	  	if(jfc4 == 0 || jfc4 <=4){
	  		analysis23 = "R. Magsaysay Ave: Free flow of traffic";
	  	}else if(jfc4 > 4 || jfc4 <=8){
	  		analysis23 = "R. Magsaysay Ave: Sluggish flow of traffic";
	  	}else if(jfc4 > 8 || jfc4 >=9){
	  		analysis23 = "R. Magsaysay Ave: Slow flow of traffic";
	  	}else if(jfc4 == 10){
	  		analysis23 = "R. Magsaysay Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis23 = "Cannot compute"
	  	}


		let analysis24 = "";
	  	if(jfc5 == 0 || jfc5 <=4){
	  		analysis24 = "Sta. Ana Ave: Free flow of traffic";
	  	}else if(jfc5 > 4 || jfc5 <=8){
	  		analysis24 = "Sta. Ana Ave: Sluggish flow of traffic";
	  	}else if(jfc5 > 8 || jfc5 >=9){
	  		analysis24 = "Sta. Ana Ave: Slow flow of traffic";
	  	}else if(jfc5 == 10){
	  		analysis24 = "Sta. Ana Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis24 = "Cannot compute"
	  	}


		let analysis25 = "";
	  	if(jfc6 == 0 || jfc6 <=4){
	  		analysis25 = "Lapu-Lapu/R. Castillo/Dacudao: Free flow of traffic";
	  	}else if(jfc6 > 4 || jfc6 <=8){
	  		analysis25 = "Lapu-Lapu/R. Castillo/Dacudao: Sluggish flow of traffic";
	  	}else if(jfc6 > 8 || jfc6 >=9){
	  		analysis25 = "Lapu-Lapu/R. Castillo/Dacudao: Slow flow of traffic";
	  	}else if(jfc6 == 10){
	  		analysis25 = "Lapu-Lapu/R. Castillo/Dacudao: Traffic stopped or Road closed"
	  	}else{
	  		analysis25 = "Cannot compute"
	  	}


	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2,  intc3: intc3, jfc3: jfc3,  intc4: intc4, jfc4: jfc4, intc5: intc5, jfc5: jfc5,  intc6: intc6, jfc6: jfc6, 
    		analysis20:analysis20, analysis21:analysis21, analysis22:analysis22, analysis23:analysis23, analysis24:analysis24, analysis25:analysis25, analysis19: analysis19 }));
	



	  
	});


});
app.get('/mlquezonblvd',function(_req, _res){

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
	  
	  	var mlquezonn = jfc1 + jfc2 + jfc3 + jfc4 + jfc5 + jfc6;

	  	var mlquezonnb = mlquezonn/p;
	  	
	  	let analysis20 = "";
	  	
	  	if(mlquezonnb == 0 || mlquezonnb <=4){
	  		analysis20 = "Free flow of traffic";
	  	}else if(mlquezonnb > 4 || mlquezonnb <=8){
	  		analysis20 = "Sluggish flow of traffic";
	  	}else if(mlquezonnb > 8 || mlquezonnb >=9){
	  		analysis20 = "Slow flow of traffic";
	  	}else if(mlquezonnb == 10){
	  		analysis20 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis20 = "Cannot compute"
	  	}

	  	let analysis21 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis21 = "Lapu-Lapu/R. Castillo/Dacudao: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis21 = "Lapu-Lapu/R. Castillo/Dacudao: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis21 = "Lapu-Lapu/R. Castillo/Dacudao: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis21 = "Lapu-Lapu/R. Castillo/Dacudao: Traffic stopped or Road closed"
	  	}else{
	  		analysis21 = "Cannot compute"
	  	}


		let analysis22 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis22 = "Sta. Ana Ave: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis22 = "Sta. Ana Ave: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis22 = "Sta. Ana Ave: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis22 = "Sta. Ana Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis22 = "Cannot compute"
	  	}


		let analysis23 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis23 = "R. Magsaysay Ave: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis23 = "R. Magsaysay Ave: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis23 = "R. Magsaysay Ave: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis23 = "R. Magsaysay Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis23 = "Cannot compute"
	  	}


		let analysis24 = "";
	  	if(jfc4 == 0 || jfc4 <=4){
	  		analysis24 = "M. Roxas: Free flow of traffic";
	  	}else if(jfc4 > 4 || jfc4 <=8){
	  		analysis24 = "M. Roxas: Sluggish flow of traffic";
	  	}else if(jfc4 > 8 || jfc4 >=9){
	  		analysis24 = "M. Roxas: Slow flow of traffic";
	  	}else if(jfc4 == 10){
	  		analysis24 = "M. Roxas: Traffic stopped or Road closed"
	  	}else{
	  		analysis24 = "Cannot compute"
	  	}


		let analysis25 = "";
	  	if(jfc5 == 0 || jfc5 <=4){
	  		analysis25 = "A. Bonifacio St: Free flow of traffic";
	  	}else if(jfc5 > 4 || jfc5 <=8){
	  		analysis25 = "A. Bonifacio St: Sluggish flow of traffic";
	  	}else if(jfc5 > 8 || jfc5 >=9){
	  		analysis25 = "A. Bonifacio St: Slow flow of traffic";
	  	}else if(jfc5 == 10){
	  		analysis25 = "A. Bonifacio St: Traffic stopped or Road closed"
	  	}else{
	  		analysis25 = "Cannot compute"
	  	}


		let analysis26 = "";
	  	if(jfc6 == 0 || jfc6 <=4){
	  		analysis26 = "San Pedro St: Free flow of traffic";
	  	}else if(jfc6 > 4 || jfc6 <=8){
	  		analysis26 = "San Pedro St: Sluggish flow of traffic";
	  	}else if(jfc6 > 8 || jfc6 >=9){
	  		analysis26 = "San Pedro St: Slow flow of traffic";
	  	}else if(jfc6 == 10){
	  		analysis26 = "San Pedro St: Traffic stopped or Road closed"
	  	}else{
	  		analysis26 = "Cannot compute"
	  	}

	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2,  intc3: intc3, jfc3: jfc3,  intc4: intc4, jfc4: jfc4, intc5: intc5, jfc5: jfc5,  intc6: intc6, jfc6: jfc6,
    	analysis21:analysis21, analysis22:analysis22,analysis23:analysis23,analysis24:analysis24,analysis25:analysis25,analysis26:analysis26,analysis20: analysis20 }));
	



	  
	});


});
app.get('/cabaguioave',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[20].DE;
	  	const intc1 = body.RWS[0].RW[20].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[20].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[20].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[20].FIS[0].FI[1].CF[0].JF;


	  	var p = 2
	  
	  	var cabaguioo = jfc1 + jfc2;

	  	var cabaguiooa = cabaguioo/p;
	  	
	  	let analysis21 = "";
	  	if(cabaguiooa == 0 || cabaguiooa <=4){
	  		analysis21 = "Free flow of traffic";
	  	}else if(cabaguiooa > 4 || cabaguiooa <=8){
	  		analysis21 = "Sluggish flow of traffic";
	  	}else if(cabaguiooa > 8 || cabaguiooa >= 9){
	  		analysis21 = "Slow flow of traffic";
	  	}else if(cabaguiooa == 10){
	  		analysis21 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis21 = "Cannot compute"
	  	}

	  	let analysis22 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis22 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis22 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis22 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis22 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis22 = "Cannot compute"
	  	}

	  	let analysis23 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis23 = "Lapu-Lapu/R. Castillo/Dacudao: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis23 = "Lapu-Lapu/R. Castillo/Dacudao: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis23 = "Lapu-Lapu/R. Castillo/Dacudao: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis23 = "Lapu-Lapu/R. Castillo/Dacudao: Traffic stopped or Road closed"
	  	}else{
	  		analysis23 = "Cannot compute"
	  	}


	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, 
    		analysis22:analysis22, analysis23:analysis23, analysis21: analysis21 }));
	



	  
	});


});

app.get('/dacudaoave-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[25].DE;
	  	const intc1 = body.RWS[0].RW[25].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[25].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[25].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[25].FIS[0].FI[1].CF[0].JF;


	  	var p = 2
	  
	  	var dacudao = jfc1 + jfc2;

	  	var dacudaoa = dacudao/p;
	  	
	  	let analysis22 = "";
	  	if(dacudaoa == 0 || dacudaoa <=4){
	  		analysis22 = "Free flow of traffic";
	  	}else if(dacudaoa > 4 || dacudaoa <=8){
	  		analysis22 = "Sluggish flow of traffic";
	  	}else if(dacudaoa > 8 || dacudaoa >=9){
	  		analysis22 = "Slow flow of traffic";
	  	}else if(dacudaoa == 10){
	  		analysis22 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis22 = "Cannot compute"
	  	}

	  	let analysis23 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis23 = "Lapu-Lapu/R. Castillo/L. Garcia/Agdao Flyover: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis23 = "Lapu-Lapu/R. Castillo/L. Garcia/Agdao Flyover: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis23 = "Lapu-Lapu/R. Castillo/L. Garcia/Agdao Flyover: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis23 = "Lapu-Lapu/R. Castillo/L. Garcia/Agdao Flyover: Traffic stopped or Road closed"
	  	}else{
	  		analysis23 = "Cannot compute"
	  	}


	  	let analysis24 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis24 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis24 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis24 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis24 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis24 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, 
    		analysis23:analysis23, analysis24:analysis24, analysis22: analysis22 }));
	



	  
	});


});
app.get('/dacudaoave',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[24].DE;
	  	const intc1 = body.RWS[0].RW[24].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[24].FIS[0].FI[0].CF[0].JF;
	  	
	  	const intc2 = body.RWS[0].RW[24].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[24].FIS[0].FI[1].CF[0].JF;


	  	var p = 2
	  
	  	var dacudaoo = jfc1 + jfc2;

	  	var dacudaooa = dacudaoo/p;
	  	
	  	let analysis23 = "";
	  	
	  	if(dacudaooa == 0 || dacudaooa <=4){
	  		analysis23 = "Free flow of traffic";
	  	}else if(dacudaooa > 4 || dacudaooa <=8){
	  		analysis23 = "Sluggish flow of traffic";
	  	}else if(dacudaooa > 8 || dacudaooa >=9){
	  		analysis23 = "Slow flow of traffic";
	  	}else if(dacudaooa == 10){
	  		analysis23 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis23 = "Cannot compute"
	  	}

	  	let analysis24 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis24 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis24 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis24 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis24 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis24 = "Cannot compute"
	  	}



	  	let analysis25 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis25 = "Lapu-Lapu/R. Castillo/L. Garcia/Agdao Flyover: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis25 = "Lapu-Lapu/R. Castillo/L. Garcia/Agdao Flyover: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis25 = "Lapu-Lapu/R. Castillo/L. Garcia/Agdao Flyover: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis25 = "Lapu-Lapu/R. Castillo/L. Garcia/Agdao Flyover: Traffic stopped or Road closed"
	  	}else{
	  		analysis25 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  intc2: intc2, jfc2: jfc2, 
    		analysis24:analysis24, analysis25:analysis25, analysis23: analysis23 }));
	



	  
	});


});
app.get('/pichonst-',function(_req, _res){

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
	  	}else if(pichons > 4 || pichons <=8){
	  		analysis24 = "Sluggish flow of traffic";
	  	}else if(pichons > 8 || pichons >=9){
	  		analysis24 = "Slow flow of traffic";
	  	}else if(pichons == 10){
	  		analysis24 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis24 = "Cannot compute"
	  	}

	  	let analysis25 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis25 = "F. Torres St: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis25 = "F. Torres St: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis25 = "F. Torres St: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis25 = "F. Torres St: Traffic stopped or Road closed"
	  	}else{
	  		analysis25 = "Cannot compute"
	  	}


	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, 
    		analysis25:analysis25, analysis24: analysis24 }));
	



	  
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
	  	}else if(sanpedroo > 4 || sanpedroo <=8){
	  		analysis26 = "Sluggish flow of traffic";
	  	}else if(sanpedroo > 8 || sanpedroo >=9){
	  		analysis26 = "Slow flow of traffic";
	  	}else if(sanpedroo == 10){
	  		analysis26 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis26 = "Cannot compute"
	  	}

	  	let analysis27 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis27 = "M. L. Quezon Blvd/Quezon Blvd: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis27 = "M. L. Quezon Blvd/Quezon Blvd: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis27 = "M. L. Quezon Blvd/Quezon Blvd: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis27 = "M. L. Quezon Blvd/Quezon Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis27 = "Cannot compute"
	  	}

	  	let analysis28 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis28 = "C. M. Recto: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis28 = "C. M. Recto: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis28 = "C. M. Recto: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis28 = "C. M. Recto: Traffic stopped or Road closed"
	  	}else{
	  		analysis28 = "Cannot compute"
	  	}

	  	let analysis29 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis29 = "E. Quirino Ave: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis29 = "E. Quirino Ave: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis29 = "E. Quirino Ave: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis29 = "E. Quirino Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis29 = "Cannot compute"
	  	}

	  	let analysis30 = "";
	  	if(jfc4 == 0 || jfc4 <=4){
	  		analysis30 = "Free flow of traffic";
	  	}else if(jfc4 > 4 || jfc4 <=8){
	  		analysis30 = "Sluggish flow of traffic";
	  	}else if(jfc4 > 8 || jfc4 >=9){
	  		analysis30 = "Slow flow of traffic";
	  	}else if(jfc4 == 10){
	  		analysis30 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis30 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4, 
    		analysis27:analysis27, analysis28:analysis28, analysis29:analysis29, analysis26: analysis26 }));
	



	  
	});


});

app.get('/ftorresst-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[32].DE;
	  	const intc1 = body.RWS[0].RW[32].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[32].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[32].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[32].FIS[0].FI[1].CF[0].JF;

	
	  	var p = 2
	  
	  	var tor = jfc1 + jfc2 ;

	  	var torress = tor/p;
	  	
	  	let analysis28 = "";
	  	if(torress == 0 || torress <=4){
	  		analysis28 = "Free flow of traffic";
	  	}else if(torress > 4 || torress <=8){
	  		analysis28 = "Sluggish flow of traffic";
	  	}else if(torress > 8 || torress >=9){
	  		analysis28 = "Slow flow of traffic";
	  	}else if(torress == 10){
	  		analysis28 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis28 = "Cannot compute"
	  	}

	  	let analysis29 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis29 = "Father Selga St: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis29 = "Father Selga St: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis29 = "Father Selga St: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis29 = "Father Selga St: Traffic stopped or Road closed"
	  	}else{
	  		analysis29 = "Cannot compute"
	  	}

		let analysis30 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis30 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis30 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis30 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis30 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis30 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, 
    		analysis29:analysis29, analysis30:analysis30, analysis28: analysis28 }));
	



	  
	});


});
app.get('/abonifaciost-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[33].DE;
	  	const intc1 = body.RWS[0].RW[33].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[33].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[33].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[33].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[33].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[33].FIS[0].FI[2].CF[0].JF;

	
	  	var p = 3
	  
	  	var boni = jfc1 + jfc2 + jfc3;

	  	var bonifac = boni/p;
	  	
	  	let analysis29 = "";
	  	if(bonifac == 0 || bonifac <=4){
	  		analysis29 = "Free flow of traffic";
	  	}else if(bonifac > 4 || bonifac <=8){
	  		analysis29 = "Sluggish flow of traffic";
	  	}else if(bonifac > 8 || bonifac >=9){
	  		analysis29 = "Slow flow of traffic";
	  	}else if(bonifac == 10){
	  		analysis29 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis29 = "Cannot compute"
	  	}

	  	let analysis30 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis30 = "M. L. Quezon Blvd: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis30 = "M. L. Quezon Blvd: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis30 = "M. L. Quezon Blvd: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis30 = "M. L. Quezon Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis30 = "Cannot compute"
	  	}

	  	let analysis31 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis31 = "C. M. Recto: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis31 = "C. M. Recto: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis31 = "C. M. Recto: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis31 = "C. M. Recto: Traffic stopped or Road closed"
	  	}else{
	  		analysis31 = "Cannot compute"
	  	}

	  	let analysis32 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis32 = "C. Bangoy: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis32 = "C. Bangoy: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis32 = "C. Bangoy: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis32 = "C. Bangoy: Traffic stopped or Road closed"
	  	}else{
	  		analysis32 = "Cannot compute"
	  	}

	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3,
    	analysis30:analysis30, analysis31:analysis31, analysis32:analysis32, analysis29: analysis29 }));
	



	  
	});


});
app.get('/ftorresst',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[30].DE;
	  	const intc1 = body.RWS[0].RW[30].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[30].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[30].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[30].FIS[0].FI[1].CF[0].JF;
	
	  	var p = 2
	  
	  	var torr = jfc1 + jfc2 ;

	  	var torresss = torr/p;
	  	
	  	let analysis30 = "";
	  	if(torresss == 0 || torresss <=4){
	  		analysis30 = "Free flow of traffic";
	  	}else if(torresss > 4 || torresss <=8){
	  		analysis30 = "Sluggish flow of traffic";
	  	}else if(torresss > 8 || torresss >=9){
	  		analysis30 = "Slow flow of traffic";
	  	}else if(torresss == 10){
	  		analysis30 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis30 = "Cannot compute"
	  	}


	  	let analysis31 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis31 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis31 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis31 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis31 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis31 = "Cannot compute"
	  	}

		let analysis32 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis32 = "Father Selga St: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis32 = "Father Selga St: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis32 = "Father Selga St: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis32 = "Father Selga St: Traffic stopped or Road closed"
	  	}else{
	  		analysis32 = "Cannot compute"
	  	}


	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, 
    		analysis31:analysis31, analysis32:analysis32, analysis30: analysis30 }));
	  
	});


});
app.get('/abonifaciost',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[31].DE;
	  	const intc1 = body.RWS[0].RW[31].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[31].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[31].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[31].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[31].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[31].FIS[0].FI[2].CF[0].JF;
	
	  	var p = 3
	  
	  	var bon = jfc1 + jfc2 + jfc3;

	  	var bonifacioo = bon/p;
	  	
	  	let analysis31 = "";
	  	if(bonifacioo == 0 || bonifacioo <=4){
	  		analysis31 = "Free flow of traffic";
	  	}else if(bonifacioo > 4 || bonifacioo <=8){
	  		analysis31 = "Sluggish flow of traffic";
	  	}else if(bonifacioo > 8 || bonifacioo >=9){
	  		analysis31 = "Slow flow of traffic";
	  	}else if(bonifacioo == 10){
	  		analysis31 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis31 = "Cannot compute"
	  	}

	  	let analysis32 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis32 = "C. Bangoy: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis32 = "C. Bangoy: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis32 = "C. Bangoy: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis32 = "C. Bangoy: Traffic stopped or Road closed"
	  	}else{
	  		analysis32 = "Cannot compute"
	  	}

	  	let analysis33 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis33 = "C. M. Recto: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis33 = "C. M. Recto: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis33 = "C. M. Recto: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis33 = "C. M. Recto: Traffic stopped or Road closed"
	  	}else{
	  		analysis31 = "Cannot compute"
	  	}

	  	let analysis34 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis34 = "M. L. Quezon Blvd: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis34 = "M. L. Quezon Blvd: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis34 = "M. L. Quezon Blvd: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis34 = "M. L. Quezon Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis34 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, 
    		analysis32:analysis32, analysis33:analysis33, analysis34:analysis34, analysis31: analysis31 }));
	  
	});


});

app.get('/pichonst',function(_req, _res){

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
	  	}else if(pichonns > 4 || pichonns <=8){
	  		analysis25 = "Sluggish flow of traffic";
	  	}else if(pichonns > 8 || pichonns >=9){
	  		analysis25 = "Slow flow of traffic";
	  	}else if(pichonns == 10){
	  		analysis25 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis25 = "Cannot compute"
	  	}

	  	let analysis26 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis25 = "F. Torres St: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis26 = "F. Torres St: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis26 = "F. Torres St: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis26 = "F. Torres St: Traffic stopped or Road closed"
	  	}else{
	  		analysis26 = "Cannot compute"
	  	}

	  	let analysis27 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis27 = "Davao City: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis27 = "Davao City: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis27 = "Davao City: Slow flow of traffic";
	  	}else if(pichonns == 10){
	  		analysis27 = "Davao City: Traffic stopped or Road closed"
	  	}else{
	  		analysis27 = "Cannot compute"
	  	}

	  	let analysis28 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis28 = "E. Quirino Ave: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis28 = "E. Quirino Ave: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis28 = "E. Quirino Ave: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis28 = "E. Quirino Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis28 = "Cannot compute"
	  	}

	  	let analysis29 = "";
	  	if(jfc4 == 0 || jfc4 <=4){
	  		analysis29 = "C. M. Recto: Free flow of traffic";
	  	}else if(jfc4 > 4 || jfc4 <=8){
	  		analysis29 = "C. M. Recto: Sluggish flow of traffic";
	  	}else if(jfc4 > 8 || jfc4 >=9){
	  		analysis29 = "C. M. Recto: Slow flow of traffic";
	  	}else if(jfc4 == 10){
	  		analysis29 = "C. M. Recto: Traffic stopped or Road closed"
	  	}else{
	  		analysis29 = "Cannot compute"
	  	}

	  	let analysis30 = "";
	  	if(jfc5 == 0 || jfc5 <=4){
	  		analysis30 = "Quezon Blvd: Free flow of traffic";
	  	}else if(jfc5 > 4 || jfc5 <=8){
	  		analysis30 = "Quezon Blvd: Sluggish flow of traffic";
	  	}else if(jfc5 > 8 || jfc5 >=9){
	  		analysis30 = "Quezon Blvd: Slow flow of traffic";
	  	}else if(jfc5 == 10){
	  		analysis30 = "Quezon Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis30 = "Cannot compute"
	  	}

	  	
	  	


	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4, intc5: intc5, jfc5: jfc5, 
    		analysis26:analysis26, analysis27:analysis27, analysis28:analysis28, analysis29:analysis29, analysis30:analysis30, analysis25: analysis25 }));
	



	  
	});


});
app.get('/mroxas',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[35].DE;
	  	const intc1 = body.RWS[0].RW[35].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[35].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[35].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[35].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[35].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[35].FIS[0].FI[2].CF[0].JF;
	
	  	var p = 3
	  
	  	var rox = jfc1 + jfc2 + jfc3;

	  	var roxa = rox/p;
	  	
	  	let analysis32 = "";
	  	if(roxa == 0 || roxa <=4){
	  		analysis32 = "Free flow of traffic";
	  	}else if(roxa > 4 || roxa <=8){
	  		analysis32 = "Sluggish flow of traffic";
	  	}else if(roxa > 8 || roxa >=9){
	  		analysis32 = "Slow flow of traffic";
	  	}else if(roxa == 10){
	  		analysis32 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis32 = "Cannot compute"
	  	}

	  	let analysis33 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis33 = "R. Magsaysay Ave/C. Bangoy: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis33 = "R. Magsaysay Ave/C. Bangoy: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || roxa >=9){
	  		analysis33 = "R. Magsaysay Ave/C. Bangoy: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis33 = "R. Magsaysay Ave/C. Bangoy: Traffic stopped or Road closed"
	  	}else{
	  		analysis33 = "Cannot compute"
	  	}

	  	let analysis34 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis34 = "C. M. Recto: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis34 = "C. M. Recto: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis34 = "C. M. Recto: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis34 = "C. M. Recto: Traffic stopped or Road closed"
	  	}else{
	  		analysis34 = "Cannot compute"
	  	}

	  	let analysis35 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis35 = "M. L. Quezon Blvd: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis35 = "M. L. Quezon Blvd: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis35 = "M. L. Quezon Blvd: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis35 = "M. L. Quezon Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis35 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, 
    		analysis33:analysis33, analysis34:analysis34, analysis35:analysis35, analysis32: analysis32 }));
	  
	});


});
app.get('/mroxas-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[34].DE;
	  	const intc1 = body.RWS[0].RW[34].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[34].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[34].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[34].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[34].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[34].FIS[0].FI[2].CF[0].JF;
	
	  	var p = 3
	  
	  	var roxx = jfc1 + jfc2 + jfc3;

	  	var roxxas = roxx/p;
	  	
	  	let analysis33 = "";
	  	if(roxxas == 0 || roxxas <=4){
	  		analysis33 = "Free flow of traffic";
	  	}else if(roxxas > 4 || roxxas <=8){
	  		analysis33 = "Sluggish flow of traffic";
	  	}else if(roxxas > 8 || roxxas >=9){
	  		analysis33 = "Slow flow of traffic";
	  	}else if(roxxas == 10){
	  		analysis33 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis33 = "Cannot compute"
	  	}

	  	let analysis34 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis34 = "M. L. Quezon Blvd: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis34 = "M. L. Quezon Blvd: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis34 = "M. L. Quezon Blvd: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis34 = "M. L. Quezon Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis34 = "Cannot compute"
	  	}

	  	let analysis35 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis35 = "C. M. Recto: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis35 = "C. M. Recto: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis35 = "C. M. Recto: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis35 = "C. M. Recto: Traffic stopped or Road closed"
	  	}else{
	  		analysis35 = "Cannot compute"
	  	}

	  	let analysis36 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis36 = "R. Magsaysay Ave/C. Bangoy: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis36 = "R. Magsaysay Ave/C. Bangoy: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis36 = "R. Magsaysay Ave/C. Bangoy: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis36 = "R. Magsaysay Ave/C. Bangoy: Traffic stopped or Road closed"
	  	}else{
	  		analysis36 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, 
    		analysis34:analysis34, analysis35:analysis35, analysis36:analysis36, analysis33: analysis33 }));
	  
	});


});

app.get('/jplaureloutgmall-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[37].DE;
	  	const intc1 = body.RWS[0].RW[37].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[37].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[37].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[37].FIS[0].FI[1].CF[0].JF;
	
	  	var p = 2
	  
	  	var jplau = jfc1 + jfc2 ;

	  	var jplaur = jplau/p;
	  	
	  	let analysis34 = "";
	  	if(jplaur == 0 || jplaur <=4){
	  		analysis34 = "Free flow of traffic";
	  	}else if(jplaur > 4 || jplaur <=8){
	  		analysis34 = "Sluggish flow of traffic";
	  	}else if(jplaur > 8 || jplaur >=9){
	  		analysis34 = "Slow flow of traffic";
	  	}else if(jplaur == 10){
	  		analysis34 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis34 = "Cannot compute"
	  	}

	  	let analysis35 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis35 = "R. Magsaysay Ave: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis35 = "R. Magsaysay Ave: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis35 = "R. Magsaysay Ave: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis35 = "R. Magsaysay Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis35 = "Cannot compute"
	  	}

	  	let analysis36 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis36 = "E. Quirino Ave/Sta. Ana Ave: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis36 = "E. Quirino Ave/Sta. Ana Ave: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis36 = "E. Quirino Ave/Sta. Ana Ave: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis36 = "E. Quirino Ave/Sta. Ana Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis36 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2,
    	analysis35:analysis35, analysis36:analysis36, analysis34: analysis34 }));
	  
	});


});
app.get('/jplaureloutgmall',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[36].DE;
	  	const intc1 = body.RWS[0].RW[36].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[36].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[36].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[36].FIS[0].FI[1].CF[0].JF;
	
	  	var p = 2
	  
	  	var jplaure = jfc1 + jfc2 ;

	  	var jplaurell = jplaure/p;
	  	
	  	let analysis35 = "";
	  	
	  	if(jplaurell == 0 || jplaurell <=4){
	  		analysis35 = "Free flow of traffic";
	  	}else if(jplaurell > 4 || jplaurell <=8){
	  		analysis35 = "Sluggish flow of traffic";
	  	}else if(jplaurell > 8 || jplaurell >=9){
	  		analysis35 = "Slow flow of traffic";
	  	}else if(jplaurell == 10){
	  		analysis35 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis35 = "Cannot compute"
	  	}

	  	let analysis36 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis36 = "E. Quirino Ave/Sta. Ana Ave: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis36 = "E. Quirino Ave/Sta. Ana Ave: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis36 = "E. Quirino Ave/Sta. Ana Ave: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis36 = "E. Quirino Ave/Sta. Ana Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis36 = "Cannot compute"
	  	}


	  	let analysis37 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis37 = "R. Magsaysay Ave: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis37 = "R. Magsaysay Ave: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis37 = "R. Magsaysay Ave: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis37 = "R. Magsaysay Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis37 = "Cannot compute"
	  	}


	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, 
    		analysis36:analysis36, analysis37:analysis37, analysis35: analysis35 }));
	  
	});


});

app.get('/cmrecto',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[38].DE;
	  	const intc1 = body.RWS[0].RW[38].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[38].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[38].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[38].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[38].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[38].FIS[0].FI[2].CF[0].JF;

	  	const intc4 = body.RWS[0].RW[38].FIS[0].FI[3].TMC.DE;
	  	const jfc4 = body.RWS[0].RW[38].FIS[0].FI[3].CF[0].JF;

	  	const intc5 = body.RWS[0].RW[38].FIS[0].FI[4].TMC.DE;
	  	const jfc5 = body.RWS[0].RW[38].FIS[0].FI[4].CF[0].JF;
	
	  	var p = 5
	  
	  	var cmrec = jfc1 + jfc2 + jfc3 + jfc4 + jfc5;

	  	var cmrect = cmrec/p;
	  	
	  	let analysis36 = "";
	  	if(cmrect == 0 || cmrect <=4){
	  		analysis36 = "Free flow of traffic";
	  	}else if(cmrect > 4 || cmrect <=8){
	  		analysis36 = "Sluggish flow of traffic";
	  	}else if(cmrect > 8 || cmrect >=9){
	  		analysis36 = "Slow flow of traffic";
	  	}else if(cmrect == 10){
	  		analysis36 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis36 = "Cannot compute"
	  	}

	  	let analysis37 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis37 = "Pichon St: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis37 = "Pichon St: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis37 = "Pichon St: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis37 = "Pichon St: Traffic stopped or Road closed"
	  	}else{
	  		analysis37 = "Cannot compute"
	  	}

	  	let analysis38 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis38 = "San Pedro St: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis38 = "San Pedro St: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis38 = "San Pedro St: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis38 = "San Pedro St: Traffic stopped or Road closed"
	  	}else{
	  		analysis38 = "Cannot compute"
	  	}

	  	let analysis39 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis39 = "A. Bonifacio St: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis39 = "A. Bonifacio St: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis39 = "A. Bonifacio St: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis39 = "A. Bonifacio St: Traffic stopped or Road closed"
	  	}else{
	  		analysis39 = "Cannot compute"
	  	}

	  	let analysis40 = "";
	  	if(jfc4 == 0 || jfc4 <=4){
	  		analysis40 = "M. Roxas: Free flow of traffic";
	  	}else if(jfc4 > 4 || jfc4 <=8){
	  		analysis40 = "M. Roxas: Sluggish flow of traffic";
	  	}else if(jfc4 > 8 || jfc4 >=9){
	  		analysis40 = "M. Roxas: Slow flow of traffic";
	  	}else if(jfc4 == 10){
	  		analysis40 = "M. Roxas: Traffic stopped or Road closed"
	  	}else{
	  		analysis40 = "Cannot compute"
	  	}

	  	let analysis41 = "";
	  	if(jfc5 == 0 || jfc5 <=4){
	  		analysis41 = "R. Magsaysay Ave: Free flow of traffic";
	  	}else if(jfc5 > 4 || jfc5 <=8){
	  		analysis41 = "R. Magsaysay Ave: Sluggish flow of traffic";
	  	}else if(jfc5 > 8 || jfc5 >=9){
	  		analysis41 = "R. Magsaysay Ave: Slow flow of traffic";
	  	}else if(jfc5 == 10){
	  		analysis41 = "R. Magsaysay Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis41 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4, intc5: intc5, jfc5: jfc5,
    	analysis37:analysis37,analysis38:analysis38,analysis39:analysis39,analysis40:analysis40, analysis41:analysis41, analysis36: analysis36 }));
	  
	});


});
app.get('/cbangoy',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[39].DE;
	  	const intc1 = body.RWS[0].RW[39].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[39].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[39].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[39].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[39].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[39].FIS[0].FI[2].CF[0].JF;
	
	  	var p = 3
	  
	  	var cban = jfc1 + jfc2 + jfc3 ;

	  	var cbango = cban/p;
	  	
	  	let analysis37 = "";
	  	if(cbango == 0 || cbango <=4){
	  		analysis37 = "Free flow of traffic";
	  	}else if(cbango > 4 || cbango <=8){
	  		analysis37 = "Sluggish flow of traffic";
	  	}else if(cbango > 8 || cbango >=9){
	  		analysis37 = "Slow flow of traffic";
	  	}else if(cbango == 10){
	  		analysis37 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis37 = "Cannot compute"
	  	}

	  	let analysis38 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis38 = "E. Quirino Ave: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis38 = "E. Quirino Ave: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis38 = "E. Quirino Ave: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis38 = "E. Quirino Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis38 = "Cannot compute"
	  	}

	  	let analysis39 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis39 = "M. Roxas/R. Magsaysay Ave: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis39 = "M. Roxas/R. Magsaysay Ave: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis39 = "M. Roxas/R. Magsaysay Ave: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis39 = "M. Roxas/R. Magsaysay Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis39 = "Cannot compute"
	  	}

	  	let analysis40 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis40 = "A. Bonifacio St: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis40 = "A. Bonifacio St: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis40 = "A. Bonifacio St: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis40 = "A. Bonifacio St: Traffic stopped or Road closed"
	  	}else{
	  		analysis40 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, 
    		analysis38:analysis38, analysis39:analysis39, analysis40:analysis40, analysis37: analysis37 }));
	  
	});


});

app.get('/cbangoy-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[40].DE;
	  	const intc1 = body.RWS[0].RW[40].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[40].FIS[0].FI[0].CF[0].JF;

	  	var p = 1
	  
	  	var cbann = jfc1  ;

	  	var cbanngoy = cbann/p;
	  	
	  	let analysis38 = "";
	  	if(cbanngoy == 0 || cbanngoy <=4){
	  		analysis38 = "Free flow of traffic";
	  	}else if(cbanngoy > 4 || cbanngoy <=8){
	  		analysis38 = "Sluggish flow of traffic";
	  	}else if(cbanngoy > 8 || cbanngoy >=9){
	  		analysis38 = "Slow flow of traffic";
	  	}else if(cbanngoy == 10){
	  		analysis38 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis38 = "Cannot compute"
	  	}

	  	let analysis39 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis39 = "E. Quirino Ave: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis39 = "E. Quirino Ave: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis39 = "E. Quirino Ave: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis39 = "E. Quirino Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis39 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, 
    		analysis39:analysis39, analysis38: analysis38 }));
	  
	});


});

app.get('/rmagsaysay',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[41].DE;
	  	const intc1 = body.RWS[0].RW[41].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[41].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[41].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[41].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[41].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[41].FIS[0].FI[2].CF[0].JF;

	  	var p = 3
	  
	  	var rmag = jfc1 + jfc2 + jfc3;

	  	var rmagsay = rmag/p;
	  	
	  	let analysis39 = "";
	  	if(rmagsay == 0 || rmagsay <=4){
	  		analysis39 = "Free flow of traffic";
	  	}else if(rmagsay > 4 || rmagsay <=8){
	  		analysis39 = "Sluggish flow of traffic";
	  	}else if(rmagsay > 8 || rmagsay >=9){
	  		analysis39 = "Slow flow of traffic";
	  	}else if(rmagsay == 10){
	  		analysis39 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis39 = "Cannot compute"
	  	}

	  	let analysis40 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis40 = "M. L. Quezon Blvd: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis40 = "M. L. Quezon Blvd: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis40 = "M. L. Quezon Blvd: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis40 = "M. L. Quezon Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis40 = "Cannot compute"
	  	}

	  	let analysis41 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis41 = "C. M. Recto/J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis41 = "C. M. Recto/J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis41 = "C. M. Recto/J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis41 = "C. M. Recto/J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis41 = "Cannot compute"
	  	}

	  	let analysis42 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis42 = "C. Bangoy/M. Roxas: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis42 = "C. Bangoy/M. Roxas: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis42 = "C. Bangoy/M. Roxas: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis42 = "C. Bangoy/M. Roxas: Traffic stopped or Road closed"
	  	}else{
	  		analysis42 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3,
    	analysis40:analysis40, analysis41:analysis41, analysis42:analysis42, analysis39: analysis39 }));
	  
	});


});

app.get('/rmagsaysay-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[42].DE;
	  	const intc1 = body.RWS[0].RW[42].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[42].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[42].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[42].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[42].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[42].FIS[0].FI[2].CF[0].JF;

	  	var p = 3
	  
	  	var rmags = jfc1 + jfc2 + jfc3;

	  	var rmagsaysa = rmags/p;
	  	
	  	let analysis40 = "";
	  	
	  	if(rmagsaysa == 0 || rmagsaysa <=4){
	  		analysis40 = "Free flow of traffic";
	  	}else if(rmagsaysa > 4 || rmagsaysa <=8){
	  		analysis40 = "Sluggish flow of traffic";
	  	}else if(rmagsaysa > 8 || rmagsaysa >=9){
	  		analysis40 = "Slow flow of traffic";
	  	}else if(rmagsaysa == 10){
	  		analysis40 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis40 = "Cannot compute"
	  	}

	  	let analysis41 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis41 = "C. Bangoy/M. Roxas: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis41 = "C. Bangoy/M. Roxas: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis41 = "C. Bangoy/M. Roxas: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis41 = "C. Bangoy/M. Roxas: Traffic stopped or Road closed"
	  	}else{
	  		analysis41 = "Cannot compute"
	  	}

	  	let analysis42 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis42 = "C. M. Recto/J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis42 = "C. M. Recto/J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis42 = "C. M. Recto/J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis42 = "C. M. Recto/J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis42 = "Cannot compute"
	  	}

	  	let analysis43 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis43 = "M. L. Quezon Blvd: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis43 = "M. L. Quezon Blvd: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis43 = "M. L. Quezon Blvd: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis43 = "M. L. Quezon Blvd: Traffic stopped or Road closed"
	  	}else{
	  		analysis43 = "Cannot compute"
	  	}

	  	

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3,
    	analysis41:analysis41, analysis42:analysis42, analysis43:analysis43, analysis40: analysis40 }));
	  
	});


});

app.get('/staanaave',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[43].DE;
	  	const intc1 = body.RWS[0].RW[43].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[43].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[43].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[43].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[43].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[43].FIS[0].FI[2].CF[0].JF;

	  	var p = 3
	  
	  	var staa = jfc1 + jfc2 + jfc3;

	  	var staana = staa/p;
	  	
	  	let analysis41 = "";
	  	if(staana == 0 || staana <=4){
	  		analysis41 = "Free flow of traffic";
	  	}else if(staana > 4 || staana <=8){
	  		analysis41 = "Sluggish flow of traffic";
	  	}else if(staana > 8 || staana >=9){
	  		analysis41 = "Slow flow of traffic";
	  	}else if(staana == 10){
	  		analysis41 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis41 = "Cannot compute"
	  	}

	  	let analysis42 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis42 = "L. Garcia: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis42 = "L. Garcia: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis42 = "L. Garcia: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis42 = "L. Garcia: Traffic stopped or Road closed"
	  	}else{
	  		analysis42 = "Cannot compute"
	  	}

	  	let analysis43 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis43 = "Lapu-Lapu: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis43 = "Lapu-Lapu: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis43 = "Lapu-Lapu: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis43 = "Lapu-Lapu: Traffic stopped or Road closed"
	  	}else{
	  		analysis43 = "Cannot compute"
	  	}

	  	let analysis44 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis44 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis44 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis44 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis44 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis44 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, 
    		analysis42:analysis42, analysis43:analysis43, analysis44:analysis44, analysis41: analysis41 }));
	  
	});


});
app.get('/staanaave-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[44].DE;
	  	const intc1 = body.RWS[0].RW[44].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[44].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[44].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[44].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[44].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[44].FIS[0].FI[2].CF[0].JF;

	  	var p = 3
	  
	  	var staan = jfc1 + jfc2 + jfc3;

	  	var staanaav = staan/p;
	  	
	  	let analysis42 = "";
	  	if(staanaav == 0 || staanaav <=4){
	  		analysis42 = "Free flow of traffic";
	  	}else if(staanaav > 4 || staanaav <=8){
	  		analysis42 = "Sluggish flow of traffic";
	  	}else if(staanaav > 8 || staanaav >=9){
	  		analysis42 = "Slow flow of traffic";
	  	}else if(staanaav == 10){
	  		analysis42 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis42 = "Cannot compute"
	  	}

	  	let analysis43 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis43 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis43 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis43 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis43 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis43 = "Cannot compute"
	  	}

	  	let analysis44 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis44 = "Lapu-Lapu: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis44 = "Lapu-Lapu: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis44 = "Lapu-Lapu: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis44 = "Lapu-Lapu: Traffic stopped or Road closed"
	  	}else{
	  		analysis44 = "Cannot compute"
	  	}

	  	let analysis45 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis45 = "L. Garcia: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis45 = "L. Garcia: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis45 = "L. Garcia: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis45 = "L. Garcia: Traffic stopped or Road closed"
	  	}else{
	  		analysis45 = "Cannot compute"
	  	}

	  	

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, 
    		analysis43:analysis43, analysis44:analysis44, analysis45:analysis45, analysis42: analysis42 }));
	  
	});


});
app.get('/lapulapu',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[45].DE;
	  	const intc1 = body.RWS[0].RW[45].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[45].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[45].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[45].FIS[0].FI[1].CF[0].JF;


	  	var p = 2
	  
	  	var lap = jfc1 + jfc2 ;

	  	var lapu = lap/p;
	  	
	  	let analysis43 = "";
	  	if(lapu == 0 || lapu <=4){
	  		analysis43 = "Free flow of traffic";
	  	}else if(lapu > 4 || lapu <=8){
	  		analysis43 = "Sluggish flow of traffic";
	  	}else if(lapu > 8 || lapu >=9){
	  		analysis43 = "Slow flow of traffic";
	  	}else if(lapu == 10){
	  		analysis43 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis43 = "Cannot compute"
	  	}

	  	let analysis44 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis44 = "Dacudao/L. Garcia/Agdao Flyover: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis44 = "Dacudao/L. Garcia/Agdao Flyover: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis44 = "Dacudao/L. Garcia/Agdao Flyover: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis44 = "Dacudao/L. Garcia/Agdao Flyover: Traffic stopped or Road closed"
	  	}else{
	  		analysis44 = "Cannot compute"
	  	}

	  	let analysis45 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis45 = "Sta. Ana Ave: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis45 = "Sta. Ana Ave: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis45 = "Sta. Ana Ave: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis45 = "Sta. Ana Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis45 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2,
    	analysis44:analysis44, analysis45:analysis45, analysis43: analysis43 }));
	  
	});


});

app.get('/agdaoflyover',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[46].DE;
	  	const intc1 = body.RWS[0].RW[46].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[46].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[46].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[46].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[46].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[46].FIS[0].FI[2].CF[0].JF;


	  	var p = 3
	  
	  	var agd = jfc1 + jfc2 + jfc3;

	  	var agda = agd/p;
	  	
	  	let analysis44 = "";
	  	if(agda == 0 || agda <=4){
	  		analysis44 = "Free flow of traffic";
	  	}else if(agda > 4 || agda <=8){
	  		analysis44 = "Sluggish flow of traffic";
	  	}else if(agda > 8 || agda >=9){
	  		analysis44 = "Slow flow of traffic";
	  	}else if(agda == 10){
	  		analysis44 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis44 = "Cannot compute"
	  	}

	  	let analysis45 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis45 = "L. Garcia (North): Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis45 = "L. Garcia (North): Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis45 = "L. Garcia (North): Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis45 = "L. Garcia (North): Traffic stopped or Road closed"
	  	}else{
	  		analysis45 = "Cannot compute"
	  	}

	  	let analysis46 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis46 = "Lapu-Lapu/L. Garcia/R. Castillo/Dacudao: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis46 = "Lapu-Lapu/L. Garcia/R. Castillo/Dacudao: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis46 = "Lapu-Lapu/L. Garcia/R. Castillo/Dacudao: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis46 = "Lapu-Lapu/L. Garcia/R. Castillo/Dacudao: Traffic stopped or Road closed"
	  	}else{
	  		analysis46 = "Cannot compute"
	  	}

	  	let analysis47 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis47 = "L. Garcia (South): Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis47 = "L. Garcia (South): Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis47 = "L. Garcia (South): Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis47 = "L. Garcia (South): Traffic stopped or Road closed"
	  	}else{
	  		analysis47 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, 
    		analysis45:analysis45, analysis46:analysis46, analysis47:analysis47, analysis44: analysis44 }));
	  
	});


});
app.get('/lapulapu-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[47].DE;
	  	const intc1 = body.RWS[0].RW[47].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[47].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[47].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[47].FIS[0].FI[1].CF[0].JF;


	  	var p = 2
	  
	  	var lapuu = jfc1 + jfc2 ;

	  	var lapuulap = lapuu/p;
	  	
	  	let analysis45 = "";
	  	if(lapuulap == 0 || lapuulap <=4){
	  		analysis45 = "Free flow of traffic";
	  	}else if(lapuulap > 4 || lapuulap <=8){
	  		analysis45 = "Sluggish flow of traffic";
	  	}else if(lapuulap > 8 || lapuulap >=9){
	  		analysis45 = "Slow flow of traffic";
	  	}else if(lapuulap == 10){
	  		analysis45 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis45 = "Cannot compute"
	  	}

	  	let analysis46 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis46 = "Sta. Ana Ave: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis46 = "Sta. Ana Ave: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis46 = "Sta. Ana Ave: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis46 = "Sta. Ana Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis46 = "Cannot compute"
	  	}

	  	let analysis47 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis47 = "Dacudao/L. Garcia/Agdao Flyover: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis47 = "Dacudao/L. Garcia/Agdao Flyover: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis47 = "Dacudao/L. Garcia/Agdao Flyover: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis47 = "Dacudao/L. Garcia/Agdao Flyover: Traffic stopped or Road closed"
	  	}else{
	  		analysis47 = "Cannot compute"
	  	}


	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, 
    		analysis46:analysis46, analysis47:analysis47, analysis45: analysis45 }));
	  
	});


});

app.get('/agdaoflyover-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[48].DE;
	  	const intc1 = body.RWS[0].RW[48].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[48].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[48].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[48].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[48].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[48].FIS[0].FI[2].CF[0].JF;


	  	var p = 3
	  
	  	var agdaoo = jfc1 + jfc2 + jfc3 ;

	  	var agdaoofly = agdaoo/p;
	  	
	  	let analysis46 = "";
	  	
	  	if(agdaoofly == 0 || agdaoofly <=4){
	  		analysis46 = "Free flow of traffic";
	  	}else if(agdaoofly > 4 || agdaoofly <=8){
	  		analysis46 = "Sluggish flow of traffic";
	  	}else if(agdaoofly > 8 || agdaoofly >=9){
	  		analysis46 = "Slow flow of traffic";
	  	}else if(agdaoofly == 10){
	  		analysis46 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis46 = "Cannot compute"
	  	}

	  	let analysis47 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis47 = "L. Garcia (South): Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis47 = "L. Garcia (South): Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis47 = "L. Garcia (South): Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis47 = "L. Garcia (South): Traffic stopped or Road closed"
	  	}else{
	  		analysis47 = "Cannot compute"
	  	}

	  	let analysis48 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis48 = "Lapu-Lapu/L. Garcia/R. Castillo/Dacudao: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis48 = "Lapu-Lapu/L. Garcia/R. Castillo/Dacudao: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis48 = "Lapu-Lapu/L. Garcia/R. Castillo/Dacudao: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis48 = "Lapu-Lapu/L. Garcia/R. Castillo/Dacudao: Traffic stopped or Road closed"
	  	}else{
	  		analysis48 = "Cannot compute"
	  	}

	  	let analysis49 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis49 = "L. Garcia (North): Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis49 = "L. Garcia (North): Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis49 = "L. Garcia (North): Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis49 = "L. Garcia (North): Traffic stopped or Road closed"
	  	}else{
	  		analysis49 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3,
    	analysis47:analysis47, analysis48:analysis48, analysis49:analysis49, analysis46: analysis46 }));
	  
	});


});
app.get('/rcastillo',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[49].DE;
	  	const intc1 = body.RWS[0].RW[49].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[49].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[49].FIS[0].FI[2].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[49].FIS[0].FI[2].CF[0].JF;


	  	var p = 2
	  
	  	var rcas = jfc1 +  jfc2 ;

	  	var rcast = rcas/p;
	  	
	  	let analysis47 = "";
	  	if(rcast == 0 || rcast <=4){
	  		analysis47 = "Free flow of traffic";
	  	}else if(rcast > 4 || rcast <=8){
	  		analysis47 = "Sluggish flow of traffic";
	  	}else if(rcast > 8 || rcast >=9){
	  		analysis47 = "Slow flow of traffic";
	  	}else if(rcast == 10){
	  		analysis47 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis47 = "Cannot compute"
	  	}

	  	let analysis48 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis48 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis48 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis48 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis48 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis48 = "Cannot compute"
	  	}

	  	let analysis49 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis49 = "Agdao Flyover/L. Garcia/Dacudao: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis49 = "Agdao Flyover/L. Garcia/Dacudao: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis49 = "Agdao Flyover/L. Garcia/Dacudao: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis49 = "Agdao Flyover/L. Garcia/Dacudao: Traffic stopped or Road closed"
	  	}else{
	  		analysis49 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, 
    		analysis48:analysis48, analysis49:analysis49, analysis47: analysis47 }));
	  
	});


});
app.get('/rcastillo-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[50].DE;
	  	const intc1 = body.RWS[0].RW[50].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[50].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[50].FIS[0].FI[2].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[50].FIS[0].FI[2].CF[0].JF;


	  	var p = 2
	  
	  	var rcasti = jfc1 + jfc2  ;

	  	var rcastill = rcasti/p;
	  	
	  	let analysis48 = "";
	  	if(rcastill == 0 || rcastill <=4){
	  		analysis48 = "Free flow of traffic";
	  	}else if(rcastill > 4 || rcastill <=8){
	  		analysis48 = "Sluggish flow of traffic";
	  	}else if(rcastill > 8 || rcastill >=9){
	  		analysis48 = "Slow flow of traffic";
	  	}else if(rcastill == 10){
	  		analysis48 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis48 = "Cannot compute"
	  	}

	  	let analysis49 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis49 = "Agdao Flyover/L. Garcia/Dacudao: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis49 = "Agdao Flyover/L. Garcia/Dacudao: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis49 = "Agdao Flyover/L. Garcia/Dacudao: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis49 = "Agdao Flyover/L. Garcia/Dacudao: Traffic stopped or Road closed"
	  	}else{
	  		analysis49 = "Cannot compute"
	  	}

	  	let analysis50 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis50 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis50 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis50 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis50 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis50 = "Cannot compute"
	  	}


	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, 
    		analysis49:analysis49, analysis50:analysis50, analysis48: analysis48 }));
	  
	});


});

app.get('/cpgarcia',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[51].DE;
	  	const intc1 = body.RWS[0].RW[51].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[51].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[51].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[51].FIS[0].FI[1].CF[0].JF;


	  	var p = 2
	  
	  	var cpgar = jfc1 + jfc2 ;

	  	var cpgarc = cpgar/p;
	  	
	  	let analysis49 = "";
	  	if(cpgarc == 0 || cpgarc <=4){
	  		analysis49 = "Free flow of traffic";
	  	}else if(cpgarc > 4 || cpgarc <=8){
	  		analysis49 = "Sluggish flow of traffic";
	  	}else if(cpgarc > 8 || cpgarc >=9){
	  		analysis49 = "Slow flow of traffic";
	  	}else if(cpgarc == 10){
	  		analysis49 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis49 = "Cannot compute"
	  	}

	  	let analysis50 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis50 = "Daang Maharlika: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis50 = "Daang Maharlika: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis50 = "Daang Maharlika: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis50 = "Daang Maharlika: Traffic stopped or Road closed"
	  	}else{
	  		analysis50 = "Cannot compute"
	  	}

	  	let analysis51 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis51 = "Angliongto: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis51 = "Angliongto: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis51 = "Angliongto: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis51 = "Angliongto: Traffic stopped or Road closed"
	  	}else{
	  		analysis51 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, 
    		analysis50:analysis50, analysis51:analysis51, analysis49: analysis49 }));
	  
	});


});

app.get('/diversionroad',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[52].DE;
	  	const intc1 = body.RWS[0].RW[52].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[52].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[52].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[52].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[52].FIS[0].FI[3].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[52].FIS[0].FI[3].CF[0].JF;

	  	const intc4 = body.RWS[0].RW[52].FIS[0].FI[4].TMC.DE;
	  	const jfc4 = body.RWS[0].RW[52].FIS[0].FI[4].CF[0].JF;

	  	const intc5 = body.RWS[0].RW[52].FIS[0].FI[5].TMC.DE;
	  	const jfc5 = body.RWS[0].RW[52].FIS[0].FI[5].CF[0].JF;

	  	const intc6 = body.RWS[0].RW[52].FIS[0].FI[6].TMC.DE;
	  	const jfc6 = body.RWS[0].RW[52].FIS[0].FI[6].CF[0].JF;


	  	var p = 6
	  
	  	var diver = jfc1 + jfc2 + jfc3 + jfc4 + jfc5 + jfc6;

	  	var divers = diver/p;
	  	
	  	let analysis50 = "";
	  	if(divers == 0 || divers <=4){
	  		analysis50 = "Free flow of traffic";
	  	}else if(divers > 4 || divers <=8){
	  		analysis50 = "Sluggish flow of traffic";
	  	}else if(divers > 8 || divers >=9){
	  		analysis50 = "Slow flow of traffic";
	  	}else if(divers == 10){
	  		analysis50 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis50 = "Cannot compute"
	  	}

	  	let analysis51 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis51 = "Angliongto: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis51 = "Angliongto: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis51 = "Angliongto: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis51 = "Angliongto: Traffic stopped or Road closed"
	  	}else{
	  		analysis51 = "Cannot compute"
	  	}

	  	let analysis52 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis52 = "M. Quinones Rd/Dacudao Ave/Buhangin-Cabantian Rd: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis52 = "M. Quinones Rd/Dacudao Ave/Buhangin-Cabantian Rd: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis52 = "M. Quinones Rd/Dacudao Ave/Buhangin-Cabantian Rd: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis52 = "M. Quinones Rd/Dacudao Ave/Buhangin-Cabantian Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis52 = "Cannot compute"
	  	}

	  	let analysis53 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis53 = "J. Rodriguez Ma-A: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis53 = "J. Rodriguez Ma-A: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis53 = "J. Rodriguez Ma-A: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis53 = "J. Rodriguez Ma-A: Traffic stopped or Road closed"
	  	}else{
	  		analysis54 = "Cannot compute"
	  	}

	  	let analysis54 = "";
	  	if(jfc4 == 0 || jfc4 <=4){
	  		analysis54 = "Shrine Hills Rd/S Cuyugan: Free flow of traffic";
	  	}else if(jfc4 > 4 || jfc4 <=8){
	  		analysis54 = "Shrine Hills Rd/S Cuyugan: Sluggish flow of traffic";
	  	}else if(jfc4 > 8 || jfc4 >=9){
	  		analysis54 = "Shrine Hills Rd/S Cuyugan: Slow flow of traffic";
	  	}else if(jfc4 == 10){
	  		analysis54 = "Shrine Hills Rd/S Cuyugan: Traffic stopped or Road closed"
	  	}else{
	  		analysis54 = "Cannot compute"
	  	}

	  	let analysis55 = "";
	  	if(jfc5 == 0 || jfc5 <=4){
	  		analysis55 = "Matina Pangi: Free flow of traffic";
	  	}else if(jfc5 > 4 || jfc5 <=8){
	  		analysis55 = "Matina Pangi: Sluggish flow of traffic";
	  	}else if(jfc5 > 8 || jfc5 >=9){
	  		analysis55 = "Matina Pangi: Slow flow of traffic";
	  	}else if(jfc5 == 10){
	  		analysis55 = "Matina Pangi: Traffic stopped or Road closed"
	  	}else{
	  		analysis55 = "Cannot compute"
	  	}

	  	let analysis56 = "";
	  	if(jfc6 == 0 || jfc6 <=4){
	  		analysis56 = "Mac Arthur Hwy/Mac Arthur: Free flow of traffic";
	  	}else if(jfc6 > 4 || jfc6 <=8){
	  		analysis56 = "Mac Arthur Hwy/Mac Arthur: Sluggish flow of traffic";
	  	}else if(jfc6 > 8 || jfc6 >=9){
	  		analysis56 = "Mac Arthur Hwy/Mac Arthur: Slow flow of traffic";
	  	}else if(jfc6 == 10){
	  		analysis56 = "Mac Arthur Hwy/Mac Arthur: Traffic stopped or Road closed"
	  	}else{
	  		analysis56 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4, intc5: intc5, jfc5: jfc5, intc6: intc6, jfc6: jfc6, 
    	analysis51:analysis51, analysis52:analysis52, analysis53:analysis53, analysis54:analysis54, analysis55:analysis55, analysis56:analysis56, analysis50: analysis50 }));
	  
	});


});
app.get('/diversionroad-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[53].DE;
	  	const intc1 = body.RWS[0].RW[53].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[53].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[53].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[53].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[53].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[53].FIS[0].FI[2].CF[0].JF;

	  	const intc4 = body.RWS[0].RW[53].FIS[0].FI[3].TMC.DE;
	  	const jfc4 = body.RWS[0].RW[53].FIS[0].FI[3].CF[0].JF;

	  	const intc5 = body.RWS[0].RW[53].FIS[0].FI[5].TMC.DE;
	  	const jfc5 = body.RWS[0].RW[53].FIS[0].FI[5].CF[0].JF;

	  	const intc6 = body.RWS[0].RW[53].FIS[0].FI[6].TMC.DE;
	  	const jfc6 = body.RWS[0].RW[53].FIS[0].FI[6].CF[0].JF;


	  	var p = 6
	  
	  	var diversi = jfc1 + jfc2 + jfc3 + jfc4 + jfc5 + jfc6;

	  	var diversio = diversi/p;
	  	
	  	let analysis51 = "";
	  	if(diversio == 0 || diversio <=4){
	  		analysis51 = "Free flow of traffic";
	  	}else if(diversio > 4 || diversio <=8){
	  		analysis51 = "Sluggish flow of traffic";
	  	}else if(diversio > 8 || diversio >=9){
	  		analysis51 = "Slow flow of traffic";
	  	}else if(diversio == 10){
	  		analysis51 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis51 = "Cannot compute"
	  	}

	  	let analysis52 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis52 = "Mac Arthur Hwy/Mac Arthur: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis52 = "Mac Arthur Hwy/Mac Arthur: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis52 = "Mac Arthur Hwy/Mac Arthur: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis52 = "Mac Arthur Hwy/Mac Arthur: Traffic stopped or Road closed"
	  	}else{
	  		analysis52 = "Cannot compute"
	  	}

	  	let analysis53 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis53 = "Matina Pangi: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis53 = "Matina Pangi: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis53 = "Matina Pangi: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis53 = "Matina Pangi: Traffic stopped or Road closed"
	  	}else{
	  		analysis53 = "Cannot compute"
	  	}

	  	let analysis54 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis54 = "Shrine Hills Rd/S Cuyugan: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis54 = "Shrine Hills Rd/S Cuyugan: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis54 = "Shrine Hills Rd/S Cuyugan: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis54 = "Shrine Hills Rd/S Cuyugan: Traffic stopped or Road closed"
	  	}else{
	  		analysis54 = "Cannot compute"
	  	}

	  	let analysis55 = "";
	  	if(jfc4 == 0 || jfc4 <=4){
	  		analysis55 = "J. Rodriguez Ma-A: Free flow of traffic";
	  	}else if(jfc4 > 4 || jfc4 <=8){
	  		analysis55 = "J. Rodriguez Ma-A: Sluggish flow of traffic";
	  	}else if(jfc4 > 8 || jfc4 >=9){
	  		analysis55 = "SJ. Rodriguez Ma-A: Slow flow of traffic";
	  	}else if(jfc4 == 10){
	  		analysis55 = "J. Rodriguez Ma-A: Traffic stopped or Road closed"
	  	}else{
	  		analysis55 = "Cannot compute"
	  	}

	  	let analysis56 = "";
	  	if(jfc5 == 0 || jfc5 <=4){
	  		analysis56 = "M. Quinones Rd/Dacudao Ave/Buhangin-Cabantian Rd: Free flow of traffic";
	  	}else if(jfc5 > 4 || jfc5 <=8){
	  		analysis56 = "M. Quinones Rd/Dacudao Ave/Buhangin-Cabantian Rd: Sluggish flow of traffic";
	  	}else if(jfc5 > 8 || jfc5 >=9){
	  		analysis56 = "M. Quinones Rd/Dacudao Ave/Buhangin-Cabantian Rd: Slow flow of traffic";
	  	}else if(jfc5 == 10){
	  		analysis56 = "M. Quinones Rd/Dacudao Ave/Buhangin-Cabantian Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis56 = "Cannot compute"
	  	}

	  	let analysis57 = "";
	  	if(jfc6 == 0 || jfc6 <=4){
	  		analysis57 = "Angliongto: Free flow of traffic";
	  	}else if(jfc6 > 4 || jfc6 <=8){
	  		analysis57 = "Angliongto: Sluggish flow of traffic";
	  	}else if(jfc6 > 8 || jfc6 >=9){
	  		analysis57 = "Angliongto: Slow flow of traffic";
	  	}else if(jfc6 == 10){
	  		analysis57 = "Angliongto: Traffic stopped or Road closed"
	  	}else{
	  		analysis57 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4: jfc4, intc5: intc5, jfc5: jfc5, intc6: intc6, jfc6: jfc6, 
    		analysis52:analysis52, analysis53:analysis53, analysis54:analysis54, analysis55:analysis55, analysis56:analysis56, analysis57:analysis57, analysis51: analysis51 }));
	  
	});


});
app.get('/cpgarcia-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[54].DE;
	  	const intc1 = body.RWS[0].RW[54].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[54].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[54].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[54].FIS[0].FI[1].CF[0].JF;

	  	var p = 2
	  
	  	var cpgarcc = jfc1 + jfc2 ;

	  	var cpgarcci = cpgarcc/p;
	  	
	  	let analysis52 = "";
	  	if(cpgarcci == 0 || cpgarcci <=4){
	  		analysis52 = "Free flow of traffic";
	  	}else if(cpgarcci > 4 || cpgarcci <=8){
	  		analysis52 = "Sluggish flow of traffic";
	  	}else if(cpgarcci > 8 || cpgarcci >=9){
	  		analysis52 = "Slow flow of traffic";
	  	}else if(cpgarcci == 10){
	  		analysis52 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis52 = "Cannot compute"
	  	}

	  	let analysis53 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis53 = "Angliongto: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis53 = "Angliongto: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis53 = "Angliongto: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis53 = "Angliongto: Traffic stopped or Road closed"
	  	}else{
	  		analysis53 = "Cannot compute"
	  	}

	  	let analysis54 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis54 = "Daang Maharlika: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis54 = "Daang Maharlika: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis54 = "Daang Maharlika: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis54 = "Daang Maharlika: Traffic stopped or Road closed"
	  	}else{
	  		analysis54 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, 
    		analysis53:analysis53, analysis54:analysis54, analysis52: analysis52 }));
	  
	});


});
app.get('/mquinonesrd-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[55].DE;
	  	const intc1 = body.RWS[0].RW[55].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[55].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[55].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[55].FIS[0].FI[1].CF[0].JF;

	  	var p = 2
	  
	  	var mquin = jfc1 + jfc2 ;

	  	var mquino = mquin/p;
	  	
	  	let analysis53 = "";
	  	if(mquino == 0 || mquino <=4){
	  		analysis53 = "Free flow of traffic";
	  	}else if(mquino > 4 || mquino <=8){
	  		analysis53 = "Sluggish flow of traffic";
	  	}else if(mquino > 8 || mquino >=9){
	  		analysis53 = "Slow flow of traffic";
	  	}else if(mquino == 10){
	  		analysis53 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis53 = "Cannot compute"
	  	}

	  	let analysis54 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis54 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis54 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis54 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis54 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis54 = "Cannot compute"
	  	}

	  	let analysis55 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis55 = "C. P. Garcia/Diversion Rd/C. P. Garcia East/C. P. Garcia West: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis55 = "C. P. Garcia/Diversion Rd/C. P. Garcia East/C. P. Garcia West: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis55 = "C. P. Garcia/Diversion Rd/C. P. Garcia East/C. P. Garcia West: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis55 = "C. P. Garcia/Diversion Rd/C. P. Garcia East/C. P. Garcia West: Traffic stopped or Road closed"
	  	}else{
	  		analysis55 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, 
    		analysis54:analysis54, analysis55:analysis55, analysis53: analysis53 }));
	  
	});


});
app.get('/mquinonesrd',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[56].DE;
	  	const intc1 = body.RWS[0].RW[56].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[56].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[56].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[56].FIS[0].FI[1].CF[0].JF;

	  	var p = 2
	  
	  	var mquinn = jfc1 + jfc2 ;

	  	var mquinno = mquinn/p;
	  	
	  	let analysis54 = "";
	  	
	  	if(mquinno == 0 || mquinno <=4){
	  		analysis54 = "Free flow of traffic";
	  	}else if(mquinno > 4 || mquinno <=8){
	  		analysis54 = "Sluggish flow of traffic";
	  	}else if(mquinno > 8 || mquinno >=9){
	  		analysis54 = "Slow flow of traffic";
	  	}else if(mquinno == 10){
	  		analysis54 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis54 = "Cannot compute"
	  	}

	  	let analysis55 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis55 = "C. P. Garcia/Diversion Rd/C. P. Garcia East/C. P. Garcia West: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis55 = "C. P. Garcia/Diversion Rd/C. P. Garcia East/C. P. Garcia West: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis55 = "C. P. Garcia/Diversion Rd/C. P. Garcia East/C. P. Garcia West: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis55 = "C. P. Garcia/Diversion Rd/C. P. Garcia East/C. P. Garcia West: Traffic stopped or Road closed"
	  	}else{
	  		analysis55 = "Cannot compute"
	  	}

	  	let analysis56 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis56 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis56 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis56 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis56 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis55 = "Cannot compute"
	  	}


	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, 
    		analysis55:analysis55, analysis56:analysis56, analysis54: analysis54 }));
	  
	});


});

app.get('/jrodriguezmaa',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[57].DE;
	  	const intc1 = body.RWS[0].RW[57].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[57].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[57].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[57].FIS[0].FI[1].CF[0].JF;

	  	var p = 2
	  
	  	var jrod = jfc1 + jfc2 ;

	  	var jrodri = jrod/p;
	  	
	  	let analysis55 = "";
	  	if(jrodri == 0 || jrodri <=4){
	  		analysis55 = "Free flow of traffic";
	  	}else if(jrodri > 4 || jrodri <=8){
	  		analysis55 = "Sluggish flow of traffic";
	  	}else if(jrodri > 8 || jrodri >=9){
	  		analysis55 = "Slow flow of traffic";
	  	}else if(jrodri == 10){
	  		analysis55 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis55 = "Cannot compute"
	  	}

	  	let analysis56 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis56 = "Diversion Rd/C. P. Garcia: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis56 = "Diversion Rd/C. P. Garcia: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis56 = "Diversion Rd/C. P. Garcia: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis56 = "Diversion Rd/C. P. Garcia: Traffic stopped or Road closed"
	  	}else{
	  		analysis56 = "Cannot compute"
	  	}

	  	let analysis57 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis57 = "Narra St/Ma-A Rd: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis57 = "Narra St/Ma-A Rd: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis57 = "Narra St/Ma-A Rd: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis57 = "Narra St/Ma-A Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis57 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, 
    		analysis56:analysis56, analysis57:analysis57, analysis55: analysis55 }));
	  
	});


});
app.get('/jrodriguezmaa-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[58].DE;
	  	const intc1 = body.RWS[0].RW[58].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[58].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[58].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[58].FIS[0].FI[1].CF[0].JF;

	  	var p = 2
	  
	  	var jrodd = jfc1 + jfc2 ;

	  	var jroddri = jrodd/p;
	  	
	  	let analysis56 = "";
	  	if(jroddri == 0 || jroddri <=4){
	  		analysis56 = "Free flow of traffic";
	  	}else if(jroddri > 4 || jroddri <=8){
	  		analysis56 = "Sluggish flow of traffic";
	  	}else if(jroddri > 8 || jroddri >=9){
	  		analysis56 = "Slow flow of traffic";
	  	}else if(jroddri == 10){
	  		analysis56 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis56 = "Cannot compute"
	  	}

	  	let analysis57 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis57 = "Narra St/Ma-A Rd: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis57 = "Narra St/Ma-A Rd: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis57 = "Narra St/Ma-A Rd: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis57 = "Narra St/Ma-A Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis57 = "Cannot compute"
	  	}

	  	let analysis58 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis58 = "Diversion Rd/C. P. Garcia: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis58 = "Diversion Rd/C. P. Garcia: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis58 = "Diversion Rd/C. P. Garcia: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis58 = "Diversion Rd/C. P. Garcia: Traffic stopped or Road closed"
	  	}else{
	  		analysis58 = "Cannot compute"
	  	}



	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2,
    	analysis57:analysis57, analysis58:analysis58, analysis56: analysis56 }));
	  
	});


});

app.get('/maaroad',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[59].DE;
	  	const intc1 = body.RWS[0].RW[59].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[59].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[59].FIS[0].FI[2].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[59].FIS[0].FI[2].CF[0].JF;

	  	var p = 2
	  
	  	var maa = jfc1 + jfc2 ;

	  	var maar = maa/p;
	  	
	  	let analysis57 = "";
	  	if(maar == 0 || maar <=4){
	  		analysis57 = "Free flow of traffic";
	  	}else if(maar > 4 || maar <=8){
	  		analysis57 = "Sluggish flow of traffic";
	  	}else if(maar > 8 || maar >=9){
	  		analysis57 = "Slow flow of traffic";
	  	}else if(maar == 10){
	  		analysis57 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis57 = "Cannot compute"
	  	}

	  	let analysis58 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis58 = "Narra St: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis58 = "Narra St: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis58 = "Narra St: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis58 = "Narra St: Traffic stopped or Road closed"
	  	}else{
	  		analysis58 = "Cannot compute"
	  	}


		let analysis59 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis59 = "Mac Arthur Hwy: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis59 = "Mac Arthur Hwy: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis59 = "Mac Arthur Hwy: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis59 = "Mac Arthur Hwy: Traffic stopped or Road closed"
	  	}else{
	  		analysis59 = "Cannot compute"
	  	}


	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2,
    	analysis58:analysis58, analysis59:analysis59,  analysis57: analysis57 }));
	  
	});


});
app.get('/maaroad-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[60].DE;
	  	const intc1 = body.RWS[0].RW[60].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[60].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[60].FIS[0].FI[2].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[60].FIS[0].FI[2].CF[0].JF;

	  	var p = 2
	  
	  	var maaa = jfc1 + jfc2 ;

	  	var maaar = maaa/p;
	  	
	  	let analysis58 = "";
	  	if(maaar == 0 || maaar <=4){
	  		analysis58 = "Free flow of traffic";
	  	}else if(maaar > 4 || maaar <=8){
	  		analysis58 = "Sluggish flow of traffic";
	  	}else if(maaar > 8 || maaar >=9){
	  		analysis58 = "Slow flow of traffic";
	  	}else if(maaar == 10){
	  		analysis58 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis58 = "Cannot compute"
	  	}

	  	let analysis59 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis59 = "Mac Arthur Hwy: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis59 = "Mac Arthur Hwy: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis59 = "Mac Arthur Hwy: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis59 = "Mac Arthur Hwy: Traffic stopped or Road closed"
	  	}else{
	  		analysis59 = "Cannot compute"
	  	}

	  	let analysis60 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis60 = "Narra St: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis60 = "Narra St: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis60 = "Narra St: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis60 = "Narra St: Traffic stopped or Road closed"
	  	}else{
	  		analysis60 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, 
    	analysis59:analysis59, analysis60:analysis60, analysis58: analysis58 }));
	  
	});


});

app.get('/shrinehillsrd',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[61].DE;
	  	const intc1 = body.RWS[0].RW[61].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[61].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[61].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[61].FIS[0].FI[1].CF[0].JF;

	  	var p = 2
	  
	  	var shri = jfc1 + jfc2 ;

	  	var shrin = shri/p;
	  	
	  	let analysis59 = "";
	  	if(shrin == 0 || shrin <=4){
	  		analysis59 = "Free flow of traffic";
	  	}else if(shrin > 4 || shrin <=8){
	  		analysis59 = "Sluggish flow of traffic";
	  	}else if(shrin > 8 || shrin >=9){
	  		analysis59 = "Slow flow of traffic";
	  	}else if(shrin == 10){
	  		analysis59 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis59 = "Cannot compute"
	  	}

	  	let analysis60 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis60 = "Diversion Rd: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis60 = "Diversion Rd: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis60 = "Diversion Rd: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis60 = "Diversion Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis60 = "Cannot compute"
	  	}

	  	let analysis61 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis61 = "Mac Arthur Hwy: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis61 = "Mac Arthur Hwy: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis61 = "Mac Arthur Hwy: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis61 = "Mac Arthur Hwy: Traffic stopped or Road closed"
	  	}else{
	  		analysis61 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, 
    		analysis60:analysis60, analysis61:analysis61, analysis59: analysis59 }));
	  
	});


});
app.get('/shrinehillsrd-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[62].DE;
	  	const intc1 = body.RWS[0].RW[62].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[62].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[62].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[62].FIS[0].FI[1].CF[0].JF;

	  	var p = 2
	  
	  	var shrii = jfc1 + jfc2 ;

	  	var shriin = shrii/p;
	  	
	  	let analysis60 = "";
	  	if(shriin == 0 || shriin <=4){
	  		analysis60 = "Free flow of traffic";
	  	}else if(shriin > 4 || shriin <=8){
	  		analysis60 = "Sluggish flow of traffic";
	  	}else if(shriin > 8 || shriin >=9){
	  		analysis60 = "Slow flow of traffic";
	  	}else if(shriin == 10){
	  		analysis60 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis60 = "Cannot compute"
	  	}

	  	let analysis61 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis61 = "Mac Arthur Hwy: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis61 = "Mac Arthur Hwy: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis61 = "Mac Arthur Hwy: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis61 = "Mac Arthur Hwy: Traffic stopped or Road closed"
	  	}else{
	  		analysis61 = "Cannot compute"
	  	}

	  	let analysis62 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis62 = "Diversion Rd: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis62 = "Diversion Rd: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis62 = "Diversion Rd: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis62 = "Diversion Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis62 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, 
    		analysis61:analysis61, analysis62:analysis62, analysis60: analysis60 }));
	  
	});


});

app.get('/angliongto',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[63].DE;
	  	const intc1 = body.RWS[0].RW[63].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[63].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[63].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[63].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[63].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[63].FIS[0].FI[2].CF[0].JF;

	  	var p = 3
	  
	  	var angl = jfc1 + jfc2 + jfc3;

	  	var angli = angl/p;
	  	
	  	let analysis61 = "";
	  	if(angli == 0 || angli <=4){
	  		analysis61 = "Free flow of traffic";
	  	}else if(angli > 4 || angli <=8){
	  		analysis61 = "Sluggish flow of traffic";
	  	}else if(angli > 8 || angli >=9){
	  		analysis61 = "Slow flow of traffic";
	  	}else if(angli == 10){
	  		analysis61 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis61 = "Cannot compute"
	  	}

		let analysis62 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis62 = "Saint Anthony Subd/Cabantian Rd: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis62 = "Saint Anthony Subd/Cabantian Rd: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis62 = "Saint Anthony Subd/Cabantian Rd: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis62 = "Saint Anthony Subd/Cabantian Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis62 = "Cannot compute"
	  	}


		let analysis63 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis63 = "Diversion Rd/C. P. Garcia: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis63 = "Diversion Rd/C. P. Garcia: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis63 = "Diversion Rd/C. P. Garcia: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis63 = "Diversion Rd/C. P. Garcia: Traffic stopped or Road closed"
	  	}else{
	  		analysis63 = "Cannot compute"
	  	}

	  	let analysis64 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis64 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis64 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis64 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis64 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis64 = "Cannot compute"
	  	}


	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, 
    		analysis62:analysis62, analysis63:analysis63, analysis64:analysis64, analysis61: analysis61 }));
	  
	});


});

app.get('/buhangincabantianroad',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[64].DE;
	  	
	  	const intc1 = body.RWS[0].RW[64].FIS[0].FI[1].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[64].FIS[0].FI[1].CF[0].JF;

	  	var p = 1
	  
	  	var buha = jfc1  ;

	  	var buhan = buha/p;
	  	
	  	let analysis62 = "";
	  	if(buhan == 0 || buhan <=4){
	  		analysis62 = "Free flow of traffic";
	  	}else if(buhan > 4 || buhan <=8){
	  		analysis62 = "Sluggish flow of traffic";
	  	}else if(buhan > 8 || buhan >=9){
	  		analysis62 = "Slow flow of traffic";
	  	}else if(buhan == 10){
	  		analysis62 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis62 = "Cannot compute"
	  	}

	  	let analysis63 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis63 = "Diversion Rd/C. P. Garcia/C. P. Garcia East/C. P. Garcia West: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis63 = "Diversion Rd/C. P. Garcia/C. P. Garcia East/C. P. Garcia West: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis63 = "Diversion Rd/C. P. Garcia/C. P. Garcia East/C. P. Garcia West: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis63 = "Diversion Rd/C. P. Garcia/C. P. Garcia East/C. P. Garcia West: Traffic stopped or Road closed"
	  	}else{
	  		analysis63 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,
    	analysis63:analysis63, analysis62: analysis62 }));
	  
	});


});

app.get('/saintanthonysubd',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[65].DE;
	  	const intc1 = body.RWS[0].RW[65].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[65].FIS[0].FI[0].CF[0].JF;

	  	var p = 1
	  
	  	var sain = jfc1 ;

	  	var saint = sain/p;
	  	
	  	let analysis63 = "";
	  	if(saint == 0 || saint <=4){
	  		analysis63 = "Free flow of traffic";
	  	}else if(saint > 4 || saint <=8){
	  		analysis63 = "Sluggish flow of traffic";
	  	}else if(saint > 8 || saint >=9){
	  		analysis63 = "Slow flow of traffic";
	  	}else if(saint == 10){
	  		analysis63 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis63 = "Cannot compute"
	  	}

	  	let analysis64 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis64 = "Angliongto: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis64 = "Angliongto: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis64 = "Angliongto: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis64 = "Angliongto: Traffic stopped or Road closed"
	  	}else{
	  		analysis64 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,
    	analysis64:analysis64, analysis63: analysis63 }));
	  
	});


});

app.get('/angliongto-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[66].DE;
	  	const intc1 = body.RWS[0].RW[66].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[66].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[66].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[66].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[66].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[66].FIS[0].FI[2].CF[0].JF;

	  	var p = 3
	  
	  	var angll = jfc1 + jfc2 + jfc3;

	  	var anglli = angll/p;
	  	
	  	let analysis64 = "";
	  	if(anglli == 0 || anglli <=4){
	  		analysis64 = "Free flow of traffic";
	  	}else if(anglli > 4 || anglli <=8){
	  		analysis64 = "Sluggish flow of traffic";
	  	}else if(anglli > 8 || anglli >=9){
	  		analysis64 = "Slow flow of traffic";
	  	}else if(anglli == 10){
	  		analysis64 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis64 = "Cannot compute"
	  	}

	  	let analysis65 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis65 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis65 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis65 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis65 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis65 = "Cannot compute"
	  	}


		let analysis66 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis66 = "Diversion Rd/C. P. Garcia: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis66 = "Diversion Rd/C. P. Garcia: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis66 = "Diversion Rd/C. P. Garcia: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis66 = "Diversion Rd/C. P. Garcia: Traffic stopped or Road closed"
	  	}else{
	  		analysis63 = "Cannot compute"
	  	}

	  	let analysis67 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis67 = "Saint Anthony Subd/Cabantian Rd: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis67 = "Saint Anthony Subd/Cabantian Rd: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis67 = "Saint Anthony Subd/Cabantian Rd: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis67 = "Saint Anthony Subd/Cabantian Rd: Traffic stopped or Road closed"
	  	}else{
	  		analysis67 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, 
    		analysis65:analysis65, analysis66:analysis66, analysis67:analysis67, analysis64: analysis64 }));
	  
	});


});

app.get('/buhangincabantianroad-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[67].DE;
	  	const intc1 = body.RWS[0].RW[67].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[67].FIS[0].FI[0].CF[0].JF;

	

	  	var p = 2
	  
	  	var buhann = jfc1;

	  	var buhanngi = buhann/p;
	  	
	  	let analysis65 = "";
	  	if(buhanngi == 0 || buhanngi <=4){
	  		analysis65 = "Free flow of traffic";
	  	}else if(buhanngi > 4 || buhanngi <=8){
	  		analysis65 = "Sluggish flow of traffic";
	  	}else if(buhanngi > 8 || buhanngi >=9){
	  		analysis65 = "Slow flow of traffic";
	  	}else if(buhanngi == 10){
	  		analysis65 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis65 = "Cannot compute"
	  	}

	  	let analysis66 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis66 = "Diversion Rd/C. P. Garcia/C. P. Garcia East/C. P. Garcia West: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis66 = "Diversion Rd/C. P. Garcia/C. P. Garcia East/C. P. Garcia West: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis66 = "Diversion Rd/C. P. Garcia/C. P. Garcia East/C. P. Garcia West: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis66 = "Diversion Rd/C. P. Garcia/C. P. Garcia East/C. P. Garcia West: Traffic stopped or Road closed"
	  	}else{
	  		analysis66 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, 
    		analysis66:analysis66, analysis65: analysis65 }));
	  
	});


});

app.get('/saintanthonysubd-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[68].DE;

	  	const intc1 = body.RWS[0].RW[68].FIS[0].FI[1].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[68].FIS[0].FI[1].CF[0].JF;

	  	var p = 1
	  
	  	var saiin = jfc1 ;

	  	var saiint = saiin/p;
	  	
	  	let analysis66 = "";
	  	if(saiint == 0 || saiint <=4){
	  		analysis66 = "Free flow of traffic";
	  	}else if(saiint > 4 || saiint <=8){
	  		analysis66 = "Sluggish flow of traffic";
	  	}else if(saiint > 8 || saiint >=9){
	  		analysis66 = "Slow flow of traffic";
	  	}else if(saiint == 10){
	  		analysis66 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis66 = "Cannot compute"
	  	}

	  	let analysis67 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis67 = "Angliongto: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis67 = "Angliongto: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis67 = "Angliongto: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis67 = "Angliongto: Traffic stopped or Road closed"
	  	}else{
	  		analysis67 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1,  
    		analysis67:analysis67, analysis66: analysis66 }));
	  
	});


});

app.get('/cabantianroad',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[69].DE;

	  	const intc1 = body.RWS[0].RW[69].FIS[0].FI[1].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[69].FIS[0].FI[1].CF[0].JF;

	  	var p = 1
	  
	  	var caba = jfc1 ;

	  	var caban = caba/p;
	  	
	  	let analysis67 = "";
	  	if(caban == 0 || caban <=4){
	  		analysis67 = "Free flow of traffic";
	  	}else if(caban > 4 || caban <=8){
	  		analysis67 = "Sluggish flow of traffic";
	  	}else if(caban > 8 || caban >=9){
	  		analysis67 = "Slow flow of traffic";
	  	}else if(caban == 10){
	  		analysis67 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis67 = "Cannot compute"
	  	}

	  	let analysis68 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis68 = "Angliongto: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis68 = "Angliongto: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis68 = "Angliongto: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis68 = "Angliongto: Traffic stopped or Road closed"
	  	}else{
	  		analysis68 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, 
    		analysis68:analysis68, analysis67: analysis67 }));
	  
	});


});

app.get('/cabantianroad-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[70].DE;
	  	const intc1 = body.RWS[0].RW[70].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[70].FIS[0].FI[0].CF[0].JF;

	  	

	  	var p = 1
	  
	  	var cabaa = jfc1;

	  	var cabaan = cabaa/p;
	  	
	  	let analysis68 = "";
	  	if(cabaan == 0 || cabaan <=4){
	  		analysis68 = "Free flow of traffic";
	  	}else if(cabaan > 4 || cabaan <=8){
	  		analysis68 = "Sluggish flow of traffic";
	  	}else if(cabaan > 8 || cabaan >=9){
	  		analysis68 = "Slow flow of traffic";
	  	}else if(cabaan == 10){
	  		analysis68 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis68 = "Cannot compute"
	  	}

	  	let analysis69 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis69 = "Angliongto: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis69 = "Angliongto: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis69 = "Angliongto: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis69 = "Angliongto: Traffic stopped or Road closed"
	  	}else{
	  		analysis69 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, 
    		analysis69:analysis69, analysis68: analysis68 }));
	  
	});


});
app.get('/davaomaharlika-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[71].DE;
	  	const intc1 = body.RWS[0].RW[71].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[71].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[71].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[71].FIS[0].FI[1].CF[0].JF;

	  	var p = 2
	  
	  	var mahar = jfc1 + jfc2 ;

	  	var mahark = mahar/p;
	  	
	  	let analysis69 = "";
	  	
	  	if(mahark == 0 || mahark <=4){
	  		analysis69 = "Free flow of traffic";
	  	}else if(mahark > 4 || mahark <=8){
	  		analysis69 = "Sluggish flow of traffic";
	  	}else if(mahark > 8 || mahark >=9){
	  		analysis69 = "Slow flow of traffic";
	  	}else if(mahark == 10){
	  		analysis69 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis69 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, analysis69: analysis69 }));
	  
	});


});
app.get('/davaomaharlika',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[72].DE;
	  	const intc1 = body.RWS[0].RW[72].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[72].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[72].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[72].FIS[0].FI[1].CF[0].JF;

	  	var p = 2
	  
	  	var maharr = jfc1 + jfc2 ;

	  	var maharrk = maharr/p;
	  	
	  	let analysis70 = "";
	  	
	  	if(maharrk == 0 || maharrk <=4){
	  		analysis70 = "Free flow of traffic";
	  	}else if(maharrk > 4 || maharrk <=8){
	  		analysis70 = "Sluggish flow of traffic";
	  	}else if(maharrk > 8 || maharrk >=9){
	  		analysis70 = "Slow flow of traffic";
	  	}else if(maharrk == 10){
	  		analysis70 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis70 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, analysis70: analysis70 }));
	  
	});


});

app.get('/davaobukidnonroad',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[73].DE;
	  	const intc1 = body.RWS[0].RW[73].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[73].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[73].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[73].FIS[0].FI[1].CF[0].JF;

	  	var p = 2
	  
	  	var davv = jfc1 + jfc2 ;

	  	var davva = davv/p;
	  	
	  	let analysis71 = "";
	  	if(davva == 0 || davva <=4){
	  		analysis71 = "Free flow of traffic";
	  	}else if(davva > 4 || davva <=8){
	  		analysis71 = "Sluggish flow of traffic";
	  	}else if(davva > 8 || davva >=9){
	  		analysis71 = "Slow flow of traffic";
	  	}else if(davva == 10){
	  		analysis71 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis71 = "Cannot compute"
	  	}

	  	let analysis72 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis72 = "Quary St: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis72 = "Quary St: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis72 = "Quary St: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis72 = "Quary St: Traffic stopped or Road closed"
	  	}else{
	  		analysis72 = "Cannot compute"
	  	}

	  	let analysis73 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis73 = "Mac Arthur: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis73 = "Mac Arthur: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis73 = "Mac Arthur: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis73 = "Mac Arthur: Traffic stopped or Road closed"
	  	}else{
	  		analysis73 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2,
    	analysis72:analysis72, analysis73:analysis73, analysis71: analysis71 }));
	  
	});


});
app.get('/davaobukidnonroad-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[74].DE;
	  	const intc1 = body.RWS[0].RW[74].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[74].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[74].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[74].FIS[0].FI[1].CF[0].JF;

	  	var p = 2
	  
	  	var davvv = jfc1 + jfc2 ;

	  	var davvva = davvv/p;
	  	
	  	let analysis72 = "";
	  	if(davvva == 0 || davvva <=4){
	  		analysis72 = "Free flow of traffic";
	  	}else if(davvva > 4 || davvva <=8){
	  		analysis72 = "Sluggish flow of traffic";
	  	}else if(davvva > 8 || davvva >=9){
	  		analysis72 = "Slow flow of traffic";
	  	}else if(davvva == 10){
	  		analysis72 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis72 = "Cannot compute"
	  	}

	  	let analysis73 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis73 = "Mac Arthur: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis73 = "Mac Arthur: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis73 = "Mac Arthur: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis73 = "Mac Arthur: Traffic stopped or Road closed"
	  	}else{
	  		analysis73 = "Cannot compute"
	  	}

	  	let analysis74 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis74 = "Quary St: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis74 = "Quary St: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis74 = "Quary St: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis74 = "Quary St: Traffic stopped or Road closed"
	  	}else{
	  		analysis74 = "Cannot compute"
	  	}


	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2,
    	analysis73:analysis73, analysis74:analysis74, analysis72: analysis72 }));
	  
	});


});

app.get('/daangmaharlika',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[76].DE;
	  	const intc1 = body.RWS[0].RW[76].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[76].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[76].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[76].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[76].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[76].FIS[0].FI[2].CF[0].JF;

	  	const intc4 = body.RWS[0].RW[76].FIS[0].FI[3].TMC.DE;
	  	const jfc4 = body.RWS[0].RW[76].FIS[0].FI[3].CF[0].JF;

	  	var p = 4
	  
	  	var davvv = jfc1 + jfc2 + jfc3 + jfc4;

	  	var davvva = davvv/p;
	  	
	  	let analysis76 = "";
	  	if(davvva == 0 || davvva <=4){
	  		analysis76 = "Free flow of traffic";
	  	}else if(davvva > 4 || davvva <=8){
	  		analysis76 = "Sluggish flow of traffic";
	  	}else if(davvva > 8 || davvva >=9){
	  		analysis76 = "Slow flow of traffic";
	  	}else if(davvva == 10){
	  		analysis76 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis76 = "Cannot compute"
	  	}

	  	let analysis77 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis77 = "Davao City (North): Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis77 = "Davao City (North): Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis77 = "Davao City (North): Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis77 = "Davao City (North): Traffic stopped or Road closed"
	  	}else{
	  		analysis77 = "Cannot compute"
	  	}

	  	let analysis78 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis78 = "Davao City (South): Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis78 = "Davao City (South): Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis78 = "Davao City (South): Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis78 = "Davao City (South): Traffic stopped or Road closed"
	  	}else{
	  		analysis78 = "Cannot compute"
	  	}

	  	let analysis79 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis79 = "C. P. Garcia: Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis79 = "C. P. Garcia: Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis79 = "C. P. Garcia: Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis79 = "C. P. Garcia: Traffic stopped or Road closed"
	  	}else{
	  		analysis79 = "Cannot compute"
	  	}

	  	let analysis80 = "";
	  	if(jfc4 == 0 || jfc4 <=4){
	  		analysis80 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc4 > 4 || jfc4 <=8){
	  		analysis80 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc4 > 8 || jfc4 >=9){
	  		analysis80 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc4 == 10){
	  		analysis80 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis80 = "Cannot compute"
	  	}

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4:jfc4,
    	analysis77:analysis77, analysis78:analysis78, analysis79:analysis79, analysis80:analysis80, analysis76: analysis76 }));
	  
	});


});
app.get('/daangmaharlika-',function(_req, _res){

	request('https://traffic.api.here.com/traffic/6.1/flow.json?bbox=7.2598%2C125.0860%3B6.7670%2C125.6674&app_id=fQbW8CGYiU3l5mLqWgBE&app_code=SYZXwjFBHSYi_1t1GNuHow', { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }

	  	const streetc = body.RWS[0].RW[78].DE;
	  	const intc1 = body.RWS[0].RW[78].FIS[0].FI[0].TMC.DE;
	  	const jfc1 = body.RWS[0].RW[78].FIS[0].FI[0].CF[0].JF;

	  	const intc2 = body.RWS[0].RW[78].FIS[0].FI[1].TMC.DE;
	  	const jfc2 = body.RWS[0].RW[78].FIS[0].FI[1].CF[0].JF;

	  	const intc3 = body.RWS[0].RW[78].FIS[0].FI[2].TMC.DE;
	  	const jfc3 = body.RWS[0].RW[78].FIS[0].FI[2].CF[0].JF;

	  	const intc4 = body.RWS[0].RW[78].FIS[0].FI[3].TMC.DE;
	  	const jfc4 = body.RWS[0].RW[78].FIS[0].FI[3].CF[0].JF;

	  
	  	var p = 4
	  
	  	var davvv = jfc1 + jfc2 + jfc3 + jfc4 ;

	  	var davvva = davvv/p;
	  	
	  	let analysis77 = "";
	  	if(davvva == 0 || davvva <=4){
	  		analysis77 = "Free flow of traffic";
	  	}else if(davvva > 4 || davvva <=8){
	  		analysis77 = "Sluggish flow of traffic";
	  	}else if(davvva > 8 || davvva >=9){
	  		analysis77 = "Slow flow of traffic";
	  	}else if(davvva == 10){
	  		analysis77 = "Traffic stopped or Road closed"
	  	}else{
	  		analysis77 = "Cannot compute"
	  	}

	  	let analysis78 = "";
	  	if(jfc1 == 0 || jfc1 <=4){
	  		analysis78 = "J. P. Laurel Ave: Free flow of traffic";
	  	}else if(jfc1 > 4 || jfc1 <=8){
	  		analysis78 = "J. P. Laurel Ave: Sluggish flow of traffic";
	  	}else if(jfc1 > 8 || jfc1 >=9){
	  		analysis78 = "J. P. Laurel Ave: Slow flow of traffic";
	  	}else if(jfc1 == 10){
	  		analysis78 = "J. P. Laurel Ave: Traffic stopped or Road closed"
	  	}else{
	  		analysis76 = "Cannot compute"
	  	}

	  	let analysis79 = "";
	  	if(jfc2 == 0 || jfc2 <=4){
	  		analysis79 = "C. P. Garcia: Free flow of traffic";
	  	}else if(jfc2 > 4 || jfc2 <=8){
	  		analysis79 = "C. P. Garcia: Sluggish flow of traffic";
	  	}else if(jfc2 > 8 || jfc2 >=9){
	  		analysis79 = "C. P. Garcia: Slow flow of traffic";
	  	}else if(jfc2 == 10){
	  		analysis79 = "C. P. Garcia: Traffic stopped or Road closed"
	  	}else{
	  		analysis79 = "Cannot compute"
	  	}

	  	let analysis80 = "";
	  	if(jfc3 == 0 || jfc3 <=4){
	  		analysis80 = "Davao City (South): Free flow of traffic";
	  	}else if(jfc3 > 4 || jfc3 <=8){
	  		analysis80 = "Davao City (North): Sluggish flow of traffic";
	  	}else if(jfc3 > 8 || jfc3 >=9){
	  		analysis80 = "Davao City (North): Slow flow of traffic";
	  	}else if(jfc3 == 10){
	  		analysis80 = "Davao City (North): Traffic stopped or Road closed"
	  	}else{
	  		analysis80 = "Cannot compute"
	  	}

	  	let analysis81 = "";
	  	if(jfc4 == 0 || jfc4 <=4){
	  		analysis81 = "Davao City (North): Free flow of traffic";
	  	}else if(jfc4 > 4 || jfc4 <=8){
	  		analysis81 = "Davao City (North): Sluggish flow of traffic";
	  	}else if(jfc4 > 8 || jfc4 >=9){
	  		analysis81 = "Davao City (North): Slow flow of traffic";
	  	}else if(jfc4 == 10){
	  		analysis81 = "Davao City (North): Traffic stopped or Road closed"
	  	}else{
	  		analysis81 = "Cannot compute"
	  	}

	 

	  	
	  	_res.setHeader('Content-Type', 'application/json');
    	_res.send(JSON.stringify({ street: streetc, intc1: intc1, jfc1: jfc1, intc2: intc2, jfc2: jfc2, intc3: intc3, jfc3: jfc3, intc4: intc4, jfc4:jfc4
    	, analysis78: analysis78, analysis79:analysis79, analysis80:analysis80, analysis81:analysis81, analysis77: analysis77 }));
	  
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

app.get('/geo',function(req, res){
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/ftorresst-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/abonifaciost-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/ftorresst')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/abonifaciost')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/jplaureloutgmall-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/jplaureloutgmall')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/cmrecto')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/cbangoy-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/cbangoy')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/rmagsaysay-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/rmagsaysay')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/staanaave-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/staanaave')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/lapulapu-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/agdaoflyover-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/lapulapu')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/agdaoflyover')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/rcastillo-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/rcastillo')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/cpgarcia-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/diversionroad-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/diversionroad')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/cpgarcia')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/mquinonesrd')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/mquinonesrd-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/jrodriguezmaa-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/jrodriguezmaa')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/maaroad-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/maaroad')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/shrinehillsrd-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/shrinehillsrd')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/angliongto-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/buhangincabantianroad-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/saintanthonysubd-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/angliongto')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/buhangincabantianroad')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/saintanthonysubd')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/cabantianroad-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/cabantianroad')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/davaomaharlika-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/davaomaharlika')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/davaobukidnonroad-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/davaobukidnonroad')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/mroxas')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/mroxas-')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/daangmaharlika')
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
	

	axios.get('https://cryptic-eyrie-21978.herokuapp.com/daangmaharlika-')
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





 

// final let token = "EAAimrKFwRkIBADU9ZAgmFJPZBZB2hipmHHPdMFp0X8soLUq1ElyX0v20noVjGBvuyjppZBEHKaR1rhZAjCM9eI7nWG5JiRCaJISuLo8Oxfp9KDxx489dj5ukAReIgSc0c1IOcHmzTFEovaCvRhGZCcZCMDnJL2D251mkZCnJjs8uggZDZD"
let token = "EAAimrKFwRkIBAFMUy15MJMYSc2fboyfeKkXLFXASxFJdU25Qi25y4cUJ7dZAPEi5V4rcHpLIB38fJpefsxjUIXQJPXZAo0ZBBZCl9QxWpC1GiyghpHGOvuNQ4ZBY5Kd1ZAoZBtEjMLxdGgZCyYYB0HMX4e0BUBWqO88c3mjl8bJihQZDZD"


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

		//	if(text.includes("good day chatbot")){
			//	sendText(sender, "whats up ? how may I help you")
			//}else if (text.includes("what is the traffic status in davao city")){
			//	sendText(sender, "Well, Ok! are you a motorist or a commuter?")
			//}else if (text.includes("I am a commuter")){
			//	sendText(sender, "Ok, so you are commuter. What route of jeep are you going to ride?")
			//}else if (text.includes("I am a motorist")){
			//	sendText(sender, "Ok, so you are motorist. Where your location and where are you heading to? Example: PoceSt to Manila")
			//}else if (text.includes("NO")){
			//	sendText(sender, "Ok! What now?")
			//}

			
			if(text=='Equirino' || text=='equirino'){
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

				
			}else if(text=='Equirino-' || text=='equirino-'){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/equirino-')
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

				
			}else if(text=='Equirino intersections' || text=='equirino intersections'){
				let chatbotResponse = "";
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/equirino')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysisjf1;
				    sendText(sender,  chatbotResponse)
				    
				    chatbotResponse1 = response.data.analysisjf2;
				    sendText(sender,  chatbotResponse1)

				    chatbotResponse2 = response.data.analysisjf3;
				    sendText(sender,  chatbotResponse2)

				    chatbotResponse3 = response.data.analysisjf4;
				    sendText(sender,  chatbotResponse3)

				    chatbotResponse4 = response.data.analysisjf5;
				    sendText(sender,  chatbotResponse4)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    chatbotResponse1 = "not ok";
				    chatbotResponse2 = "not ok";
				    chatbotResponse3 = "not ok"
				    chatbotResponse4 = "not ok"
				    
				    sendText(sender, chatbotResponse)
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				  });

				
			}else if(text=='Equirino intersections-' || text=='equirino intersections-'){
				let chatbotResponse = "";
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/equirino-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysisjf1;
				    sendText(sender,  chatbotResponse)
				    
				    chatbotResponse1 = response.data.analysisjf2;
				    sendText(sender,  chatbotResponse1)

				    chatbotResponse2 = response.data.analysisjf3;
				    sendText(sender,  chatbotResponse2)

				    chatbotResponse3 = response.data.analysisjf4;
				    sendText(sender,  chatbotResponse3)

				    chatbotResponse4 = response.data.analysisjf5;
				    sendText(sender,  chatbotResponse4)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    chatbotResponse1 = "not ok";
				    chatbotResponse2 = "not ok";
				    chatbotResponse3 = "not ok"
				    chatbotResponse4 = "not ok"
				    
				    sendText(sender, chatbotResponse)
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				  });

				
			}else if(text=='Jplaurel' || text=='jplaurel'){
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

				
			}else if(text=='Jplaurel-' || text=='jplaurel-'){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/jplaurel-')
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

				
			}else if(text=='Jplaurel intersections' || text=='jplaurel intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				let chatbotResponse5 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/jplaurel')
				  .then(function (response) {
				    //console.log(response);
			

				    chatbotResponse1 = response.data.analysisjp1;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysisjp2;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysisjp3;
				    sendText(sender, chatbotResponse3)

				    chatbotResponse4 = response.data.analysisjp4;
				    sendText(sender, chatbotResponse4)

				    chatbotResponse5 = response.data.analysisjp5;
				    sendText(sender, chatbotResponse5)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				   
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				    sendText(sender, chatbotResponse5)
				  });

				
			}else if(text=='Jplaurel intersections-' || text=='jplaurel intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				let chatbotResponse5 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/jplaurel-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysisjp1;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysisjp2;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysisjp3;
				    sendText(sender, chatbotResponse3)

				    chatbotResponse4 = response.data.analysisjp4;
				    sendText(sender, chatbotResponse4)

				    chatbotResponse5 = response.data.analysisjp5;
				    sendText(sender, chatbotResponse5)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				    sendText(sender, chatbotResponse5)
				  });

				
				
			}else if(text=='Mcarthur' || text=='mcarthur'){
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

				
			}else if(text=='Mcarthur-' || text=='mcarthur-'){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/mcarthur-')
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

				
			}else if(text=='Mcarthur intersections' || text=='mcarthur intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				let chatbotResponse5 = "";
				let chatbotResponse6 = "";
				let chatbotResponse7 = "";
				let chatbotResponse8 = "";
				let chatbotResponse9 = "";
				let chatbotResponse10 = "";
				let chatbotResponse11 = "";
				let chatbotResponse12 = "";
				let chatbotResponse13 = "";
				let chatbotResponse14 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/mcarthur')
				  .then(function (response) {
				    //console.log(response);
				  
				    
				    chatbotResponse1 = response.data.analysis22;
				    sendText(sender,  chatbotResponse1)

				    chatbotResponse2 = response.data.analysis23;
				    sendText(sender,  chatbotResponse2)

				    chatbotResponse3 = response.data.analysis24;
				    sendText(sender,  chatbotResponse3)

				    chatbotResponse4 = response.data.analysis25;
				    sendText(sender,  chatbotResponse4)

				    chatbotResponse5 = response.data.analysis26;
				    sendText(sender,  chatbotResponse5)

				    chatbotResponse6 = response.data.analysis27;
				    sendText(sender,  chatbotResponse6)

				    chatbotResponse7 = response.data.analysis28;
				    sendText(sender,  chatbotResponse7)

					chatbotResponse8 = response.data.analysis29;
				    sendText(sender,  chatbotResponse8)

				    chatbotResponse9 = response.data.analysis30;
				    sendText(sender,  chatbotResponse9)

				    chatbotResponse10 = response.data.analysis31;
				    sendText(sender,  chatbotResponse10)

				    chatbotResponse11 = response.data.analysis32;
				    sendText(sender,  chatbotResponse11)

				    chatbotResponse12 = response.data.analysis33;
				    sendText(sender,  chatbotResponse12)

				    chatbotResponse13 = response.data.analysis34;
				    sendText(sender,  chatbotResponse13)

				    chatbotResponse14 = response.data.analysis35;
				    sendText(sender,  chatbotResponse14)
				  })
				  .catch(function (error) {
				    //console.log(error);
				   
				    chatbotResponse1 = "not ok";
				    chatbotResponse2 = "not ok";
				    chatbotResponse3 = "not ok"
				    chatbotResponse4 = "not ok"
				    chatbotResponse5 = "not ok"
				    chatbotResponse6 = "not ok"
				    chatbotResponse7 = "not ok"
				    chatbotResponse8 = "not ok"
				    chatbotResponse9 = "not ok"
				    chatbotResponse10 = "not ok"
				    chatbotResponse11 = "not ok"
				    chatbotResponse12 = "not ok"
				    chatbotResponse13 = "not ok"
				    chatbotResponse14 = "not ok"

				    
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				    sendText(sender, chatbotResponse5)
				    sendText(sender, chatbotResponse6)
				    sendText(sender, chatbotResponse7)
				    sendText(sender, chatbotResponse8)
				    sendText(sender, chatbotResponse9)
				    sendText(sender, chatbotResponse10)
				    sendText(sender, chatbotResponse11)
				    sendText(sender, chatbotResponse12)
				    sendText(sender, chatbotResponse13)
				    sendText(sender, chatbotResponse14)
				  });

				
			}else if(text=='Mcarthur intersections-' || text=='mcarthur intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				let chatbotResponse5 = "";
				let chatbotResponse6 = "";
				let chatbotResponse7 = "";
				let chatbotResponse8 = "";
				let chatbotResponse9 = "";
				let chatbotResponse10 = "";
				let chatbotResponse11 = "";
				let chatbotResponse12 = "";
				let chatbotResponse13 = "";
				let chatbotResponse14 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/mcarthur-')
				  .then(function (response) {
				    //console.log(response);
				  
				    
				    chatbotResponse1 = response.data.analysis22;
				    sendText(sender,  chatbotResponse1)

				    chatbotResponse2 = response.data.analysis23;
				    sendText(sender,  chatbotResponse2)

				    chatbotResponse3 = response.data.analysis24;
				    sendText(sender,  chatbotResponse3)

				    chatbotResponse4 = response.data.analysis25;
				    sendText(sender,  chatbotResponse4)

				    chatbotResponse5 = response.data.analysis26;
				    sendText(sender,  chatbotResponse5)

				    chatbotResponse6 = response.data.analysis27;
				    sendText(sender,  chatbotResponse6)

				    chatbotResponse7 = response.data.analysis28;
				    sendText(sender,  chatbotResponse7)

					chatbotResponse8 = response.data.analysis29;
				    sendText(sender,  chatbotResponse8)

				    chatbotResponse9 = response.data.analysis30;
				    sendText(sender,  chatbotResponse9)

				    chatbotResponse10 = response.data.analysis31;
				    sendText(sender,  chatbotResponse10)

				    chatbotResponse11 = response.data.analysis32;
				    sendText(sender,  chatbotResponse11)

				    chatbotResponse12 = response.data.analysis33;
				    sendText(sender,  chatbotResponse12)

				    chatbotResponse13 = response.data.analysis34;
				    sendText(sender,  chatbotResponse13)

				    chatbotResponse14 = response.data.analysis35;
				    sendText(sender,  chatbotResponse14)
				  })
				  .catch(function (error) {
				    //console.log(error);
				   
				    chatbotResponse1 = "not ok";
				    chatbotResponse2 = "not ok";
				    chatbotResponse3 = "not ok"
				    chatbotResponse4 = "not ok"
				    chatbotResponse5 = "not ok"
				    chatbotResponse6 = "not ok"
				    chatbotResponse7 = "not ok"
				    chatbotResponse8 = "not ok"
				    chatbotResponse9 = "not ok"
				    chatbotResponse10 = "not ok"
				    chatbotResponse11 = "not ok"
				    chatbotResponse12 = "not ok"
				    chatbotResponse13 = "not ok"
				    chatbotResponse14 = "not ok"

				    
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				    sendText(sender, chatbotResponse5)
				    sendText(sender, chatbotResponse6)
				    sendText(sender, chatbotResponse7)
				    sendText(sender, chatbotResponse8)
				    sendText(sender, chatbotResponse9)
				    sendText(sender, chatbotResponse10)
				    sendText(sender, chatbotResponse11)
				    sendText(sender, chatbotResponse12)
				    sendText(sender, chatbotResponse13)
				    sendText(sender, chatbotResponse14)
				  });

				
			}else if(text=='Ecowestdr' || text=='ecowestdr'){
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

				
			}else if(text=='Ecowestdr-' || text=='ecowestdr-'){
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

				
			}else if(text=='Ecowestdr intersections' || text=='ecowestdr intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ecowestdr')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis5;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis6;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				  });

				
				
			}else if(text=='Ecowestdr intersections-' || text=='ecowestdr intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ecowestdr-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis5;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis6;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				  });

				
				
			}else if(text=='Ecoland-' || text=='ecoland-'){
				let chatbotResponse = "";
				let chatbotResponse1 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ecoland-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis6;
				    sendText(sender, chatbotResponse)

				    chatbotResponse1 = response.data.analysiscolor;
				    sendText(sender, chatbotResponse1)

				    
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    chatbotResponse1 = "not ok";
				    sendText(sender, chatbotResponse)
				     sendText(sender, chatbotResponse1)
				  });

				
			}else if(text=='Ecoland intersections-' || text=='ecoland intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ecoland-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis7;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis8;
				    sendText(sender, chatbotResponse2)

				     chatbotResponse3 = response.data.analysis9;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";


				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='Matina aplaya' || text=='matina aplaya'){
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

				
			}else if(text=='Matina aplaya intersections' || text=='matina aplaya intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/matinaaplaya')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis8;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis9;
				    sendText(sender, chatbotResponse2)

				     chatbotResponse3 = response.data.analysis10;
				    sendText(sender, chatbotResponse3)

				     chatbotResponse4 = response.data.analysis11;
				    sendText(sender, chatbotResponse4)


				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				     chatbotResponse4 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				     sendText(sender, chatbotResponse4)
				    
				  });

				
				
			}else if(text=='Matina aplaya-' || text=='matina aplaya-'){
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

				
			}else if(text=='Matina aplaya intersections-' || text=='matina aplaya intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/matinaaplaya-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis9;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis10;
				    sendText(sender, chatbotResponse2)

				     chatbotResponse3 = response.data.analysis11;
				    sendText(sender, chatbotResponse3)

				     chatbotResponse4 = response.data.analysis12;
				    sendText(sender, chatbotResponse4)


				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				     chatbotResponse4 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				     sendText(sender, chatbotResponse4)
				    
				  });

				
				
			}else if(text=='Ecoland' || text=='ecoland'){
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

				
			}else if(text=='Ecoland intersections' || text=='ecoland intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ecoland')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis10;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis11;
				    sendText(sender, chatbotResponse2)

				     chatbotResponse3 = response.data.analysis12;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";


				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='Tulip drive-' || text=='tulip drive-')
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

				
			}else if(text=='Tulip drive intersections-' || text=='tulip drive intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/tulipdr-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis11;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis12;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis13;
				    sendText(sender, chatbotResponse3)

				   

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				     sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='Tulip drive' || text=='tulip drive')
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

				
			}else if(text=='Tulip drive intersections' || text=='tulip drive intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/tulipdr')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis12;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis13;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis14;
				    sendText(sender, chatbotResponse3)

				   

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				     sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='Sandawa-' || text=='sandawa-')
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

				
			}else if(text=='Sandawa intersections-' || text=='sandawa intersections-')
			// if(text.includes("sandawa-"))
			{
				let chatbotResponse = "";
				let chatbotResponse1 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/sandawa-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis13;
				    sendText(sender, chatbotResponse)

				    chatbotResponse1 = response.data.analysis14;
				    sendText(sender, chatbotResponse1)

				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				     chatbotResponse1 = "not ok";
				    sendText(sender, chatbotResponse)
				    sendText(sender, chatbotResponse1)
				  });

				
			}else if(text=='Quimpo blvd-' || text=='quimpo blvd-')
			// if(text.includes("quimpo blvd"))
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

				
			}else if(text=='Quimpo blvd intersections-' || text=='quimpo blvd intersections-')
			// if(text.includes("sandawa-"))
			{
				let chatbotResponse = "";
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/quimpoblvd-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis14;
				    sendText(sender, chatbotResponse)

				    chatbotResponse1 = response.data.analysis15;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis16;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis17;
				    sendText(sender, chatbotResponse3)


				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				    sendText(sender, chatbotResponse)
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				  });

				
			}else if(text=='Sandawa' || text=='sandawa')
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

				
			}else if(text=='Sandawa intersections' || text=='sandawa intersections')
			// if(text.includes("sandawa-"))
			{
				let chatbotResponse = "";
				let chatbotResponse1 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/sandawa')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis15;
				    sendText(sender, chatbotResponse)

				    chatbotResponse1 = response.data.analysis16;
				    sendText(sender, chatbotResponse1)

				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				     chatbotResponse1 = "not ok";
				    sendText(sender, chatbotResponse)
				    sendText(sender, chatbotResponse1)
				  });

				
			}else if(text=='Quimpo blvd' || text=='quimpo blvd')
			// if(text.includes("quimpo blvd-"))
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

				
			}else if(text=='Quimpo blvd intersections' || text=='quimpo blvd intersections')
			// if(text.includes("sandawa-"))
			{
				let chatbotResponse = "";
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/quimpoblvd')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis16;
				    sendText(sender, chatbotResponse)

				    chatbotResponse1 = response.data.analysis17;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis18;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis19;
				    sendText(sender, chatbotResponse3)


				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				    sendText(sender, chatbotResponse)
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				  });

				
			}else if(text=='Quezon blvd-' || text=='quezon blvd-')
			// if(text.includes("quezon blvd"))
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

				// else if(text=='Quezon blvd intersections-' || text=='quezon blvd intersections-')
			}else if(text=='Quezon blvd intersections-' || text=='quezon blvd intersections-')
			// if(text.includes("sandawa-"))
			{
				let chatbotResponse = "";
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/quezonblvd-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis17;
				    sendText(sender, chatbotResponse)

				    chatbotResponse1 = response.data.analysis18;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis19;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis20;
				    sendText(sender, chatbotResponse3)

				    chatbotResponse4 = response.data.analysis21;
				    sendText(sender, chatbotResponse4)


				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    chatbotResponse1 = "not ok";
				    chatbotResponse2 = "not ok";
				    chatbotResponse3 = "not ok";
				    chatbotResponse4 = "not ok";
				    sendText(sender, chatbotResponse)
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				  });

				
			}else if(text=='Quezon blvd' || text=='quezon blvd')
			// if(text.includes("quezon blvd-"))
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

				
			}else if(text=='Quezon blvd intersections' || text=='quezon blvd intersections')
			// if(text.includes("sandawa-"))
			{
				let chatbotResponse = "";
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/quezonblvd')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis18;
				    sendText(sender, chatbotResponse)

				    chatbotResponse1 = response.data.analysis19;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis20;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis21;
				    sendText(sender, chatbotResponse3)

				    chatbotResponse4 = response.data.analysis22;
				    sendText(sender, chatbotResponse4)


				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    chatbotResponse1 = "not ok";
				    chatbotResponse2 = "not ok";
				    chatbotResponse3 = "not ok";
				    chatbotResponse4 = "not ok";
				    sendText(sender, chatbotResponse)
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				  });

				
			}else if(text=='Cabaguio avenue-' || text=='cabaguio avenue-')
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

				
			}else if(text=='Cabaguio intersections-' || text=='cabaguio intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/cabaguioave-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis19;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis20;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				  });

				
				
			}else if(text=='Ml quezon blvd-' || text=='ml quezon blvd-')
			// if(text.includes("ml quezon blvd"))
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

				
			} else if(text=='Ml quezon blvd intersections-' || text=='ml quezon blvd intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				let chatbotResponse5 = "";
				let chatbotResponse6 = "";
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/mlquezonblvd-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis20;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis21;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis22;
				    sendText(sender, chatbotResponse3)

				    chatbotResponse4 = response.data.analysis23;
				    sendText(sender, chatbotResponse4)

				    chatbotResponse5 = response.data.analysis24;
				    sendText(sender, chatbotResponse5)

				    chatbotResponse6 = response.data.analysis25;
				    sendText(sender, chatbotResponse6)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				     chatbotResponse4 = "not ok";
				     chatbotResponse5 = "not ok";
				     chatbotResponse6 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				    sendText(sender, chatbotResponse5)
				    sendText(sender, chatbotResponse6)
				    
				  });

				
				
			}else if(text=='Ml quezon blvd' || text=='ml quezon blvd')
			// if(text.includes("ml quezon blvd-"))
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

				
			}else if(text=='Ml quezon blvd intersections' || text=='ml quezon blvd intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				let chatbotResponse5 = "";
				let chatbotResponse6 = "";
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/mlquezonblvd')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis21;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis22;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis23;
				    sendText(sender, chatbotResponse3)

				    chatbotResponse4 = response.data.analysis24;
				    sendText(sender, chatbotResponse4)

				    chatbotResponse5 = response.data.analysis25;
				    sendText(sender, chatbotResponse5)

				    chatbotResponse6 = response.data.analysis26;
				    sendText(sender, chatbotResponse6)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				     chatbotResponse4 = "not ok";
				     chatbotResponse5 = "not ok";
				     chatbotResponse6 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				    sendText(sender, chatbotResponse5)
				    sendText(sender, chatbotResponse6)
				    
				  });

				
				
			}else if(text=='Cabaguio avenue' || text=='cabaguio avenue')
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

				
			}else if(text=='Cabaguio intersections' || text=='cabaguio intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/cabaguioave')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis22;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis23;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				  });

				
				
			}else if(text=='Dacudao avenue-' || text=='dacudao avenue-')
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

				
			}else if(text=='Dacudao intersections-' || text=='dacudao intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/dacudaoave-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis23;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis24;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				  });

				
				
			}else if(text=='Dacudao avenue' || text=='dacudao avenue')
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

				
			}else if(text=='Dacudao intersections' || text=='dacudao intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/dacudaoave')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis24;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis25;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				  });

				
				
			}else if(text=='Pichon street' || text=='pichon street')
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

				
			}else if(text=='Pichon st intersections' || text=='pichon st intersections'){
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				let chatbotResponse5 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/pichonst')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse1 = response.data.analysis26;
				    sendText(sender, chatbotResponse1)
				     chatbotResponse2 = response.data.analysis27;
				    sendText(sender, chatbotResponse2)
				     chatbotResponse3 = response.data.analysis28;
				    sendText(sender, chatbotResponse3)
				     chatbotResponse4 = response.data.analysis29;
				    sendText(sender, chatbotResponse4)
				     chatbotResponse5 = response.data.analysis30;
				    sendText(sender, chatbotResponse5)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse1 = "not ok";
				    chatbotResponse2 = "not ok";
				    chatbotResponse3 = "not ok";
				    chatbotResponse4 = "not ok";
				    chatbotResponse5 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				    sendText(sender, chatbotResponse5)
				  });

				
			}else if(text=='Pichon street-' || text=='pichon street-')
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

				
			}else if(text=='Pichon st intersections-' || text=='pichon st intersections-'){
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/pichonst-')
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

				
			}else if(text=='San pedro street' || text=='san pedro street')
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

				
			}else if(text=='San pedro intersections' || text=='san pedro intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/sanpedro')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis27;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis28;
				    sendText(sender, chatbotResponse2)

				     chatbotResponse3 = response.data.analysis29;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";


				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='F torres street-' || text=='f torres street-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/ftorresst-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis28;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='F torres intersections-' || text=='f torres intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ftorresst-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis29;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis30;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				  });

				
				
			}else if(text=='A bonifacio street-' || text=='a bonifacio street-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/abonifaciost-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis29;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='A bonifacio st intersections-' || text=='a bonifacio st intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/abonifaciost-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis30;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis31;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis32;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='F torres street' || text=='f torres street')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/ftorresst')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis30;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='F torres intersections' || text=='f torres intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/ftorresst')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis31;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis32;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				  });

				
				
			}else if(text=='A bonifacio street' || text=='a bonifacio street')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/abonifaciost')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis31;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='A bonifacio st intersections' || text=='a bonifacio st intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get('https://cryptic-eyrie-21978.herokuapp.com/abonifaciost')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis32;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis33;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis34;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='M roxas' || text=='m roxas')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/mroxas')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis32;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='M roxas intersections' || text=='m roxas intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/mroxas')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis33;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis34;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis35;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='M roxas-' || text=='m roxas-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/mroxas-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis33;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='M roxas intersections-' || text=='m roxas intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/mroxas-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis34;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis35;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis36;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='Jplaurel before gmall-' || text=='jplaurel before gmall-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/jplaureloutgmall-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis34;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Jplaurel gmall intersections-' || text=='jplaurel gmall intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/jplaureloutgmall-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis35;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis36;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				  });

				
				
			}else if(text=='Jplaurel before gmall' || text=='jplaurel before gmall')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/jplaureloutgmall')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis35;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Jplaurel gmall intersections' || text=='jplaurel gmall intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/jplaureloutgmall')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis36;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis37;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				  });

				
				
			}else if(text=='Cm recto' || text=='cm recto')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/cmrecto')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis36;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Cm recto intersections' || text=='cm recto intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				let chatbotResponse5 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get('https://cryptic-eyrie-21978.herokuapp.com/cmrecto')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis37;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis38;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis39;
				    sendText(sender, chatbotResponse3)

				    chatbotResponse4 = response.data.analysis40;
				    sendText(sender, chatbotResponse4)

				    chatbotResponse5 = response.data.analysis41;
				    sendText(sender, chatbotResponse5)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				     chatbotResponse4 = "not ok";
				     chatbotResponse5 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				    sendText(sender, chatbotResponse5)
				    
				  });

				
				
			}else if(text=='C bangoy-' || text=='c bangoy-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/cbangoy-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis37;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='C bangoy intersections-' || text=='c bangoy intersections-'){
				
				let chatbotResponse1 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/cbangoy-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis39;
				    sendText(sender, chatbotResponse1)


				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     

				    sendText(sender, chatbotResponse1)
				    
				    
				  });

				
				
			}else if(text=='C bangoy' || text=='c bangoy')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/cbangoy')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis38;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='C bangoy intersections' || text=='c bangoy intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/cbangoy')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis38;
				    sendText(sender, chatbotResponse1)
				     chatbotResponse2 = response.data.analysis39;
				    sendText(sender, chatbotResponse2)
				     chatbotResponse3 = response.data.analysis40;
				    sendText(sender, chatbotResponse3)


				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    
				    
				  });

				
				
			}else if(text=='R magsaysay-' || text=='r magsaysay-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/rmagsaysay-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis39;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='R magsaysay intersections-' || text=='r magsaysay intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/rmagsaysay-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis41;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis42;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis43;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='R magsaysay' || text=='r magsaysay')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/rmagsaysay')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis40;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='R magsaysay intersections' || text=='r magsaysay intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/rmagsaysay')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis40;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis41;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis42;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='Sta ana avenue-' || text=='sta ana avenue-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/staanaave-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis42;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Sta ana avenue intersections-' || text=='sta ana avenue intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/staanaave-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis43;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis44;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis45;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='Sta ana avenue' || text=='sta ana avenue')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/staanaave')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis41;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Sta ana intersections' || text=='sta ana intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/staanaave')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis42;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis43;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis44;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='Lapu lapu-' || text=='lapu lapu-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/lapulapu-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis45;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Lapu lapu intersections-' || text=='lapu lapu intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/lapulapu-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis46;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis47;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				    
				  });

				
				
			}else if(text=='Agdao flyover-' || text=='agdao flyover-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/agdaoflyover-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis46;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Agdao flyover intersections-' || text=='agdao flyover intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/agdaoflyover-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis47;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis48;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis49;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				     sendText(sender, chatbotResponse3)
				  });

				
				
			}else if(text=='Lapu lapu' || text=='lapu lapu')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/lapulapu')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis43;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Lapu lapu intersections' || text=='lapu lapu intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/lapulapu')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis44;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis45;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				    
				  });

				
				
			}else if(text=='Agdao flyover' || text=='agdao flyover')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/agdaoflyover')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis44;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Agdao flyover intersections' || text=='agdao flyover intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/agdaoflyover')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis45;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis46;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis47;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				     sendText(sender, chatbotResponse3)
				  });

				
				
			}else if(text=='R castillo-' || text=='r castillo-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/rcastillo-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis48;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='R castillo intersections-' || text=='r castillo intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/rcastillo-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis49;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis50;
				    sendText(sender, chatbotResponse2)

				   
				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				    
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				  });

				
				
			}else if(text=='R castillo' || text=='r castillo')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/rcastillo')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis47;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='R castillo intersections' || text=='r castillo intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get('https://cryptic-eyrie-21978.herokuapp.com/rcastillo')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis48;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis49;
				    sendText(sender, chatbotResponse2)

				   
				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				    
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				  });

				
				
			}else if(text=='Cp garcia-' || text=='cp garcia-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/cpgarcia-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis52;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Cp garcia intersections-' || text=='cp garcia intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/cpgarcia-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis53;
				    sendText(sender, chatbotResponse1)
				     chatbotResponse2 = response.data.analysis54;
				    sendText(sender, chatbotResponse2)
	  
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				   
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				    
				    
				  });

				
				
			}else if(text=='Diversion road-' || text=='diversion road-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/diversionroad-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis51;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Diversion road intersections-' || text=='diversion road intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				let chatbotResponse5 = "";
				let chatbotResponse6 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/diversionroad-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis52;
				    sendText(sender, chatbotResponse1)
				    chatbotResponse2 = response.data.analysis53;
				    sendText(sender, chatbotResponse2)
				    chatbotResponse3 = response.data.analysis54;
				    sendText(sender, chatbotResponse3)
				    chatbotResponse4 = response.data.analysis55;
				    sendText(sender, chatbotResponse4)
				    chatbotResponse5 = response.data.analysis56;
				    sendText(sender, chatbotResponse5)
				    chatbotResponse6 = response.data.analysis57;
				    sendText(sender, chatbotResponse6)
	  
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				     chatbotResponse4 = "not ok";
				     chatbotResponse5 = "not ok";
				     chatbotResponse6 = "not ok";
				   
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				    sendText(sender, chatbotResponse5)
				    sendText(sender, chatbotResponse6)
				    
				    
				    
				  });

				
				
			}else if(text=='Cm recto intersections' || text=='cm recto intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				let chatbotResponse5 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get('https://cryptic-eyrie-21978.herokuapp.com/cmrecto')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis37;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis38;
				    sendText(sender, chatbotResponse2)

				    chatbotResponse3 = response.data.analysis39;
				    sendText(sender, chatbotResponse3)

				    chatbotResponse4 = response.data.analysis40;
				    sendText(sender, chatbotResponse4)

				    chatbotResponse5 = response.data.analysis41;
				    sendText(sender, chatbotResponse5)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				     chatbotResponse4 = "not ok";
				     chatbotResponse5 = "not ok";

				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				    sendText(sender, chatbotResponse5)
				    
				  });

				
				
			}else if(text=='Diversion road' || text=='diversion road')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/diversionroad')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis50;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Diversion road intersections' || text=='diversion road intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				let chatbotResponse5 = "";
				let chatbotResponse6 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/diversionroad')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis51;
				    sendText(sender, chatbotResponse1)
				    chatbotResponse2 = response.data.analysis52;
				    sendText(sender, chatbotResponse2)
				    chatbotResponse3 = response.data.analysis53;
				    sendText(sender, chatbotResponse3)
				    chatbotResponse4 = response.data.analysis54;
				    sendText(sender, chatbotResponse4)
				    chatbotResponse5 = response.data.analysis55;
				    sendText(sender, chatbotResponse5)
				    chatbotResponse6 = response.data.analysis56;
				    sendText(sender, chatbotResponse6)
	  
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				     chatbotResponse4 = "not ok";
				     chatbotResponse5 = "not ok";
				     chatbotResponse6 = "not ok";
				   
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				    sendText(sender, chatbotResponse5)
				    sendText(sender, chatbotResponse6)
				    
				    
				    
				  });

				
				
			}else if(text=='Cp garcia' || text=='cp garcia')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/cpgarcia')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis49;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Cp garcia intersections' || text=='cp garcia intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/cpgarcia')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis50;
				    sendText(sender, chatbotResponse1)
				     chatbotResponse2 = response.data.analysis51;
				    sendText(sender, chatbotResponse2)
	  
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				   
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				    
				    
				  });

				
				
			}else if(text=='M quinones road' || text=='m quinones road')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/mquinonesrd')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis54;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='M quinones road intersections' || text=='m quinones road intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/mquinonesrd')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis55;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis56;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				    
				  });

				
				
			}else if(text=='M quinones road-' || text=='m quinones road-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/mquinonesrd-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis53;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='M quinones road intersections-' || text=='m quinones road intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/mquinonesrd-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis54;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis55;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				    
				  });

				
				
			}else if(text=='J rodriguez maa-' || text=='j rodriguez maa-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/jrodriguezmaa-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis56;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='J rodriguez maa intersections-' || text=='j rodriguez maa intersections-'){
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/jrodriguezmaa-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse1 = response.data.analysis57;
				    sendText(sender, chatbotResponse1)
				    chatbotResponse2 = response.data.analysis58;
				    sendText(sender, chatbotResponse2)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse1 = "not ok";
				    chatbotResponse2 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				  });

				
			}else if(text=='J rodriguez maa' || text=='j rodriguez maa')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/jrodriguezmaa')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis55;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='J rodriguez maa intersections' || text=='j rodriguez maa intersections'){
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/jrodriguezmaa')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse1 = response.data.analysis56;
				    sendText(sender, chatbotResponse1)
				    chatbotResponse2 = response.data.analysis57;
				    sendText(sender, chatbotResponse2)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse1 = "not ok";
				    chatbotResponse2 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				  });

				
			}else if(text=='Maa road-' || text=='maa road-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/maaroad-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis58;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Maa road intersections-' || text=='maa road intersections-'){
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/maaroad-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse1 = response.data.analysis59;
				    sendText(sender, chatbotResponse1)
				    chatbotResponse2 = response.data.analysis60;
				    sendText(sender, chatbotResponse2)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse1 = "not ok";
				    chatbotResponse2 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				  });

				
			}else if(text=='Maa road' || text=='maa road')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/maaroad')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis57;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Maa road intersections' || text=='maa road intersections'){
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get(' https://cryptic-eyrie-21978.herokuapp.com/maaroad')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse1 = response.data.analysis58;
				    sendText(sender, chatbotResponse1)
				    chatbotResponse2 = response.data.analysis59;
				    sendText(sender, chatbotResponse2)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse1 = "not ok";
				    chatbotResponse2 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				  });

				
			}else if(text=='Shrine hills road-' || text=='shrine hills road-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/shrinehillsrd-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis60;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Shrine hills road intersections-' || text=='shrine hills road intersections-')
			// if(text.includes("sandawa-"))
			{
				let chatbotResponse = "";
				let chatbotResponse1 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/shrinehillsrd-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis61;
				    sendText(sender, chatbotResponse)

				    chatbotResponse1 = response.data.analysis62;
				    sendText(sender, chatbotResponse1)

				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				     chatbotResponse1 = "not ok";
				    sendText(sender, chatbotResponse)
				    sendText(sender, chatbotResponse1)
				  });

				
			}else if(text=='Shrine hills road' || text=='shrine hills road')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/shrinehillsrd')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis59;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Shrine hills road intersections' || text=='shrine hills road intersections')
			// if(text.includes("sandawa-"))
			{
				let chatbotResponse = "";
				let chatbotResponse1 = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/shrinehillsrd')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis60;
				    sendText(sender, chatbotResponse)

				    chatbotResponse1 = response.data.analysis61;
				    sendText(sender, chatbotResponse1)

				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				     chatbotResponse1 = "not ok";
				    sendText(sender, chatbotResponse)
				    sendText(sender, chatbotResponse1)
				  });

				
			}else if(text=='Angliongto-' || text=='angliongto-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/angliongto-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis64;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Angliongto intersections-' || text=='angliongto intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/angliongto-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis65;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis66;
				    sendText(sender, chatbotResponse2)

				     chatbotResponse3 = response.data.analysis67;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";


				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='Buhangin cabantian road-' || text=='buhangin cabantian road-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/buhangincabantianroad-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis65;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Buhangin cabantian road intersections-' || text=='buhangin cabantian road intersections-'){
				
				let chatbotResponse1 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/buhangincabantianroad-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis66;
				    sendText(sender, chatbotResponse1)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				    
				    sendText(sender, chatbotResponse1)
				   
				    
				  });

				
				
			}else if(text=='Saint anthony subd-' || text=='saint anthony subd-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/saintanthonysubd-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis66;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Saint anthony subd intersections-' || text=='saint anthony subd intersections-'){
				
				let chatbotResponse1 = "";
				
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/saintanthonysubd-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis67;
				    sendText(sender, chatbotResponse1)
				    
	  
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				    
				   
				    sendText(sender, chatbotResponse1)
				  
				    
				    
				    
				  });

				
				
			}else if(text=='Angliongto' || text=='angliongto')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/angliongto')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis61;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Angliongto intersections' || text=='angliongto intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/angliongto')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis62;
				    sendText(sender, chatbotResponse1)

				    chatbotResponse2 = response.data.analysis63;
				    sendText(sender, chatbotResponse2)

				     chatbotResponse3 = response.data.analysis64;
				    sendText(sender, chatbotResponse3)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";


				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    
				  });

				
				
			}else if(text=='Buhangin cabantian road' || text=='buhangin cabantian road')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/buhangincabantianroad')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis62;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Buhangin cabantian road intersections' || text=='buhangin cabantian road intersections'){
				
				let chatbotResponse1 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/buhangincabantianroad')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis63;
				    sendText(sender, chatbotResponse1)

				   

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				    
				    sendText(sender, chatbotResponse1)
				   
				    
				  });

				
				
			}else if(text=='Saint anthony subd' || text=='saint anthony subd')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/saintanthonysubd')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis63;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Saint anthony subd intersections' || text=='saint anthony subd intersections'){
				
				let chatbotResponse1 = "";
				
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/saintanthonysubd')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis64;
				    sendText(sender, chatbotResponse1)
				    
	  
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				    
				   
				    sendText(sender, chatbotResponse1)
				  
				    
				    
				    
				  });

				
				
			}else if(text=='Cabantian road-' || text=='cabantian road-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/cabantianroad-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis68;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Cabantian road intersections-' || text=='cabantian road intersections-'){
				
				let chatbotResponse1 = "";
			
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/cabantianroad-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis68;
				    sendText(sender, chatbotResponse1)

				 

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     

				    sendText(sender, chatbotResponse1)
				    
				    
				  });

				
				
			}else if(text=='Cabantian road' || text=='cabantian road')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/cabantianroad')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis67;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Cabantian road intersections' || text=='cabantian road intersections'){
				
				let chatbotResponse1 = "";
			
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/cabantianroad')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis67;
				    sendText(sender, chatbotResponse1)

				 

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     

				    sendText(sender, chatbotResponse1)
				    
				    
				  });

				
				
			}else if(text=='Davao city maharlika-' || text=='davao city maharlika-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/davaomaharlika-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis69;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Davao city maharlika' || text=='davao city maharlika')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/davaomaharlika')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis70;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Davao bukidnon road-' || text=='davao bukidnon road-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/davaobukidnonroad-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis72;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Davao bukidnon road intersections-' || text=='davao bukidnon road intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/davaobukidnonroad-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis73;
				    sendText(sender, chatbotResponse1)
				    chatbotResponse2 = response.data.analysis74;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				  });

				
				
			}else if(text=='Davao bukidnon road' || text=='davao bukidnon road')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/davaobukidnonroad')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis71;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Davao bukidnon road intersections' || text=='davao bukidnon road intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				
				
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/davaobukidnonroad')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis72;
				    sendText(sender, chatbotResponse1)
				    chatbotResponse2 = response.data.analysis73;
				    sendText(sender, chatbotResponse2)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    
				  });

				
				
			}else if(text=='Daang maharlika' || text=='daang maharlika')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/daangmaharlika')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis76;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Daang maharlika intersections' || text=='daang maharlika intersections'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/daangmaharlika')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis77;
				    sendText(sender, chatbotResponse1)
				    chatbotResponse2 = response.data.analysis78;
				    sendText(sender, chatbotResponse2)
				    chatbotResponse3 = response.data.analysis79;
				    sendText(sender, chatbotResponse3)
				    chatbotResponse4 = response.data.analysis80;
				    sendText(sender, chatbotResponse4)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				     chatbotResponse4 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				    
				  });

				
				
			}else if(text=='Daang maharlika-' || text=='daang maharlika-')
			// if(text.includes("pichon street-"))
			{
				let chatbotResponse = "";
				
				//source : https://www.npmjs.com/package/axios
				axios.get('https://cryptic-eyrie-21978.herokuapp.com/daangmaharlika-')
				  .then(function (response) {
				    //console.log(response);
				    chatbotResponse = response.data.analysis77;
				    sendText(sender, chatbotResponse)
				  })
				  .catch(function (error) {
				    //console.log(error);
				    chatbotResponse = "not ok";
				    sendText(sender, chatbotResponse)
				  });

				
			}else if(text=='Daang maharlika intersections-' || text=='daang maharlika intersections-'){
				
				let chatbotResponse1 = "";
				let chatbotResponse2 = "";
				let chatbotResponse3 = "";
				let chatbotResponse4 = "";
				
				//source : https://www.npmjs.com/package/axios
				   axios.get(' https://cryptic-eyrie-21978.herokuapp.com/daangmaharlika-')
				  .then(function (response) {
				

				    chatbotResponse1 = response.data.analysis78;
				    sendText(sender, chatbotResponse1)
				    chatbotResponse2 = response.data.analysis79;
				    sendText(sender, chatbotResponse2)
				    chatbotResponse3 = response.data.analysis80;
				    sendText(sender, chatbotResponse3)
				    chatbotResponse4 = response.data.analysis81;
				    sendText(sender, chatbotResponse4)

				   
				  })
				  .catch(function (error) {
				    //console.log(error);
				     chatbotResponse1 = "not ok";
				     chatbotResponse2 = "not ok";
				     chatbotResponse3 = "not ok";
				     chatbotResponse4 = "not ok";
				    sendText(sender, chatbotResponse1)
				    sendText(sender, chatbotResponse2)
				    sendText(sender, chatbotResponse3)
				    sendText(sender, chatbotResponse4)
				    
				  });

				
				
			}else if(text=='Good day chatbot' || text=='Hi' || text=='Hello' || text=='good day chatbot' || text=='hi' || text=='hello')
			// if(text.includes("pichon street-"))
			{
				sendText(sender, 'Good day! My name is Bot and I am a Robot, I can extract real-time traffic congestion within Davao City. If you want to know the list commands type "Help" :)')


				
			}else if(text=='Thank you' || text== 'thank you')
			// if(text.includes("pichon street-"))
			{
				sendText(sender, "You\'re Welcome Hooman")
				
			}else if(text=='Descriptions' || text== 'descriptions')
			// if(text.includes("pichon street-"))
			{
				sendText(sender, " TRAFFIC CONGESTION MEANING!!!\n\nFREE FLOW OF TRAFFIC: walay traffic\n\nSLUGGISH FLOW OF TRAFFIC: tama tama ra traffic\n\nSLOW FLOW OF TRAFFIC: traffic jud sya kaayo\n\nTRAFFIC STOPPED or ROAD CLOSED: wala na jud ni lihok ang mga sakyanan")


				
			}else if(text=='Help' || text=='help')
			// if(text.includes("pichon street-"))
			{
				sendText(sender, 'Type "Roads":\nFor list of available roads\n\nType "Descriptions":\nFor better understanding of traffic congestion information')


				
			}else if(text=='Roads' || text=='roads')
			// if(text.includes("pichon street-"))
			{
				sendText(sender, 'LIST OF ROADS!\n "Equirino"\n "Jplaurel"\n "Mcarthur"\n "Ecowestdr"\n "Ecoland"\n "Matina aplaya"\n "Tulip drive"\n "Sandawa"\n "Quimpo blvd"\n "Quezon blvd"\n "Cabaguio avenue"\n "Ml quezon blvd"\n "Dacudao avenue"\n "Pichon street"\n "San pedro street"\n "F torres street"\n "A bonifacio street"\n "M roxas"\n "Jp laurel avenue"\n "Cm recto"\n "C bangoy"\n "R magsaysay avenue"\n "Sta ana avenue"\n "Lapu lapu"\n "Agdao flyover"\n "R castillo"\n "Cp garcia"\n "Diversion road"\n "M quinones road"\n "J rodriguez maa"\n "Maa road"\n "Shrine hills road"\n "Angliongto"\n "Buhangin cabantian road"\n "Saint anthony subd"\n "Cabantian road"\n "Davao bukidnon road"\n "Daang maharlika"\n\n"NOTE: If you want to know the traffic status of a specific intersection of the main road, just add "intersections" after the road name.')


				
			}else{
				 sendText(sender, 'Ooooopsss!.... that is something that I dont understand, I only understand specific inquiry! Please check your spelling.\nYou can type "Help" to know all the commands.')
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