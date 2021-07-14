
import  { signal     } from './signal.js'    ;

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
			"./assets/romeo/2.jpg",
			"./assets/romeo/1.jpg",
			"./assets/romeo/3.jpg",
			"./assets/romeo/4.jpg",
			"./assets/romeo/5.jpg"
			],
		claro: [
			"./assets/claro/1.webp",
		//	"./assets/claro/2.webp", not wearing (or holding) glasses
			"./assets/claro/3.webp",
			"./assets/claro/4.webp",
			"./assets/claro/5.webp",
			"./assets/claro/6.webp",
			"./assets/claro/7.webp"
			],
		bg:{	
			claro: "./assets/claro/lab.jpg",
			},
		blue:    "./assets/blue/crew.jpg",
		red0:    "./assets/red/0.jpg",
		red1:    "./assets/red/1.jpg",
		red2:    "./assets/red/2.jpg",
		red3:    "./assets/red/3.jpg",
		target0: "./assets/target/0.jpg",
		bridge1: "./assets/target/1.jpg",
		bridge2: "./assets/target/2.jpg",
		bridge3: "./assets/target/3.jpg",
		hq:  	 "./assets/blue/camp.jpg"
		};


const cadence = {	claro: { mean: 1.5, dev:.25 },	romeo: { mean: 1, dev:.75 }, alert: { mean: 2, dev:0 }  };


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


		const self ={ 
			position: (x,y,z=1)=>
						 { style.transform=`translate(${x}px,${y}px) scale(${z})`; return self;	 },
			full:  	()=> { classList.add( "fullscreen" );                          return self;  },
			big:   	()=> { classList.remove( "small" );                            return self;  },
			small: 	()=> { classList.add(    "small" );                            return self;  },
			show:	()=> { style.display="block";                                  return self;  },
			hide:	()=> { style.display="none"; console.log("Hide ", name );      return self;  },
			kill:	()=> { 	div.remove(); 
							delete selfs[name]; 
							signal.fire("pic.kill");						 	   return self;  },
			fadeout:()=> { 	style.transition="opacity 4s"; 
							style.opacity="0"; 
							setTimeout( self.kill, 4000 );                         return self;  },
			scan:  	()=> {	
					const zoom =4;
					if( !self._scan ){   
						style.transition="transform 0s";
						self._scan=	( target=> e=>target.position( 
								Math.min(Math.max(0,e.x*4-2400), 3840/zoom), 
								Math.min(Math.max(0,e.y*4-1350), 2160/zoom),
								zoom ))( self );
						document.body.addEventListener( "mousemove", self._scan );
						document.body.addEventListener( "click",     self.scan );
						self._scan( {target:div, x:960,y:490});
						}
					else{
						document.body.removeEventListener( "mousemove", self._scan );
						style.transition="transform 1s erase-in ease-out 1.5s";
						style.transform="translate( 975px,0px) scale(.9) "; 
						self._scan= null;
						}},
		
		
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
				return self;
				},
			
			timeoutID: false,
			rando: (run=true) =>{	
				if( self.timeoutID ) clearTimeout( self.timeoutID );
				let basis     =   cadence[ name ].mean -cadence[ name ].dev;
				let variation = 2*cadence[ name ].dev;
				self.paused   = !run; 
			
				let next= self.paused?
					  ()=>{} 
					: ()=>{
						if( self.paused )	return;
						let t = basis+variation*Math.random();
						self.timeoutID = setTimeout( next, 1000*t+250 );
						style.transition=`background-image ${t}s`;
						style.backgroundImage=	`url("${url[ name ][Math.floor(Math.random()*url[ name ].length)]}")
						     ${ url.bg[name]?  `,url("${url.bg[name]}`  : '' }`;
						}  
				next();
				return self;
				},
			pause: (pausing=true) => self.rando( !pausing )
			}
		return selfs[ name ]=self;
	}


