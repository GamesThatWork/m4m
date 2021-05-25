export const newScope = cnfg => {
    const r=cnfg ; 
    const blurFilter = new PIXI.filters.BlurFilter();
    var plotLayers=[ new PIXI.Graphics(), new PIXI.Graphics()  ];
    var markLayers=[ new PIXI.Graphics(), new PIXI.Graphics()  ];
    var lineLayers=[ new PIXI.Graphics(), new PIXI.Graphics()  ];
    var gridLayer=   new PIXI.Graphics();
    var boundsLayer=   new PIXI.Graphics();
    
    var allLayers= [ gridLayer, ...markLayers, ...plotLayers ];

    const width={data:[9,3]              , peak:[11,1]             , line:[7,5]   };
    const color={data:[0x770000,0x55FF00], peak:[0x000000,0x1F0000], line:[0x8F8800,0xFFFFFF]};
    
    const data={buf:r.data};
    const parent= new PIXI.Container();
    var overlay;
    let  steelcolor=0xFF1100;
    let  glasscolor=0xDDAA00;

    const textStyle={ 
      default:{  fontFamily: 'Share Tech Mono',  fontSize: 13,  fill: 'grey',       align: 'center'},
      label:{    fontFamily: 'Share Tech Mono',  fontSize: 13,  fill: 'grey',       align: 'center'},
      glass:{    fontFamily: 'Share Tech Mono',  fontSize: 17,  fill: glasscolor,   align: 'right'},
      steel:{    fontFamily: 'Share Tech Mono',  fontSize: 17,  fill: steelcolor,   align: 'right'},
      title:{    fontFamily: 'Share Tech Mono',  fontSize: 26,  fill: 'lightblue',  align: 'center'}
      };

 

    const grid = {
      glass:{   color:glasscolor, width:3, label:"GLASS BREAKS" }, 
      steel:{   color:steelcolor, width:3, label:"STEEL BREAKS" }, 
      title:{   color:0x448844,            label:"OVERPRESSURE" }, 
      x:{ n:15, color:0x448844,   width:1, label:"KILOMETERS", scale:30}, 
      y:{ n:8,  color:0x888888,   width:1, label:"MPa", scale:30},
      hasBounds: false,
      hasEquation: false
    } 
    
    const txt= (x,y, type, content )=>{ 
      let style = textStyle[type] || textStyle.default;
      if( !content )  content =grid[type]?.label || "";
      if( content==="0" )  content = "O";
      let t = new PIXI.Text(     content, style );
      if( style.align=='right' ) x-=t.width;
      if( style.align=='center') x-=t.width/2;
      t.position.set( x, y);
      gridLayer.addChild(t);
      return t;
      }

    const sound = {
      dom: null,
      playOnce: true,
      construct: ()=> {
        sound.api= new Audio("assets/exploslow.ogg");
        sound.api.volume=.1;
        },
      replay: ()=> sound.playOnce=true,
      play: ()=> {
        if( sound.playOnce ){ 
          if( !sound.api) sound.construct();
//          console.log( "SOUND", sound);
          sound.api.currentTime=0;
          sound.api.play();
          sound.playOnce=false;
          }
        }
      }

function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}

const clipVal=.005;

    data.min    = r.y.min || data.buf.reduce( (min,d)=> min<d? min:d,  Infinity );
    data.max    = r.y.max || data.buf.reduce( (max,d)=> max>d? max:d, -Infinity );
    data.length = r.x.max || data.buf.length;
    data.span= data.max-data.min;
    const pad  = { top:40, right:40, bottom:40, left:40 };
    let mx = (r.x.px -pad.left -pad.right) / (data.length-1);
    let bx =          pad.left;
    let plotx= x=> mx* x  + bx;
    let my =-(r.y.px -pad.bottom -pad.top) / (data.span);
    let by =  r.y.px -pad.bottom;
    let ploty= y=> my*(y-data.min) + by;

    
    const self={
      get hitBox() {return gridLayer;},
      construct: ()=>{
        r.parent.addChild( parent );
        gridLayer=   new PIXI.Graphics();
        markLayers=[ new PIXI.Graphics(), new PIXI.Graphics()  ];
        plotLayers=[ new PIXI.Graphics(), new PIXI.Graphics()  ];
        lineLayers=[ new PIXI.Graphics(), new PIXI.Graphics()  ];
        boundsLayer= new PIXI.Graphics();
        allLayers= [ gridLayer, ...markLayers, ...plotLayers, ...lineLayers, boundsLayer ];
		allLayers.forEach( (g,i)=>g.name=["grid", "markfx","mark","plotfx","plot","linefx","line","bounds"][i] );
        self.grid();
        if(data.buf) self.plot( data.buf );
        sound.construct();
        return self;
        },

      plot: d=>{
        sound.play();
        blurFilter.blur = 20;     
        d= d.map( v=> v>clipVal? clipVal:v )
        let peak = d.reduce( (max,v,i,a)=> a[max]>a[i]? max:i, 0 );

        overlay.alpha= d[peak]/data.max;  // visual blast effect 

        markLayers.forEach( (m, layer) =>{
          if( !layer ) m.filters = [blurFilter];    
       //   m.lineStyle(  width.peak[ layer ], color.peak[ layer ], .40);
       //   m.moveTo(     plotx( peak), ploty( data.min) );
       //   m.lineTo(     plotx( peak), ploty( d[peak] ) );
          m.lineStyle(  0);
          m.beginFill(0x106000);
          m.drawCircle( plotx( peak), ploty( d[peak] ), 3 );
          m.endFill();
          }); 

        plotLayers.forEach( (p, layer) =>{
          p.clear();
          if( !layer ) p.filters = [blurFilter];    
          p.lineStyle(  width.data[ layer ], color.data[layer], 1);
          p.moveTo(   plotx(0), ploty( d[0]) );
          d.forEach( (y,x) => p.lineTo( plotx(x), ploty(y)  ) );
          }); 
        return self;  
        },
      line:  d=>{
        blurFilter.blur = 20;     
        d= d.map( v=> Math.min(v, clipVal) )
        let peak = d.reduce( (iMax,v,i,a)=> a[iMax]>a[i]? iMax:i, 0 );

        lineLayers.forEach( (l, layer) =>{
          l.clear();
          if( !layer ) l.filters = [blurFilter];    
		  if( d[peak] >0 ){
			l.lineStyle(  width.line[ layer ], color.line[layer], 1);
			l.moveTo(   plotx(0), ploty( d[0]) );
			d.forEach( (y,x) => l.lineTo( plotx(x), ploty(y)  ) );
			 }}); 
        return self;  
        },
      
	  setLineColor: newColor=> {
	  	console.log(" plotLineColor", newColor ); 
		//color.line[0]=color.line[1]=newColor;
		return self;
		},

      grid: ()=>{
        console.log( "PLOT: grid");
        let g = gridLayer;     
        g.interactive=true;
        g.interactiveChildren=true;
        g.beginFill(0x122100);
        g.drawRect(0,0, r.x.px, r.y.px);
        g.endFill();
        g.beginFill(0x113311);
        g.drawRect(pad.left,pad.top, r.x.px-pad.right-pad.left, r.y.px-pad.top-pad.bottom);
        g.endFill();

        g.lineStyle(  grid.x.width, grid.x.color, 1);
        for(let i=0; i<grid.x.n; i++  ) {
          let x = plotx( (i/(grid.x.n-1)) *data.length);
          g.moveTo(   x, pad.top);
          g.lineTo(   x, r.y.px-pad.bottom);
          txt( x,r.y.px-pad.bottom*.80, "label", i );
          } 
        g.lineStyle(  grid.y.width, grid.y.color, 1);
        for(let i=0; i<grid.y.n; i++  ) {
          let y = ploty( (i/(grid.y.n-1)) *data.span + data.min);
          g.moveTo(   pad.left,         y);
          g.lineTo(   r.x.px-pad.right, y);
          txt( pad.left-10, y-10, "label",  i );
          }
        txt( r.x.px/2, r.y.px-20, "x"    );
        txt(       20, r.y.px/2,  "y"    ).rotation=3*Math.PI/2;
        txt( r.x.px/2, 8,         "title");

        overlay =gradientRect();
        overlay.position.set( pad.left, pad.top);
        overlay.width  =  r.x.px-pad.left-pad.right;
        overlay.height =  r.y.px-pad.bottom-pad.top;
        overlay.blendMode= PIXI.BLEND_MODES.LIGHTEN;
        overlay.alpha=0;
        g.addChild( overlay );
        if( grid.hasBounds   ) self.bounds(); 
        if( grid.hasEquation ) self.equation(); 
//console.log( g,gridLayer );
        return self;
        },
      bounds: ()=>{
        console.log( "PLOT: bounds");

        grid.hasBounds = true;
        let g= boundsLayer;
        g.lineStyle(  grid.glass.width, grid.glass.color );
        let y = 0.80* (r.y.px-pad.bottom-pad.top)+pad.top;
        g.moveTo(   pad.left,         y);
        g.lineTo(   r.x.px-pad.right, y);
        txt( r.x.px-pad.left-10, y-17, "glass");
        g.lineStyle(  grid.steel.width, grid.steel.color );
        y = 0.10* (r.y.px-pad.bottom-pad.top)+pad.top;
        g.moveTo(   pad.left,         y);
        g.lineTo(   r.x.px-pad.right, y);
        txt( r.x.px-pad.left-10, y-17, "steel" );
        return self;
        }, 
      equation: ()=>{
        grid.hasEquation = true;
        let texture = PIXI.Texture.from('/assets/equation.png');
        const eq = new PIXI.Sprite(texture);
        eq.width*=.6;
        eq.height*=.6;
        eq.position.set((r.x.px-eq.width)/2, (r.y.px-eq.height)/2);
        eq.blendMode= PIXI.BLEND_MODES.ADD;
        eq.alpha =0.2;
        gridLayer.addChild(eq);
        return self;
        },
      show: ()=>{
        allLayers.forEach( g =>console.log( "SHoW:  ", g.name, g, parent) );
        if( parent )
			allLayers.forEach( (g,i) =>{
				console.log( "SHOOW:  ", g.name)
			 	if(g && i<5 ) parent.addChild(g);
			 	} );
		else console.log( "SHoW no parent:  ", parent);
        
        return self;
        },
      dragReport: cb=>{
        //gridLayer.interactive = true;
        gridLayer.on( 'pointermove', cb );
        /*gridLayer.on('pointerdown',      e=> gridLayer.on( 'pointermove', cb ));
        gridLayer.on('pointerup',        e=> gridLayer.off('pointermove', cb ));
        gridLayer.on('pointerupoutside', e=> gridLayer.off('pointermove', cb ));
        gridLayer.on('pointerdown',      e=> console.log(  "pointerdown   dragreport"));*/
        return self;
        },
      destruct: ()=>{ 
	  	allLayers.forEach( g=>{
    	    console.log( "Graphic Object:  ", g?.name);
			if( g && g.parent ) g.parent.removeChild(g);
			else console.log( "SHOW Orphaned Graphic Object:  ", g?.name)
			g.destroy( true ); 
		 	} );
		if( parent.parent ) parent.parent.removeChild(parent);
/*        parent.children.forEach( g => {
			 if(g) 
			 parent.removeChild( g );
			 g.destroy( true ); 
			 });
        r.parent.removeChild( parent );*/
        return self;
        },
      replot: r =>{ 
     //   console.log("PLOTTER replot");
        sound.replay();
        markLayers.forEach( m=>m.clear());
        return self;
        },
      reset: r =>{ 
        console.log("PLOTTER reset");
        return self
				.destruct()
				.construct()
				.show();
        }
      }
    return self.construct();
    }



    
    function gradientRect() {
      const quality = 256;
      const canvas = document.createElement('canvas');
      canvas.width = quality;
      canvas.height = 1;
    
      const ctx = canvas.getContext('2d');
    
      // use canvas2d API to create gradient
      const grd = ctx.createLinearGradient(0, 0, quality, 0);
      grd.addColorStop(  0, 'rgba(255, 255, 255, 1.0)');
      grd.addColorStop( .125, 'rgba(255, 125, 125, 0.4)');
      grd.addColorStop( .5, 'rgba(255,  25,  25, 0.2)');
      grd.addColorStop(  1, 'rgba(255,   0,   0, 0.0)');
    
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, quality, 1);
    
      return new PIXI.Sprite(  PIXI.Texture.from(canvas) );
    }
    
    