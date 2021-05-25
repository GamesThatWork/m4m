

import  { newMap   } from './map.js';
import  { newMath } from './math.js';
import  { newScope } from './scope.js';
import  { newReticle } from './reticle.js';


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


let scope =new PIXI.Container();
    scope.position.set(12,460);
    app.stage.addChild( scope )
let map =new PIXI.Sprite.from( '/assets/overlayedmap.png');
    map.visible=false;
    map.position.set(1020,0);
    app.stage.addChild( map )
    
    
    
    //********************* test the oscilloscope *************
    let wavelength=25;
    let tZero=0;    


   
	  const lineFunction={
		none:  (x,n)=>  0,                    
		power: (x,n)=>  .0045,                    
		pulse: (x,n)=>  x<wavelength*3?   .0025 : 0, 
		wave:  (x,n)=>  Math.sin( (x/wavelength) *Math.PI)/1000 +0.002, 
		decay: (x,n)=>  (.01 / (505-x))**.75,
		prop:  (x,n)=>  -.125 /  (n**2-n*x),  // (5+x**1.2 ),
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
//	let rgb= str.match( /([0-9])*/g );
	let rgb= str.match( /(?<r>[0-9])(?<g>[0-9])(?<b>[0-9])/ );
	console.log( str, rgb );
	return 0x010000*rgb[4] + 0x000100*rgb[7] + 0x0000001*rgb[10];
}



    
    var synch=false, extra=false;
    
    
    const g = newScope (  {  parent:scope, data: null,
                            x:{  min:0.1, max:500,   px:1000}, 
                            y:{  min:-.00081, max:.005,  px:500}, 
                              });
    
    var plot=false, nLast=10000, areaFunc="full";


	const plotArea = name=> areaFunc=name;
	const plotLine = name=>{ 
		console.log( "color", getStyleSheetPropertyValue( `.${name}`, "color" ), rgb2Color( getStyleSheetPropertyValue( `.${name}`, "color" )));
		g.setLineColor( rgb2Color( getStyleSheetPropertyValue( `.${name}`, "color" )));
		g.line( lineBuffer( name,  1 ) );
		};


//every frame
    app.ticker.add( t=> {
      if( plot ){
        let n = Math.floor( ((Date.now()-tZero)/4) %500 );
        if (n<nLast)  g.replot();
        nLast=n;
        g.plot( areaBuffer( areaFunc,  n ) ); 
        }
      });

//every mouse move    
    function trackit( e ){
      let p= e.data.getLocalPosition( scope );  
      let x= (p.x-37)/923;
      if( x<0 || x>1) return;
      g.plot( areaBuffer( areaFunc,  x*500 ) ); 
      if( synch ) setRadius( synch, x*111+50);
      }
    
    //********************* test the Math functions ********************
    


	const mathButtons = e=> {

		["power","pulse","wave","decay","prop"].forEach( name=>{
			let m = newMath(name);
			let d = document.createElement("div");
			let b = document.createElement("button");
			b.classList.add( "mathfunc" );
			d.classList.add( "mathfunc" );
			m.showExpression( d );
			d.append(b);
			document.querySelector("#mathmenu").append (  d );
			//m.showEquation( );
			b.addEventListener( "mouseover", e=> {
				plotLine( m.name );
				m.showEquation(); 
				});
			b.addEventListener( "mouseout" , e=> {
				plotLine( "none" ); 
				m.hideEquation();
				});
			b.addEventListener( "mousedown", e=>   
				plotArea( m.name )
				);
			})
		};
    

    
    
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
          g.bounds();
          g.show();
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
          g.reset();
          curve=curves[0];
          plot = true; 
          p.step( step[2] );
      } },
      {   
        msg:`The result we are aiming for is a full model of the moving shockwave
                `, 
        next: e=>{
          g.reset();
     //     math.power();
          curve=curves[1];
          p.step( step[3] );
      } },
      {   
        msg:`For starts- the pressure is a function of explosive power - everywhere at once
                `, 
        next: e=>{
          g.reset();
   ///       math.pulse();
          curve=curves[2];
          p.step( step[4] );
      } },      {   
        msg:`Then introduce a step function that shows the radius expanding at the speed of sound
                `, 
        next: e=>{
          g.reset();
          math.wave();
          curve=curves[3];
          p.step( step[5] );
      } },
      {   
        msg:`Then model the pressure as a wavetrain (cosine curve))
                `, 
        next: e=>{
          g.reset();
          math.decay();
          curve=curves[4];
          p.step( step[6] );
      } },
      {   
        msg:`Then add a term to model the wave's decay 
                `, 
        next: e=>{
          g.reset();
          math.prop();
          curve=curves[5];
          p.step( step[7] );
      } },
      {   
        msg:`Let's show (free-air) propagation in 3 dimensions: Peak pressure follows inverse cube of distance
                `, 
        next: e=>{
          g.reset();
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
    KeyE: e=>   eq.visible=!eq.visible,
    KeyG:       g.show,
    KeyP: e=>{  tZero=Date.now();     g.reset();   plot=!plot; }, 
    KeyB:       g.bounds, 
    KeyT: e=>{  let h = g.hitBox;    h.interactive=h.interactiveChildren=true;   h.on("mousemove", trackit); },
    KeyS: e=>{  synch= (synch=="max")? false : "max";     g.reset();     g.show(); }, 
    KeyX: e=>{  synch= (synch=="min")? false : "min";     g.reset();     g.show(); }, 
	KeyC: e=>   curve = curves[++curvenumber % curves.length],
	KeyR:       g.reset,
    help: e=>{  console.log(e.code);
	           let body = document.querySelector("body");
                body.requestFullscreen();
                if(       body.firstChild.isSameNode( helptext ))  body.removeChild(  helptext );
                else if ( body.firstChild )                        body.insertBefore( helptext, body.firstChild)
                else                                               body.appendChild(  helptext );
              }
        };
document.addEventListener('keydown', e=>(action[e.code] || action.help)( e ) );
 
 }