import  { sfx		 } from './sfx.js';


export const newScope = cnfg => {
    const r=cnfg ; 
    const blurFilter = new PIXI.filters.BlurFilter();
          blurFilter.blur = 20;     

    var plotLayers=[ new PIXI.Graphics(), new PIXI.Graphics()  ];
    var markLayers=[ new PIXI.Graphics(), new PIXI.Graphics()  ];
    var lineLayers=[ new PIXI.Graphics(), new PIXI.Graphics()  ];
    var gridLayer=   new PIXI.Graphics();
    var boundsLayer=   new PIXI.Graphics();
    
    var allLayers= [ gridLayer, ...markLayers, ...plotLayers ];

    const width={data:[9,3]              , peak:[11,1]             , line:[11,3]   };
    const color={data:[0x770000,0x55FF00], peak:[0x000000,0x1F0000], line:[0x8F8800,0xFFFFFF]};
    
    const data={buf:r.data};
    const parent= new PIXI.Container();
    var overlay;
    let  stonecolor=0xFF1100;
    let  steelcolor=0xEE5500;
    let  glasscolor=0xDDAA00;
	let  hg760color=0x22BB22;

    const textStyle={ 
      default:{  fontFamily: 'Share Tech Mono',  fontSize: 13,  fill: 'grey',       align: 'center' },
      label:{    fontFamily: 'Share Tech Mono',  fontSize: 13,  fill: 'grey',       align: 'center' },
      edges:{    fontFamily: 'Share Tech Mono',  fontSize: 13,  fill: 'white',      align: 'center' },
      glass:{    fontFamily: 'Share Tech Mono',  fontSize: 17,  fill: glasscolor,   align: 'right'  },
      steel:{    fontFamily: 'Share Tech Mono',  fontSize: 17,  fill: steelcolor,   align: 'right'  },
      hg760:{    fontFamily: 'Share Tech Mono',  fontSize: 17,  fill: hg760color,   align: 'right'  },
      stone:{    fontFamily: 'Share Tech Mono',  fontSize: 17,  fill: stonecolor,   align: 'right'  },
      title:{    fontFamily: 'Share Tech Mono',  fontSize: 26,  fill: 'lightblue',  align: 'center' },
      cover:{    fontFamily: 'Share Tech Mono',  fontSize: 90,  fill: 'green',      align: 'center' },
      uncover:{  fontFamily: 'Share Tech Mono',  fontSize: 90,  fill: 'grey',      align: 'center' },
      };

 

    const grid = {
      glass:{   color:glasscolor, width:3, label:"GLASS BREAKS"             }, 
      steel:{   color:steelcolor, width:3, label:"STEEL BREAKS"             }, 
      stone:{   color:stonecolor, width:3, label:"STONE BREAKS"             }, 
      hg760:{   color:hg760color, width:3, label:"NORMAL AIR PRESSURE"      }, 
      title:{   color:0x448844,            label:"OVERPRESSURE"             }, 
      cover:{   color:0x448844,            label:"  RUN SIMULATION"         }, 
      uncover:{ color:0x448844,            label:"PAUSE SIMULATION"         }, 
      x:{ n:17, color:0x448844,   width:1, label:"KILOMETERS",      scale:30}, 
      y:{ n:8,  color:0x888888,   width:1, label:"MPa",             scale:30},
	  edges:{   color:0xBBBBBB,   width:5                                   },
      activeBounds: false,
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
	  let layer = style.layer || gridLayer;
	  layer.addChild(t);
      return t;
      }



const sound = {
      playOnce: true,
      replay: ()=> sound.playOnce=true,
      play: ()=> {
        	if( sound.playOnce )     sfx.explosion.slow.play();
          	sound.playOnce=false;
	        }
      }
 

function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
function toHex(n) {
 n = (parseInt(n,10)||0)  & 0xFF;
 return "0123456789ABCDEF".charAt( n>>4 )
      + "0123456789ABCDEF".charAt( n&0xF);
 //return "0123456789ABCDEF".charAt((n-n%16)/16)      + "0123456789ABCDEF".charAt(n%16);
}

const maxVal= .005;
const minVal=-.001;

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
	let marks=0;

    let suppressed=false;
    let suppressArea= (suppress=false) =>{
		suppressed=suppress;	
		plotLayers[1].alpha = suppressed?  0.1 : 1  ;
		markLayers[0].alpha = suppressed?  0.1 : 1  ;
		gridLayer    .alpha = suppressed?  0.9 : 1  ;
		boundsLayer  .alpha = suppressed?  0.1 : 0.75;
		}

    
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
        return self;
        },

	  simulating: yes => self.simulationRunning = yes ?? !self.simulationRunning, 
	  
	  trail:[],

      plot: (d,t=1)=>{

	//  if( t>0.5 && t<0.51) console.log("databuffer",d);
        sound.play();
        d= d.map( (v,i,d)=> isNaN(v)? d[i? i-1:1] : v  );
        d= d.map(  v     => v>maxVal? maxVal : (v>minVal? v: minVal) );
        //d= d.map( (v,i,d)=> isNaN(v)? d[i? i-1:1] : ( v>maxVal? maxVal : (v>minVal? v: minVal) ));

        let peak = d.reduce( (max,v,i,a)=> a[max]>a[i]? max:i, 0 );

        overlay.alpha= suppressed? 0 : (1-t)**2.5; 		 // visual blast effect 

		markLayers.forEach( (m, layer) =>{
			if( !layer ) {
				m.filters = [blurFilter];    
				m.lineStyle(  0);
				m.beginFill(0x0);
				m.drawCircle( plotx( peak), ploty( d[peak] ), 12 );
				m.endFill();
				if( ++marks >500){
					m.clear();
					marks=0;
					};
				}
			}); 

		/*markLayers.forEach( (m, layer) =>{
			if( !layer ) {
				m.filters = [blurFilter];    
				const c = new PIXI.Graphics( );
				if( c ){
					c.lineStyle(  0);
					c.beginFill(0x0);
					c.drawCircle( plotx( peak), ploty( d[peak] ), 12 );
					c.endFill();
					m.addChild( c );
					self.trail.push( c);
					if( self.trail.length > 500 ){ 
						let o = self.trail.shift();
						if( o )
							o.destroy();
						}
					}
				}
			}); */


		let y0 =  r.y.px- pad.bottom;
	
		let poly=[];
		poly.push(   plotx(  0 ) );
		poly.push(           y0  );
		d.forEach( (y,x) =>{ 
		  poly.push( plotx(x) );
		  poly.push( ploty(y) );
		  });
		poly.push(   plotx( d.length ) );
		poly.push(            y0       );

        plotLayers.forEach( (p, layer) =>{
          p.clear();
          if( !layer ){ p.filters = [blurFilter];    
		  //else {
			p.beginFill(0x00FF80);
			p.drawPolygon( poly );
			p.endFill();
			p.alpha= suppressed? 0.1:0.4;
			}
   		  p.lineStyle(  width.data[ layer ], color.data[layer], 1);
		  p.moveTo(   plotx(0), ploty( d[0]) );
		  d.forEach( (y,x) => p.lineTo( plotx(x), ploty(y)  ) );
		  }); 
        return self;  
        },
      line:  d=>{
	    d= d.map( (v,i,d)=> isNaN(v)? d[i? i-1:28] : v  );
        d= d.map( v=> v>maxVal? maxVal: (v>minVal? v: minVal) );
        let peak = d.reduce( (iMax,v,i,a)=> a[iMax]>a[i]? iMax:i, 0 );
  		self.cover = d[0]==-1 && d[peak]==-1;;
    
        lineLayers.forEach( (l, layer) =>{
			l.clear();
			l.alpha=1;
			if( self.coverText ) self.coverText.destroy();
			self.coverText = false;
			if( self.cover  )    self.coverText = txt( 510,220, self?.simulationRunning? "uncover" : "cover" );
			if( d[peak]==0 ) suppressArea(false);
			else{
				suppressArea(true);
				if( !layer ) l.filters = [blurFilter];    
				l.lineStyle(  width.line[ layer ], color.line[layer], 1);
				l.moveTo(   plotx(0), ploty( d[0]) );
				d.forEach( (y,x) => l.lineTo( plotx(x), ploty(y)  ) );
				}
    	  });
        return self;  
        },
      
	  setLineColor: newColor=> {
	  	//console.log(" plotLineColor", newColor ); 
		color.line[0]=color.line[1]=newColor;
		return self;
		},   

      grid: ()=>{
        console.log( "PLOT: grid");
        let g = gridLayer;     
        g.interactive=true;
        g.interactiveChildren=true;
        g.lineStyle(  3, 0x228822, 1);
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
          if(!(i%2)) txt( x,r.y.px-pad.bottom*.80, "label", i/2 );
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
        self.bounds(); 
        if( grid.hasEquation ) self.equation(); 
//console.log( g,gridLayer );
        return self;
        },
      // wants a control string not an object
	bounds: (elements=grid.activeBounds)=>{
        console.log( "SCOPE: bounds", elements );

		if( !elements )			elements="";
		if(  elements==="*" )	elements= "glass stone left right hg760 steel";
        elements= 	String( elements );
		grid.activeBounds = elements;

        let g= boundsLayer;
       	
		g.children.forEach( c =>  c.destroy( true ) );

		let edges = { left:0, right:1 };
		Object.keys( edges ).forEach( edge =>{
			if( elements.includes(    edge )){
				textStyle.edges.layer=boundsLayer;
				g.lineStyle(  grid.edges.width, grid.edges.color );
				let x = [ pad.left, r.x.px-pad.right][edges[ edge ]]
				g.moveTo(   x,   pad.top           );
				g.lineTo(   x,   r.y.px-pad.bottom );
				txt(        x+6, r.y.px-17, "edges", [ "Ground Zero","5 Mile" ][edges[ edge ]] );
				}});

		let threshhold = { hg760:0.86,  glass:0.72, steel:0.24, stone:0.12 };
		Object.keys( threshhold ).forEach( material =>{
			if( elements.includes( material )){
				textStyle[ material ].layer=boundsLayer;
				g.lineStyle(  grid[ material ].width, grid[ material ].color );
				let y = threshhold[ material ] * (r.y.px-pad.bottom-pad.top)+pad.top;
				g.moveTo(   pad.left,         y);
				g.lineTo(   r.x.px-pad.right, y);
				txt( r.x.px-pad.left-10, y-17, material );
				}});

        return self;
        }, 

    equation: ()=>{ //deprecated
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
        if( parent )	allLayers.forEach( g =>  parent.addChild(g) );
		return self;
        },
      hide: ()=>{
        if( parent )	allLayers.forEach( g=>  parent.removeChild(g) );
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
    	//    console.log( "Destroy Graphic Object:  ", g?.name);
			if( g && g.parent ) g.parent.removeChild(g);
		//	else console.log( "Found ORPHAN Graphic Object:  ", g?.name)
			g.destroy( true ); 
		 	} );
       parent.children.forEach( g => {
			 if( !g ) return;
			 console.log( "Found LOST CHILD Graphic Object:  ", g?.name)
			 parent.removeChild( g );
			 g.destroy( true ); 
			 });
		if( parent.parent ) parent.parent.removeChild(parent);
        return self;
        },
      replot: r =>{ 
     //   console.log("PLOTTER replot");
        if( !suppressed )   sound.replay();
        markLayers.forEach( m=>m.clear());
	 	marks=0;
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
    
    