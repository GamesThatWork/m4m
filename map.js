
const url= { 	
	server: "./assets/map/",
	range :  "eglinred.jpg",
	test  :  "bigmap.svg",
	};
const dom ={
	parent: document.querySelector("#map"), 
	}
const selfs=[];
 

export const newMap = (name,cfg={}) => {

	console.log("map", name );
	if( selfs[ name ] )	return selfs[name];
		
	
    const self={
		get dom() { return dom[ name ] },
		construct: ()=>{
			dom[ name ] = document.createElement("div");
			dom[ name ].id= name;
			dom[ name ].classList.add("map");
			dom.parent.appendChild( dom[ name ] );
			let imgfile= cfg.img || name;
			if( url[ imgfile ].includes(".svg") )
				fetch(   url.server + url[ imgfile ] )
					.then(response => response.text())
					.then(  svg => dom[ name ].innerHTML = svg)
					.catch( err => dom.root.innerHTML=err );
			else	dom[ name ].style.backgroundImage=
						`url("${ url.server + url[ imgfile ] }")`;
			return selfs[ name ]=self;
			},

		img:   i =>{	/*unsupported as command*/   return self;},
		move:  m =>	{ dom[ name ].style.transform=`translate(${m[0]}px,${m[1]}px) scale(${m[2]})`; return self;	  },
		show:  ()=> { dom[ name ].style.display="block";                                           return self;   },
		hide:  ()=> { dom[ name ].style.display="none"; console.log("Hide ", name );               return self;   },
        }
    return selfs[ name ]=self.construct();
    }