export const newMap = cfg => {

	var g=false; 

    const self={
		get g() { return g },
		construct: ()=>{
			g = new PIXI.Sprite.from( '/assets/map/eglinred.jpg');
			cfg.parent.addChild( g )
			return self;
			},
		hide: ()	=>{	g.visible=false;			return self;},
		show: ()	=>{	g.visible=true; 			return self;},
		move: (x,y)	=>{	g.position.set(x,y);		return self;},
		size: (x,y)	=>{	g.width=x; g.height=y;		return self;},
		destruct: ()=>g.destroy(),
        }
    return self.construct();
    }
