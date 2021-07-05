

	const url= { 	
	imgserver: "https://storage.googleapis.com/storage/v1/b/unscrew-u/" ,
	      img: "https://storage.googleapis.com/unscrew-u/",
	  preview: "https://unscrewu.imgix.net/",
		 crew: "./assets/blue/crew.jpg",
		romeo: [
			"./assets/romeo/1.jpg",
			"./assets/romeo/2.jpg",
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
		bg:	"./assets/claro/lab.jpg"

		};


const cadence = {	claro: { mean: 1.5, dev:.25 },	romeo: { mean: 1, dev:.75 } };


const selfs={};

export const newPic= (name, cfg) => {

	console.log("pic", name );
		if( selfs[ name ] )	return selfs[name];
	console.log("= new Pic", name );

		const dom={
			root: document.querySelector("#pix")
			}
		const self ={ 
			position: (x,y,z=1)=>
						{ dom[ name ].style.transform=`translate(${x}px,${y}px) scale(${z})`; return self;	  },
			big:   ()=> { dom[ name ].classList.remove( "small" );                      return self;    },
			small: ()=> { dom[ name ].classList.add(    "small" );                      return self;    },
			show:  ()=> { dom[ name ].style.display="block";                                  return self;    },
			hide:  ()=> { dom[ name ].style.display="none"; 	                              return self;    },
			scan:  ()=> {	
					const zoom =4;
					if( !self._scan ){   
						dom[ name ].style.transition="transform 0s";
						self._scan=	( target=> e=>target.position( 
								Math.min(Math.max(0,e.x*4-2400), 3840/zoom), 
								Math.min(Math.max(0,e.y*4-1350), 2160/zoom),
								zoom ))( self );
						document.body.addEventListener( "mousemove", self._scan );
						document.body.addEventListener( "click",     self.scan );
						self._scan( {target:dom[ name ], x:960,y:490});
						}
					else{
						document.body.removeEventListener( "mousemove", self._scan );
						dom[ name ].style.transition="transform 1s erase-in ease-out 1.5s";
						dom[ name ].style.transform="translate( 975px,0px) scale(.9) "; 
						self._scan= null;
						}},
		
		
			zoom:  ()=> {
				dom[ name ].style.transform="scale(7) translate(245px,135px)"; 
				dom[ name ].style.opacity="0"; 
//				console.log( dom[ name ].style );	
				setTimeout( e=>{
					dom[ name ].style.transition="transform 1s erase-in ease-out .5s, opacity 1s ease-out ";
					dom[ name ].style.transform="translate( 975px,0px) scale(.9) "; 
					dom[ name ].style.opacity="1"; 
//					console.log( dom[ name ].style );	
					}, 100);
				return self;
				},

			rando: (run=true) =>{	
				let basis     =   cadence[ name ].mean -cadence[ name ].dev;
				let variation = 2*cadence[ name ].dev;
				self.paused   = !run; 
			
				let next= !run? ()=>{} : ()=>{
					let t = basis+variation*Math.random();
					if( self.paused )	return;
					setTimeout( next, 1000*t+250 );
//					console.log("rando", name, t);
					dom[ name ].style.transition=`background-image ${t}s`;
					dom[ name ].style.backgroundImage=
					   `url("${url[ name ][Math.floor(Math.random()*url[ name ].length)]}"),
					    url("${url.bg}`;
					}  
				next();
				return self;
				},
			pause: (pausing=true) => self.rando( !pausing )
			/*trans: (start, end)=>{
			
				const next= ()=>{
					dom[ name ].style.transition="background-image 2s";
					dom[ name ].style.backgroundImage=
						`url("${url[ name ][Math.floor(Math.random()*url[ name ].length)]}"),
						url("${url.bg}`;
					setTimeout( next, 750+2250*Math.random() );
					}  
				next();
				return self;
				}*/
			}
		dom[ name ] = document.createElement("div");
		dom[ name ].id= name;
		dom[ name ].classList.add("pic");
		dom[ name ].style.backgroundImage=	`url("${ typeof url[ name ]=="string"?url[ name ] : url[ name ][0] }" )`;
		dom.root.appendChild( dom[ name ] )
		return selfs[ name ]=self;
	}


