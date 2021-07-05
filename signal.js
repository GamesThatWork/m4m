
export const newSignal = () => {
	const self ={
		bus:	document.querySelector("#bus"),
		list:	[],
		fire: 	(event, data   ) => 	self.bus.dispatchEvent( new CustomEvent( event, { detail:data } ) ),
		on:   	(event, handler) =>{ 	self.bus.addEventListener( event, handler );
										return self.list.push( {event, handler } );
										},
		off:   	i				 =>{ 	let o = self.list[ i ];
										self.bus.removeEventListener( o.event, o,handler );
										},
		clear:  ()=>   self.bus.parentNode.replaceChild( self.bus.cloneNode(true), signal.bus),
		}

	return self;		
}