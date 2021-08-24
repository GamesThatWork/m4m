import  { signal     } from './signal.js'    ;


const url= { 	
	server: "./assets/icon/",
	stone:  "stone.png",
	glass:  "glass.png",
   shrine:  "shrine.png",
	 blue:  "bluecrew.png",
	 red1:  "1red.png",
	 red3:  "3red.png",
	 logo:  "GTW.png",   
//restart:  "restart.png",
// replay:  "replay.png",
	};

const across = [ 41, 37, 49]



const road = [
	[// from entering the map, until center of base, on map bridges_1
	[-999,-999],
		[-30,200],[-21,204],[-11,209],[ -3,214],[  6,218],[ 15,224],[ 23,229],[ 31,235],[ 40,242],[ 49,249],
		[ 56,257],[ 64,265],[ 72,270],[ 82,273],[ 91,272],[100,271],[109,269],[118,265],[128,261],[135,258],
		[145,252],[153,249],[161,244],[170,241],[178,237],[187,233],[195,229],[204,226],[213,223],[222,220],
	/* on bridge*/
		[232,218],[242,219],[252,219],[262,219],[272,219],[282,217],[292,216],[302,216],[312,218],[322,220],
	/* off bridge */
		[331,222],[339,225],[348,228],[356,232],[366,238],[373,241],[382,243],[391,247],[399,252],[411,256],
		[421,263],[431,268],[441,272],[451,274],[461,276],[471,278],[481,280],[491,282],[502,286],[512,294],
		[520,304],[529,313],[539,320],[549,326],[552,336],[554,346],[556,356],[562,368],[572,380],[582,386],
		[592,390],[602,394],[612,400],[622,401],[632,396],[640,388],[646,379],[647,369],[652,361],[655,351],
		[659,341],[663,331],[666,321],[670,311],[676,300],[676,290],[680,280],[684,270],[687,260],[691,250],
		[701,250],[711,250],[721,250],[730,250],[740,250],[750,250],[760,250],[770,250],[780,250],[790,250],
		[800,250],[810,250],[820,250],[830,250],[840,250],[850,250]
	],
	[// [1] attck fromn offscreen North and go directly down across bridge 2 into the Blue Bazse
	[-999,-999],
		[-63,  6],[-59, 16],[-55, 26],[-47, 36],[-38, 46],[-30, 56],[-20, 66],[-12, 75],[ -3, 83],[  4, 92],
		[ 11,100],[ 20,110],[ 26,120],[ 35,130],[ 43,140],[ 51,150],[ 59,160],[ 66,170],[ 75,180],[ 83,190],
		[ 94,200],[102,210],[111,220],[119,230],[124,240],[128,250],[133,260],[137,270],[141,280],[145,290],
	/* on bridge*/
		[151,300],[151,310],[155,320],[157,330],[162,340],[166,350],
	/* off bridge */
																	[171,360],[174,370],[174,380],[174,390],
		[172,400],[170,410],[169,420],[167,430],[168,440],[169,450],[171,460],[172,470],[175,480],[178,490],
		[182,500],[181,510],[185,520],[186,530],[186,540],[182,550],[182,560],[179,570],[179,580],[179,590],
		[179,600],[183,610],[184,620],[187,630],[193,640],[198,650],[206,660],[210,670],[215,680],[220,690],
		[225,700],[226,710],[230,720],[235,730],[235,742],[235,750],[235,760],[235,770],[233,780],[230,790],
		[230,800],[226,810],[220,830],[217,840],[217,850],[212,860],[206,870],[203,880],
	],
	[// [2] branch off from Road 2 then follow Road 3 across the old stone bridge into Blue terirory
	[-999,-999],		
		[-47, -4],[-37, -4],[-27, -7],[-17, -9],[ -7,-11],[  3,-15],[ 13,-18],[ 23,-19],[ 26,-29],[ 38,-29],
		[ 50,-26],[ 60,-22],[ 70,-22],[ 71,-12],[ 81, -6],[ 84,  3],[ 95, 13],[104, 23],[115, 33],[124, 43],
		[120, 53],[123, 63],[130, 73],[140, 83],[144, 88],[150, 96],[157,103],[167,113],[173,123],[177,133],
		[182,143],[190,153],[200,163],[217,173],[224,183],[226,194],[227,204],[228,211],[238,215],[248,217],
		[258,221],[268,218],[278,213],[288,210],[298,207],[308,202],
	/* on bridge*/
																	[312,202],[317,212],[322,222],
	/* off bridge*/
																								   [307,226],
		[299,236],[282,246],[286,256],[299,266],[303,276],[279,286]
	]
];


const drive={	road:road[0], across:across[0], position:0,	lead:20, timers:[], road2:road[2], position2:0, 
				time:()=> (drive.position < drive.across)? 	 			"early"
			     		: (drive.position >(drive.across+drive.lead)? 	"late"
						: 												"okay" )   };

const selfs={};
var parent= document.querySelector("#pix");


export const newIcon= (name, cfg) => {

	console.log("icon", name );
	if( name=="all")	{
		Object.keys(selfs).forEach( name=> {
			console.log("<all> is hiding icon "+ name);
			selfs[name].hide();
			});
		return Object.values(selfs)[0];
		}
	if( selfs[ name ] )	return selfs[name];
	if( cfg.parent )	parent=cfg.parent;
	var g=false; 

    const self={
		name, 
		get g() { return g },
		construct: ()=>{
			let imgfile= cfg.img || name;
			if( !url[imgfile])  {
				console.warn("Missing icon file", imgfile, name );
				return;
				}
			g = new PIXI.Sprite.from( url.server + url[ imgfile ]);
			parent.addChild( g )
			return self;
			},
		img:  imgfile =>{	/*unsupported as command*/   					return self;},
		hide:  ()	  =>{	g.visible=false;			 					return self;},
		show:  ()	  =>{	g.visible=true; 			 					return self;},
		move:   m     =>{	g.position.set(m[0],m[1]);	 					return self;},
		x: 	    x     =>{	g.x=x;											return self;},
		y: 	    y	  =>{	g.y=y;						 					return self;},
		size:   s	  =>{	g.width=s[0]; g.height=s[1];			  		return self;},
		road:	r	  =>{	drive.road=road[ r ]; drive.across=road[ r ]; 	return self;},
		drive:	r	  =>{   drive.road= road[ r%road.length ];
							drive.position = 0;
							drive.timers.push( setInterval( e=>
								self.move( drive.road[ Math.min(drive.position++, drive.road.length-1)] ),
								1250));										return self;},	
		chase:	()	  =>{   drive.timers.push( setInterval( e=>
								self.move( drive.road[ Math.max(0, Math.min( drive.position-drive.lead, drive.road.length-1))] ),
								1250));										return self;},
		drive2:  r	  =>{   drive.road2= road[ r%road.length ];
							drive.position2 = 0;
							drive.timers.push( setInterval( e=>
								self.move( drive.road2[ Math.min(drive.position2++, drive.road2.length-1)] ),
								2250));										return self;},
		time:  ()	  =>{	signal.fire( drive.time() );
								console.log("TIME:"+drive.time(), drive.timers );
								drive.timers.forEach( t=>clearInterval(t) );
								return self;},
		getTime:	drive.time,
		destruct: ()=>g.destroy(),

		
        }
    return selfs[ name ]=self.construct();
    }
	
	
