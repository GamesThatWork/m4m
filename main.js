

import  { newIcon    } from './icon.js'    ;
import  { newMap     } from './map.js'    ;
import  { newMath    } from './math.js'   ;
import  { newPic     } from './pic.js';
import  { program    } from './program.js';
import  { newReticle } from './reticle.js';
import  { signal     } from './signal.js'    ;
import  { newSpinner } from './spinner.js';
import  { sfx		 } from './sfx.js';
import  { newScope   } from './scope.js'  ;
import  { newVoice, Voice   } from './voice.js';

var wavelength=25.5;

window.onload= e=>{
 
/**
 * @module main 
 * @exports nothng - this runs directly under index.html
 * This is the main interface for the game, managing its several compnents
 * Main arranges components in screenspace (layout), time and logic.
 * 
 * This is also where design experiments, demos and informal unit testing occur.
 */

/**
 * This is the central PIXI display and update object
 */
 
/** 

* * Visible version of the overpressure equation and its  parts rendered in MathML
*/
//const math=  newMath ().destruct();

	const app = new PIXI.Application({
		view: document.querySelector("canvas"), 
		antialias: true, 
		backgroundAlpha:0, 
		width:1920, height:1080
		});
 



	//document.body.appendChild(app.view);
	let layerMap   = new PIXI.Container();
		layerMap  .position.set( 0,0);
	let layerScope = new PIXI.Container();
//		layerScope.position.set( 320,420); centered
		layerScope.position.set( 850,380 ); // on the right
	layerMap  .zorder=0;
	layerScope.zorder=0;
	app.stage.addChild( layerMap   );
    app.stage.addChild( layerScope );








    const map  = newMap (  "desktop"  ).show().move([ -10,-10]);
    const icon = newIcon ( "glass", { parent:layerMap, img:"glass" }).show().move([1000,100]).size([50,50]).hide();



    
    //********************* test the oscilloscope *************

		const b= 4*wavelength;  // move the wavecrest further right == expose more wave, older wave
		const m= 1;		     	// adjust the horizontal scale
		const s =.2;  			// adjust vertical scale
    
	const lineFunction={
		none:  (x,n)=>  0,                    
		start: (x,n)=>  -1,//(((x/n)/30)&1)? .01:-.01,//  .008 * (.5 - .5*Math.random()),//0.0005*(x%10),                    
		power: (x,n)=>  .0045,                    
		pulse: (x,n)=>  x<wavelength*3?   .0025 : 0, 
		wave:  (x,n)=>  Math.sin( (x/wavelength) *Math.PI)/1000 +0.002, 
		decay: (x,n)=>  (.01 / (505-x))**.75,
		prop:  (x,n)=>  -.125 /  (n**2-n*(x+3)),  // (5+x**1.2 ),
		full:  (x,n)=>      (x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0) ,     // full featured shockwave 
		xp0:   (x,n)=>   1* s*((m*x)<(b+wavelength)? Math.sin(((0+(b-m*x))/wavelength ) *Math.PI)/(b**2-b*m*x):0),
		xp1:   (x,n)=>   2* s*((m*x)<(b+wavelength)? Math.sin(((0+(b-m*x))/wavelength ) *Math.PI)/(b**2-b*m*x):0),
		xp2:   (x,n)=>   4* s*((m*x)<(b+wavelength)? Math.sin(((0+(b-m*x))/wavelength ) *Math.PI)/(b**2-b*m*x):0),
		xp3:   (x,n)=>   8* s*((m*x)<(b+wavelength)? Math.sin(((0+(b-m*x))/wavelength ) *Math.PI)/(b**2-b*m*x):0),
		xp4:   (x,n)=>  16* s*((m*x)<(b+wavelength)? Math.sin(((0+(b-m*x))/wavelength ) *Math.PI)/(b**2-b*m*x):0),
		xp5:   (x,n)=>  32* s*((m*x)<(b+wavelength)? Math.sin(((0+(b-m*x))/wavelength ) *Math.PI)/(b**2-b*m*x):0),
		}
	const boost=1.3;
	const areaFunction={
		none:  (x,n)=>  -.0007,
		start: (x,n)=>   .0007,
		power: (x,n)=>  n>350? 0 : .005,                                                                                      // power constant - everywhere all the time
		pulse: (x,n)=>  x<n+wavelength?   .005                                                                  :   0   ,   // pulse (heaviside)
		wave:  (x,n)=>  x<n+wavelength?  Math.sin( ((0 - (n-x))/wavelength ) *Math.PI)  / 500     +0.0015       :   0   ,   // wavetrain
		decay: (x,n)=>  x<n+wavelength?  n==x? .00355 : Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / ((1+(n-x)*35  ) )  :   0   ,     // decay
		prop:  (x,n)=>  x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0 ,     // propagation
		full:  (x,n)=>  x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0 ,     // full featured shockwave 
		xp0:   (x,n)=> 0.1 *boost* (x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0) ,
		xp1:   (x,n)=> 0.2 *boost* (x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0) ,
		xp2:   (x,n)=> 0.4 *boost* (x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0) ,
		xp3:   (x,n)=> 0.8 *boost* (x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0) ,
		xp4:   (x,n)=> 1.6 *boost* (x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0) ,
		xp5:   (x,n)=> 3.2 *boost* (x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0) 
		}	
	




		   
      const curves =[ 
			lineFunction.full, 
			lineFunction.power,
			lineFunction.pulse,
			lineFunction.wave,
			lineFunction.decay,
			lineFunction.prop ];
    	var curvenumber=0;
        var curve= curves[0];

    const buf=  Array.from(Array(500)); // this syntax creates an iterable, just 'Array(500)' will not.


    const shockwave= n=> buf.map( (b,i)=> curve(i,n) );

    const areaBuffer= (func, n)=> buf.map( (b,i)=> areaFunction[ func ](i,n) );
    const lineBuffer= (func, n)=> buf.map( (b,i)=> lineFunction[ func ](i,n) );
  
    function getStyleSheetPropertyValue(selectorText, propertyName) {
    // search backwards because the last match is more likely the right one
    for (var s= document.styleSheets.length - 1; s >= 0; s--) {
        var cssRules = document.styleSheets[s].cssRules ||
                document.styleSheets[s].rules || []; // IE support
        for (var c=0; c < cssRules.length; c++) {
            if (cssRules[c].selectorText === selectorText) 
                return cssRules[c].style[propertyName];
        }
    }
    return null;
}

function rgb2Color( str ){
	if( ! str ) return 0xFF0000;
	let rgb= str.match( /rgb\((?<r>[0-9]*), (?<g>[0-9]*), (?<b>[0-9]*)\)/ ).groups;
	return 0x010000*rgb.r + 0x000100*rgb.g + 0x0000001*rgb.b;
}



    
    var synch=false, extra=false;
    
    
    const scope = newScope (  {  parent:layerScope, data: null,
                            x:{  min:0.1, max:500,   px:1000}, 
                            y:{  min:-.00081, max:.005,  px:500}, 
                              });
    
    var plot=false, nLast=10000, areaFunc="none";


	const plotArea = name=> {
		scope.simulating(  true );
		areaFunc=name;
		}
	const plotLine = name=>{ 
		scope.simulating( false );
	 	scope.setLineColor( rgb2Color( getStyleSheetPropertyValue( `.${name}`, "color" )));
		scope.line( lineBuffer( name,  1 ) );
		};

var tZero=0;


//every frame
    app.ticker.add( t=> {
      if( plot ){
        let n = Math.floor( ((Date.now()-tZero)/4) %500 );
        if (n<nLast)  scope.replot();
        nLast=n;
        scope.plot( areaBuffer( areaFunc,  n ), n/500 ); 
        }
      }); 

//every mouse move    
    function trackit( e ){
      let p= e.data.getLocalPosition( scopeScreen );  
      let x= (p.x-37)/923;
      if( x<0 || x>1) return;
      scope.plot( areaBuffer( areaFunc,  x*500 ) ); 
      if( synch ) setRadius( synch, x*111+50);
      }
    

	let activeTrace=null;

//every mouse move  // pointerlocked  
    const trace= ( enable=true )=>{
	

		if( !enable )
			if( activeTrace  ) activeTrace.remove();
			else console.warn(  "Turning off non-existent trace." );
		else{
			if( activeTrace  ) return activeTrace;

			var km=0;
			const kmScale   = 1/50;  // trackball movemant to km
			const scopeScale= 500/8; // km to scope display units
			scope.reset();
			
			const self={
				mousemove: e=>{
					if( Math.abs( e.movementX)< Math.abs( e.movementY)  )	return;
	//				e.stopImmediatePropagation();
					km += e.movementX * kmScale;
					km = Math.max( 0.01, Math.min( km, 12));
					scope.plot( areaBuffer( areaFunc,  km* scopeScale ) ); 
					signal.fire( "radius", {km} );
					},
				remove: e=>{ 
					activeTrace =null;
					scope.reset();
					signal.offBody("mousemove", self.mousemove )
					},
				}
			activeTrace =self;
			signal.onBody("mousemove", self.mousemove );
			return self;
			}
		}
 
    


	
    //********************* test the Math functions ********************
       


	const speak=  words=> {
		speechSynthesis.speak( new SpeechSynthesisUtterance(words));
//		console.log(words);
		};

/*
(domain="math", answerKey={
											power:{},
											pulse:{},
											wave:{},
											decay:{ },
											prop:{win:true}
											} )*/

	const authorizePointerLock = e=>{
		document.body.requestPointerLock();
		document.exitPointerLock();
		signal	.offBody( "click", authorizePointerLock );
		}
	signal		.onBody(  "click", authorizePointerLock );

	var spinner;

	const makeSpinner = cfg=> {

		const oldFrame = document.querySelector("#spinnerwindow");
		if( spinner )	spinner.remove();
		if( oldFrame   )	oldFrame.remove();
		spinner = false;
		document.exitPointerLock();

		if( cfg===false )	return;
		
		document.body.requestPointerLock();

		const domain  = cfg?.domain  || "math";
		const answers = cfg?.answers || {}; 


		const allFacets={
				math:  ["start","power","pulse","wave","decay","prop"],
				xplo:  ["xp0",    "xp1",  "xp2", "xp3",  "xp4", "xp5"]
				};
		const facetNames=allFacets[ domain ];

		const tracing= domain=="xplo" && !!activeTrace;

//		console.log( cfg, facetNames, answers );

		answers.default = answers.default || "response";
		facetNames.forEach( f => answers[f] = answers[f] || answers.default  );


			
		const maths= {};//(domain=="math")? {} : null;
		const buttons=[];
		let traceFunc=null;
		const frame    = document.createElement("div");
		frame.id   = "spinnerwindow";
		frame.classList.add( new Date().toLocaleTimeString().replace(' ',''));
		document.querySelector("#math").append ( frame );
		const root   = document.createElement("div");
		root.id    = "spinner";
		frame.append ( root );
		facetNames.forEach( (name,i)=>{
			const b = document.createElement("button");
			b.classList.add( "spinfacet");
			b.classList.add( name );
			b.dataset.name=name;
			buttons.push(b );
			root.append( b ); 
			maths[ name ] = newMath(name);		// create math element
			maths[ name ].showExpression( b); 	// render symbol on facet
			});
    		
		const   hover = target => {
			target.classList.add(    "undull"     ); 
			target.classList.remove(  "dull"      ); 
			if( tracing ){
				 traceFunc= trace( true );
				 areaFunc= target.dataset.name ||"none"
				 }
			else plotLine( target.dataset.name ||"none" ); 
			};
		const unhover = target => { 
			target.classList.remove(  "undull"    ); 
			target.classList.add(       "dull"    ); 
			if( tracing ){
		//		 areaFunc= "none"
				 if( traceFunc ) 
				 traceFunc.mousemove( {movementX:1,movementY:0, stopImmediatePropagation:i=>true } ); //refresh trace
				 }
			else plotLine( "none" );
			};
		const click =	target=> {  
			let name = target.dataset.name;
			console.log( "click", name, answers );
//			if( tracing )	return;
		/*	if( name==="start")	{  
				plot=!plot;
				document.querySelector( ".play" ).setAttribute( "visibility",  plot? "hidden":"visible" );
				document.querySelector( ".pause").setAttribute( "visibility", !plot? "hidden":"visible" );
				//target.innerText= plot?"⏸︎":"⏵︎";
				}
			else */if( answers[ name ]=="right" && name!="start"){
				plotLine("none");
				plotArea( name );
				plot=true;
				tZero= Date.now();
				scope.replot();  

				maths[ name ].showEquation(); 
				}

			target.classList.add( answers[ name ]);
//			console.log( name +" => "+ answers[ name ] );
			signal.fire(  answers[ name ] );
			console.log( "<find> fires: "+ name +" => "+ answers[ name ] );
			};
		
		spinner = newSpinner( root, { hover, unhover, click, mousepad:document.body }  );
		return facetNames;
		};
			



var dbgid, currentSpeakerPic;

const listeners=[];

// self cancelling handlers

   //note that this handler is packaged inside the object,unlike the other 3
const respondOnceToBrowserEvent= {
	eventName: "",
	handler: e=>{
		signal.offBody( respondOnceToBrowserEvent.eventName, respondOnceToBrowserEvent.handler );
		signal.fire("response");
		}
	};
const respondOnceToMouseMovement	= e=> {
	signal.offBody( "mousemove", respondOnceToMouseMovement);
	setTimeout( e=>signal.fire( "response"), 300);
	console.log( "user responds to: ", dbgid );		
	sfx.ok.play(); 
	};
	
const respondOnceToSpeechEnds	= e=> {
	signal.off( "spoken",   respondOnceToSpeechEnds );
	setTimeout( e=>signal.fire( "response"), 300);
	currentSpeakerPic.pause();
	console.log( "Respond to end of speech ", dbgid );		
	};
	
const speechEndsExpectMouseMovement	= e=> {
	signal.off( "spoken",  speechEndsExpectMouseMovement );
	signal.onBody( "mousemove", respondOnceToMouseMovement);
	currentSpeakerPic.pause();
	console.log( "Wait for mouse movement after speech ", dbgid );		
	};
	


const perform = {
	end: 	()=> signal.fire( "end" ), //mostly internal use
	now: 		next	=> sequence(next===true?"next":next ), //no user interaction
	timeout: 	seconds	=> setTimeout( e=>signal.fire("response"), seconds*1000 ),
	await:		action	=> signal.onBody( respondOnceToBrowserEvent.eventName=action, respondOnceToBrowserEvent.handler ),
	
//immediate has problems, deprecated
/*	immediate: 	msg		=> signal.fire( typeof msg=="string"? msg : "response" ), //no user interaction
	/// deprecated function
	speak: words=> {
		speechSynthesis.cancel( );
		console.log( "  < speak >  ", words);
		let u= new SpeechSynthesisUtterance(words);
		u.onend= signal.fire( "spoken" ), 
		speechSynthesis.speak(  u );
		},
*/	
	voice: script=>	
		Object.keys( script ).forEach( speaker=>
			newVoice( speaker, {caption:document.querySelector("#caption")} ).say( script[speaker] )),
	
	monolog: script=>	
		Object.keys( script ).forEach( speaker=>{
			dbgid = speaker  +": "+ script[speaker].substring(0,12);
			currentSpeakerPic = newPic( speaker );
			currentSpeakerPic.rando();
			console.log( "say: ", dbgid );
			signal.on( "spoken", respondOnceToSpeechEnds  ); 
			newVoice( speaker, {caption:document.querySelector("#caption")} ).say( script[speaker] )	
			}),
	
	
	dialog: script=>	// will probably fail badly with more than one speaker - would need to serialize it, if needed
		Object.keys( script ).forEach( speaker=>{
			dbgid = speaker  +": "+ script[speaker].substring(0,50);
			currentSpeakerPic = newPic( speaker );
			currentSpeakerPic.rando();
			console.log( "say: ", dbgid );
			signal.on( "spoken", speechEndsExpectMouseMovement );
			newVoice( speaker, {caption:document.querySelector("#caption")} ).say( script[speaker] )	
			}),
		
	
	
	
	pic: 	script=> Object.keys( script ).forEach( pic => newPic(  pic  )[ script[ pic  ] ]() ),
	icon: 	script=> 
				Object.keys( script ).forEach( iconName => {
					let instructions =   script[ iconName ];
					let icon     = newIcon(  iconName, { parent:layerMap, ...instructions}  );
				//	console.log( "icon processor: 1. ", icon, instructions );
					Object.keys( instructions ).forEach( command =>{
				 		console.log( "icon processor: 2. ", iconName, command, instructions[command] )
						icon[ command ]( instructions[ command] );
						});
					}),
	map: 	script=> 
				Object.keys( script ).forEach( mapName => {
					let instructions =   script[ mapName ];
					let map     = newMap(  mapName, { parent:layerMap, ...instructions}  );
				//	console.log( "map processor: 1. ", map, instructions );
					Object.keys( instructions ).forEach( command =>{
				//		console.log( "map processor: 2. ", mapName, command, instructions[command] )
						map[ command ]( instructions[ command] );
						});
					}),
 	
	scope: 		script=> Object.keys( script ).forEach( command=> scope[     command ]( script[command] ) ),
	spinner: 	script=> Object.keys( script ).forEach( command=> spinner[   command ]( script[command] ) ),
	reticle: 	script=> Object.keys( script ).forEach( command=> reticle[   command ]( script[command] ) ),
	equation: 	script=> Object.keys( script ).forEach( command=> equation[  command ]( script[command] ) ),
	music: 		script=> Object.keys( script ).forEach( command=> sfx.music[ command ]( script[command] ) ),
	reboot: 	(    )=> window.location.reload(),

	find:	data => finder(data),
	trace:  enable=>{
				scope.reset();
				plot=false;
				areaFunc="full";
				trace( enable );
				},

	plot:  yes=>plot=yes,

	spin:  makeSpinner,

//kill this -made a feature of respond
	spinchoice: name=>	perform.respond( { 
					right   :name+"_right", 
					close   :name+"_close", 
					wrong   :name+"_wrong", 
					response:name+"_ask" }),

//deprecate - use immediate keyword, plus any respond
	goto: 		next =>	perform.respond( {continue:next} ),

// this is the only shorthand for respond -- or omit for respond
	then: 		next =>	perform.respond( {response:next} ),

	respond: events=>{   // events is a map of event names and step numbers

		if( events.pickRightWrong )	events= { 
					right   :events.pickRightWrong+"_right", 
					close   :events.pickRightWrong+"_close", 
					wrong   :events.pickRightWrong+"_wrong", 
					response:events.pickRightWrong+"_ask" }

		if( events.pickHighLow )	events= { 
					right   :events.pickHighLow+"_right", 
					high    :events.pickHighLow+"_high", 
					close   :events.pickHighLow+"_close", 
					low     :events.pickHighLow+"_low", 
					response:events.pickHighLow+"_ask" }
		
		if( events.pickLateEarly )	events= { 
					late    :events.pickLateEarly+"_late", 
					early   :events.pickLateEarly+"_early", 
					okay    :events.pickLateEarly+"_okay", 
					response:events.pickLateEarly+"_end" };

		if( events.pickLate )	events= { 
					late    :events.pickLate+"_late", 
					early   :events.pickLate+"_okay", 
					okay    :events.pickLate+"_okay", 
					response:events.pickLate+"_end" };
		
		

        let currentevents = Object.keys( events ).map( k=> `  ${k} -> "${events[k]} "`).join(" | ");
		console.log( "entering  <perform.respond> to compose:  ", currentevents);
		
		// clear all existing listeners
		while( listeners.length){
			let o= listeners.pop();
			signal.off( o.event, o.handler );
			}
		signal.clear();
//		signal.onBody( "mousemove", respondOnceToMouseMovement );

				// wait until current speech is completed before building response system
		let composeResponses=  e=>{
			if( e )		signal.off("spoken", composeResponses );
			
			Object.keys( events ).forEach( event=> {
				let listener={ event };
				listener.handler= ((nextStep,event)=>{
					console.log(`composing response Handler:  ${event} -> ${nextStep}` );
					return	e=>{
						console.log(`Handler listened to [${e.type}] and responding with  ${event} -> ${nextStep}` );
						sequence(nextStep);
						}
					})( events[ event ], event);
				listeners.push( listener );
				signal.on( listener.event, listener.handler );
				})};


		console.log( ( Voice.speaking? " -Deferred ":" - Immediate ") + "composition of <response> Handler(s) for --> "+currentevents)

		if( Voice.speaking )	signal.on("spoken", composeResponses );
		else					composeResponses( false ) ;
		}
	}


var lastStep=0;

function sequence(  i  ){

	let incoming=i;
	console.log(`<SEQUENCE idStep  = "${i}" >`);
	if( 			i === "next"    ) i = lastStep+1;
	else if (typeof i === "string"  ) i = program.findIndex ( step=> step.id===i );
	if(             i >=  program.length )	i=0;
	console.log(`<SEQUENCE idStep==> "${i}"   >(${ program[i].id })`);

	if( i<0 )	console.error(`Cannot find  ${incoming} among ${ program.map(o=>o.id ) }`)

	lastStep=i;

	let s= program[ i ];

//	if( s.then       )	s.respond= { response: s.then }
//	if( s.spinchoice )	s.respond= { right:s.spinchoice +"_right", close:s.spinchoice+"_close", wrong:s.spinchoice+"_wrong", response:s.spinchoice+"_ask" };
//	if(!s.respond && !s.spinchoice && !s.then && !s.goto)	s.then= "next";  //default progression   

//REMOVE THIS DEFAULT
//	if(!s.respond && !s.spinchoice && !s.then && !s.goto)	s.then= "next";  //default progression   

	Object.keys( s ).forEach( k=> {
		if (!perform[k])// &(typeof s[k] !== 'function') 
			console.warn( k+" is not a valid action. Not yet, anyway.")
		else{
			console.log("<sequencer> performs ", k, s[k]);
			perform[ k ](s[k]);
			}});
	}


  
    //********************* test the reticle ********************
 //  if( map ) map.interactive=true;
    
    
    
    const retOptions = {  parent:layerMap, 
                   min:{radius:50,heat:1}, 
                   max:{radius:70,heat:1}
                    }
    
	const    reticle = newReticle( retOptions ).hide();
//	reticle.position( [300, 352] ).listen().show();
    



    var   r =reticle;
    function track(e){
      let p = e.data.getLocalPosition( map );
      r.move( p.x, p.y);
      }
    
    
    function setRadius( which, newRadius ) {
        if(   retOptions[which].radius==newRadius  ) return;
        else  retOptions[which].radius =newRadius;  
        r.destruct();
        r = newReticle(retOptions).move(map.width/2,map.height/2)
                                 .show();
      }
      /*
        
    map.g.on("mouseout", e=>{
      gsap.to(   r, {x:map.width/2, y:map.height/2, duration: .5, ease: "elastic.out(1.1, 0.2 )"} );
      map.g.off("mousemove", track);
      });
    map.g.on("mouseover", e=> {
      gsap.from( r, {immediacy:0, duration:1, ease: "linear"});
      map.g.on("mousemove", track);
      });
*/


	const  newEquation= ()=>{
		const root = document.querySelector("#math");
		const div  = document.querySelector("#equation") ?? document.createElement("div");
		div.id="equation";
		root.appendChild( div );
		const style = div.style;
		const self = {
			get dom()  { return div;   },
			hide: ()=> { style.display="none";	return self;},
			show: ()=> { style.display="block";	return self;},
			}
		return self;
		},
	equation= newEquation();



const f11= event=>{
	event.currentTarget.requestFullscreen();
//	document.body.requestFullscreen();
	signal.offBody( "click", f11 );		}
signal.onBody(      "click", f11 );		

function positionIcon(  ){
	const m= newMap("bridges");
		
newIcon("win",  {parent:layerMap, img:"blue" }     ).x(  811).y( 830).size([  60,  60]).show();
newIcon("lose", {parent:layerMap, img:"blue" }     ).x(  660).y( 847).size([  60,  60]).show();
newIcon("bomb2",{parent:layerMap, img:"blue" }     ).x( 1301).y( 747).size([  60,  60]).show();
newIcon("blue", {parent:layerMap, img:"blue" }     ).x(  266).y( 735).size([  60,  60]).show();
//newIcon("shrine", {parent:layerMap, img:"shrine" } ).x(  493).y( 768).size([  35,  65] ).show();
newIcon("shrine", {parent:layerMap, img:"shrine" } ).x( 1610).y( 764).size([  35,  65] ).show();

/*
win  {x: 840, y: 852} 47.14122855808092
lose {x: 689, y: 874} 47.14122855808092
both {x: 1330, y: 770} 47.14122855808092
bothtarget{x: 1405, y: 288} 125.0797135508448
	newIcon("red.0",{parent:layerMap, img:"red1" } ).x(  10).y( 660).size([  60,  60]).show();
	newIcon("red.1",{parent:layerMap, img:"red3" } ).x( 211).y( 190).size([ 135, 135]).show();
    newIcon("red.2",{parent:layerMap, img:"red3" } ).x(1100).y(  30).size([ 135, 70]).show();
    newIcon("red.3",{parent:layerMap, img:"red1" } ).x(1225).y( -20).size([  55,  55]).show();
*/
	let which="shrine";
	const probe =newReticle( retOptions ).hide();

//	const probe =newIcon( which, { parent:layerMap, img:which } );
	
 	const size=[ 35,65];
	const pos={x:1300, y:10};
	var shifted= 1, nudge=1, resize=1.05, radius=25, beenhere=0;
document.querySelector("#caption").setAttribute("contentEditable", "true");
document.querySelector("#caption").style.top= "400px";
	
	const tweak = {      
		ArrowRight: e=>  pos.x+=nudge * shifted,
		ArrowLeft:  e=>  pos.x-=nudge * shifted,
		ArrowUp:    e=>  pos.y-=nudge *+ shifted,
		ArrowDown:  e=>  pos.y+=nudge * shifted,
		PageUp:		e=>	{size[0]*=resize*shifted; size[1]*=resize*shifted; radius*=resize*shifted; },
		PageDown:	e=>	{size[0]/=resize*shifted; size[1]/=resize*shifted; radius/=resize*shifted; },
		ShiftRight: e=>	 shifted=10,
		ShiftLeft:  e=>	 shifted=10,
		Space:		e=>	document.querySelector("#caption").innerText+=
  `[${pos.x},${pos.y}], `,
		Escape:		probe.drive,
		help:		e=>  {}
		};
	//document.addEventListener('keydown', e=>{
	signal.onBody('keydown', e=>{
		(tweak[e.code] || tweak.help)( e );
		probe.x( pos.x ).y( pos.y ).radius( radius ).show();
//		probe.x( pos.x ).y( pos.y ).size( size ).show();
		console.log( which, " ::: ", pos, radius );


		if( !beenhere++) document.querySelector("body").requestFullscreen();
		});
//	document.addEventListener('keyup',   e=> shifted = e.code.includes("Shift")? 1:shifted ) ;
	signal.onBody('keyup',   e=> shifted = e.code.includes("Shift")? 1:shifted ) ;
}


let activeFinderHandlers={};

const finder = cfg =>{

	var found= null, answered=null,  radius=0, shown=null;
	const probe =newReticle( retOptions ).unlisten();

//	Object.keys( activeFinderHandlers ).forEach( event=> document.body.removeEventListener( event, activeFinderHandlers[ event ] ) );
	Object.keys( activeFinderHandlers ).forEach( event=> signal.offBody( event, activeFinderHandlers[ event ] ) );
	activeFinderHandlers={};
	if( cfg===false )	return;


	const targetSets= {
		gameover: [
			{ name: "restart", x:  620, y: 464, radius:156, color: "yellow" },
			{ name: "replay",  x: 1300, y: 464, radius:150, color:   "blue" },
			],
		intro: [
			{ name: "blue",    x:  300, y: 770, radius: 66, color:   "blue" },
			{ name: "red0",    x:   45, y: 690, radius: 60, color:    "red" },
			{ name: "red1",    x:  275, y: 237, radius: 80, color:    "red" },
			{ name: "red2",    x: 1160, y:  70, radius: 80, color:    "red" },
			{ name: "red3",    x: 1245, y:  16, radius: 66, color:    "red" },
			{ name: "shrine",  x: 1625, y: 804, radius: 90, color:   "blue" },
			{ name: "bridge1", x:  772, y: 879, radius: 80, color: "yellow" },
			{ name: "bridge2", x: 1324, y: 346, radius: 84, color: "yellow" },
			{ name: "bridge3", x: 1488, y: 236, radius: 84, color: "yellow" },
			{ name: "hq",      x: 1338, y: 905, radius:159, color:   "blue" }
			],
		aim1: [
			{ name: "shrine",  x: 1625, y: 804, radius: 90, color:   "blue" },
			{ name: "bridge1", x:  772, y: 879, radius: 80, color: "yellow" },
			{ name: "bridge2", x: 1324, y: 346, radius: 84, color: "yellow" },
			{ name: "bridge3", x: 1488, y: 236, radius: 84, color: "yellow" },
			{ name: "hq",      x: 1338, y: 905, radius:159, color:   "blue" }
			],
		aim2:  [
			{ name: "shrine",  x: 1625, y: 804, radius: 90, color:   "blue" },
		//	{ name: "bridge1", x:  772, y: 879, radius: 80, color: "yellow" },
			{ name: "bridge2", x: 1324, y: 346, radius: 54, color: "yellow" },
			{ name: "bridge23",x: 1405, y: 288, radius:190, color: "yellow" },
			{ name: "bridge3", x: 1488, y: 236, radius: 54, color: "yellow" },
		//	{ name: "hq",      x: 1338, y: 905, radius:159, color:   "blue" }
			],
		bda1:{
			win: [
				{ name: "win",     x:  840, y: 852, radius: 66, color:   "blue"},
				{ name: "bridge1", x:  772, y: 879, radius: 80, color: "yellow", bda:true },
				],
			lose: [
				{ name: "lose",    x:  680, y: 847, radius: 66, color:   "blue" },
				{ name: "bridge1", x:  772, y: 879, radius: 80, color: "yellow", bda:true  },
				]
			},
		bda2:{
			win: [
				{ name: "win",     x: 1330, y: 770, radius: 66, color:   "blue" },
				{ name: "shrine",  x: 1625, y: 804, radius: 90, color:   "blue" },
				{ name: "bridge2", x: 1324, y: 346, radius: 84, color: "yellow", bda:true },
				{ name: "bridge3", x: 1488, y: 236, radius: 84, color: "yellow", bda:true },
				],
			lose: [
				{ name: "lose",    x: 1330, y: 770, radius: 66, color:   "blue" },
				{ name: "shrine",  x: 1625, y: 804, radius: 90, color:   "blue" },
				{ name: "bridge2", x: 1324, y: 346, radius: 84, color: "yellow", bda:true },
				{ name: "bridge3", x: 1488, y: 236, radius: 84, color: "yellow", bda:true },
				],
			}	
		};
	
	
	newMap("bridges").show();
	
	const setIcons={
		gameover: e=>{
			//newIcon("restart",{parent:layerMap, img:"restart" } ).x( 556).y( 400).size([ 128, 128]).show();
			//newIcon("replay" ,{parent:layerMap, img:"replay"  } ).x(1236).y( 400).size([ 128, 128]).show();
			signal.on("restart",  e=>{  localStorage.setItem("start","attractmode");  window.location.reload();} );
			signal.on("replay",   e=>{  localStorage.setItem("start","replay"     );  window.location.reload();} );
			newMap("gameover").show();
 			},
		intro: e=>{
			newIcon("blue",{parent:layerMap, img:"blue" } ).x( 266).y( 735).size([  60,  60]).show();
			newIcon("red0",{parent:layerMap, img:"red1" } ).x(  10).y( 660).size([  60,  60]).show();
			newIcon("red1",{parent:layerMap, img:"red3" } ).x( 211).y( 210).size([ 135,  60]).show();
			newIcon("red2",{parent:layerMap, img:"red3" } ).x(1100).y(  50).size([ 135,  60]).show();
			newIcon("red3",{parent:layerMap, img:"red1" } ).x(1225).y( -20).size([  55,  55]).show();
			newIcon("shrine",{parent:layerMap, img:"shrine" } ).x(1610).y( 764).size([ 35,  65] ).show();
			},
		aim1: e=>{	},
		aim2: e=>{
//			newIcon("shrine",{parent:layerMap, img:"shrine" } ).x(1433).y( 277).size([ 95, 95]).show();
			newIcon("shrine",{parent:layerMap, img:"shrine" } ).x(1610).y( 764).size([ 35,  65] ).show();
			},
		bda1:{
			win:  e=>newIcon("win",  {parent:layerMap, img:"blue" } ).x(  811).y( 830).size([  60,  60]).show(),
			lose: e=>newIcon("lose", {parent:layerMap, img:"blue" } ).x(  660).y( 847).size([  60,  60]).show()
			},
		bda2:{
			win:  e=>{
				newIcon("win",  {parent:layerMap, img:"blue" } ).x( 1301).y( 747).size([  30,  30]).show();
				newIcon("shrine",{parent:layerMap, img:"shrine" } ).x(1610).y( 764).size([ 35,  65] ).show();
	//			newIcon("shrine",{parent:layerMap, img:"shrine" } ).x(1433).y( 277).size([ 95, 95]).show();
				},
			lose: e=>{
				newIcon("lose", {parent:layerMap, img:"blue" } ).x( 1301).y( 747).size([  30,  30]).show();
				newIcon("shrine",{parent:layerMap, img:"shrine" } ).x(1610).y( 764).size([ 35,  65] ).show();
	//			newIcon("shrine",{parent:layerMap, img:"shrine" } ).x(1433).y( 277).size([ 95, 95]).show();
				}
			}
		};
	let domain = cfg.domain ?? "bda2";
	let result =!targetSets[domain].win? null : (newIcon("blue").getTime()==="okay"? "win":"lose");
	console.log( domain, result);

	             (result? setIcons[   domain ][ result ] : setIcons[   domain ])();
	let targets=  result? targetSets[ domain ][ result ] : targetSets[ domain ];

//	if( result ) setIcons[   domain ][ result ] ()
//	else		 setIcons[   domain ]();



	let busy=false;
	const dsq = (e,t)=> (e.x-t.x)*(e.x-t.x) + (e.y-t.y)*(e.y-t.y);


	sfx.music.play();
	sfx.music.volume(0.025);
		
	const handlers={
		mousemove: e=>{
			let target= targets.reduce( (closest,t)=> dsq(e,t) < dsq(e,closest)? t : closest, {x:-9999,y:-9999} );
			let d =  Math.sqrt(dsq( e, target));
			let r =  Math.max(0, target.radius - d);
			found =  d<25?  target : null;
		//	console.log( target.name, Math.floor(d), r  );
			probe.x( e.x ).y( e.y ).lines( found?.color ?? "grey" ).radius( r, target.color ).show();
			},
		mousedown: e => {
			if( busy ) 	return;
			let answer = 	!cfg?                     	   "No parameters on Finder"
						: 	(!cfg.answers?                 "No answers supplied"
						:	(!found?                       "Nothing found"	
						: 	(cfg?.answers[ found.name ] ?? 
							 cfg?.answers?.default      ?? found.name )));// (`No answer (nor default) for ${found.name}`  ))));
			console.log( "<find> will fire: "+ found?.name +" => "+ answer );
			sfx.current = found? sfx.button : sfx.button.disabled;
			sfx.current.down.play(); 
			answered=found? answer : null;
			if( found )	{
				sfx.music.volume(0.35);
				shown = newPic( found.name ).show().full();
				if( found.bda )	shown.bda();
				document.querySelector("#canvas").style.display="none";
				}
			else shown = null;
			},
		mouseup: e =>{ 
			sfx.current.up.play();
			if( answered ) 	signal.fire( answered );
			console.log( "<find> fires: "+ answered );
			if( shown ){
				shown.fadeout();
				signal.on( "pickill", e=>{
					signal.off( "pickill", this)
					document.querySelector("#canvas").style.display="block";
					busy=false;
					});
				setTimeout( e=>sfx.music.volume(.12), 2500 );
				setTimeout( e=>sfx.music.volume(.06), 4000 );
				setTimeout( e=>sfx.music.volume(.03), 5500 );
				setTimeout( e=>sfx.music.volume(.02), 7000 );
				}
			},

		keydown: e=>(action[e.code] ?? action.help)( e ) 
			
		}
//	Object.keys( handlers ).forEach( event=> document.body.addEventListener( event, handlers[ event ] ) );
	Object.keys( handlers ).forEach( event=> signal.onBody( event, handlers[ event ] ) );
	activeFinderHandlers=handlers;
}



signal.onBody('keydown', e=>(action[e.code] || action.help)( e ) );


  
  const helptext= document.createElement("ul");

helptext.id= "help";
helptext.innerHTML=`
    <li><b>M</b>:   map toggle                 </li>
    <li><b>E</b>:   equation toggle            </li>
    <li><b>G</b>:   graph toggle               </li>
    <li><b>P</b>:      plot travelling wave    </li>
    <li><b>C</b>:          next curve          </li>
    <li><b>B</b>:      bounds (glass & steel)  </li>
    <li><b>T</b>:      trace peak ("scrub")    </li>
    <li><b>S</b>:          synch outer ring    </li>
    <li><b>X</b>:          synch inner ring    </li>
    <li><b>R</b>:   reset                      </li>
    <li><b>D</b>:   demo sequence              </li>
    <li><b>Esc</b>: End demo                   </li>
    <li><b>any other key</b>: toggles this help</li>
` ;

const action={      
//   

    Digit0: e=>   newMath("full" ).showExpression(),
    Digit1: e=>   newMath("power").showExpression(),
    Digit2: e=>   newMath("pulse").showExpression(),
    Digit3: e=>   newMath("wave" ).showExpression(),
    Digit4: e=>   newMath("decay").showExpression(),
    Digit5: e=>   newMath("prop" ).showExpression(),
	KeyZ:   e=>   newPic("bridge2").show().full().bda(),
	KeyF:   finder,
	KeyQ:   positionIcon,
	KeyA:   e=> sequence( 0 ),
    KeyW:   e=> makeSpinner( spinner? false : { domain:"math", answers:{ start:{win:true}}}), // e=>  newMap,
    KeyM:       map.show(),
    KeyR:   e=> reticle.show().listen(),
    KeyG:       scope.show,
    KeyP: 	e=>{  tZero=Date.now();     scope.reset();   plot=!plot; }, 
    KeyB:       scope.bounds, 
    KeyT: 	trace,
    KeyS: e=>{  synch= (synch=="max")? false : "max";     scope.reset();     scope.show(); }, 
    KeyX: e=>{  synch= (synch=="min")? false : "min";     scope.reset();     scope.show(); }, 
    KeyZ: e=>{  localStorage.setItem( "start", "jumphere");  window.location.reload(); }, 
	help: e=>{  console.log(e.code); return;
	            let body = document.querySelector("body");
                body.requestFullscreen();
				body.requestPointerLock()
                if(       body.firstChild.isSameNode( helptext ))  body.removeChild(  helptext );
                else if ( body.firstChild )                        body.insertBefore( helptext, body.firstChild)
                else                                               body.appendChild(  helptext );
              }
        };

let start= localStorage.getItem(   "start") || 0;
           localStorage.removeItem("start");



sequence( start );
 }
