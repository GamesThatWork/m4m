const listeners={ body:{}, bus:{}};
let fired;

window.listeners=listeners;//debugging


const debugging  = ()=>	signal.dbg.innerHTML= 
			      `<div class="listeners keepAlive">	<span id="keepAlive">${keepAlive.TTL}<sup>TTL</sup></span>
			 </div><div class="listeners custom">bus:`
			+Object.keys( listeners.bus )
				.sort()
				.map( k=> listeners.bus[k]>0?`<span id="e-${k}" class="event">${k}<sub>${listeners.bus[k]}</sub></span>`:'' )	
				.join("")
			+`</div><div class="listeners system">body:`
			+Object.keys( listeners.body )
				.sort()
				.map( k=> listeners.body[k]>0?`<span id="e-${k}" class="event">${k}<sub>${listeners.body[k]}</sub></span>`:'' )	
				.join("")
			+`</div><div class="listeners fired">
				<span id="fired" class="event">${fired}</span></div>`;

const showListeners = ()=>	{};  // debugging;
							
const addEventListener= ( event, handler,cfg)=>{
		signal.bus.addEventListener( event, handler, cfg );
		signal.list.push( {event, handler } );
		listeners.bus[ event ]=1+(listeners.bus[ event ] ?? 0);
		showListeners();
		}

const removeEventListener= ( event, handler,cfg)=>{
		signal.bus.removeEventListener( event, handler, cfg );
		if(	--listeners.bus[ event ]<0) listeners.bus[ event ]=0 ;
		showListeners();
		}

const addBodyEventListener= ( event, handler,cfg)=>{
		signal.body.addEventListener( event, handler, cfg );
		listeners.body[ event ]=1+(listeners.body[ event ]||0);
		showListeners();
		}

const removeBodyEventListener= ( event, handler,cfg)=>{
		signal.body.removeEventListener( event, handler, cfg );
		if(	--listeners.body[ event ]<0) listeners.body[ event ]=0;
		showListeners();
		}

const dispatchEvent=  event =>{
		signal.bus.dispatchEvent( event );
		fired=event.type;
		keepAlive.tick();
		showListeners();
		}	

	
const keepAlive={
		inactivityLimit: 	   120, 	// after 2 minutes of inaction, reboot game.
		TTL:    		   	5*3600,		// unstarted game reboots after five hours
		tick:	()	=>       		  keepAlive.TTL = keepAlive.inactivityLimit,
		test:	()	=>{ 		if(  !keepAlive.TTL-- )  window.location.reload();  },
		init:	()	=>				  keepAlive.interval= setInterval( keepAlive.test, 1000),
		stop:	()	=> clearInterval( keepAlive.interval)
		};
keepAlive.init();



export const signal ={
		bus:	document.querySelector("#bus"),
		body:	document.querySelector("body"),
		dbg:	document.querySelector("#help"),
		list:	[],

		fire: 	  (event, data         ) 	=> 	dispatchEvent( new CustomEvent( event, { detail:data } ) ),
		on:   	  (event, handler, cfg ) 	=>  addEventListener( event, handler, cfg ),
//		once:     (event, handler) 			=>	signal.on( event, handler, {once:true}),
		off:   	  (event,handler)	 		=> 	removeEventListener( event, handler ),
//		remove:   i					 		=>	signal.off( signal.list[ i ].event, signal.list[ i ].handler ),
		onBody:   (event, handler,cfg) 		=>  addBodyEventListener( event, handler, cfg ),
//		onceBody: (event, handler) 			=>	signal.onBody( event, handler, {once:true}),
		offBody: (event, handler) 			=>	removeBodyEventListener( event, handler),
		clear:    ()						=>{ signal.bus.replaceWith( signal.bus.cloneNode(true) );
												listeners.bus={}; listeners.body={};
												},
		};

