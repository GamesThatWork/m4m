

import  { newMap     } from './map.js'    ;
import  { newMath    } from './math.js'   ;
import  { newSpinner } from './spinner.js';
import  { newScope   } from './scope.js'  ;
import  { newReticle } from './reticle.js';
import  { newVoice   } from './voice.js';
import  { newPic     } from './pic.js';

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


const signal={
	bus:	document.querySelector("#bus"),
	list:	[],
	fire: 	event=> signal.bus.dispatchEvent( event ),
	on:   	(event, handler) => signal.bus.addEventListener( event, handler ),
	clear:  ()=>   signal.bus.parentNode.replaceChild( signal.bus.cloneNode(true), signal.bus),
	}

//const sequencer=document.body;











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
   // var wavelength=16;
    let tZero=0;    


   
	  const lineFunction={
		none:  (x,n)=>  0,                    
		start: (x,n)=>  -1,//(((x/n)/30)&1)? .01:-.01,//  .008 * (.5 - .5*Math.random()),//0.0005*(x%10),                    
		power: (x,n)=>  .0045,                    
		pulse: (x,n)=>  x<wavelength*3?   .0025 : 0, 
		wave:  (x,n)=>  Math.sin( (x/wavelength) *Math.PI)/1000 +0.002, 
		decay: (x,n)=>  (.01 / (505-x))**.75,
		prop:  (x,n)=>  -.125 /  (n**2-n*(x+3)),  // (5+x**1.2 ),
		full:  (x,n)=>  x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0 ,     // full featured shockwave 
		}
	  const areaFunction={
		power: (x,n)=>  n>350? 0 : .005,                                                                                      // power constant - everywhere all at once
		pulse: (x,n)=>  x<n+wavelength?   .005                                                                  :   0   ,   // pulse (heaviside)
		wave:  (x,n)=>  x<n+wavelength?  Math.sin( ((0 - (n-x))/wavelength ) *Math.PI)  / 500     +0.001        :   0   ,   // wavetrain
		decay: (x,n)=>  x<n+wavelength?  n==x? .00355 : Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / ((1+(n-x)*35  ) )  :   0   ,     // decay
		prop:  (x,n)=>  x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0 ,     // propagation
		full:  (x,n)=>  x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0 ,     // full featured shockwave 
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
    
    var plot=false, nLast=10000, areaFunc="full";


	const plotArea = name=> {
		scope.sim(  true );
		areaFunc=name;
		}
	const plotLine = name=>{ 
		scope.sim( false );
	 	scope.setLineColor( rgb2Color( getStyleSheetPropertyValue( `.${name}`, "color" )));
		scope.line( lineBuffer( name,  1 ) );
		};


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
    
    //********************* test the Math functions ********************
       


	const speak=  words=> {
		speechSynthesis.speak( new SpeechSynthesisUtterance(words));
		console.log(words);
		};


const answerKey={
	power:{},
	pulse:{},
	wave:{},
	decay:{ win:true},
	prop:{},
	}









	const mathButtons = e=> {

		const maths={};
		const buttons=[];
		const root   = document.createElement("div");
		root.id    = "mathspinner";
		const frame  = document.createElement("div");
		frame.id   = "spinnerwindow";
		
		
		document.querySelector("#container").append ( frame );
		frame.append ( root );


		["start","power","pulse","wave","decay","prop"].forEach( (name,i)=>{
			const b = document.createElement("button");
			b.classList.add( "mathfunc");
			b.classList.add( name );
			b.dataset.name=name;
			buttons.push(b );
			root.append( b ); 
			maths[ name ] = newMath(name);
	 		maths[ name ].showExpression( b); 
			});
    		
		const   hover = target => { plotLine(target.dataset.name ||"none" ); 
 								target.classList.add(  target.dataset.name ); 
								target.classList.add(  "undull"  ); 
								target.classList.remove(  "dull" ); 

									};
		const unhover = target => { plotLine( "none" );
 								target.classList.remove( target.dataset.name ); 
								target.classList.remove(  "undull"  ); 
								target.classList.add(       "dull"); 
								};
		const click =	target=> {  
			let name = target.dataset.name;
			if( name==="start")	{  
				plot=!plot;
				document.querySelector( ".play" ).setAttribute( "visibility",  plot? "hidden":"visible" );
				document.querySelector( ".pause").setAttribute( "visibility", !plot? "hidden":"visible" );
				//target.innerText= plot?"⏸︎":"⏵︎";
				}
			else	{
				speak( answerKey[ name ].text ||( answerKey[ name ].win? "Good choice.":"Incorrect" ) )					
				if(    answerKey[ name ].win ){
					 plotLine("none");
					 plotArea( name );
					 maths[ name ].showEquation(); 
					 target.classList.add( "right" );
					 }
				else target.classList.add( "wrong" );
				}
			};
		newSpinner( root, { hover, unhover, click, mousepad:document.body} );
		};
		




const grfx={ root:document.querySelector("#grfx"), url:"/assets/" };

const sequencer=document.querySelector("#bus");//document.body;
const listeners=[];

const perform = {
	end: ()=> sequencer.dispatchEvent( new Event("end")), //mostly internal use
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
					console.log( "say starts", speaker );
					pic.rando();
					newVoice( speaker, {caption:document.querySelector("#caption")} ).say( script[speaker] )	
					sequencer.addEventListener("end", e=>	{
						console.log( "say ends", speaker );
						pic.pause();
						document.body.addEventListener( "mousemove", e=> {
							console.log( "user says more", speaker );
							sequencer.dispatchEvent( new Event("complete") );
							}, {once:true} );
						}, {once:true} );
					}),
	pic: 	script=> Object.keys( script ).forEach( speaker=> newPic( speaker )[ script[speaker] ]() ),
	
	scope: 	script=> Object.keys( script ).forEach( command=> scope[  command ]( script[command] ) ),
		
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



	respond: events=>{   // events is a map of event names and step numbers
		console.log( "  < respond >  ", events);
		while( listeners.length){
			let o= listeners.pop();
			sequencer.removeEventListener( o.event, o.handler );
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
			sequencer.addEventListener( o.event, o.handler );
			});
		}
	}

const program=[
/*	{ speak:"testing here",	    respond:{ end:1 }},
	{ speak:"second phrase",	respond:{ end:2 }},
	{ speak:"here comes a picture --  2 seconds after I finish talking",		respond:{ end:3 }},
	{ wait: 2, 	respond:{ end:4 } },
	{ speak:"here I am", sprite: {filename:"romad.jpg",move:[200,100,0], size:0.3, turn:0.02, name:"popup"}, respond:{ end:5 }},
	{ wait: 2, 	respond:{ end:6 } },
	{ speak:"here I am", sprite: {filename:"base.jpg", move:[-600,-70,-1000], size:4,  name:"xg"}, respond:{ end:"next"}},
	{ wait: 2, 	respond:{ end:"next" } },
	{ speak:"camera move", camera: { move:[1000,220,0] }, respond:{ end:"next"} },
	{ wait: 2, 	respond:{ end:"next" } },
	{ speak:"camera move", camera: { move:[-100,-220,700] }, respond:{} }

	{ speak:"this is the environment",     sprite: {name:"bg",  filename:"lecturehall.webp", move:[   0, 0,   0]}, respond:{ end:"next"}},
	{ speak:"this is sid and his mom",     sprite: {name:"sid", filename:    "mom&sid.webp", move:[   0, 0,-100]}, respond:{ end:"next"}},
	{ speak:"this is professor angstrom",  sprite: {name:"ang", filename:   "angstrom.webp", move:[ 300, 0, 500]}, respond:{ end:"next"}},
	{ speak:"lets start the camera here",  camera: {move:[  850,  500,  -300] },                                   respond:{ end:"next"}},
	{ speak:"and move angstrom over some", sprite: {name:"ang", move:[-700, -200, 800] },                          respond:{ end:"next"}},
	{ speak:"and do a slow parallax move", camera: {move:[ -400,  -20,  1200], time:10 },                          respond:{ end:"next"}},
	*/

	{ id:"", say:{ claro:"welcome"    },  respond:{ complete:3} },
	{ id:"", say:{ claro:"challenge"  },  respond:{ complete:2} },
	{ id:"", say:{ claro:"intro"      },  respond:{ complete:3} },
	{ id:"", say:{ claro:"model"      },  respond:{ complete:4} },
	{ id:"", say:{ claro:"instrument" },  scope: { show: true},  pic: {claro:"small"},  respond:{ complete:5} },
	{ id:"", say:{ claro:"left"   },  scope: { bounds: "left" },                        respond:{ complete:6} },
	{ id:"", say:{ claro:"right"  },  scope: { bounds: "right left" },                  respond:{ complete:7} },
	{ id:"", say:{ claro:"steel"  },  scope: { bounds: "steel right left" },            respond:{ complete:8} },
	{ id:"", say:{ claro:"glass"  },  scope: { bounds: "glass steel right left" },      respond:{ complete:9} },

	]



var lastStep=0;
function sequence(  i  ){
	if( i==="next" ) i=lastStep+1;
	if( i>=program.length )	return;
	lastStep=i;
	let s= program[ i ];
	
	Object.keys( s ).forEach( k=> {
		if (!s[k])// &(typeof s[k] !== 'function') 
			console.error( k+" is not a valid action. Not yet, anyway.")
		else{
			console.log( k, s[k]);
			perform[ k ](s[k]);
			}});
	}

//document.body.onclick= e=>sequence( 0 );





















/*

		["power","pulse","wave","decay","prop"].forEach( name=>{
			let m = newMath(name);
			let b = document.createElement("button");
			buttons.push(b);
			b.classList.add( "mathfunc" );
		 	m.showExpression( b); 
			document.querySelector("#mathmenu").append ( b);
    		const hover = () =>{
				b.removeEventListener( "mouseover", hover);
				plotLine( m.name );
				b.addEventListener( "mouseout" , e=> {
					plotLine( "none" );
					b.addEventListener( "mouseover", hover);
					}, {once:true} );
				b.addEventListener( "click", e=> {  
					e.stopImmediatePropagation();
				    console.log("click", e.target, e.currentTarget,e)
					speak( answerKey[ m.name ].text ||( answerKey[ m.name ].win? "Good choice.":"Incorrect" ) )					
					if(    answerKey[ m.name ].win ){
						b.outerHTML=b.outerHTML;
						plotLine("none");
						plotArea( m.name );
						m.showEquation(); 
						b.classList.add( "right" );
						b.removeEventListener( "mouseover", hover);
						}
					else b.classList.add( "wrong" );
					}, {once:true});
				};
			b.addEventListener( "mouseover", hover);
			newSpinner( buttons );
			})
		};*/
    

    
    
    //********************* test the reticle ********************
    map.interactive=true;
    
    
    
    const retOptions = {  parent:map, 
                   min:{radius:50,heat:1}, 
                   max:{radius:70,heat:1}
                    }
    
    var r = newReticle( retOptions ).move(map.width/2,map.height/2)
                                    .show();
    
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
    /*
        map.addEventListener("mousemove", e=> r.move(e.clientX, e.clientY) );
    map.addEventListener("mouseleave",e=> 
        gsap.to(r, {x:map.width/2, y:map.height/2, duration: .5, ease: "elastic.out(1.1, 0.2 )"}));
    map.addEventListener("mouseenter",e=> 
        gsap.from( r, {immediacy:0, duration:1, ease: "linear"}));
    */

   const newPanel = ()=>{
  
    const dom = document.querySelector("#panel");
    dom.innerHTML=`
      <div id='msg' >text here </div>
      <button>Next</button>
      `;
  
  
    return self= {
      msg:      text=> dom.querySelector("div").innerText=text,
      next:     func=> dom.querySelector("button").addEventListener( "click", func, {once:true}),
      step:     s=> { self.msg(s.msg); self.next(s.next) },
      toggle:   ()=> dom.style.display= (dom.style.display=='none')? 'block':'none',
      }
  }
  







  
  const step=[
    {   
      msg:`Overpressure Model and Decomposition:

      All formulae and graphs in this demo are utterly ~ FAKE.  
      
      and there is a bug so please referesh browser if demo freezes.)
      `,
//      This is a MADEUP Source of equation
//          Modeling of the whole process of shock wave overpressure of free-field air explosion,
//          Defence Technology,
//          Zai-qing Xue, Shunping Li, Chun-liang Xin, Li-ping Shi, Hong-bin Wu,
//          Volume 15, Issue 5,2019,
//          (https://www.sciencedirect.com/science/article/pii/S2214914719300753)
//      `, 
        next: e=>{
          scope.bounds();
          scope.show();
          p.step( step[1] );
      } },
      {   
        msg:`We give the kids a 'scope that plots:
               
        y: pressure (MPa) 
        x: distance (km)
        t: time     (msec)

        (all units are FAKE)
                `, 
        next: e=>{
        //  math= newMath (  {  parent:document.body, x: 30, y:50} );
          math.full();
          tZero=Date.now();
          scope.reset();
          curve=curves[0];
          plot = true; 
          p.step( step[2] );
      } },
      {   
        msg:`The result we are aiming for is a full model of the moving shockwave
                `, 
        next: e=>{
          scope.reset();
     //     math.power();
          curve=curves[1];
          p.step( step[3] );
      } },
      {   
        msg:`For starts- the pressure is a function of explosive power - everywhere at once
                `, 
        next: e=>{
          scope.reset();
   ///       math.pulse();
          curve=curves[2];
          p.step( step[4] );
      } },      {   
        msg:`Then introduce a step function that shows the radius expanding at the speed of sound
                `, 
        next: e=>{
          scope.reset();
          math.wave();
          curve=curves[3];
          p.step( step[5] );
      } },
      {   
        msg:`Then model the pressure as a wavetrain (cosine curve))
                `, 
        next: e=>{
          scope.reset();
          math.decay();
          curve=curves[4];
          p.step( step[6] );
      } },
      {   
        msg:`Then add a term to model the wave's decay 
                `, 
        next: e=>{
          scope.reset();
          math.prop();
          curve=curves[5];
          p.step( step[7] );
      } },
      {   
        msg:`Let's show (free-air) propagation in 3 dimensions: Peak pressure follows inverse cube of distance
                `, 
        next: e=>{
          scope.reset();
          math.full();
          curve=curves[0];
          p.step( step[8] );
      } },
      {   
        msg:`Finally we put it all together
                `, 
        next: e=>{
              location.reload();
        } }
   ]
  
  var demo=false;

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
//    KeyM: e=>   map.visible=!map.visible,
    Digit0: e=>   newMath("full" ).showExpression(),
    Digit1: e=>   newMath("power").showExpression(),
    Digit2: e=>   newMath("pulse").showExpression(),
    Digit3: e=>   newMath("wave" ).showExpression(),
    Digit4: e=>   newMath("decay").showExpression(),
    Digit5: e=>   newMath("prop" ).showExpression(),
    KeyM:   mathButtons, // e=>  newMap,
	KeyQ: e=>	newPic("crew").position(200,200),	
	KeyN: e=>	newPic("crew").zoom(),	
	KeyC: e=>	newPic("claro").rando(),	
	KeyV: e=>	newVoice("claro", {caption:document.querySelector("#caption")} ).say( "pressure" ),	
    KeyE: e=>   eq.visible=!eq.visible,
    KeyG:       scope.show,
    KeyP: e=>{  tZero=Date.now();     scope.reset();   plot=!plot; }, 
    KeyB:       scope.bounds, 
    KeyT: e=>{  let h = scope.hitBox;    h.interactive=h.interactiveChildren=true;   h.on("mousemove", trackit); },
    KeyS: e=>{  synch= (synch=="max")? false : "max";     scope.reset();     scope.show(); }, 
    KeyX: e=>{  synch= (synch=="min")? false : "min";     scope.reset();     scope.show(); }, 
//	KeyC: e=>   curve = curves[++curvenumber % curves.length],
	KeyR:       scope.reset,
	KeyA: e=>	sequence( 0 ),
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