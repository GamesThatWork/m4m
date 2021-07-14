

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

		const b=2*wavelength;
		const m= .7;	
		const s = .7;
    
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
		start:  (x,n)=> .0025,
		power: (x,n)=>  n>350? 0 : .005,                                                                                      // power constant - everywhere all at once
		pulse: (x,n)=>  x<n+wavelength?   .005                                                                  :   0   ,   // pulse (heaviside)
		wave:  (x,n)=>  x<n+wavelength?  Math.sin( ((0 - (n-x))/wavelength ) *Math.PI)  / 500     +0.001        :   0   ,   // wavetrain
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
    

//every mouse move  // pointerlocked  
    const trace= ( yes=true )=>{
		var km=0;
		const kmScale   = 1/50;  // trackball movemant to km
		const scopeScale= 500/8; // km to scope display units
		const dbg=document.querySelector("#help");
		const bus=document.querySelector("#bus");
		scope.reset();
		
		const self={
			mouseMove: e=>{
				if( Math.abs( e.movementX)< Math.abs( e.movementY)  )	return;
				e.stopImmediatePropagation();
				km += e.movementX * kmScale;
				km = Math.max( 0.01, Math.min( km, 12));
				//dbg.innerText= Math.floor(km*100)/100;
				//dbg.innerText= km - km%0.001;
				scope.plot( areaBuffer( areaFunc,  km* scopeScale ) ); 
				signal.fire( "radius", {km} );
				},
	    	remove: e=>{ 
				scope.reset();
				document.body.removeEventListener("mousemove", self.mouseMove )
				},
			}
		document.body.addEventListener("mousemove", self.mouseMove );
		return yes? self : self.remove() ;
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
 

	var oldSpinner;

	const makeSpinner = cfg=> {


	
		const oldFrame = document.querySelector("#spinnerwindow");
		if( oldSpinner )	oldSpinner.remove();
		if( oldFrame   )	oldFrame.remove();
		oldSpinner = false;


		if( cfg===false )	return;



		const domain  = cfg?.domain  || "math";
		const answers = cfg?.answers || {}; 


		const allFacets={
				math:  ["start","power","pulse","wave","decay","prop"],
				xplo:  ["xp0",    "xp1",  "xp2", "xp3",  "xp4", "xp5"]
				};
		const facetNames=allFacets[ domain ];

		const tracing= domain=="xplo";

//		console.log( cfg, facetNames, answers );

		answers.default = answers.default || "response";
		facetNames.forEach( f => answers[f] = answers[f] || answers.default  );


			
		const maths= {};//(domain=="math")? {} : null;
		const buttons=[];
	
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
				 trace( true );
				 areaFunc= target.dataset.name ||"none"
				 }
			else plotLine( target.dataset.name ||"none" ); 
			};
		const unhover = target => { 
			target.classList.remove(  "undull"    ); 
			target.classList.add(       "dull"    ); 
			if( tracing ){
		//		 areaFunc= "none"
		//		 trace( false );
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
			else */if( answers[ name ]=="right" ){
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
			};
		
		oldSpinner = newSpinner( root, { hover, unhover, click, mousepad:document.body }  );
		return facetNames;
		};
			



var dbgid;
const mouseresponse	= e=> {
	e.target.removeEventListener( "mousemove", mouseresponse);
	setTimeout( e=>signal.fire( "response"), 300);
	console.log( "user responds to: ", dbgid );		
	sfx.ok.play(); 
	};

const listeners=[];

const perform = {
	end: ()=> signal.fire( "end" ), //mostly internal use
	wait: seconds=> setTimeout( e=>signal.fire("response"), seconds*1000 ),
	
	/// deprecated function
	speak: words=> {
		speechSynthesis.cancel( );
		console.log( "  < speak >  ", words);
		let u= new SpeechSynthesisUtterance(words);
		u.onend= signal.fire( "spoken" ), 
		speechSynthesis.speak(  u );
		},
	
	voice: script=>	
		Object.keys( script ).forEach( speaker=>
			newVoice( speaker, {caption:document.querySelector("#caption")} ).say( script[speaker] )),
	
	monolog: script=>	
		Object.keys( script ).forEach( speaker=>{
			dbgid = speaker  +": "+ script[speaker].substring(0,12);

			let pic = newPic( speaker );
			pic.rando();
			console.log( "say: ", dbgid );
			signal.on( "spoken", e=> setTimeout( e=>signal.fire( "response"), 250 ) ); 
			newVoice( speaker, {caption:document.querySelector("#caption")} ).say( script[speaker] )	
			}),
	
	
	dialog: script=>	
	Object.keys( script ).forEach( speaker=>{
		dbgid = speaker  +": "+ script[speaker].substring(0,12);

		let pic = newPic( speaker );
		pic.rando();
		console.log( "say: ", dbgid );
		signal.on( "spoken", e=>	{
			console.log( "spoken: ", dbgid );
			pic.pause();
			document.body.addEventListener( "mousemove", mouseresponse, {once:true} );
			}, {once:true} );
		newVoice( speaker, {caption:document.querySelector("#caption")} ).say( script[speaker] )	
		}),
	
	
	
	
	pic: 	script=> Object.keys( script ).forEach( pic => newPic(  pic  )[ script[ pic  ] ]() ),
	icon: 	script=> 
				Object.keys( script ).forEach( iconName => {
					let instructions =   script[ iconName ];
					let icon     = newIcon(  iconName, { parent:layerMap, ...instructions}  );
				//	console.log( "icon processor: 1. ", icon, instructions );
					Object.keys( instructions ).forEach( command =>{
				//		console.log( "icon processor: 2. ", iconName, command, instructions[command] )
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
	reticle: 	script=> Object.keys( script ).forEach( command=> reticle[   command ]( script[command] ) ),
	music: 		script=> Object.keys( script ).forEach( command=> sfx.music[ command ]( script[command] ) ),

	find:	data => finder(data),
	trace:  yes=>{
				scope.reset();
				plot=false;
				areaFunc="full";
				trace( yes  );
				},

	plot:  yes=>plot=yes,

	spin:  makeSpinner,

	spinchoice: name=>	perform.respond( { 
					right   :name+"_right", 
					close   :name+"_close", 
					wrong   :name+"_wrong", 
					response:name+"_ask" }),


	then: 		next =>	perform.respond( {response:next} ),

	goto: 		next =>	perform.respond( {continue:next} ),

	respond: events=>{   // events is a map of event names and step numbers

		if( events.continue )	return sequence( events.continue ); // shortcircuit response system

		if( events.spinRightWrong )	events= { 
					right   :events.spinRightWrong+"_right", 
					close   :events.spinRightWrong+"_close", 
					wrong   :events.spinRightWrong+"_wrong", 
					response:events.spinRightWrong+"_ask" }

		if( events.spinHighLow )	events= { 
					right   :events.spinHighLow+"_right", 
					high    :events.spinHighLow+"_high", 
					close   :events.spinHighLow+"_close", 
					low     :events.spinHighLow+"_low", 
					response:events.spinHighLow+"_ask" }
		
		

        let currentevents = Object.keys( events ).map( k=> `  ${k} -> "${events[k]} "`).join(" | ");
		console.log( "entering  <perform.respond> to compose:  ", currentevents);
		//console.log( "  < listeners >  ", listeners);
		
		// clear all existing listeners
		document.body.removeEventListener( "mousemove", mouseresponse );
		while( listeners.length){
			let o= listeners.pop();
			signal.off( o.event, o.handler );
			}
		signal.clear();
		
		// wait until current speech is completed before building response system

		let composeResponses=  e=>
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
				signal.once( listener.event, listener.handler );
				});


		console.log( ( Voice.speaking? " -Deferred ":" - Immediate ") + "composition of <response> Handler(s) for --> "+currentevents)

		if( Voice.speaking )	signal.once("spoken", composeResponses);
		else					composeResponses();
		}
	}



var lastStep=0;

function sequence(  i  ){

	let incoming=i;
	console.log(`<SEQUENCE idStep  = "${i}" >`);
	if( 			i === "next"    ) i = lastStep+1;
	else if (typeof i === "string"  ) i = program.findIndex ( step=> step.id===i );
	if(             i >=  program.length )	return;
	console.log(`<SEQUENCE idStep==> "${i}" >`);

	if( i<0 )	console.error(`Cannot find  ${incoming} among ${ program.map(o=>o.id ) }`)

	lastStep=i;

	let s= program[ i ];

//	if( s.then       )	s.respond= { response: s.then }
//	if( s.spinchoice )	s.respond= { right:s.spinchoice +"_right", close:s.spinchoice+"_close", wrong:s.spinchoice+"_wrong", response:s.spinchoice+"_ask" };
	if(!s.respond && !s.spinchoice && !s.then && !s.goto)	s.then= "next";  //default progression   

	Object.keys( s ).forEach( k=> {
		if (!perform[k])// &(typeof s[k] !== 'function') 
			console.error( k+" is not a valid action. Not yet, anyway.")
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

function positionIcon(  ){
	const m= newMap("bridges");
		
	newIcon("blue", {parent:layerMap, img:"blue" } ).x( 266).y( 735).size([  60,  60]).show();
	newIcon("red.0",{parent:layerMap, img:"red1" } ).x(  10).y( 660).size([  60,  60]).show();
	newIcon("red.1",{parent:layerMap, img:"red3" } ).x( 211).y( 190).size([ 135, 135]).show();
    newIcon("red.2",{parent:layerMap, img:"red3" } ).x(1100).y(  30).size([ 135, 135]).show();
    newIcon("red.3",{parent:layerMap, img:"red1" } ).x(1225).y( -20).size([  55,  55]).show();
	
	let which="red1";

	const probe =newReticle( retOptions ).hide();
//	const probe =newIcon( which, { parent:layerMap, img:which } );
	
 	const size=[ -70,70];
	const pos={x:1300, y:10};
	var shifted= 1, nudge=1, resize=1.05, radius=25, beenhere=0;
	
	
	const tweak = {      
		ArrowRight: e=>  pos.x+=nudge * shifted,
		ArrowLeft:  e=>  pos.x-=nudge * shifted,
		ArrowUp:    e=>  pos.y-=nudge * shifted,
		ArrowDown:  e=>  pos.y+=nudge * shifted,
		PageUp:		e=>	 size[0]=size[1]=radius*=resize * shifted,
		PageDown:	e=>	 size[0]=size[1]=radius/=resize * shifted,
		ShiftRight: e=>	 shifted=10,
		ShiftLeft:  e=>	 shifted=10,
		help:		e=>  {}
		};
	document.addEventListener('keydown', e=>{
		(tweak[e.code] || tweak.help)( e );
		probe.x( pos.x ).y( pos.y ).radius( radius ).show();
		console.log( which, " ::: ", pos, radius );
		if( !beenhere++) document.querySelector("body").requestFullscreen();
		});
	document.addEventListener('keyup',   e=> shifted = e.code.includes("Shift")? 1:shifted ) ;
}


const finder = cfg =>{


	var found= null,  radius=0, shown=null;
	const probe =newReticle( retOptions ).hide();

	const targets= [
		{ name: "blue",    x:  300, y: 770, radius: 66, color:   "blue" },
		{ name: "red0",    x:   45, y: 690, radius: 60, color:    "red" },
		{ name: "red1",    x:  275, y: 267, radius: 80, color:    "red" },
		{ name: "red2",    x: 1160, y: 100, radius: 80, color:    "red" },
		{ name: "red3",    x: 1245, y:  16, radius: 66, color:    "red" },
		{ name: "target0", x: 1433, y: 277, radius: 73, color:   "blue" },
		{ name: "bridge1", x:  772, y: 879, radius: 80, color: "yellow" },
		{ name: "bridge2", x: 1324, y: 346, radius: 84, color: "yellow" },
		{ name: "bridge3", x: 1488, y: 236, radius: 84, color: "yellow" },
		{ name: "hq",      x: 1338, y: 905, radius:159, color:   "blue" }
		];
	newMap("bridges");
	newIcon("blue",{parent:layerMap, img:"blue" } ).x( 266).y( 735).size([  60,  60]).show();
	newIcon("red0",{parent:layerMap, img:"red1" } ).x(  10).y( 660).size([  60,  60]).show();
	newIcon("red1",{parent:layerMap, img:"red3" } ).x( 211).y( 190).size([ 135, 135]).show();
    newIcon("red2",{parent:layerMap, img:"red3" } ).x(1100).y(  30).size([ 135, 135]).show();
    newIcon("red3",{parent:layerMap, img:"red1" } ).x(1225).y( -20).size([  55,  55]).show();
	

	let busy=false;
	const dsq = (e,t)=> (e.x-t.x)*(e.x-t.x) + (e.y-t.y)*(e.y-t.y);


	sfx.music.play();
	sfx.music.volume(0.025);
		
	const handlers={
		mousemove: e=>{
			let target= targets.reduce( (closest,t)=> dsq(e,t) < dsq(e,closest)? t : closest, targets[0]);
			let d =  Math.sqrt(dsq( e, target));
			let r = Math.max(0, target.radius - d);
			found =  d<25?  target : null;
		//	console.log( target.name, Math.floor(d), r  );
			probe.x( e.x ).y( e.y ).lines( found?.color ?? "grey" ).radius( r, target.color ).show();
			},
		mousedown: e => {
			if( busy ) 	return;
			let answer = 	!cfg? "No paramters on Finder"
						: 	(!cfg.answers? "No answers supplied"
						:	(!found? "Nothing found"	
						: 	(cfg.answers[ found.name ] || ("No answer for "+found.name))));

			if( found ) 	signal.fire( answer );
			console.log( "fires: "+ found?.name +" => "+ answer );
			sfx.current = found? sfx.button : sfx.button.disabled;
			sfx.current.down.play(); 
			if( found )	{
				sfx.music.volume(0.25);
				shown = newPic( found.name ).show().full();
				document.querySelector("#canvas").style.display="none";
				}
			else shown = null;
			},
		mouseup: e =>{ 
			sfx.current.up.play();
			if( shown ){
				shown.fadeout();
				signal.once( "pic.kill", e=>{
					document.querySelector("#canvas").style.display="block";
					busy=false;
					});
				setTimeout( e=>sfx.music.volume(.12), 1000 );
				setTimeout( e=>sfx.music.volume(.06), 2000 );
				setTimeout( e=>sfx.music.volume(.03), 3000 );
				setTimeout( e=>sfx.music.volume(.02), 4000 );
				}
			}
			
		}
	Object.keys( handlers ).forEach( event=> document.body.addEventListener( event, handlers[ event ] ) );
	
}






  
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
	KeyF:   finder,
	KeyQ:   positionIcon,
	KeyA:   e=>	sequence( 0 ),
    KeyW:   e=> makeSpinner( oldSpinner? false : { domain:"math", answers:{ start:{win:true}}}), // e=>  newMap,
    KeyM:       map.show(),
    KeyR:   e=> reticle.show().listen(),
    KeyG:       scope.show,
    KeyP: 	e=>{  tZero=Date.now();     scope.reset();   plot=!plot; }, 
    KeyB:       scope.bounds, 
    KeyT: 	trace,
    KeyS: e=>{  synch= (synch=="max")? false : "max";     scope.reset();     scope.show(); }, 
    KeyX: e=>{  synch= (synch=="min")? false : "min";     scope.reset();     scope.show(); }, 
    help: e=>{  console.log(e.code); return;
	            let body = document.querySelector("body");
                body.requestFullscreen();
				body.requestPointerLock()
                if(       body.firstChild.isSameNode( helptext ))  body.removeChild(  helptext );
                else if ( body.firstChild )                        body.insertBefore( helptext, body.firstChild)
                else                                               body.appendChild(  helptext );
              }
        };

document.addEventListener('keydown', e=>(action[e.code] || action.help)( e ) );
 
 }