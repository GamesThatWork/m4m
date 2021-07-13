import  { signal  } from './signal.js'    ;

    let exists = null;

export const newReticle = cfg => {
	
	if( exists )	return exists;

	const r=cfg; 
	const root  = new PIXI.Graphics();
    const graphicLayers=[new PIXI.Graphics(), new PIXI.Graphics()];
    const lineWidth = [9,3];
    const circle = [], xhair=[];
    const blurFilter = new PIXI.filters.BlurFilter();
    const colorHex = [
			{ red:0xDD0000, yellow:0xAAAA00, blue:0x0044FF, green:0x00DD00, grey:0x008800 },
			{ red:0xFF4444, yellow:0xFFFF44, blue:0x5588FF, green:0x44FF44, grey:0x228822 },
	        
					];
	var colorOveride;

console.log( signal );

    const self={
	//	get g(   ) { return root; 						      },
	//	get x(   ) { return graphicLayers[0].position.x;        },
	//	get y(   ) { return graphicLayers[0].position.y;        },
	//	set x( v ) { graphicLayers.forEach(g => g.position.x=v) },
	//	set y( v ) { graphicLayers.forEach(g => g.position.y=v) },
		x:  v =>  { graphicLayers.forEach( g => g.position.x=v);	return self; },
		y:  v =>  { graphicLayers.forEach( g => g.position.y=v);	return self; },

		position: pos => { 
			graphicLayers.forEach(g => {
				g.position.x=pos[0];
				g.position.y=pos[1];  
				});
			return self;
			},

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
				root.addChild( g );
				}); 
			self.lines( );
			self.radius( 50 );
			r.parent.addChild( root );
			self.show();
			return self;
			},
		
	  	radius: (newRadius,color="green") =>{
			graphicLayers.forEach( (g, layer) =>{
 				if( circle[ layer ] )	{
				 	circle[ layer ].destroy();
					circle[ layer ]= null;
					 }
				if( newRadius ){
					circle[ layer ] = new PIXI.Graphics()
						.lineStyle(   lineWidth[ layer ], colorHex[layer][color], 1)
						.drawCircle(  0, 0, r.max.radius = newRadius  );
					g.addChild( circle[ layer ] );
					}
				});
			return self;
			},

	  	lines: (color="green") =>{
			graphicLayers.forEach( (g, layer) =>{
				if( xhair[ layer ] )	{
				 	xhair[ layer ].destroy();
					xhair[ layer ]= null;
					}
				xhair[ layer ]= new PIXI.Graphics()
					.lineStyle( lineWidth[ layer ], colorHex[layer][color], 1)//  [0x00FF00,0x80FF80][layer], 1);
					.moveTo( 0,   20)
					.lineTo( 0, 2000)
					.moveTo( 0,  -20)
					.lineTo( 0,-2000)
					.moveTo(   20, 0)
					.lineTo( 2000, 0)
					.moveTo(  -20, 0)
					.lineTo(-2000, 0);
				g.addChild( xhair[ layer ] );
				});
			return self;
			},

		listener: e=> self.radius( e.detail.km *100 ) ,
		listen:  ()=> {	signal.bus.   addEventListener(  "radius", self.listener ); 		return self; },
		unlisten:()=> {	signal.bus.removeEventListener(  "radius", self.listener ); 		return self; },
		show:    ()=> {	graphicLayers.forEach( g => r.parent.   addChild(g) );			    return self; },
		hide:    ()=> {	graphicLayers.forEach( g => r.parent.removeChild(g) );			    return self; },
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
		return exists = self.construct().show();
		}