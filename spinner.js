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
//	let spin =0;
//	let diff =0;
	let trig=-1;
 	let oldTrig = trig;

	let momentum=0, rotation=0;



let oldTime, spinning = false;

const spin = time=>{
	
//console.log("figure")
	time= Number( time );
	spinning=true;
	let t = time - (oldTime || time );
	oldTime = time;

//	spinning = true;
//	rotation +=( Math.sin( 6 * 2* Math.PI * rotation ) * t )/ 1000;



	

	let rot=(rotation+2)%1;  /// always  0<= rotation <1

	let segment= Math.floor(24*rot); //0-23

	//trig = Math.floor( rot*6 +.1);
	
	trig = (segment %4)==1? -1 : Math.floor(((24-segment)/4)%6);




	//let nudge = Math.cos( 6 * 2* Math.PI * rot );
  	//nudge = 0.01;// * nudge ^ nudge;
  	//nudge=.1 * Math.sign( (trig/6) - rot );


	//rotation += nudge;
/*
	let click = ((rot+1.95) %(1/6) ) < .05;  
	if ( click  ){
//		rotation = Math.floor(6* rotation)/6;
		spinning = false;
		trig = 5- Math.floor(11.49+rot*6)%6;
		}
	else{
		window.requestAnimationFrame( spin );
		trig=-1;
		}
*/
	window.requestAnimationFrame( spin );

	root.style.transform = `translateZ(${-radius}px) rotateX(${ rot }turn) translateZ(${-radius}px)`;

	if( oldTrig!=trig)	{
		console.log( oldTrig, Math.floor(100* rot)+"%" , trig, elements[trig]?.dataset?.name  )	;
		if( elements[oldTrig])		unhover( elements[oldTrig]);
		if( elements[   trig])		  hover( elements[   trig]);
		if( trig>-1 )	sound.play();
		oldTrig=trig;
		}
	
	}





 const sound = {
      dom: null,
      playOnce: true,
      construct: ()=> {
        sound.api= new Audio("./assets/sfx/tok.wav");
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

	elements.forEach( (element,step) =>{
		element.style.transform =	`rotateX(${ step * stepAngle}deg) translateZ(${radius}px)`;
		element.classList.add("dull");
		});
	const spinScale = .004;//   360 /mousepad.getBoundingClientRect().height * 2;
	console.log( mousepad.getBoundingClientRect().height);
	mousepad.addEventListener( 'mousemove', mouseMove  );
	mousepad.addEventListener( 'click', mouseClick  );



	function mouseMove( e ) {
		if( Math.abs( e.movementX) > Math.abs( e.movementY)  )	return;
		e.stopImmediatePropagation();
		
	//	momentum +=e.movementY;
//		rotation += momentum;


		rotation +=e.movementY * spinScale;
	    if(!spinning)	spin();
 

/*		spin = document.pointerLockElement? (spin+e.movementY) : (e.clientY*spinScale);
		trig = (elements.length- Math.round( spin/stepAngle )% elements.length )% elements.length;
		if( Math.abs(spin%stepAngle)<(stepAngle/3) ) 
			spin=  stepAngle * (elements.length-trig );
		if( Math.abs(spin%stepAngle)>(stepAngle/8) ) 
			trig=-1;*/
	//	root.style.transform = ` rotateX(${spin+diff}deg)`;
	
	


	
		// translateZ(${radius}px)
/*		
		if( oldTrig!=trig)	{
			if( elements[oldTrig])		unhover( elements[oldTrig]);
			if( elements[   trig])		  hover( elements[   trig]);
			if( trig>-1 )	sound.play();
			oldTrig=trig;
			}
*/
		}
function mouseClick( e ) {	
		
		console.log("clicked on "+trig)
		document.exitPointerLock();
		if( elements[ trig ] ){
			sound.play();
			click( elements[ trig ]);
			}
		}

	const self ={	};
	return self;
}


