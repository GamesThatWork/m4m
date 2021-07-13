export {newSFX, sfx};

const sfxcfg={
	root:  			{ url: "./assets/sfx/" 					},
	ok:  			{ url: "ok.wav", 			volume:0.25	},
	jog:  			{ url: "tok.wav", 			volume:1.0	},
	click:			{ url: "click.wav",    		volume:1.0  },
	clickoff:   	{ url: "clickoff.wav", 		volume:1.0	},
	clicksoft: 		{ url: "clicksoft.wav",    	volume:1.0	},
	clickoffsoft:   { url: "clickoffsoft.wav", 	volume:1.0	},
	exploslow:  	{ url: "exploslow.ogg", 	volume:0.15	},
	}


const newSFX = sound =>{

	sound = typeof sound=="string" ? sfxcfg[ sound ] : sound;
 
	const self= {
		api:      new Audio(     sfxcfg.root.url    + sound.url ),
		volume:   sound.volume ||  sfxcfg.root.volume || 1, //does nothing
	  	playOnce: true,//does nothing

		replay: ()=> self.playOnce=true,
	  	play: ()=> {
			if( !self.playOnce ) return; 
			self.api.volume=self.volume;
			self.api.currentTime=0;
			self.api.play();
			self.playOnce=true; //does nothing
			}
		}
	return self;
	};

const sfx = {
	ok:  newSFX("ok"),
	jog: newSFX("jog"),
	button:{
		down: 	newSFX("click"),
		up: 	newSFX("clickoff"),
		disabled:{
			down:	newSFX("clicksoft"),
			up: 	newSFX("clickoffsoft")
			}
		},
	explosion:{
		slow:  	newSFX("exploslow")
		},
	current:{
		up: 	newSFX("clickoff"),		
		}
	};