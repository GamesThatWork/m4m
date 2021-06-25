

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
			"./assets/claro/1.png",
			"./assets/claro/2.png",
			"./assets/claro/3.png",
			"./assets/claro/4.png",
			"./assets/claro/5.png",
			"./assets/claro/6.png",
			"./assets/claro/7.png"
			],
		bg:	"./assets/bigmap.GIF"

		};


const cadence = {	claro: { mean: 3.5, dev:2 },	romeo: { mean: 1, dev:.75 } };


const selfs={};

export const pic= (name, cfg) => {

		if( selfs[ name ] )	return selfs[name];

		const dom={
			root: document.querySelector("#pix")
			}
		const self ={ 
			position: (x,y,z=1)=>
						{ dom[ name ].style.transform=`translate(${x}px,${y}px) scale(${z})`; return self;	   },
			show:  ()=> { dom[ name ].style.display="block";                      return self;    },
			hide:  ()=> { dom[ name ].style.display="none"; 	                   return self;    },
			scan:  ()=> {	
					if( !self._scan ){   
						self._scan=	( target=> e=>target.position( e.x*4-2400, e.y*4-1350, 4 ))( self );
						document.body.addEventListener( "mousemove", self._scan );
						}
					else{
						document.body.removeEventListener( "mousemove", self._scan );
						dom[ name ].style.transform="translate( 975px,0px) scale(.9) "; 
						self._scan= null;
						}},
		
		
			zoom:  ()=> {
				dom[ name ].style.transform="scale(7) translate(245px,135px)"; 
				dom[ name ].style.opacity="0"; 
				console.log( dom[ name ].style );	
				setTimeout( e=>{
					dom[ name ].style.transition="transform 1s erase-in ease-out .5s, opacity 1s ease-out ";
					dom[ name ].style.transform="translate( 975px,0px) scale(.9) "; 
					dom[ name ].style.opacity="1"; 
					console.log( dom[ name ].style );	
					}, 100);
				return self;
				},

			rando: ()=>{	
				let basis     =   cadence[ name ].mean -cadence[ name ].dev;
				let variation = 2*cadence[ name ].dev;
				 
			
				const next= ()=>{
					let t = basis+variation*Math.random();
					console.log("rando", name, t);
					dom[ name ].style.transition=`background-image ${t}s`;
					dom[ name ].style.backgroundImage=
					   `url("${url[ name ][Math.floor(Math.random()*url[ name ].length)]}"),
					    url("${url.bg}`;
					setTimeout( next, 1000*t+250 );
					}  
				next();
				return self;
				}
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
//		dom[ name ].style.backgroundImage=	`url("${Array.isArray( url[ name ])? url[ name ][0] : url[ name ]}")`;
		dom[ name ].style.backgroundImage=	`url("${url[ name ]}")`;
		dom.root.appendChild( dom[ name ] )
		return selfs[ name ]=self;
	}


