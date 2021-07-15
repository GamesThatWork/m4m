 
const show={show:true},  hide={hide:true }, listen={listen:true },unlisten={unlisten:true };



export const program=[

 	{ id:"attractmode", map:{ desktop:{ show:true } }, await:"click", then:"init"   },
 	{ id:"init", dialog:{ claro:"welcome" }, map:{ desktop:{hide:true}, blur:{show:true} }   },
	
	{ dialog:{ claro:"challenge"  }},
	{ dialog:{ claro:"intro"      }, equation:show },
	{ dialog:{ claro:"model"      }, equation:hide  },
	{ dialog:{ claro:"heros"      }, pic:{ romeo:"show"}   },
	{ dialog:{ romeo:"pronto"     }  },
	{ dialog:{ claro:"instrument" }, pic:{ romeo:"hide", claro:"medium"},  scope: { show: true} },
	{ dialog:{ claro:"left"   },  scope: { bounds: "                              left" },    },
	{ dialog:{ claro:"right"  },  scope: { bounds: "                        right left" },    },
	{ dialog:{ claro:"normal" },  scope: { bounds: "                  hg760 right left" },    },
	{ dialog:{ claro:"glass"  },  scope: { bounds: "            glass hg760 right left" },    },
	{ dialog:{ claro:"steel"  },  scope: { bounds: "      steel glass hg760 right left" },    },
	{ dialog:{ claro:"stone"  },  scope: { bounds: "stone steel glass hg760 right left" },    },
	{    pic:{ claro:"medium" },  scope: { bounds: "      steel ", show:true }, equation:show, now:"next"},
	
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


	{ id:"xplo",  scope:show,  pic: {claro:"small"}, equation:hide,  now:"next"  },
	
	{ id:"omega", dialog:{ claro:"omega"  }, pic: {claro:"small"},
								spin:{ domain:"xplo", answers:{default:"ok" }}, 			respond: {ok:"next"}     }, // support all
	{ id:"scrub", dialog:{ claro:"scrub"  }, trace:true,
								spin:{ domain:"xplo", answers:{default:"ok" }}, 			respond: {ok:"next"}     }, // support all
	{ id:"mapped", dialog:{ claro:"mapped"}, trace:true,
			map:{range:show},	spin:{ domain:"xplo", answers:{default:"ok", xp3:"ok" }}, 	respond: {ok:"next"}     }, // support all



	{ id:"q1", 
			monolog:{ claro:"q1" }, 
			scope: show, 
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
	{ id:"jumphere",   now:"next" 	},
 
	{ dialog:{ claro:"mission" }, scope:hide, reticle:hide,	plot:false, spin:false  },
	{ dialog:{ romeo:"intro" } ,  pic:{ claro:"big", romeo:"show"},	music:{ volume:0.03, play:true } },
	{ dialog:{ romeo:"context" }, 
	 	 pic:{ claro:"hide", romeo:"small"},
		 map:{ range:hide, bridges:show},
		icon:{
			blue: { img:"blue", x: 266, y: 735,  size: [  60,  60], show:true },
			red0: { img:"red1", x:  10, y: 660,  size: [  60,  60], show:true },
			red1: { img:"red3", x: 211, y: 190,  size: [ 135, 135], show:true },
			red2: { img:"red3", x:1100, y:  30,  size: [ 135, 135], show:true },
			red3: { img:"red1", x:1225, y: -20,  size: [  55,  55], show:true }
				}},
	
	{ id:"blue",      monolog:{ romeo:"blue"  }, 		find:{ domain:"full", answers:{ blue:"right", default:"wrong" }}  },
	{ id:"blue_ask"  , dialog:{ romeo:"blue_ask"    },	respond: {spinRightWrong:"blue"}  },
	{ id:"blue_wrong", dialog:{ romeo:"blue_wrong"  },  respond: {spinRightWrong:"blue"} },
	{ id:"blue_close", dialog:{ romeo:"blue_close"  },	respond: {spinRightWrong:"blue"}   },
	{ id:"blue_right", dialog:{ romeo:"blue_right"  },	then:"next"   },

	
	{ id:"red",      monolog:{ romeo:"red"  }, 		find:{ domain:"full", answers:{ red0:"right", default:"wrong" }}  },
	{ id:"red_ask"  , dialog:{ romeo:"red_ask"    },	respond: {spinRightWrong:"red"}  },
	{ id:"red_wrong", dialog:{ romeo:"red_wrong"  },    respond: {spinRightWrong:"red"} },
	{ id:"red_close", dialog:{ romeo:"red_close"  },	respond: {spinRightWrong:"red"}   },
	{ id:"red_right", dialog:{ romeo:"red_right"  },	then:"next"   },

	{ id:"reds",      monolog:{ romeo:"reds"  }, 		find:{ domain:"full", answers:{ red1:"right",red2:"right",red3:"right",default:"wrong" }}  },
	{ id:"reds_ask"  , dialog:{ romeo:"reds_ask"    },	respond: {spinRightWrong:"reds"}  },
	{ id:"reds_wrong", dialog:{ romeo:"reds_wrong"  },  respond: {spinRightWrong:"reds"} },
	{ id:"reds_close", dialog:{ romeo:"reds_close"  },	respond: {spinRightWrong:"reds"}   },
	{ id:"reds_right", dialog:{ romeo:"reds_right"  },	then:"next"   },

	{ id:"hq",      monolog:{ romeo:"hq"  }, 		find:{ domain:"full", answers:{ hq:"right", default:"wrong" }}  },
	{ id:"hq_ask"  , dialog:{ romeo:"hq_ask"    },	respond: {spinRightWrong:"hq"}  },
	{ id:"hq_wrong", dialog:{ romeo:"hq_wrong"  },  respond: {spinRightWrong:"hq"} },
	{ id:"hq_close", dialog:{ romeo:"hq_close"  },	respond: {spinRightWrong:"hq"}   },
	{ id:"hq_right", dialog:{ romeo:"hq_right"  },	then:"next"   },
	
	{ id:"bridge1",      monolog:{ romeo:"bridge1"  }, 		find:{ domain:"full", answers:{ bridge1:"right", default:"wrong" }}  },
	{ id:"bridge1_ask"  , dialog:{ romeo:"bridge1_ask"    },	respond: {spinRightWrong:"bridge1"}  },
	{ id:"bridge1_wrong", dialog:{ romeo:"bridge1_wrong"  },  	respond: {spinRightWrong:"bridge1"} },
	{ id:"bridge1_close", dialog:{ romeo:"bridge1_close"  },	respond: {spinRightWrong:"bridge1"}   },
	{ id:"bridge1_right", dialog:{ romeo:"bridge1_right"  },	then:"next"   },
	
	{ id:"bridge2",      monolog:{ romeo:"bridge2"  }, 		find:{ domain:"full", answers:{ bridge2:"right", default:"wrong" }}  },
	{ id:"bridge2_ask"  , dialog:{ romeo:"bridge2_ask"    },	respond: {spinRightWrong:"bridge2"}  },
	{ id:"bridge2_wrong", dialog:{ romeo:"bridge2_wrong"  },  	respond: {spinRightWrong:"bridge2"} },
	{ id:"bridge2_close", dialog:{ romeo:"bridge2_close"  },	respond: {spinRightWrong:"bridge2"}   },
	{ id:"bridge2_right", dialog:{ romeo:"bridge2_right"  },	then:"next"   },
	
	{ id:"bridge3",      monolog:{ romeo:"bridge3"  }, 		find:{ domain:"full", answers:{ bridge3:"right", default:"wrong" }}  },
	{ id:"bridge3_ask"  , dialog:{ romeo:"bridge3_ask"    },	respond: {spinRightWrong:"bridge3"}  },
	{ id:"bridge3_wrong", dialog:{ romeo:"bridge3_wrong"  },  	respond: {spinRightWrong:"bridge3"} },
	{ id:"bridge3_close", dialog:{ romeo:"bridge3_close"  },	respond: {spinRightWrong:"bridge3"}   },
	{ id:"bridge3_right", dialog:{ romeo:"bridge3_right"  },	then:"next"   },
	
	{ id:"bombsite1",      monolog:{ romeo:"bombsite1"  }, 	find:{ domain:"full", answers:{ bridge1:"right", default:"wrong" }}  },
	{ id:"bombsite1_ask"  , dialog:{ romeo:"bombsite1_ask"    },	respond: {spinRightWrong:"bombsite1"}  },
	{ id:"bombsite1_wrong", dialog:{ romeo:"bombsite1_wrong"  },  	respond: {spinRightWrong:"bombsite1"} },
	{ id:"bombsite1_close", dialog:{ romeo:"bombsite1_close"  },	respond: {spinRightWrong:"bombsite1"}   },
	{ id:"bombsite1_right", dialog:{ romeo:"bombsite1_right"  },	then:"next"   },
	{	find:false	},
	
	{ id:"bomb1",   	 monolog:{ romeo:"bomb1"  }, spin:{ domain:"xplo", answers:{ xp0:"low",xp1:"low",xp2:"low",xp3:"right",xp4:"high",xp5:"high"}}},
	{ id:"bomb1_ask"  , dialog:{ romeo:"bomb1_ask"    },	respond: {spinRightWrong:"bomb1"}  },
	{ id:"bomb1_wrong", dialog:{ romeo:"bomb1_wrong"  },  	respond: {spinRightWrong:"bomb1"} },
	{ id:"bomb1_close", dialog:{ romeo:"bomb1_close"  },	respond: {spinRightWrong:"bomb1"}   },
	{ id:"bomb1_right", dialog:{ romeo:"bomb1_right"  },	then:"next"   },
	{ 	scope:hide, reticle:hide,	plot:false, spin:false  },
	
	{ id:"bda1",      monolog:{ romeo:"bda"  }, 	find:{ domain:"bda", answers:{ bridge1:"bda"} }  },
	
	{ id:"shrine",      monolog:{ romeo:"shrine"  }, 	find:{ domain:"full", answers:{ shrine:"right", default:"wrong" }}  },
	{ id:"shrine_ask"  , dialog:{ romeo:"shrine_ask"    },	respond: {spinRightWrong:"shrine"}  },
	{ id:"shrine_wrong", dialog:{ romeo:"shrine_wrong"  },  respond: {spinRightWrong:"shrine"} },
	{ id:"shrine_close", dialog:{ romeo:"shrine_close"  },	respond: {spinRightWrong:"shrine"}   },
	{ id:"shrine_right", dialog:{ romeo:"shrine_right"  },	then:"next"   },
	
	{ id:"bombsite2",      monolog:{ romeo:"bombsite2"  }, 	find:{ domain:"full", answers:{ bridge2:"right", bridge3:"right", default:"wrong" }}},
	{ id:"bombsite2_ask"  , dialog:{ romeo:"bombsite2_ask"    },	respond: {spinRightWrong:"bombsite2"}  },
	{ id:"bombsite2_wrong", dialog:{ romeo:"bombsite2_wrong"  },	respond: {spinRightWrong:"bombsite2"} },
	{ id:"bombsite2_close", dialog:{ romeo:"bombsite2_close"  },	respond: {spinRightWrong:"bombsite2"}   },
	{ id:"bombsite2_right", dialog:{ romeo:"bombsite2_right"  },	then:"next"   },
	
	{ id:"bomb2",   	 monolog:{ romeo:"bomb2"  }, find:false,
					spin:{ domain:"xplo", answers:{ xp0:"low",xp1:"low",xp2:"low",xp3:"right",xp4:"high",xp5:"high"}}},
	{ id:"bomb2_ask"  , dialog:{ romeo:"bomb2_ask"    },	respond: {spinRightWrong:"bomb2"}  },
	{ id:"bomb2_wrong", dialog:{ romeo:"bomb2_wrong"  },  respond: {spinRightWrong:"bomb2"} },
	{ id:"bomb2_close", dialog:{ romeo:"bomb2_close"  },	respond: {spinRightWrong:"bomb2"}   },
	{ id:"bomb2_right", dialog:{ romeo:"bomb2_right"  },	then:"next"   },

	{ scope:hide, reticle:hide,	plot:false, spin:false  },
	{ id:"bda2",      monolog:{ romeo:"bda"  }, 	find:{ domain:"bda", answers:{ bridge2:"right",bridge3:"right"} }  },


	{ dialog:{ romeo:"end" } ,  pic:{ claro:"big", romeo:"show"},  map:{ blur:hide, bridges:hide}, music:{volume:0} },

	{ id:"end", dialog:{ claro:"end"},  pic:{ claro:"big", romeo:"hide"} },
		
	{ id:"",},

	];
