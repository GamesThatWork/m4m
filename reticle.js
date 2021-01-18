
export const newReticle = cnfg => {
    const r=cnfg; 
    const blurFilter = new PIXI.filters.BlurFilter();
    const graphicLayers=[new PIXI.Graphics(), new PIXI.Graphics()];
    const lineWidth = [9,3];
    r.min.color=0xFF1100;
    r.max.color=0xDDAA00;
  
    const self={
      get x(   ) { return graphicLayers[0].position.x;        },
      get y(   ) { return graphicLayers[0].position.y;        },
      set x( v ) { graphicLayers.forEach(g => g.position.x=v) },
      set y( v ) { graphicLayers.forEach(g => g.position.y=v) },
  
      construct: ()=>{
        graphicLayers.forEach( (g, layer) =>{
          g.lineStyle(  lineWidth[ layer ], r.min.color, 1);
          g.drawCircle(0, 0, r.min.radius  );
          g.lineStyle(  lineWidth[ layer ], r.max.color, .7);
          g.drawCircle(0, 0, r.max.radius  );
          blurFilter.blur = 10;
          if( !layer ) g.filters = [blurFilter];        g.lineStyle( lineWidth[ layer ],  [0x00FF00,0x80FF80][layer], 1);
          g.moveTo( 0,   20);
          g.lineTo( 0, 2000);
          g.moveTo( 0,  -20);
          g.lineTo( 0,-2000);
          g.moveTo(   20, 0);
          g.lineTo( 2000, 0);
          g.moveTo(  -20, 0);
          g.lineTo(-2000, 0);
          }); 
        return self;
        },
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
        graphicLayers.forEach( g => { g.destroy(); });
        return null;
        }
      }
    return self.construct();
    }