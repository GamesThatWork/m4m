

const url= { 	
	server: "./assets/icon/",
	stone:  "stone.png",
	glass:  "glass.png",
	};
const selfs=[];
var parent;


export const newIcon= (name, cfg) => {

	console.log("icon", name );
	if( selfs[ name ] )	return selfs[name];
	if( cfg.parent )	parent=cfg.parent;
	
	var g=false; 

    const self={
		get g() { return g },
		construct: ()=>{
			g = new PIXI.Sprite.from( url.server + url[ cfg.img ]);
//			g = new PIXI.Sprite();
			parent.addChild( g )
			return self;
			},
		img:  imgfile =>{	/*unsupported as command*/   return self;},
		hide: ()	  =>{	g.visible=false;			 return self;},
		show: ()	  =>{	g.visible=true; 			 return self;},
		move:  m      =>{	g.position.set(m[0],m[1]);	 return self;},
		x: 	   x      =>{	g.x=x;						 return self;},
		y: 	   y	  =>{	g.y=y;						 return self;},
		size:  s	  =>{	g.width=s[0]; g.height=s[1]; return self;},

		destruct: ()=>g.destroy(),
        }
    return selfs[ name ]=self.construct();
    }
	
	
