 
const show={show:true},  hide={hide:true }, listen={listen:true },unlisten={unlisten:true };



export const program=[


/*
{	id:"test",
	spin:{ domain:"xplo", answers:{default:"wrong" }}, 	respond: {ok:"test"}  ,
	map:{black:show},	
	race:true,
	scope: {  show: true, bounds:"*" }, 
	reticle:{ show:true, position:[300,300], listen:true } 
  	}, // support all
*/




	{ id:"attractmode", map:{ title:{ show:true } }, await:"click", then:"prebomb1"   },
	{ id:"pattern", map:{ title:{ show:true } }, await:"click", then:"init"   },
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
	{ id:"prop_ask"  , dialog:{ claro:"prop_ask"    },  respond: {pickRightWrong:"prop"}   },
	{ id:"prop_wrong", dialog:{ claro:"prop_wrong"  },  respond: {pickRightWrong:"prop"}   },
	{ id:"prop_close", dialog:{ claro:"prop_close"  },  respond: {pickRightWrong:"prop"}   },
	{ id:"prop_right", dialog:{ claro:"prop_right"  },  then:"next"   },


	{ id:"xplo", pic: {claro:"small"}, scope:show, equation:hide, reticle:hide, map:{ blur:show }, trace:false, plot:true, now:"next"  },
	
	{ id:"omega", dialog:{ claro:"omega"  }, pic: {claro:"small"},
								spin:{ domain:"xplo", answers:{default:"ok" }}, 			respond: {ok:"next"}     }, // support all
	{ id:"scrub", dialog:{ claro:"scrub"  }, trace:true,
								spin:{ domain:"xplo", answers:{default:"ok" }}, 			respond: {ok:"next"}     }, // support all
	{ id:"mapped", dialog:{ claro:"mapped"}, map:{range:show},	
			trace:true,	 reticle:{ show:true, position:[300,300], listen:true }, 
			spin:{ domain:"xplo", answers:{default:"ok", xp3:"ok" }}, 	respond: {ok:"next"}     }, // support all



	{ id:"q1", 
			monolog:{ claro:"q1" }, 
			scope: {  show: true, bounds:"*" },
			trace: true,
			pic:   {   claro:"small" }, 
			map:   {   range: show }, 
			reticle: {       	         x:300,y:352, listen:true,  show:true, listen:true },
			icon:{ 	stone:{ img:"stone", x:244,y:292, size:[30,20], show:true } }, 
			spin:{ domain:"xplo", answers:{ xp0:"low",xp1:"low",xp2:"low",xp3:"low",xp4:"right",xp5:"high"}},
			then:"next"  },
	{ id:"q1_ask"  , dialog:{ claro:"q1_ask"    }, scope: {  show: true, bounds:"*" },  respond: {pickHighLow:"q1"}   },
	{ id:"q1_high",  dialog:{ claro:"q1_high"   }, scope: {  show: true, bounds:"*" },  respond: {pickHighLow:"q1"}   },
	{ id:"q1_low",   dialog:{ claro:"q1_low"    }, scope: {  show: true, bounds:"*" },  respond: {pickHighLow:"q1"}   },
	{ id:"q1_close", dialog:{ claro:"q1_close"  }, scope: {  show: true, bounds:"*" },  respond: {pickHighLow:"q1"}   },
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

	{ id:"q2_ask"  , dialog:{ claro:"q2_ask"    }, scope: {  show: true, bounds:"*" },  respond: {pickHighLow:"q2"}   },
	{ id:"q2_high",  dialog:{ claro:"q2_high"   }, scope: {  show: true, bounds:"*" },  respond: {pickHighLow:"q2"}   },
	{ id:"q2_low",   dialog:{ claro:"q2_low"    }, scope: {  show: true, bounds:"*" },  respond: {pickHighLow:"q2"}   },
	{ id:"q2_close", dialog:{ claro:"q2_close"  }, scope: {  show: true, bounds:"*" },  respond: {pickHighLow:"q2"}   },
	{ id:"q2_right", dialog:{ claro:"q2_right"  },
		icon:   {	glass0:{ hide:true},glass1:{ hide:true},glass2:{ hide:true},glass3:{ hide:true} }, 	then:"next"   },
	{ id:"jumphere",   now:"next" 	},
 
	{ dialog:{ claro:"mission" }, scope:hide, reticle:hide,	plot:false, spin:false  },
	{ dialog:{ romeo:"intro" } ,  pic:{ claro:"big", romeo:"show"},	music:{ volume:0.03, play:true } },
	{ dialog:{ romeo:"context" }, 
	 	 pic:{ claro:"hide", romeo:"medium"},
		 map:{ range:hide, bridges:show},
		icon:{
			blue: { img:"blue", x: 266, y: 735,  size: [  60,  40], show:true },
			red0: { img:"red1", x:  10, y: 660,  size: [  60,  40], show:true },
			red1: { img:"red3", x: 211, y: 190,  size: [ 135,  75], show:true },
			red2: { img:"red3", x:1100, y:  30,  size: [ 135,  75], show:true },
			red3: { img:"red1", x:1225, y: -20,  size: [  55,  36], show:true }
				}},
	
	{ id:"blue",      monolog:{ romeo:"blue"  }, 		find:{ domain:"intro", answers:{ blue:"right", default:"wrong" }}  },
	{ id:"blue_ask"  , dialog:{ romeo:"blue_ask"    },	respond: {pickRightWrong:"blue"}  },
	{ id:"blue_wrong", dialog:{ romeo:"blue_wrong"  },  respond: {pickRightWrong:"blue"} },
	{ id:"blue_close", dialog:{ romeo:"blue_close"  },	respond: {pickRightWrong:"blue"}   },
	{ id:"blue_right", dialog:{ romeo:"blue_right"  },	then:"next"   },

	
	{ id:"red",      monolog:{ romeo:"red"  }, 		find:{ domain:"intro", answers:{ red0:"right", default:"wrong" }}  },
	{ id:"red_ask"  , dialog:{ romeo:"red_ask"    },	respond: {pickRightWrong:"red"}  },
	{ id:"red_wrong", dialog:{ romeo:"red_wrong"  },    respond: {pickRightWrong:"red"} },
	{ id:"red_close", dialog:{ romeo:"red_close"  },	respond: {pickRightWrong:"red"}   },
	{ id:"red_right", dialog:{ romeo:"red_right"  },	then:"next"   },

	{ id:"reds",      monolog:{ romeo:"reds"  }, 		find:{ domain:"intro", answers:{ red1:"right",red2:"right",red3:"right",default:"wrong" }}  },
	{ id:"reds_ask"  , dialog:{ romeo:"reds_ask"    },	respond: {pickRightWrong:"reds"}  },
	{ id:"reds_wrong", dialog:{ romeo:"reds_wrong"  },  respond: {pickRightWrong:"reds"} },
	{ id:"reds_close", dialog:{ romeo:"reds_close"  },	respond: {pickRightWrong:"reds"}   },
	{ id:"reds_right", dialog:{ romeo:"reds_right"  },	then:"next"   },

	{ id:"hq",      monolog:{ romeo:"hq"  }, 		find:{ domain:"intro", answers:{ hq:"right", default:"wrong" }}  },
	{ id:"hq_ask"  , dialog:{ romeo:"hq_ask"    },	respond: {pickRightWrong:"hq"}  },
	{ id:"hq_wrong", dialog:{ romeo:"hq_wrong"  },  respond: {pickRightWrong:"hq"} },
	{ id:"hq_close", dialog:{ romeo:"hq_close"  },	respond: {pickRightWrong:"hq"}   },
	{ id:"hq_right", dialog:{ romeo:"hq_right"  },	then:"next"   },
	
	{ id:"bridge1",      monolog:{ romeo:"bridge1"  }, 		find:{ domain:"intro", answers:{ bridge1:"right", default:"wrong" }}  },
	{ id:"bridge1_ask"  , dialog:{ romeo:"bridge1_ask"    },	respond: {pickRightWrong:"bridge1"}  },
	{ id:"bridge1_wrong", dialog:{ romeo:"bridge1_wrong"  },  	respond: {pickRightWrong:"bridge1"} },
	{ id:"bridge1_close", dialog:{ romeo:"bridge1_close"  },	respond: {pickRightWrong:"bridge1"}   },
	{ id:"bridge1_right", dialog:{ romeo:"bridge1_right"  },	then:"next"   },
	
	{ id:"bridge2",      monolog:{ romeo:"bridge2"  }, 		find:{ domain:"intro", answers:{ bridge2:"right", default:"wrong" }}  },
	{ id:"bridge2_ask"  , dialog:{ romeo:"bridge2_ask"    },	respond: {pickRightWrong:"bridge2"}  },
	{ id:"bridge2_wrong", dialog:{ romeo:"bridge2_wrong"  },  	respond: {pickRightWrong:"bridge2"} },
	{ id:"bridge2_close", dialog:{ romeo:"bridge2_close"  },	respond: {pickRightWrong:"bridge2"}   },
	{ id:"bridge2_right", dialog:{ romeo:"bridge2_right"  },	then:"next"   },
	
	{ id:"bridge3",      monolog:{ romeo:"bridge3"  }, 		find:{ domain:"intro", answers:{ bridge3:"right", default:"wrong" }}  },
	{ id:"bridge3_ask"  , dialog:{ romeo:"bridge3_ask"    },	respond: {pickRightWrong:"bridge3"}  },
	{ id:"bridge3_wrong", dialog:{ romeo:"bridge3_wrong"  },  	respond: {pickRightWrong:"bridge3"} },
	{ id:"bridge3_close", dialog:{ romeo:"bridge3_close"  },	respond: {pickRightWrong:"bridge3"}   },
	{ id:"bridge3_right", dialog:{ romeo:"bridge3_right"  },	then:"next"   },
	

{ id:"prebomb1", 
	equation:hide,
	scope:hide,
	reticle:hide,
	now:"next" },
	

	{ id:"aim1",       	respond: {pickRightWrong:"aim1"},
						find:{ domain:"aim1", answers:{ bridge1:"right", default:"wrong", bridge2:"close"}},
					  	voice:{ romeo:"aim1"   }},
	{ id:"aim1_ask"  ,	voice:{ romeo:"aim1_ask"    }},
	{ id:"aim1_wrong", 	voice:{ romeo:"aim1_wrong"  }},
	{ id:"aim1_close", 	voice:{ romeo:"aim1_close"  }},
	{ id:"aim1_right", 	monolog:{ romeo:"aim1_right"  },	then:"next"   },
/*
	{ id:"aim1_ask"  , dialog:{ romeo:"aim1_ask"    },	respond: {pickRightWrong:"aim1"} },
	{ id:"aim1_wrong", dialog:{ romeo:"aim1_wrong"  },  respond: {pickRightWrong:"aim1"} },
	{ id:"aim1_close", dialog:{ romeo:"aim1_close"  },	respond: {pickRightWrong:"aim1"} },
	{ id:"aim1_right", dialog:{ romeo:"aim1_right"  },	then:"next"   },

**/



	{ id:"aim1_end1",  
		map:{ bridges1:show },
		find:false,
		reticle:{  x: 300, y:352, listen:true,  show:true },
		trace:true,
		equation: hide,
		pic:   { romeo:"small"},
		scope: { show:true, bounds: "steel hg760"},
	 	icon:{
	     		blue:  { drive:0, size:[65,65] },
	            red1:  { chase:0, size:[65,65] }
		 	},
		now:"next"},	

	{ id:"bomb1",      monolog:{ romeo:"bomb1"  }, pic:{romeo: "show"   }, respond: { pickHighLow:"bomb1"},
		 spin:{ domain:"xplo", answers:{ xp0:"low",xp1:"low",xp2:"low",xp3:"low",xp4:"right",xp5:"high" } } },
	{ id:"bomb1_ask"  , dialog:{ romeo:"bomb1_ask"    },	respond: { pickHighLow:"bomb1"}  },
	{ id:"bomb1_low",   dialog:{ romeo:"bomb1_low"  },  	respond: { pickHighLow:"bomb1"} },
	{ id:"bomb1_high",  dialog:{ romeo:"bomb1_high"  },		respond: { pickHighLow:"bomb1"}   },

	{ id:"bomb1_right", 									respond: { pickLateEarly:"bomb1"}, now:"bomb1_time"  	},
	{ id:"bomb1_time", 	icon:{ blue:{ time:true } }								},
	{ id:"bomb1_late",  monolog:{ romeo:"bomb1_late"   },	then: "bomb1_end"  	},
	{ id:"bomb1_early", monolog:{ romeo:"bomb1_early"  },  	then: "bomb1_end"  	},
	{ id:"bomb1_okay",  monolog:{ romeo:"bomb1_okay"   },	then: "bomb1_end"  	},
	{ id:"bomb1_end",	scope:hide, reticle:hide,plot:false, spin:false, equation: hide, icon:{ blue:hide, red1:hide},
						now:"next"  },
	{ scope:hide, reticle:hide,	plot:false, spin:false, now:"next"  },
	
	{ id:"bda1",       monolog:{ romeo:"bda"  },   find:{ domain:"bda1", answers:{ bridge1:"right", blue:"close", default:"wrong" } }, 
														respond: {pickRightWrong:"bda1"}  },
	{ id:"bda1_ask"  , monolog:{ romeo:"aim1_ask"    },	respond: {pickRightWrong:"bda1"}  },
	{ id:"bda1_wrong", monolog:{ romeo:"aim1_wrong"  }, respond: {pickRightWrong:"bda1"}  },
	{ id:"bda1_close", monolog:{ romeo:"bomb1_right" },	respond: {pickRightWrong:"bda1"}  },
	{ id:"bda1_right", monolog:{ romeo:"bomb1_right" }, now:"next"   },



	{ id:"shrine",      monolog:{ romeo:"shrine"  }, find:{ domain:"aim2", answers:{ shrine:"right", target0:"right", default:"wrong" }}  },
	{ id:"shrine_ask"  , dialog:{ romeo:"shrine_ask"    },	respond: {pickRightWrong:"shrine"}  },
	{ id:"shrine_wrong", dialog:{ romeo:"shrine_wrong"  },  respond: {pickRightWrong:"shrine"} },
	{ id:"shrine_close", dialog:{ romeo:"shrine_close"  },	respond: {pickRightWrong:"shrine"}   },
	{ id:"shrine_right", dialog:{ romeo:"shrine_right"  },	then:"next"   },
	
	{ id:"bombsite2",      monolog:{ romeo:"bombsite2"  }, 	find:{ domain:"aim2", answers:{ bridge2:"right", bridge3:"right", default:"wrong" }}},
	{ id:"bombsite2_ask"  , dialog:{ romeo:"bombsite2_ask"    },	respond: {pickRightWrong:"bombsite2"}  },
	{ id:"bombsite2_wrong", dialog:{ romeo:"bombsite2_wrong"  },	respond: {pickRightWrong:"bombsite2"} },
	{ id:"bombsite2_close", dialog:{ romeo:"bombsite2_close"  },	respond: {pickRightWrong:"bombsite2"}   },
	{ id:"bombsite2_right", dialog:{ romeo:"bombsite2_right"  },	then:"next"   },
	

	
//	bridge3:"close",  bridge23:"right", default:"wrong" }}},
	{ id:"bombsite2_ask"  , dialog:{ romeo:"bombsite2_ask"    },	respond: {pickRightWrong:"bombsite2"} },
	{ id:"bombsite2_wrong", dialog:{ romeo:"bombsite2_wrong"  },	respond: {pickRightWrong:"bombsite2"} },
	{ id:"bombsite2_close", dialog:{ romeo:"bombsite2_close"  },	respond: {pickRightWrong:"bombsite2"}  },
	{ id:"bombsite2_right", dialog:{ romeo:"bombsite2_right"  },	then:"next"   },
	
	{ id:"prebomb2",  
		map:{ bridges23:show },
	 	reticle:{  x: 300, y:352, listen:true,  show:true },
		find:false,
		trace:true,
		equation: hide,
		pic: { romeo:"small"},
		scope: {show:true, bounds: "stone steel glass hg760"},
	 	icon:{	shrine:{ x:350, y:300, show:true         },
	     		red3:  { drive: 1, size:[120,60]},
	            red2:  { drive2:2, size:[120,60]}},
		now:"next"},

	{ id:"bomb2",      monolog:{ romeo:"bomb2"  }, spin:{ domain:"xplo", answers:{ default:"wrong", xp3:"right",xp4:"close",xp5:"close"}}},
	{ id:"bomb2_ask"  , dialog:{ romeo:"bomb2_ask"    },	respond: {pickRightWrong:"bomb2"}  },
	{ id:"bomb2_wrong", dialog:{ romeo:"bomb2_wrong"  },  	respond: {pickRightWrong:"bomb2"} },
	{ id:"bomb2_close", dialog:{ romeo:"bomb2_close"  },	respond: {pickRightWrong:"bomb2"}   },
	{ id:"bomb2_right", respond: { pickLateEarly:"bomb2"}, now:"bomb2_time"  	},
	{ id:"bomb2_time", 	icon:{ blue:{ time:true } }								},
	{ id:"bomb2_late",  monolog:{ romeo:"bomb2_late"   },	then: "bomb2_end"  	},
	{ id:"bomb2_early", monolog:{ romeo:"bomb2_early"  },  	then: "bomb2_end"  	},
	{ id:"bomb2_okay",  monolog:{ romeo:"bomb2_okay"   },	then: "bomb2_end"  	},
	{ id:"bomb2_end",	scope:hide, reticle:hide,plot:false, spin:false, equation: hide, icon:{ blue:hide, red1:hide},
						now:"next"  },


/*
	{ id:"bomb2",   	 monolog:{ romeo:"bomb2"  }, find:false,
					spin:{ domain:"xplo", answers:{ xp0:"low",xp1:"low",xp2:"low",xp3:"right",xp4:"high",xp5:"high"}}},
	{ id:"bomb2_ask"  , dialog:{ romeo:"bomb2_ask"    },	respond: {pickRightWrong:"bomb2"}  },
	{ id:"bomb2_wrong", dialog:{ romeo:"bomb2_wrong"  },  	respond: {pickRightWrong:"bomb2"} },
	{ id:"bomb2_close", dialog:{ romeo:"bomb2_close"  },	respond: {pickRightWrong:"bomb2"}   },
	{ id:"bomb2_right", dialog:{ romeo:"bomb2_right"  },	then:"next"   },
*/
	{ scope:hide, reticle:hide,	plot:false, spin:false  },
	{ id:"bda2",      monolog:{ romeo:"bda"  }, 	find:{ domain:"bda2", answers:{ bridge2:"right",bridge3:"right", default:"wrong" } }  },


	{ dialog:{ romeo:"end" } ,  pic:{ claro:"big", romeo:"show"},  map:{ blur:show, bridges:hide}, music:{volume:0} },

	{ id:"end", dialog:{ claro:"end"},  pic:{ claro:"big", romeo:"hide"} },
		


	{ id:"gameover", await:"click", then:"attractmode"   },
	];
