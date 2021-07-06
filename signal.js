export const signal ={
		bus:	document.querySelector("#bus"),
		list:	[],
		fire: 	(event, data   ) => 	signal.bus.dispatchEvent( new CustomEvent( event, { detail:data } ) ),
		on:   	(event, handler) =>{ 	signal.bus.addEventListener( event, handler );
										return signal.list.push( {event, handler } );
										},
		off:   	i				 =>{ 	let o = signal.list[ i ];
										signal.bus.removeEventListener( o.event, o,handler );
										},
		clear:  ()=>   signal.bus.parentNode.replaceChild( signal.bus.cloneNode(true), signal.bus),
		}