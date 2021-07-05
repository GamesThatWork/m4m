

import  { newSignal  } from './signal.js'    ;
import  { newMap     } from './map.js'    ;
import  { newMath    } from './math.js'   ;
import  { newSpinner } from './spinner.js';
import  { newSFX	 } from './sfx.js';
import  { newScope   } from './scope.js'  ;
import  { newReticle } from './reticle.js';
import  { newVoice   } from './voice.js';
import  { newPic     } from './pic.js';
import  { program    } from './program.js';

var wavelength=25.5;

window.onload= e=>{

const signal= newSignal();
console.log( signal );
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

const app = new PIXI.Application({
	view: document.querySelector("canvas"), 
	antialias: true, 
	backgroundAlpha:0, 
	width:1920, height:1080
	});
document.body.appendChild(app.view);


/** 
* * Visible version of the overpressure equation and its  parts rendered in MathML
*/
//const math=  newMath ().destruct();


let scopeScreen =new PIXI.Container();
    scopeScreen.position.set( 320,420);
    app.stage.addChild( scopeScreen )
let map =new PIXI.Sprite.from( '/assets/overlayedmap.png');
    map.visible=false;
    map.position.set(1020,0);
    app.stage.addChild( map )
    
    
    
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
		none:  (x,n)=>  0,
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
    
    
    const scope = newScope (  {  parent:scopeScreen, data: null,
                            x:{  min:0.1, max:500,   px:1000}, 
                            y:{  min:-.00081, max:.005,  px:500}, 
                              });
    
    var plot=false, nLast=10000, areaFunc="none";


	const plotArea = name=> {
		scope.simulating(  true );
		areaFunc=name;
		console.log( "plotArea: "+name, areaFunction[ name ]  );
		}
	const plotLine = name=>{ 
		scope.simulating( false );
	 	scope.setLineColor( rgb2Color( getStyleSheetPropertyValue( `.${name}`, "color" )));
		scope.line( lineBuffer( name,  1 ) );
//		console.log( "plotLine: "+name, lineFunction[ name ]  );
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
		scope.reset();

		const self={
			mouseMove: e=>{
				if( Math.abs( e.movementX)< Math.abs( e.movementY)  )	return;
				e.stopImmediatePropagation();
				km += e.movementX * kmScale;
				scope.plot( areaBuffer( areaFunc,  km* scopeScale ) ); 
				signal.bus.dispatchEvent( new CustomEvent( "radius", {detail:{ km} } ) );
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
		console.log(words);
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

		const domain  = cfg.domain  || "math";
		const answers = cfg.answers || {error: "answers not supplied"};//--fix
	
		const allFacets={
						math:  ["start","power","pulse","wave","decay","prop"],
						xplo:  ["xp0",    "xp1",  "xp2", "xp3",  "xp4", "xp5"]
						};
		const facetNames=allFacets[ domain ];

		const tracing= domain=="xplo";

		console.log( cfg, facetNames, answers );

		facetNames.forEach( f => answers[f] = answers[f] || {}   );


			
		const maths= {};//(domain=="math")? {} : null;
		const buttons=[];
		
		const oldFrame = document.querySelector("#spinnerwindow");
		if( oldSpinner )	oldSpinner.remove();
		if( oldFrame   )	oldFrame.remove();



		const frame    = document.createElement("div");
		frame.id   = "spinnerwindow";
		frame.classList.add( new Date().toLocaleTimeString().replace(' ',''));
		document.querySelector("#container").append ( frame );
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
			if( tracing )	return;
			if( name==="start")	{  
				plot=!plot;
				document.querySelector( ".play" ).setAttribute( "visibility",  plot? "hidden":"visible" );
				document.querySelector( ".pause").setAttribute( "visibility", !plot? "hidden":"visible" );
				//target.innerText= plot?"⏸︎":"⏵︎";
				}
			else if( answers[ name ].win ){
				plotLine("none");
				plotArea( name );  
				maths[ name ].showEquation(); 
				}
			let score  = answers[ name ].win ? "right":"wrong";
			target.classList.add( score );

			console.log("debug:: ima dispatch an event",      answers[ name ].signal ?? score  );
			signal.bus.dispatchEvent( new Event(              answers[ name ].signal ?? score ));
			console.log("debug:: i just dispatched an event", answers[ name ].signal ?? score  );
			};
		
		oldSpinner = newSpinner( root, { hover, unhover, click, mousepad:document.body }  );
		return facetNames;
		};
			




const grfx={ root:document.querySelector("#grfx"), url:"/assets/" };

const listeners=[];

const perform = {
	end: ()=> signal.bus.dispatchEvent( new Event("end")), //mostly internal use
	wait: seconds=> setTimeout( perform.end, seconds*1000 ),
	speak: words=> {
		speechSynthesis.cancel( );
		console.log( "  < speak >  ", words);
		let u= new SpeechSynthesisUtterance(words);
		u.onend= perform.end;
		speechSynthesis.speak(  u );
		},
	
	voice: script=>	
		Object.keys( script ).forEach( speaker=>
			newVoice( speaker, {caption:document.querySelector("#caption")} ).say( script[speaker] )	
			),
	
	say: 	script=>	
				Object.keys( script ).forEach( speaker=>{
					let pic = newPic( speaker );
					console.log( "say starts ", speaker );
					pic.rando();
					newVoice( speaker, {caption:document.querySelector("#caption")} ).say( script[speaker] )	
					signal.bus.addEventListener("end", e=>	{
						console.log( "say ends ", speaker );
						pic.pause();
						document.body.addEventListener( "mousemove", e=> {
							console.log( "user says more ", speaker );
							signal.bus.dispatchEvent( new Event("complete") );
							}, {once:true} );
						}, {once:true} );
					}),
	
	
	
	
	pic: 	script=> Object.keys( script ).forEach( speaker=> newPic( speaker )[ script[speaker] ]() ),
	
	scope: 	script=> Object.keys( script ).forEach( command=> scope[  command ]( script[command] ) ),

	trace:  e=>{
				scope.reset();
				plot=false;
				areaFunc="full";
				trace( true );
				},


	sprite: s=>{
		let key =  s.name || "default";
		if(!grfx.sprites ) 		 grfx.sprites=[];

		if( s.filename ){	
			if( grfx.sprites[ key ]) grfx.sprites[key].remove();
			grfx.sprites[ key ]= document.createElement("img");
			grfx.sprites[ key ].id = key;
			grfx.sprites[ key ].setAttribute("src", grfx.url + s.filename);
			grfx.sprites[ key ].style.position= "absolute";
			grfx.sprites[ key ].style.top     = 0;
			grfx.sprites[ key ].style.left    = 0;
			grfx.root.append( grfx.sprites[ key ] );
			}	
		let xfrm = ( s.move? `translate3D( ${s.move[0]}px, ${s.move[1]}px, ${s.move[2]||0}px )` : "" )
				+  ( s.turn? `     rotate( ${s.turn}turn )`                                   : "" )
				+  ( s.size? `      scale( ${s.size} )`                                       : "" );
		if( xfrm   ) grfx.sprites[ key ].style.transform= xfrm;
		if( s.time ) grfx.sprites[ key ].style.transition= `transform ${c.time}s` 
		}, 
	camera: c=>{
		if( c.move || c.turn || c.size )
			grfx.root.style.transform=
			   ( c.move? `translate3D( ${-c.move[0]}px, ${-c.move[1]}px, ${-c.move[2]||0}px )` : "" )
			+  ( c.turn? `   rotate(   ${-c.turn}turn )`                                       : "" )
			+  ( c.size? `    scale(   ${-c.size} )`                                           : "" );
		if( c.time ) grfx.root.style.transition= `transform ${c.time}s` 
		},

	spin: cfg =>{
	console.log( "spin", cfg)
			makeSpinner( cfg )	},



	respond: events=>{   // events is a map of event names and step numbers
		console.log( "  < respond >  ", events);
		console.log( "  < listeners >  ", listeners);
		while( listeners.length){
			let o= listeners.pop();
			signal.bus.removeEventListener( o.event, o.handler );
			}
		Object.keys( events ).forEach( k=> {
			let o={ event:k };
			o.handler= (nextStep=>{
				console.log("composing response ", nextStep );
				return	e=>{
					sequence(nextStep);
					console.log("responding ", nextStep, e );
					}
				})( events[k] );
			listeners.push(o);
			signal.bus.addEventListener( o.event, o.handler );
			});
		console.log( "  < listeners >  ", listeners);
		}
	}



var lastStep=0;

function sequence(  i  ){
	console.log(`<SEQUENCE idStep=" ${i} ">`);
	if( i==="next" ) i=lastStep+1;
	else if (typeof i  === "string") i=  program.findIndex ( step=> step.id===i );
	if( i>=program.length )	return;
	lastStep=i;

	let s= program[ i ];

	if(  s.then    )	s.respond= { complete: s.then } 
	if( !s.respond )	s.respond= { complete:"next"  } 

	Object.keys( s ).forEach( k=> {
		if (!perform[k])// &(typeof s[k] !== 'function') 
			console.error( k+" is not a valid action. Not yet, anyway.")
		else{
			console.log( k, s[k]);
			perform[ k ](s[k]);
			}});
	}


  
    //********************* test the reticle ********************
    map.interactive=true;
    
    
    
    const retOptions = {  parent:map, 
                   min:{radius:50,heat:1}, 
                   max:{radius:70,heat:1}
                    }
    /*var testicle  = newReticle( {  parent:document.body,//querySelector("#container"), 
					min:{radius:50,heat:1}, max:{radius:70,heat:1}})
						.move( 960, 540)
						.show()
						.listen();*/
        var r = newReticle( retOptions ).move(map.width/2,map.height/2)

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
      
        
    map.on("mouseout", e=>{
      gsap.to(   r, {x:map.width/2, y:map.height/2, duration: .5, ease: "elastic.out(1.1, 0.2 )"} );
      map.off("mousemove", track);
      });
    map.on("mouseover", e=> {
      gsap.from( r, {immediacy:0, duration:1, ease: "linear"});
      map.on("mousemove", track);
      });



  
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
	KeyA: e=>	sequence( 0 ),
    KeyW:   e=> makeSpinner({ domain:"math", answers:{ start:{win:true}}}), // e=>  newMap,
    KeyM:   e=> { map= map ?? newMap(); map.visible=!map.visible; },
	KeyN:   e=>   map.visible=!map.visible,
    KeyR:   e=> r  = newReticle( retOptions ).move(map.width/2,map.height/2).show().listen(),
    KeyG:       scope.show,
    KeyP: 	e=>{  tZero=Date.now();     scope.reset();   plot=!plot; }, 
    KeyB:       scope.bounds, 
    KeyT: 	trace,
    KeyS: e=>{  synch= (synch=="max")? false : "max";     scope.reset();     scope.show(); }, 
    KeyX: e=>{  synch= (synch=="min")? false : "min";     scope.reset();     scope.show(); }, 
    help: e=>{  console.log(e.code);
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