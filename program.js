 
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
	{ id:"jumphere", then:"next",  dialog:{ claro:"null"  },   scope: { show: true},  pic: {claro:"small"},        },

	{ dialog:{ claro:"equation"  },  },
	{ id:"start",       dialog:{ claro:"start"  }, 		spinchoice:"start", spin:{ domain:"math", answers:{ start:"right", default:"wrong" }}  },
	{ id:"start_ask"  , dialog:{ claro:"start_ask"   }, spinchoice:"start" },
	{ id:"start_wrong", dialog:{ claro:"start_wrong" }, spinchoice:"start" },
	{ id:"start_close", dialog:{ claro:"start_close" }, spinchoice:"start" },
	{ id:"start_right", dialog:{ claro:"start_right" }, then:"next"   },
	
	{ id:"power",       dialog:{ claro:"power"  }, 		spinchoice:"power", spin:{ domain:"math", answers:{ power:"right", default:"wrong" }}  },
	{ id:"power_ask"  , dialog:{ claro:"power_ask"   }, spinchoice:"power"  },
	{ id:"power_wrong", dialog:{ claro:"power_wrong" }, spinchoice:"power"  },
	{ id:"power_close", dialog:{ claro:"power_close" }, spinchoice:"power"  },
	{ id:"power_right", dialog:{ claro:"power_right" }, then:"next"   },

	{ id:"pulse",       dialog:{ claro:"pulse" }, 		spinchoice:"pulse", spin:{ domain:"math", answers:{ pulse:"right", default:"wrong", decay:"close" }}  },
	{ id:"pulse_ask"  , dialog:{ claro:"pulse_ask"   }, spinchoice:"pulse"  },
	{ id:"pulse_wrong", dialog:{ claro:"pulse_wrong" }, spinchoice:"pulse"  },
	{ id:"pulse_close", dialog:{ claro:"pulse_close" }, spinchoice:"pulse"  },
	{ id:"pulse_right", dialog:{ claro:"pulse_right" }, then:"next"   },
	
	{ id:"wave",       dialog:{ claro:"wave"  }, 		spin:{ domain:"math", answers:{ wave:"right", default:"wrong" }}  },
	{ id:"wave_ask"  , dialog:{ claro:"wave_ask"    },	spinchoice:"wave"  },
	{ id:"wave_wrong", dialog:{ claro:"wave_wrong"  },	spinchoice:"wave"  },
	{ id:"wave_close", dialog:{ claro:"wave_close"  },	spinchoice:"wave"  },
	{ id:"wave_right", dialog:{ claro:"wave_right"  },	then:"next"   },

	{ id:"decay",       dialog:{ claro:"decay"  }, 		spin:{ domain:"math", answers:{ decay:"right", default:"wrong"}}  },
	{ id:"decay_ask"  , dialog:{ claro:"decay_ask"   }, spinchoice:"decay"  },
	{ id:"decay_wrong", dialog:{ claro:"decay_wrong" }, spinchoice:"decay"  },
	{ id:"decay_close", dialog:{ claro:"decay_close" }, spinchoice:"decay"  },
	{ id:"decay_right", dialog:{ claro:"decay_right" }, then:"next"   },

	{ id:"prop",       dialog:{ claro:"prop"  }, 		spin:{ domain:"math", answers:{ prop:"right", default:"wrong"}}  },
	{ id:"prop_ask"  , dialog:{ claro:"prop_ask"    },  spinchoice:"prop"   },
	{ id:"prop_wrong", dialog:{ claro:"prop_wrong"  },  spinchoice:"prop"   },
	{ id:"prop_close", dialog:{ claro:"prop_close"  },  spinchoice:"prop"   },
	{ id:"prop_right", dialog:{ claro:"prop_right"  },  then:"next"   },

	{ id:"omega", dialog:{ claro:"omega"  }, pic: {claro:"small"}, spin:{ domain:"xplo", answers:{}}  }, // support all

	{ id:"scrub", dialog:{ claro:"scrub"  }, trace:true, 		   spin:{ domain:"xplo",answers:{ default:"response" }}},

	{ id:"mapped", dialog:{ claro:"mapped"}, trace:true, map:{ range:{show:true } }, 
			icon:{ glass1:{img:"glass", x:1100, y:100, size:[50,50], show:true } }, 
			spin:{ domain:"xplo", answers:{ xp3:{win:true}}}  },

	{ id:"q1", dialog:{ claro:"q1"}, 
			map:{  range:{ show:true } }, 
			icon:{ stone:{ img:"stone", x:1100, y:100, size:[50,50], show:true } }, 
			spin:{ domain:"xplo", answers:{ xp0:"low",xp1:"low",xp2:"low",xp3:"high",xp4:"high",xp5:"high"}}  },






	{ id:"q2", dialog:{ claro:"q2"}, pic: {claro:"small"}, trace:true,  pic: {claro:"small"}, 
			map:{  range:{ show:true } }, 
			icon:{ 
				glass0:{img:"glass", x: 900, y:100, size:[50,50]}, 
				glass1:{img:"glass", x: 975, y:100, size:[50,50]}, 
				glass2:{img:"glass", x:1050, y:100, size:[50,50]}, 
				glass3:{img:"glass", x:1125, y:100, size:[50,50]} 
			}, 
			spin:{ domain:"xplo", answers:{ xp3:{win:true}}}  },

	{ dialog:{ claro:"mission" } },

	{ dialog:{ romeo:"intro" } },
	
	{ id:"",},

	];
