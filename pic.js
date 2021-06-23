

	const url= { 	
	imgserver: "https://storage.googleapis.com/storage/v1/b/unscrew-u/" ,
	      img: "https://storage.googleapis.com/unscrew-u/",
	  preview: "https://unscrewu.imgix.net/"

		romeo: [
			"./assets/romeo/1.png",
			"./assets/romeo/2.png",
			"./assets/romeo/3.png",
			"./assets/romeo/4.png",
			"./assets/romeo/5.png"
			],
		claro: [
			"./assets/claro/1.png",
			"./assets/claro/2.png",
			"./assets/claro/3.png",
			"./assets/claro/4.png",
			"./assets/claro/5.png",
			"./assets/claro/6.png",
			"./assets/claro/7.png"
			]
		bg:	"./assets/bg.jpeg"
		];

	const selfs={};

export const pic= name => {
    
    
		if( selfs[ name ] )
			return selfs[name];

		dom[ name] = document.createElement("div");
		dom[ name].id= name;
		dom[ name ].style.backgroundImage=	`url("${Array.isArray( url[ name ])? url[ name ][0] : url[ name ]}`;




	const self ={ 
		show:  ()=> 	dom[ name ].style.display="block";
		hide:  ()=> 	dom[ name ].style.display="none";
		rando: ()=>{	dom[ name ].style.transition="background-image 2s";
		
			const next= ()=>{
				dom[ name ].style.backgroundImage=
					`url("${url[ name ][Math.floor(Math.random()*url[ name ].length)]}"),
					 url("${url.bg}`;
				setTimeout( next, 750+2250*Math.random() );
				}  
			next();
			return self;
			}

	const dom={
		root: document.querySelector("#pix");
		}
}

