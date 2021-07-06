import  { signal  } from './signal.js'    ;

export const newReticle = cnfg => {
    const r=cnfg; 
	const root  = new PIXI.Graphics();
    const graphicLayers=[new PIXI.Graphics(), new PIXI.Graphics()];
    const lineWidth = [9,3];
    const circle = [];
    const blurFilter = new PIXI.filters.BlurFilter();
console.log( signal );

    const self={
      get g(   ) { return root; 						      },
      get x(   ) { return graphicLayers[0].position.x;        },
      get y(   ) { return graphicLayers[0].position.y;        },
      set x( v ) { graphicLayers.forEach(g => g.position.x=v) },
      set y( v ) { graphicLayers.forEach(g => g.position.y=v) },
  
      construct: ()=>{
		r.min        = r.min        ?? {};
		r.max        = r.max        ?? {};
		r.min.color  = r.min.color  ?? 0xFF1100;
		r.max.color  = r.max.color  ?? 0xDDAA00;
		r.min.radius = r.min.radius ?? 50;
		r.max.radius = r.max.radius ?? 50;
	    graphicLayers.forEach( (g, layer) =>{
          blurFilter.blur = 10;
          if( !layer ) g.filters = [blurFilter];    
          g.lineStyle( lineWidth[ layer ],  [0x00FF00,0x80FF80][layer], 1);
          g.moveTo( 0,   20);
          g.lineTo( 0, 2000);
          g.moveTo( 0,  -20);
          g.lineTo( 0,-2000);
          g.moveTo(   20, 0);
          g.lineTo( 2000, 0);
          g.moveTo(  -20, 0);
          g.lineTo(-2000, 0);
		  self.radius( 50 );
		  root.addChild( g );
          }); 
	  	r.parent.addChild( root );
		self.show();
        return self;
        },
		
		circle:[],

	  	radius: newRadius =>{
			graphicLayers.forEach( (g, layer) =>{
 				if( circle[ layer ] )	
				 	circle[ layer ].destroy();
				circle[ layer ] = new PIXI.Graphics()
									.lineStyle(   lineWidth[ layer ], r.max.color, 1)
									.drawCircle(  0, 0, r.max.radius = newRadius  );
				g.addChild( circle[ layer ] );
				});
			return self;
			},

		listener: e=> self.radius( e.detail.km *100 ) ,
		listen:  ()=> signal.bus.addEventListener(  "radius", self.listener ),
		unlisten:()=> signal.bus.removeEventListener( "radius", self.listener ),

		show: ()=>{
			graphicLayers.forEach( g => r.parent.addChild(g) );
			return self;
			},
		immediacy:1,
		move: (x,y)=>{ 
			let newK= self.immediacy, oldK=1-newK;
			graphicLayers.forEach( g => {
			g.x=x*newK + g.x*oldK;
			g.y=y*newK + g.y*oldK;
			});
			return self;
			},
		
		destruct: ()=>{ 
			self.unlisten();																																																																																																																																																																			
			graphicLayers.forEach( g => g.clear() );
			return self;
			}
		}
		return self.construct().show();
		}