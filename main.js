

import  { newMap   } from './map.js';
import  { newMath } from './math.js';
import  { newLineChart } from './linechart.js';
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
const math=  newMath ().destruct();


let chart =new PIXI.Container();
    chart.position.set(12,460);
    app.stage.addChild( chart )
let map =new PIXI.Sprite.from( '/assets/overlayedmap.png');
    map.visible=false;
    map.position.set(1020,0);
    app.stage.addChild( map )
    
    
    
    //********************* test the linechart *************
    let wavelength=25;
    let tZero=0;    


   
      const curves =[
        (x,n )=>  x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0 ,     // full featured shockwave 
        (x,n )=>  n<150? 0 : .005,                                                                                      // power constant - everywhere all at once
        (x,n )=>  x<n+wavelength?   .005                                                                  :   0   ,   // pulse (heaviside)
//      (x,n )=>   .0036 / ((x-n+wavelength/2)*(x-n+wavelength/2)+.5)                   ,                             // pulse (spike)
        (x,n )=>  x<n+wavelength?  Math.sin( ((0 - (n-x))/wavelength ) *Math.PI)  / 500     +0.002        :   0   ,   // wavetrain
//      (x,n )=>  x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (1+(n-x)**2*x**1.2 )  :   0   ,   // decay
        (x,n )=>  x<n+wavelength?  n==x? .00355 : Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / ((1+(n-x)*35  ) )  :   0   ,     // decay
        (x,n )=>  x<n+wavelength?   1                                             / (5+x**1.2 )           :   0   ,   // propagation
        ]
        var curvenumber=0;
        var curve= curves[0];
	  const curveFunctions={
		power: (x,n)=>  n<150? 0 : .005,                                                                                      // power constant - everywhere all at once
		pulse: (x,n)=>  x<n+wavelength?   .005                                                                  :   0   ,   // pulse (heaviside)
		wave:  (x,n)=>  x<n+wavelength?  Math.sin( ((0 - (n-x))/wavelength ) *Math.PI)  / 500     +0.002        :   0   ,   // wavetrain
		decay: (x,n)=>  x<n+wavelength?  n==x? .00355 : Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / ((1+(n-x)*35  ) )  :   0   ,     // decay
		prop:  (x,n)=>  x<n+wavelength?   1                                             / (5+x**1.2 )           :   0   ,   // propagation
		full:  (x,n)=>  x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0 ,     // full featured shockwave 
		}	




    
  
    const buf=  Array.from(Array(500)); // this syntax creates an iterable, just 'Array(500)' will not.

    //const shockwave= (n, count=500)=>{
    ///for( let x=0; x<count; x++)     buf[x]=  curves[ curvenumber ]( x,n);
   // return buf;
   // }

    const shockwave= n=> buf.map( (b,i)=> curve(i,n) );
  
    


    
    var synch=false, extra=false;
    
    
    const g = newLineChart (  {  parent:chart, data: null,
                            x:{  min:0.1, max:500,   px:1000}, 
                            y:{  min:-.00081, max:.005,  px:500}, 
                              });
    
    var plot=false, nLast=10000;



//every frame
    app.ticker.add( t=> {
      if( plot ){
        let n = Math.floor( ((Date.now()-tZero)/4) %500 );
        if (n<nLast)  g.replot();
        nLast=n;
        g.plot( shockwave( n )); 
        }
      });

//every mouse move    
    function trackit( e ){
      let p= e.data.getLocalPosition( chart );  
      let x= (p.x-37)/923;
      if( x<0 || x>1) return;
      g.plot( shockwave(x * 500) )
      if( synch ) setRadius( synch, x*111+50);
      }
    
    




    

    
    
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
 // const p= newPanel();
  
 // p.step( step[0] );
   

///var p;


/*
document.addEventListener('keydown', e=>{
   switch(e.code){
     default: 
      break;
        alert(`
            M:   map toggle
            E:   equation toggle
            G:   graph toggle
            P:      plot travelling wave 
            B:      bounds (glass & steel) 
            T:      trace peak ("scrub")
            S:          synch outer ring 
            X:          synch inner ring 
            R:   reset
         ---?:---this-helpscreen---`) ;
        break;


        case 'Digit0': math.power();  break;
        case 'Digit1': math.pulse();  break;
        case 'Digit2': math.wave();   break;
        case 'Digit3': math.decay();  break;
        case 'Digit4': math.prop();   break;
        case 'Digit5': math.full();   break;
    
        case 'KeyE':
          newMath (  {  parent:document.body, x: 30, y:50} );
          math.full();
          math.toggle();
          break




    case 'KeyQ':
		let map = newMap();
//        map.visible=!map.visible;
        break; 
    case 'KeyG':
        g.show();
        break; 
    case 'KeyP':
        tZero=Date.now();
        g.reset();
        plot=!plot;
        break; 
    case 'KeyB':
        g.bounds();
        break; 
    case 'KeyT':
        plot=false;
        let h = g.hitBox;
        h.interactive=h.interactiveChildren=true;
        console.log("HITBOX", h);
        h.on("mousemove", trackit);
        break; 
    case 'KeyC':
        curve = curves[++curvenumber % curves.length];
        break; 
    case 'KeyS':
        synch= (synch=="max")? false : "max";
        g.reset();
        break; 
    case 'KeyX':
        synch= (synch=="min")? false : "min";
        g.reset();
        break; 
    case 'KeyD':
  
        p= newPanel();
        p.step( step[0] );
        break;        
    case 'KeyR':
        g.reset();
        break; 
    }});
*/
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
    Digit0: math.power,
    Digit1: math.pulse,
    Digit2: math.wave,
    Digit3: math.decay,
    Digit4: math.prop,
    Digit5: math.full,
    KeyM:   newMap,
    KeyE: e=>   eq.visible=!eq.visible,
    KeyG:       g.show,
    KeyP: e=>{  tZero=Date.now();     g.reset();   plot=!plot; }, 
    KeyB:       g.bounds, 
    KeyT: e=>{  let h = g.hitBox;    h.interactive=h.interactiveChildren=true;   h.on("mousemove", trackit); },
    KeyS: e=>{  synch= (synch=="max")? false : "max";     g.reset();     g.show(); }, 
    KeyX: e=>{  synch= (synch=="min")? false : "min";     g.reset();     g.show(); }, 
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