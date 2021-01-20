
export const newLineChart = cnfg => {
    const r=cnfg ; 
    const blurFilter = new PIXI.filters.BlurFilter();
    const plotLayers=[ false, false];// new PIXI.Graphics(), new PIXI.Graphics()  ];
    const gridLayer= new PIXI.Graphics();
    const allLayers= [ gridLayer, ...plotLayers ];

    const lineWidth = [5,3];
    const color={data:0xFF1100};
    const data={buf:r.data};
    const parent= r.parent;



    const textStyle={ 
      default:{  fontFamily: 'Share Tech Mono',  fontSize: 13,  fill: 'grey',       align: 'center'},
      label:{    fontFamily: 'Share Tech Mono',  fontSize: 13,  fill: 'grey',       align: 'center'},
      title:{    fontFamily: 'Share Tech Mono',  fontSize: 26,  fill: 'lightblue',  align: 'center'}
      };

    const grid = {
      title:{   color:0x448844,          label:"OVERPRESSURE" }, 
      x:{ n:15, color:0x448844, width:1, label:"KILOMETERS", scale:30}, 
      y:{ n:8, color:0x888888,  width:1, label:"kPa", scale:30},
       } 
    
    const txt= (x,y, type, content )=>{
      let t = new PIXI.Text( content || grid[type].label, 
         textStyle[type] || textStyle.default);
      t.position.set( x- t.width/2, y);
      gridLayer.addChild(t);
      return t;
      }


    data.min = data.buf.reduce( (min,d)=> min<d? min:d,  Infinity );
    data.max = data.buf.reduce( (max,d)=> max>d? max:d, -Infinity );
    data.span= data.max-data.min;
    const pad  = { top:40, right:40, bottom:40, left:40 };
    let mx = (r.x.px -pad.left -pad.right) / (data.buf.length-1);
    let bx =          pad.left;
    let plotx= x=> mx* x  + bx;
    let my =-(r.y.px -pad.bottom -pad.top) / (data.span);
    let by =  r.y.px -pad.bottom;
    let ploty= y=> my*(y-data.min) + by;
  
    
    const self={
      displayObject: new PIXI.Container(),

      construct: ()=>{
        self.grid();
        self.plot( data.buf );
        return self;
        },
      plot: ( d )=>{
       
  //  console.log( d );
       plotLayers.forEach( (p, layer) =>{
        if(p) { 
          parent.removeChild(p)
          p.destroy();
          }
        p= new PIXI.Graphics();
        plotLayers[layer]=allLayers[layer+1]=p;
        p.lineStyle(  lineWidth[ layer ], color.data, 1);
        p.moveTo(   plotx(0), ploty( d[0]) );
        d.forEach( (y,x) => p.lineTo( plotx(x), ploty(y)  ) );
        parent.addChild(p);
        }); 
        
        return self;  
        }, 
      grid: ()=>{
        let g = gridLayer;        
        g.lineStyle(  grid.x.width, grid.x.color, 1);
        for(let i=0; i<grid.x.n; i++  ) {
          let x = plotx( (i/(grid.x.n-1)) *data.buf.length);
          g.moveTo(   x, pad.top);
          g.lineTo(   x, r.y.px-pad.bottom);
          txt( x,r.y.px-pad.bottom*.80, "label", String(i) );
          } 
        g.lineStyle(  grid.y.width, grid.y.color, 1);
        for(let i=0; i<grid.y.n; i++  ) {
          let y = ploty( (i/(grid.y.n-1)) *data.span + data.min);
          g.moveTo(   pad.left,         y);
          g.lineTo(   r.x.px-pad.right, y);
          txt( pad.left-10, y-10, "label",  String(i) );
          }
        txt( r.x.px/2, r.y.px-20, "x"    );
        txt(       20, r.y.px/2,  "y"    ).rotation=3*Math.PI/2;
        txt( r.x.px/2, 8,         "title");
        },
      show: ()=>{
        allLayers.forEach( g => r.parent.addChild(g) );
        return self;
        },
      destruct: ()=>{ 
        allLayers.forEach( g => { g.destroy(); });
        return null;
        }
      }
    return self.construct();
    }