
import  { signal     } from './signal.js'    ;

import  { sfx		 } from './sfx.js';

	const fadeoutDuration= 7000;//ms

	const url= { 	
	imgserver: "https://storage.googleapis.com/storage/v1/b/unscrew-u/" ,
	      img: "https://storage.googleapis.com/unscrew-u/",
	  preview: "https://unscrewu.imgix.net/",
		 crew: "./assets/blue/crew.jpg",
		alert: [
			"./assets/icon/alert.png",
			"./assets/icon/inert.png",
			],
		romeo: [
			"./assets/romeo/5.jpg",
			"./assets/romeo/5.jpg",
			"./assets/romeo/4.jpg",
			"./assets/romeo/3.jpg",
			"./assets/romeo/2.jpg",
			"./assets/romeo/1.jpg",
			"./assets/romeo/1.jpg"
			],
		claro: [
			"./assets/claro/n0.webp",
			"./assets/claro/n1.webp",
			"./assets/claro/n2.webp", 
			"./assets/claro/n3.webp" 
		//	"./assets/claro/2.webp", not wearing (or holding) glasses
			],
		drclaro: [
			"./assets/claro/g0.webp",
			"./assets/claro/g1.webp",
			"./assets/claro/g2.webp", 
			"./assets/claro/g3.webp", 
			"./assets/claro/g4.webp",
			"./assets/claro/g5.webp",
			"./assets/claro/g6.webp", 
			"./assets/claro/g7.webp", 
			"./assets/claro/g8.webp" 
				//	"./assets/claro/2.webp", not wearing (or holding) glasses
					],
		bg:{	
			claro: "./assets/claro/lab.jpg",
			drclaro: "./assets/claro/lab.jpg",
			},
		blue:     "./assets/blue/crew.jpg",
		red0:     "./assets/red/0.jpg",
		red1:     "./assets/red/1.jpg",
		red2:     "./assets/red/2.jpg",
		red3:     "./assets/red/3.jpg",
		shrine:   "./assets/target/0.jpg",  // alias
		target0:  "./assets/target/0.jpg",  // alias
		bridge0:  "./assets/target/0.jpg",  // alias
		bridge1:  "./assets/target/1.jpg",
		bridge2:  "./assets/target/2.jpg",
		bridge3:  "./assets/target/3.jpg",
		bridge23: "./assets/target/23.jpg",  // combo 0+2+3
		bda0:     "./assets/target/bda/0.jpg",   
		bda1:     "./assets/target/bda/1.jpg",
		bda2:     "./assets/target/bda/2.jpg",
		bda3:     "./assets/target/bda/3.jpg",
		hq:  	  "./assets/blue/camp.jpg",
		win:  	  "./assets/blue/happy.jpg",
		lose:  	  "./assets/blue/sad.jpg",
		
		};


const cadence = {	claro: { mean: 1.5, dev:.25 },	drclaro: { mean: 1.0, dev:.25 },	romeo: { mean: 1, dev:.75 }, alert: { mean: 2, dev:0 }  };

const ids = { claro:[ "claro", "drclaro"], romeo:[ "romeo"] };
const selfs={};

export const newPic= (name, cfg) => {

	console.log("pic", name );
		if( selfs[ name ] )	return selfs[name];
	console.log("= new Pic", name );

		const root= document.querySelector("#pix");
		const div = document.createElement("div");
		const style = div.style;
		const classList = div.classList;
		div.id= name;
		classList.add("pic");
		style.backgroundImage=	`url("${ typeof url[ name ]=="string"?url[ name ] : url[ name ][0] }" )`;
		root.appendChild( div );

		const classify = classy  =>{
				classList.remove("small","medium","big","fullscreen" );
				classList.add( classy  );
				}

		const self ={ 
			position: (x,y,z=1)=>
						 { style.transform=`translate(${x}px,${y}px) scale(${z})`; 
						 							console.log("pic: Position",name); return self;	 },
			small: 	()=> { classify( "small" );     console.log("pic: Small ",name);   return self;  },
			medium:	()=> { classify( "medium" );    console.log("pic: Medium",name);   return self;  },
			big:   	()=> { classify( "big" );       console.log("pic: Big  ",name);    return self;  },
			full:  	()=> { classify( "fullscreen" );console.log("pic: Full ",name);    return self;  },
			show:	()=> { 	style.display="block";  console.log("pic: Show ",name);    return self;  },
			hide:	()=> {  style.display="none";    console.log("pic: Hide ",name);    return self;  },
			kill:	()=> { 	div.remove(); 
						   	delete selfs[name]; 
							signal.fire("pickill",  {name});
													console.log("pic: Kill ",name);    return self;  },
			fadeout:()=> { 	style.transition=`opacity ${fadeoutDuration}ms`; 
							//style.transitionProperty=  "opacity" ;
							//style.transitionDuration = "6500ms";
							//style.transitionDelay = "500ms";
							style.opacity="0"; 
							setTimeout( self.kill, fadeoutDuration ); 
							 						console.log("pic: Fade ",name);    return self;  },
			
			scan:  	()=> {	//  CURRENTLY NOT USED IN THE GAME
					const zoom =4;
					if( !self._scan ){   
						style.transition="transform 0s";
						self._scan=	( target=> e=>target.position( 
								Math.min(Math.max(0,e.x*4-2400), 3840/zoom), 
								Math.min(Math.max(0,e.y*4-1350), 2160/zoom),
								zoom ))( self );
//						document.body.addEventListener( "mousemove", self._scan );
//						document.body.addEventListener( "click",     self.scan );
						signal.onBody( "mousemove", self._scan );
						signal.onBody( "click",     self.scan );
						self._scan( {target:div, x:960,y:490});
						}
					else{
//						document.body.removeEventListener( "mousemove", self._scan );
						signal.offBody( "mousemove", self._scan );
						style.transition="transform 1s erase-in ease-out 1.5s";
						style.transform="translate( 975px,0px) scale(.9) "; 
						self._scan= null;
						}
						console.log("pic: Scan ",name);    return self;  },						
		
						


			pulse: e => {
				console.log("pic: Pulse ",name); 
				sfx.music.play(); 
				sfx.music.volume(0.35);
				self.show().full();
				document.querySelector("#canvas").style.display="none";
				setTimeout(	e =>{ 
					self.fadeout();
					signal.on( "pickill", e=>{
						signal.off( "pickill", this)
						signal.fire( "response" );
						document.querySelector("#canvas").style.display="block";
						console.log("pic: end Pulse ",name); 
						});
					setTimeout( e=>sfx.music.volume(.12), 2500 );
					setTimeout( e=>sfx.music.volume(.06), 4000 );
					setTimeout( e=>sfx.music.volume(.03), 5500 );
					setTimeout( e=>sfx.music.volume(.02), 7000 );
					}, 2000	)},

			bdapulse: e => {
				console.log("pic: Pulse ",name); 
				sfx.music.play(); 
				sfx.music.volume( 0.60 );
				self.show().full().bda();
				document.querySelector("#canvas").style.display="none";
				setTimeout(	e =>{ 
					self.fadeout();
					signal.on( "pickill", e=>{
						signal.off( "pickill", this)
						signal.fire( "response" );
						document.querySelector("#canvas").style.display="block";
						console.log("pic: end Pulse ",name); 
						});
					setTimeout( e=>sfx.music.volume(.25), 2500 );
					setTimeout( e=>sfx.music.volume(.12), 4000 );
					setTimeout( e=>sfx.music.volume(.06), 5500 );
					setTimeout( e=>sfx.music.volume(.03), 7000 );
					}, 3000	)},

	
			zoom:  ()=> {
				style.transform="scale(7) translate(245px,135px)"; 
				style.opacity="0"; 
//				console.log(style );	
				setTimeout( e=>{
					style.transition="transform 1s erase-in ease-out .5s, opacity 1s ease-out ";
					style.transform="translate( 975px,0px) scale(.9) "; 
					style.opacity="1"; 
//					console.log( style );	
					}, 100);
				console.log("pic: Zoom ",name);    return self;  }, 
			
			bda: () =>{	
				let pre = `url("${url[name]}`;
				let post= pre.replace( '/target/', '/target/bda/');
				console.log( "showing BDA effect", pre, post );
				style.backgroundImage=	pre;
				style.transitionProperty=  "background-image" ;
				style.transitionTimingFunction= "ease-in";
				style.transitionDuration = "1800ms";
				style.transitionDelay = "1200ms";
	//			style.backgroundImage=	post;
				setTimeout( e=>style.backgroundImage=	post, 100);
				console.log("pic: bda ",name);    return self;  }, 

			timeoutID: false,
			rando: (run=true) =>{	
				if( self.timeoutID ) clearTimeout( self.timeoutID );
				let id = ids[ name ][Math.floor(Math.random()*ids[ name].length)];

				let basis     =   cadence[ id ].mean -cadence[ id ].dev;
				let variation = 2*cadence[ id ].dev;
				self.paused   = !run; 
			
				let next= self.paused?
					  ()=>{} 
					: ()=>{
						if( self.paused )	return;
						let t = basis+variation*Math.random();
						self.timeoutID = setTimeout( next, 1000*t+250 );
						style.transition=`background-image ${t}s`;
						style.backgroundImage=	`url("${url[ id ][Math.floor(Math.random()*url[ id ].length)]}")
						     ${ url.bg[ id  ]?  `,url("${url.bg[ id ]}`  : '' }`;
						}  
				next();
				console.log("pic: Rando ",name);    return self;  },
			pause: (pausing=true) => { self.rando( !pausing ); console.log("pic: Pause ",name);    return self;  },
			}
		return selfs[ name ]=self;
	}


