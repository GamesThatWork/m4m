export const signal ={
		bus:	document.querySelector("#bus"),
		list:	[],

		fire: 	(event, data         ) 	=> 	signal.bus.dispatchEvent( new CustomEvent( event, { detail:data } ) ),

		on:   	(event, handler, cfg ) 	=>{ signal.bus.addEventListener( event, handler, cfg );
											return signal.list.push( {event, handler } );
											},
		once:   (event, handler) 		=>	signal.on( event, handler, {once:true}),

		off:   	(event,handler)	 		=> 	signal.bus.removeEventListener( event, handler ),
		
		remove: i					 	=>	signal.off( signal.list[ i ].event, signal.list[ i ].handler ),

		clear:  ()						=>  signal.bus.replaceWith( signal.bus.cloneNode(true) )
		};