const sfxcfg={
	root:  			{ url: "./assets/sfx/" 					},
	jog:  			{ url: "tok.wav", 			volume:0.1	},
	click:			{ url: "click.wav",    		volume:0.2	},
	clickoff:   	{ url: "clickoff.wav", 		volume:0.2	},
	clicksoft: 		{ url: "clicksoft.wav",    	volume:0.4	},
	clickoffsoft:   { url: "clickoffsoft.wav", 	volume:0.4	},
	}

export const newSFX = sfx =>{
/*	sfx = typeof sfx=="string" ? sfxcfg[ sfx ] : sfx;
	const api=      new Audio(     sfxcfg.root.url    + sfx.url );
	let   volume=   sfx.volume ||  sfxcfg.root.volume || 1;
	let   playOnce=  true;
	const self= {
		replay: ()=>{ 
			playOnce=true;
			return self;
			},
	  	play: ()=> {
			if( self.playOnce ) {
				api.currentTime=0;

				api.play();
				playOnce=false;
				}
			return self;
			}
		}
	console.log( api, playOnce, self)
	
	return self;

	}
*/
	
	sfx = typeof sfx=="string" ? sfxcfg[ sfx ] : sfx;
 
	const self= {
		api:      new Audio(     sfxcfg.root.url    + sfx.url ),
		volume:   sfx.volume ||  sfxcfg.root.volume || 1, //does nothing
	  	playOnce: true,//does nothing

		replay: ()=> self.playOnce=true,
	  	play: ()=> {
			if( !self.playOnce ) return; 
			self.api.currentTime=0;
			self.api.play();
			self.playOnce=true; //does nothing
			}
		}
	return self;
	}