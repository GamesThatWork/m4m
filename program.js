 
const show={show:true},  hide={hide:true }, listen={listen:true },unlisten={unlisten:true };



export const program=[
//	{ id:"shortcut", dialog:{ claro:"null" }, then:"jumphere" },
///	{ dialog:{ claro:"null" }    },
//	{ map:{ "desktop":{ show:true } }, pic: { alert:"rando" }, then:"next"} ,
 
	{ id:"init", dialog:{ claro:"welcome" }, map:{ blur:{ show:true } }, then:"jumphere"  },
	
	{ dialog:{ claro:"challenge"  }},
	{ dialog:{ claro:"intro"      }  },
	{ dialog:{ claro:"model"      }  },
	{ dialog:{ claro:"heros"      }, pic:{ romeo:"show"}  },
	{ dialog:{ romeo:"pronto"     }  },
	{ dialog:{ claro:"instrument" }, pic:{ romeo:"hide", claro:"small"},  scope: { show: true} },
	{ dialog:{ claro:"left"   },  scope: { bounds: "                              left" },    },
	{ dialog:{ claro:"right"  },  scope: { bounds: "                        right left" },    },
	{ dialog:{ claro:"normal" },  scope: { bounds: "                  hg760 right left" },    },
	{ dialog:{ claro:"glass"  },  scope: { bounds: "            glass hg760 right left" },    },
	{ dialog:{ claro:"steel"  },  scope: { bounds: "      steel glass hg760 right left" },    },
	{ dialog:{ claro:"stone"  },  scope: { bounds: "stone steel glass hg760 right left" },    },
	{ dialog:{ claro:"null"   },  scope: { bounds: "      steel                       " },    },
	{ id:"",scope: { show: true},  pic: {claro:"small"},  goto:"next"  },
	
	{ dialog:{ claro:"equation"  },  },
	
	{ id:"start",      monolog:{ claro:"start"  }, 		spin:{ domain:"math", answers:{ start:"right", default:"wrong" }},  },
	{ id:"start_ask"  , dialog:{ claro:"start_ask"   }, spinchoice:"start" },
	{ id:"start_wrong", dialog:{ claro:"start_wrong" }, spinchoice:"start" },
	{ id:"start_close", dialog:{ claro:"start_close" }, spinchoice:"start" },
	{ id:"start_right", dialog:{ claro:"start_right" }, then:"next"   },
	
	{ id:"power",      monolog:{ claro:"power"  }, 		spin:{ domain:"math", answers:{ power:"right", default:"wrong" }}  },
	{ id:"power_ask"  , dialog:{ claro:"power_ask"   }, spinchoice:"power"  },
	{ id:"power_wrong", dialog:{ claro:"power_wrong" }, spinchoice:"power"  },
	{ id:"power_close", dialog:{ claro:"power_close" }, spinchoice:"power"  },
	{ id:"power_right", dialog:{ claro:"power_right" }, then:"next"   },

	{ id:"pulse",      monolog:{ claro:"pulse" }, 		spin:{ domain:"math", answers:{ pulse:"right", default:"wrong", decay:"close" }}  },
	{ id:"pulse_ask"  , dialog:{ claro:"pulse_ask"   }, spinchoice:"pulse"  },
	{ id:"pulse_wrong", dialog:{ claro:"pulse_wrong" }, spinchoice:"pulse"  },
	{ id:"pulse_close", dialog:{ claro:"pulse_close" }, spinchoice:"pulse"  },
	{ id:"pulse_right", dialog:{ claro:"pulse_right" }, then:"next"   },
	
	{ id:"wave",      monolog:{ claro:"wave"  }, 		spin:{ domain:"math", answers:{ wave:"right", default:"wrong" }}  },
	{ id:"wave_ask"  , dialog:{ claro:"wave_ask"    },	spinchoice:"wave"  },
	{ id:"wave_wrong", dialog:{ claro:"wave_wrong"  },	spinchoice:"wave"  },
	{ id:"wave_close", dialog:{ claro:"wave_close"  },	spinchoice:"wave"  },
	{ id:"wave_right", dialog:{ claro:"wave_right"  },	then:"next"   },

	{ id:"decay",      monolog:{ claro:"decay"  }, 		spin:{ domain:"math", answers:{ decay:"right", default:"wrong"}}  },
	{ id:"decay_ask"  , dialog:{ claro:"decay_ask"   }, spinchoice:"decay"  },
	{ id:"decay_wrong", dialog:{ claro:"decay_wrong" }, spinchoice:"decay"  },
	{ id:"decay_close", dialog:{ claro:"decay_close" }, spinchoice:"decay"  },
	{ id:"decay_right", dialog:{ claro:"decay_right" }, then:"next"   },

	{ id:"prop",      monolog:{ claro:"prop"  }, 		spin:{ domain:"math", answers:{ prop:"right", default:"wrong"}}  },
	{ id:"prop_ask"  , dialog:{ claro:"prop_ask"    },  respond: {spinRightWrong:"prop"}   },
	{ id:"prop_wrong", dialog:{ claro:"prop_wrong"  },  respond: {spinRightWrong:"prop"}   },
	{ id:"prop_close", dialog:{ claro:"prop_close"  },  respond: {spinRightWrong:"prop"}   },
	{ id:"prop_right", dialog:{ claro:"prop_right"  },  then:"next"   },

	{ id:"omega", dialog:{ claro:"omega"  }, pic: {claro:"small"}, spin:{ domain:"xplo", answers:{}}  }, // support all

	{ id:"scrub", dialog:{ claro:"scrub"  }, trace:true, 		   spin:{ domain:"xplo", answers:{default:"response"}}},

	{ id:"mapped", dialog:{ claro:"mapped"}, trace:true, map:{ range:{show:true } }, 
			icon:{ glass1:{img:"glass", x:1100, y:100, size:[50,50], show:true } }, 
			spin:{ domain:"xplo", answers:{ xp3:{win:true}}}  },





	{ id:"q1", 
			monolog:{ claro:"q1" }, 
			scope: {  show: true}, 
			trace: true,
			pic:   {   claro:"small" }, 
			map:   {   range:{ show:true } }, 
			reticle: {       	         x:300,y:352, listen:true,  show:true },
			icon:{ 	stone:{ img:"stone", x:244,y:292, size:[30,20], show:true } }, 
			spin:{ domain:"xplo", answers:{ xp0:"low",xp1:"low",xp2:"low",xp3:"low",xp4:"right",xp5:"high"}},
			then:"next"  },
{ id:"q1_ask"  , dialog:{ claro:"q1_ask"    }, scope: {  show: true, bounds:"*" },  respond: {spinHighLow:"q1"}   },
	{ id:"q1_high",  dialog:{ claro:"q1_high"   }, scope: {  show: true, bounds:"*" },  respond: {spinHighLow:"q1"}   },
	{ id:"q1_low",   dialog:{ claro:"q1_low"    }, scope: {  show: true, bounds:"*" },  respond: {spinHighLow:"q1"}   },
	{ id:"q1_close", dialog:{ claro:"q1_close"  }, scope: {  show: true, bounds:"*" },  respond: {spinHighLow:"q1"}   },
	{ id:"q1_right", dialog:{ claro:"q1_right"  }, icon:{ 	stone:{ hide:true }},		then:"next"   },


	{ id:"q2", 
			monolog:{ claro:"q2" }, 
			scope:  { show: true, simulating:false}, 
			trace:  	true,
			pic:    { claro:"small" }, 
			map:    { range:{ show:true } }, 
			reticle:{        x: 300, y:352, listen:true,  show:true },
			icon:   {	
					glass0:{ x: 220, y: 20, img:"glass", size:[20,30], show:true}, 
					glass1:{ x: 100, y:560, img:"glass", size:[20,30], show:true}, 
					glass2:{ x: 612, y:333, img:"glass", size:[20,30], show:true}, 
					glass3:{ x: 325, y:700, img:"glass", size:[20,30], show:true}, 
					}, 
			spin:{ domain:"xplo", answers:{ xp0:"low",xp1:"low",xp2:"low",xp3:"right",xp4:"high",xp5:"high"}},
			then:"next"  },
	{ id:"q2_ask"  , dialog:{ claro:"q2_ask"    }, scope: {  show: true, bounds:"*" },  respond: {spinHighLow:"q2"}   },
	{ id:"q2_high",  dialog:{ claro:"q2_high"   }, scope: {  show: true, bounds:"*" },  respond: {spinHighLow:"q2"}   },
	{ id:"q2_low",   dialog:{ claro:"q2_low"    }, scope: {  show: true, bounds:"*" },  respond: {spinHighLow:"q2"}   },
	{ id:"q2_close", dialog:{ claro:"q2_close"  }, scope: {  show: true, bounds:"*" },  respond: {spinHighLow:"q2"}   },
	{ id:"q2_right", dialog:{ claro:"q2_right"  },
		icon:   {	glass0:{ hide:true},glass1:{ hide:true},glass2:{ hide:true},glass3:{ hide:true} }, 	then:"next"   },
	{ id:"jumphere",
		goto:"next"  
		},
	{ dialog:{ claro:"mission" }, scope:hide, reticle:hide,	plot:false, spin:false  },
	{ dialog:{ romeo:"intro" } ,  pic:{ claro:"small", romeo:"show"}	 },
	{ dialog:{ romeo:"context" }, map:  {range:hide, bridges:show}       },
	{ id:"",},

	];
