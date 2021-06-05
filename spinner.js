export const newSpinner = (elements, cfg) =>{

	const mousepad	= cfg?.mousepad || document.body;
	const root      = cfg?.root    || document.createElement("div");
	const parent    = cfg?.parent  || mousepad;
	const hover     = cfg?.hover   || (el=>el.style.color="white");
	const unhover   = cfg?.unhover || (el=>el.style.color="grey");
	const click     = cfg?.click   || (el=>console.log( el.innerText ));


	const stepAngle = 360 / elements.length;
	const stepSize  = 1.2 * elements.reduce( (size,e)=> size+e.getBoundingClientRect().height, 0)/elements.length;
	const radius    = Math.round( ( stepSize / 2) / Math.tan( Math.PI / elements.length ) );
	parent.append(root);
	let spin =0;
	let diff =0;
	let trig=-1;
	let oldTrig = trig;



	root.style.position= "absolute";
	root.style.transformStyle='preserve-3d';
	elements.forEach( (element,step) =>
			element.style.transform = `rotateX(${ step * stepAngle}deg) translateZ(${radius}px) `);

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
		root.style.transform = `translateZ(${-radius}px) rotateX(${spin+diff}deg)`;
		if( oldTrig!=trig)	{
			if( elements[oldTrig])		unhover( elements[oldTrig]);
			if( elements[   trig])		  hover( elements[   trig]);
			oldTrig=trig;
			}
		}
	function mouseClick( e ) {
	console.log("clicked on "+trig)
		if( elements[ trig ] )
			click( elements[ trig ]);
		}
	const self ={	};
	return self;
}
