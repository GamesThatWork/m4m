
let listeners={}, blisteners={};



const showListeners = ()=>	signal.dbg.innerHTML= `<div class="listeners custom">`+
							Object.keys( listeners )
								.sort()
								.map( k=> listeners[k]>0?`<span id="e-${k}" class="event">${k}<sub>${listeners[k]}</sub></span>`:'' )	
								.join("")
							+`</div><div class="listeners system">`+
							Object.keys( blisteners )
								.sort()
								.map( k=> listeners[k]>0?`<span id="e-${k}" class="event">${k}<sub>${blisteners[k]}</sub></span>`:'' )	
								.join("")
							+"</div>";

const addEventListener= ( event, handler,cfg)=>{
		signal.bus.addEventListener( event, handler, cfg );
		signal.list.push( {event, handler } );
		listeners[ event ]=1+(listeners[ event ] ?? 0);
		showListeners();
		}

const removeEventListener= ( event, handler,cfg)=>{
		signal.bus.removeEventListener( event, handler, cfg );
		if(	--listeners[ event ]<0) listeners[ event ]=0 ;
		showListeners();
		}

const addEventBListener= ( event, handler,cfg)=>{
		signal.body.addEventListener( event, handler, cfg );
		blisteners[ event ]=1+(blisteners[ event ]||0);
		showListeners();
		}

const removeEventBListener= ( event, handler,cfg)=>{
		signal.body.removeEventListener( event, handler, cfg );
		if(	--blisteners[ event ]<0) blisteners[ event ]=0;
		showListeners();
		}






export const signal ={
		bus:	document.querySelector("#bus"),
		body:	document.querySelector("body"),
		dbg:	document.querySelector("#help"),
		list:	[],

		fire: 	  (event, data         ) 	=> 	signal.bus.dispatchEvent( new CustomEvent( event, { detail:data } ) ),
		on:   	  (event, handler, cfg ) 	=>  addEventListener( event, handler, cfg ),
		once:     (event, handler) 			=>	signal.on( event, handler, {once:true}),
		off:   	  (event,handler)	 		=> 	removeEventListener( event, handler ),
		remove:   i					 		=>	signal.off( signal.list[ i ].event, signal.list[ i ].handler ),
		clear:    ()						=>{ signal.bus.replaceWith( signal.bus.cloneNode(true) );
												listeners={}
												},
		onBody:   (event, handler,cfg) 		=>  addEventBListener( event, handler, cfg ),
		onceBody: (event, handler) 			=>	signal.onBody( event, handler, {once:true}),
		offBody: (event, handler) 			=>	removeEventBListener( event, handler),
		};


/*
export const signal ={
		bus:	document.querySelector("#bus"),
		list:	[],

		fire: 	  (event, data         ) 	=> 	signal.bus.dispatchEvent( new CustomEvent( event, { detail:data } ) ),

		on:   	  (event, handler, cfg ) 	=>{ signal.bus.addEventListener( event, handler, cfg );
											return signal.list.push( {event, handler } );
											},
		once:     (event, handler) 		=>	signal.on( event, handler, {once:true}),
		off:   	  (event,handler)	 	=> 	signal.bus.removeEventListener( event, handler ),
		remove:   i					 	=>	signal.off( signal.list[ i ].event, signal.list[ i ].handler ),
		clear:    ()					=>  signal.bus.replaceWith( signal.bus.cloneNode(true) ),
		};


*/