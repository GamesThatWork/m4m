export const newSpinner = ( root, cfg) =>{

	const mousepad	= cfg?.mousepad || document.body;
	const hover     = cfg?.hover    || (el=>el.style.color="white");
	const unhover   = cfg?.unhover  || (el=>el.style.color="grey");
	const click     = cfg?.click    || (el=>console.log( el.innerText ));
	const elements = Array.from( root.children);

	console.log( root, mousepad);
	const stepAngle = 360 / elements.length;
	const stepSize  = 1.0 * elements.reduce( (size,e)=> size+e.getBoundingClientRect().height, 0)/elements.length;
	const radius    = 1.05*Math.round( ( stepSize / 2) / Math.tan( Math.PI / elements.length ) );
	let spin =0;
	let diff =0;
	let trig=-1;
	let oldTrig = trig;



 const sound = {
      dom: null,
      playOnce: true,
      construct: ()=> {
        sound.api= new Audio("./assets/sfx/spinner.wav");
        sound.api.volume=.1;
        },
      replay: ()=> sound.playOnce=true,
      play: ()=> {
        if( sound.playOnce ){ 
          if( !sound.api) sound.construct();
//          console.log( "SOUND", sound);
          sound.api.currentTime=0;
          sound.api.play();
  //       sound.playOnce=false;
          }
        }
      }
console.log(sound);
	  sound.construct();

//let axis= document.createElement("div");
//root.append( axis );
root.style.transformOrigin= `0px ${.5*radius}px ${-radius}px`
//axis.innerHTML="_______________________________";

	elements.forEach( (element,step) =>
			element.style.transform =
			 `
			  rotateX(${ step * stepAngle}deg) 
			  translateZ(${radius}px)
			  `);
	elements.forEach( (element,step) =>	console.log( step, element));

	const spinScale = 360 /mousepad.getBoundingClientRect().height * 2;
	console.log( mousepad.getBoundingClientRect().height);
	mousepad.addEventListener( 'mousemove', mouseMove  );
	mousepad.addEventListener( 'click', mouseClick  );
	function mouseMove( e ) {
		e.stopImmediatePropagation();
		spin =  e.clientY*spinScale;
		
		trig = (elements.length- Math.round( spin/stepAngle )% elements.length )% elements.length;
		if( Math.abs(spin%stepAngle)<(stepAngle/3) ) 
			spin=  stepAngle * (elements.length-trig );
		if( Math.abs(spin%stepAngle)>(stepAngle/8) ) 
			trig=-1;
	//	root.style.transform = ` rotateX(${spin+diff}deg)`;
	root.style.transform = `
		translateZ(${-radius}px)
		rotateX(${spin+diff}deg)
		translateZ(${-radius}px)
		
		`;
		// translateZ(${radius}px)
		
		if( oldTrig!=trig)	{
			if( elements[oldTrig])		unhover( elements[oldTrig]);
			if( elements[   trig])		  hover( elements[   trig]);
			if( trig>-1 )	sound.play();
			oldTrig=trig;
			
			}
		}
	function mouseClick( e ) {	
		console.log("clicked on "+trig)
		if( elements[ trig ] ){
			sound.play();
			click( elements[ trig ]);
		}}

	const self ={	};
	return self;
}
