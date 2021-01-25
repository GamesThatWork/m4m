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
    
    const shockwave= (n, count=500)=>{
      let buf =[];
      for( let x=0; x<count; x++) 
        buf[x]=  
            x<n+wavelength?  Math.sin( ((0 + (n-x))/wavelength ) *Math.PI)  / (n**2-n*x)
        :      0
      return buf;
    }
    
      // experimental power equations -- no joy  
      //   1/(n-x) * -Math.sin(((x-n)*2    )*Math.PI/50)  
      //    x<n? /* (x)       **4  / n**4   * */ -Math.sin((x-n)*2*Math.PI/50)  
      // :  x<n*2? /* (2*n-x)  **77  / n**77  * */ -Math.sin((x-n)*2*Math.PI/50) 
      //  :  0;
    
    
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
    case 'KeyM':
        map.visible=!map.visible;
        break; 
    case 'KeyE':
        eq.visible=!eq.visible;
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
        let h = g.hitBox;
        h.interactive=h.interactiveChildren=true;
        console.log("HITBOX", h);
        h.on("mousemove", trackit);
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
 
 