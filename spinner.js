

import  { sfx		 } from './sfx.js';
import  { Voice 	 } from './voice.js';
import  { signal 	 } from './signal.js';

export const newSpinner = ( root, cfg) =>{



//	const mousepad	= cfg?.mousepad || document.body;
	const mousepad	=                   document.body;
	const hover     = cfg?.hover    || (el=>el.style.color="white");
	const unhover   = cfg?.unhover  || (el=>el.style.color="grey");
	const click     = cfg?.click    || (el=>console.log( el.innerText ));
	const elements = Array.from( root.children);

	console.log( root, mousepad);
	const stepAngle = 360 / elements.length;
	const stepSize  = 1.0 * elements.reduce( (size,e)=> size+e.getBoundingClientRect().height, 0)/elements.length;
	const radius    = 1.05*Math.round( ( stepSize / 2) / Math.tan( Math.PI / elements.length ) );
	let trig=-1;
 	let oldTrig = trig;

	let momentum=0, rotation=2/12;


let oldTime, spinning = false;

const spin = time=>{

	time= Number( time );
	spinning=true;
	let t = time - (oldTime || time );
	oldTime = time;

	let rot=(rotation+2)%1;  /// always  0<= rotation <1
	let segment= Math.floor(24*rot); //0-23
	trig = (segment %4)==1? -2 : Math.floor(((24-segment)/4)%6);
	if( trig>-1 ) 	rot= 1-  trig/6;

	window.requestAnimationFrame( spin );
	root.style.transform = `translateZ(${-radius}px) rotateX(${ rot }turn) translateZ(${-radius}px)`;
	if( oldTrig!=trig)	{
	//	console.log( oldTrig, Math.floor(100* rot)+"%" , trig, elements[trig]?.dataset?.name  )	;
		if( elements[oldTrig])		unhover( elements[oldTrig]);
		if( elements[   trig])		  hover( elements[   trig]);
		if( trig>-1 )	sfx.jog.play();
		oldTrig=trig;
		}
	}

	root.style.transformOrigin= `0px ${.5*radius}px ${-radius}px`

	elements.forEach( (element,step) =>{
		element.style.transform =	`rotateX(${ step * stepAngle}deg) translateZ(${radius}px)`;
		element.classList.add("dull");
		});
	const spinScale = .004;//   360 /mousepad.getBoundingClientRect().height * 2;
	console.log( mousepad.getBoundingClientRect().height);
//	mousepad.addEventListener( 'mousemove', mouseMove, );
//	mousepad.addEventListener( 'mousedown', mouseDown  );
//	mousepad.addEventListener( 'mouseup',   mouseUp    );

	signal.onBody( 'mousemove', mouseMove, );
	signal.onBody(  'mousedown', mouseDown  );
	signal.onBody(  'mouseup',   mouseUp    );

	function mouseMove( e ) {
		if( Math.abs( e.movementX) > Math.abs( e.movementY)  )	return;
		e.stopImmediatePropagation();
		rotation +=e.movementY * spinScale;
	    if(!spinning)	spin();
		}
	
	function mouseDown( e ) {	
		if(  elements[ trig ]  && !Voice.speaking ){
			//	document.exitPointerLock();
			click( elements[ trig ]);
			sfx.current = sfx.button;
			}
		else sfx.current = sfx.button.disabled;
		console.log(  (sfx.current==sfx.button? "Click on ":"Aborted Click on " ) +trig );
		sfx.current.down.play(); 
		}
	function mouseUp( e ) {	sfx.current.up.play();}


	const self ={
		remove: ()=>{
//			mousepad.removeEventListener( 'mousemove', mouseMove  );
//			mousepad.removeEventListener( 'mousedown', mouseDown  );
//			mousepad.removeEventListener( 'mouseup',   mouseUp    );
			signal.offBody( 'mousemove', mouseMove  );
			signal.offBody( 'mousedown', mouseDown  );
			signal.offBody( 'mouseup',   mouseUp    );
			}
		};
	return self;
}


