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
const app = new PIXI.Application({width:1920, height:1080});
document.body.appendChild(app.view);


/** 
* * Visible version of the overpressure equation  (Sprite)
*/

import  { newMath } from './math.js';



const math=  newMath ().destruct();

const equation  =new PIXI.Sprite.from( '/assets/equation.png');
    equation.visible=false;
    equation.position.set(60,180);
    app.stage.addChild( equation )


let chart =new PIXI.Container();
    chart.position.set(12,460);
    app.stage.addChild( chart )
let map =new PIXI.Sprite.from( '/assets/map.png');
    map.visible=false;
    map.position.set(1020,0);
    app.stage.addChild( map )
    
    
    
    //********************* test the linechart ****************
       
    import  { newLineChart } from './linechart.js';
    let wavelength=25;
    let tZero=0;    
    /*
    const shockwave= (n, count=500)=>{
      let buf =[];
      for( let x=0; x<count; x++) 
        buf[x]=  
            x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)
        :      0
      return buf;
    }
*/

   
      const curves =[
        (x,n )=>  x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)            :   0   ,     // shock 
//      (x,n )=>  x<n+wavelength?   .005                                          / (1+(n-x)**2)          :   0   ,     // pulse
//      (x,n )=> (x<n+wavelength && x>n)?  .6 / ((x-n+wavelength/2)*(x-n+wavelength/2))                  :   0   ,     // pulse
        (x,n )=>   .0036 / ((x-n+wavelength/2)*(x-n+wavelength/2)+.5)                   ,     // pulse
        (x,n )=>  x<n+wavelength?  Math.sin( ((0 - (n-x))/wavelength ) *Math.PI)  / 500     +0.002        :   0   ,     // wavetrain
//      (x,n )=>  x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (1+(n-x)**2*x**1.2 )  :   0   ,     // decay
        (x,n )=>  x<n+wavelength?  n==x? .00355 : Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / ((1+(n-x)*35  ) )     :   0   ,     // decay
        (x,n )=>  x<n+wavelength?   1                                             / (5+x**1.2 )           :   0   ,     // prop
        ]
      var curvenumber=0;
    
    
  
  const buf=  Array.from(Array(500));

    const shockwave= (n, count=500)=>{
    for( let x=0; x<count; x++)     buf[x]=  curves[ curvenumber ]( x,n);
    return buf;
    }
    
    
    var synch=false, extra=false;
    
    
    const g = newLineChart (  {  parent:chart, data: null,
                            x:{  min:0.1, max:500,   px:1000}, 
                            y:{  min:-.00081, max:.005,  px:500}, 
                              });
    
    var plot=false;
    app.ticker.add( t=> {
      if( plot ){
        let n = Math.floor( ((Date.now()-tZero)/4) %500 );
        if (n<5)  g.reset();
        g.plot( shockwave( n )); 
        }
      });
    
    function trackit( e ){
      let p= e.data.getLocalPosition(e.target);
      let x= (p.x-37)/923;
      if( x<0 || x>1) return;
      console.log( x, p);
      g.plot( shockwave(x * 500) )
      if( synch ) setRadius( synch, x*111+50);
      }
    
    




    

    
    
    //********************* test the reticle ********************
    import  { newReticle } from './reticle.js';
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
      msg:`Overpressure Model and Decomposition: Demo for Dr Chad Rumchik

      All graphs and math operations in this demo are utterly FAKE.  


      (Please referesh browser if demo freezes.)

      Source of equation
          Modeling of the whole process of shock wave overpressure of free-field air explosion,
          Defence Technology,
          Zai-qing Xue, Shunping Li, Chun-liang Xin, Li-ping Shi, Hong-bin Wu,
          Volume 15, Issue 5,2019,
          (https://www.sciencedirect.com/science/article/pii/S2214914719300753)
      `, 
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
          curvenumber=0;
          plot = true; 
          p.step( step[2] );
      } },
      {   
        msg:`The result we are aiming for is a full model of the moving shockwave
                `, 
        next: e=>{
          g.reset();
          math.pulse();
          curvenumber=1;
          p.step( step[3] );
      } },
      {   
        msg:`We might start the kids with a simple spike representing the impulse component
                `, 
        next: e=>{
          g.reset();
          math.wave();
          curvenumber=2;
          p.step( step[4] );
      } },
      {   
        msg:`Then model the pressure as a wavetrain (cosine curve))
                `, 
        next: e=>{
          g.reset();
          math.decay();
          curvenumber=3;
          p.step( step[5] );
      } },
      {   
        msg:`Then add a term to model the wave's decay 
                `, 
        next: e=>{
          g.reset();
          math.prop();
          curvenumber=4;
          p.step( step[6] );
      } },
      {   
        msg:`Let's show (free-air) propagation in 3 dimensions: Peak pressure follows inverse cube of distance
                `, 
        next: e=>{
          g.reset();
          math.full();
          curvenumber=0;
          p.step( step[7] );
      } },
      {   
        msg:`Finally we put it all together
                `, 
        next: e=>{
              location.reload();
        } }
   ]
  
  var demo=true;
  const p= newPanel();
  
  p.step( step[0] );
   







document.addEventListener('keydown', e=>{
   switch(e.code){
     default: 
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


        case 'Digit1': math.pulse();  break;
        case 'Digit2': math.wave();   break;
        case 'Digit3': math.decay();  break;
        case 'Digit4': math.prop();   break;
    
        case 'KeyE':
          newMath (  {  parent:document.body, x: 30, y:50} );
          math.full();
          math.toggle();
          break




    case 'KeyM':
        map.visible=!map.visible;
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
        curvenumber=++curvenumber % curves.length;
        break; 
    case 'KeyS':
        synch= (synch=="max")? false : "max";
        g.reset();
        break; 
    case 'KeyX':
        synch= (synch=="min")? false : "min";
        g.reset();
        break; 
    case 'KeyR':
        g.reset();
        break; 
    }});
 
 