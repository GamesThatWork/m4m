








export const newLineChart = cnfg => {
    const r=cnfg ; 
    const blurFilter = new PIXI.filters.BlurFilter();
    const graphicLayers=[new PIXI.Graphics(), new PIXI.Graphics()];
    const lineWidth = [5,3];
    const color={data:0xFF1100};
    const data={buf:r.data};

    PIXI.BitmapFont.from("TitleFont", {
        fontFamily: "Arial",
        fontSize: 12,
        strokeThickness: 2,
        fill: "purple"
    });
   
 //   const title = new PIXI.BitmapText("This is the title", { fontName: "Share Tech Mono" });
 //   r.parent.addChild( title );



    const style={ 
      default:{  fontFamily: 'Share Tech Mono',  fontSize: 13,  fill: 'grey',       align: 'center'},
      label:{    fontFamily: 'Share Tech Mono',  fontSize: 13,  fill: 'grey',       align: 'center'},
      title:{    fontFamily: 'Share Tech Mono',  fontSize: 26,  fill: 'lightblue',  align: 'center'}
      };

    const grid = {
      title:{   color:0x448844,          label:"OVERPRESSURE" }, 
      x:{ n:15, color:0x448844, width:1, label:"KILOMETERS", scale:30}, 
      y:{ n:8, color:0x888888,  width:1, label:"BARS", scale:30},
       } 
    
    const txt= (x,y, type )=>{
      let t = new PIXI.Text( grid[ type ].label,  style[ type ] || style.default );
      t.position.set( x- t.width/2, y);
      r.parent.addChild(t);
      return t;
      }
    
      data.min = data.buf.reduce( (min,d)=> min<d? min:d,  Infinity );
      data.max = data.buf.reduce( (max,d)=> max>d? max:d, -Infinity );
      data.span= data.max-data.min;
  
      const pad  = { top:40, right:40, bottom:40, left:40 };
      
    
    const self={
      get x(   ) { return graphicLayers[0].position.x;        },
      get y(   ) { return graphicLayers[0].position.y;        },
      set x( v ) { graphicLayers.forEach(g => g.position.x=v) },
      set y( v ) { graphicLayers.forEach(g => g.position.y=v) },
      construct: ()=>{
      //plot data    
        let mx = (r.x.px -pad.left -pad.right) / (data.buf.length-1);
        let bx =          pad.left;
        let plotx= x=> mx* x  + bx;
        let my =-(r.y.px -pad.bottom -pad.top) / (data.span);
        let by =  r.y.px -pad.bottom;
        let ploty= y=> my*(y-data.min) + by;
        graphicLayers.forEach( (g, layer) =>{
          g.lineStyle(  lineWidth[ layer ], color.data, 1);
          g.moveTo(   plotx(0), ploty( data.buf[0]) );
          data.buf.forEach( (y,x) => g.lineTo( plotx(x), ploty(y)  ) );
      //draw grid
          g.lineStyle(  grid.x.width, grid.x.color, 1);
          for(let i=0; i<grid.x.n; i++  ) {
            let x = plotx( (i/(grid.x.n-1)) *data.buf.length);
            g.moveTo(   x, pad.top);
            g.lineTo(   x, r.y.px-pad.bottom);
            let  t = new PIXI.Text( i, style.label);
            t.position.set( x,r.y.px-pad.bottom*.80);
            r.parent.addChild(t);
            } 
        g.lineStyle(  grid.y.width, grid.y.color, 1);
        for(let i=0; i<grid.y.n; i++  ) {
          let y = ploty( (i/(grid.y.n-1)) *data.span + data.min);
          g.moveTo(   pad.left,         y);
          g.lineTo(   r.x.px-pad.right, y);
          }
        txt( r.x.px/2, r.y.px-20, "x"    );
        txt(       20, r.y.px/2,  "y"    ).rotation=3*Math.PI/2;
        txt( r.x.px/2, 8,         "title");
/*
          let  t = new PIXI.Text( grid.x.label, style.label);
          t.position.set( r.x.px/2,r.y.px-13);
          r.parent.addChild(t);
          t = new PIXI.Text( grid.y.label, style.label);
          t.position.set( 8,r.y.px/2);
          t.rotation=3*Math.PI/2;
          r.parent.addChild(t);
          t = new PIXI.Text( grid.title.label, style.title);
          t.position.set( r.x.px/2 - t.width/2, 0);
          r.parent.addChild(t);
*/
          }); 

          
         return self;



        },
      show: ()=>{
        graphicLayers.forEach( g => r.parent.addChild(g) );
        return self;
        },
      destruct: ()=>{ 
        graphicLayers.forEach( g => { g.destroy(); });
        return null;
        }
      }
    return self.construct();
    }