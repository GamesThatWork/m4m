
const url= { 	
	server  :  "./assets/map/",
	bridges :  "3bridges.png",
	range   :  "eglinred.jpg",
	title   :  "title.png",
	desktop :  "codex.png",         //"desktop(dark).jpg",
	blur    :  "codeglitch.jpg"// "codeblur.png"       //"desktop(dark).jpg",
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
			let img    = cfg.img || name;
			let imgurl = url[ img ] || img;
			
			if( imgurl.includes(".svg") )
				fetch(   url.server + imgurl )
					.then(response => response.text())
					.then(  svg => dom[ name ].innerHTML = svg)
					.catch( err => dom.root.innerHTML=err );
			else	dom[ name ].style.backgroundImage=
						`url("${ url.server + imgurl }")`;
			return selfs[ name ]=self;
			},

		img:   i =>{	/*unsupported as command*/   return self;},
		move:  m =>	{ dom[ name ].style.transform=`translate(${m[0]}px,${m[1]}px) scale(${m[2]||1})`; return self;},
		show:  ()=> { dom[ name ].style.display="block";   console.log("show ", dom[name] );       return self;},
		hide:  ()=> { dom[ name ].style.display="none";    console.log("Hide ", dom[name] );       return self;},
        }
    return selfs[ name ]=self.construct();
    }