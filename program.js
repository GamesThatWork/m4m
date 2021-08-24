 
const show={show:true},  hide={hide:true }, listen={listen:true },unlisten={unlisten:true }, then="next", now="next";



export const program=[

	{ id:"attractmode", map:{   title:{ show:true }}, icon:{ logo:{ x:1620,y:986, size:[255,73],show:true }}, 
	 												  await:"click", scope:hide,       			then },

//	{ id:"desktop",     map:{ desktop:{ show:true }}, await:"click",			       			then :"bomb2" },	




 	{ id:"init", dialog:{ claro:"welcome" }, map:{ blur:show }, icon:{ logo:hide },          	then }, /// defective recording
	{ dialog:{ claro:"challenge"  }, map:{ blur:show },         icon:{ logo:hide }, 			then },
	{ dialog:{ claro:"intro"      }, 				       										then },
	{ dialog:{ claro:"model"      },    				  										then },
	{ dialog:{ claro:"heros"      }, pic:{ romeo:"show"}, 										then },
	{ dialog:{ romeo:"pronto"     },                      										then },
	{ dialog:{ claro:"instrument" }, pic:{ romeo:"hide", claro:"medium"}, scope: { show: true},	then },
	{ dialog:{ claro:"left"   },  scope: { bounds: "                              left" },     	then },
	{ dialog:{ claro:"right"  },  scope: { bounds: "                        right left" },    	then },
	{ dialog:{ claro:"normal" },  scope: { bounds: "                  hg760 right left" },    	then },
	{ dialog:{ claro:"glass"  },  scope: { bounds: "            glass hg760 right left" },    	then },
	{ dialog:{ claro:"steel"  },  scope: { bounds: "      steel glass hg760 right left" },    	then },
	{ dialog:{ claro:"stone"  },  scope: { bounds: "stone steel glass hg760 right left" },    	then },

	{ id:"equation",  dialog:{ claro:"equation"},	map:{blur:show},  pic:{ claro:"medium" },  
	 							scope:{ bounds:"", show:true },	equation:show, 		 then },

	{ id:"start",        dialog:{ claro:"start"  }, spin:{ domain:"math", answers:{ start:"right", default:"wrong" }},
												 	respond: {pickRightWrong:"start"} },
	{ id:"start_ask"  ,  voice:{ claro:"start_ask"   }  },
	{ id:"start_wrong",  voice:{ claro:"start_wrong" }  },
	{ id:"start_close",  voice:{ claro:"start_close" }  },
	{ id:"start_right", dialog:{ claro:"start_right" },  then },

	{ id:"power",       dialog:{ claro:"power"  }, 	spin:{ domain:"math", answers:{ power:"right", default:"wrong" }},
													respond: {pickRightWrong:"power"}  },
	{ id:"power_ask"  ,  voice:{ claro:"power_ask"   }  },
	{ id:"power_wrong",  voice:{ claro:"power_wrong" }  },
	{ id:"power_close",  voice:{ claro:"power_close" }  },
	{ id:"power_right", dialog:{ claro:"power_right" },  then   },

						
	{ id:"pulse",       dialog:{ claro:"pulse" }, 	spin:{ domain:"math", answers:{ pulse:"right", default:"wrong", decay:"close" }},
													respond: {pickRightWrong:"pulse"}  },	
	{ id:"pulse_ask"  ,  voice:{ claro:"pulse_ask"   }  },
	{ id:"pulse_wrong",  voice:{ claro:"pulse_wrong" }  },
	{ id:"pulse_close",  voice:{ claro:"pulse_close" }  },
	{ id:"pulse_right", dialog:{ claro:"pulse_right" }, then  },
	
	{ id:"wave",        dialog:{ claro:"wave"  }, 	spin:{ domain:"math", answers:{ wave:"right", default:"wrong" }},
													respond: {pickRightWrong:"wave"}  },	
	{ id:"wave_ask"  ,   voice:{ claro:"wave_ask"    }  },
	{ id:"wave_wrong",   voice:{ claro:"wave_wrong"  }  },
	{ id:"wave_close",   voice:{ claro:"wave_close"  }  },
	{ id:"wave_right",  dialog:{ claro:"wave_right"  },	then  },

	{ id:"decay",       dialog:{ claro:"decay"  }, 	spin:{ domain:"math", answers:{ decay:"right", default:"wrong"}}, 
													respond: {pickRightWrong:"decay"}  }, 
	{ id:"decay_ask"  ,  voice:{ claro:"decay_ask"   }  },
	{ id:"decay_wrong",  voice:{ claro:"decay_wrong" }  },
	{ id:"decay_close",  voice:{ claro:"decay_close" }  },
	{ id:"decay_right", dialog:{ claro:"decay_right" }, then   },

	{ id:"prop",        dialog:{ claro:"prop"  }, 	spin:{ domain:"math", answers:{ prop:"right", default:"wrong"}},
													respond: {pickRightWrong:"prop"}  },
	{ id:"prop_ask"  ,   voice:{ claro:"prop_ask"    }  },
	{ id:"prop_wrong",   voice:{ claro:"prop_wrong"  }  },
	{ id:"prop_close",   voice:{ claro:"prop_close"  }  },
	{ id:"prop_right",  dialog:{ claro:"prop_right"  },  then  },


	{ id:"xplo", pic: {claro:"small"}, scope:show, map:{ blur:show }, plot:true, 
				 equation:hide, reticle:hide, trace:false, plot:true, 
				 spin:{ domain:"xplo", answers:{default:"ok" }}, respond: {ok:"next"},    now },
	{ id:"omega",  dialog:{ claro:"omega"  }  },
	{ id:"scrub",  dialog:{ claro:"scrub"  }, spinner: {freeze:true  }, trace:true }, 
	{ id:"mapped", dialog:{ claro:"mapped" }, spinner: {freeze:false }, map:{range:show},reticle:{ show:true, position:[300,300], listen:true } },


	{ id:"pre_q1", 
			voice:{ claro:"q1" }, 	
			spinner: {freeze:false  },
			scope: {  show: true, bounds: "stone hg760",  simulating:false  },
			trace: true,
			pic:   {   claro:"small" }, 
			map:   {   range: show }, 
			reticle: {       	         x:300,y:352, listen:true,  show:true },
			icon:{ 	stone:{ img:"stone", x:235,y:285, size:[60,45], show:true } },
			plot: false,	
//																				 now },
//	{ id:"q1", 
			spin:{ domain:"xplo", answers:{ xp0:"low",xp1:"low",xp2:"low",xp3:"low",xp4:"right",xp5:"high"}},
			respond: {pickHighLow:"q1"}   },
	{ id:"q1_ask"  , voice:{ claro:"q1_ask"    }   },
	{ id:"q1_high",  voice:{ claro:"q1_high"   }   },
	{ id:"q1_low",   voice:{ claro:"q1_low"    }   },
	{ id:"q1_close", voice:{ claro:"q1_close"  }   },
	{ id:"q1_right", dialog:{ claro:"q1_right"  },	icon:{ stone:hide }, 	then   },


	{ id:"q2", 
			monolog:{ claro:"q2" }, 
			scope: {  show: true, bounds: "glass hg760",  simulating:false  },
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
			respond: {pickHighLow:"q2"}, then },

	{ id:"q2_ask"  ,  voice:{ claro:"q2_ask"    } },
	{ id:"q2_high",   voice:{ claro:"q2_high"   } },
	{ id:"q2_low",    voice:{ claro:"q2_low"    } },
	{ id:"q2_close",  voice:{ claro:"q2_close"  } },
	{ id:"q2_right", dialog:{ claro:"q2_right"  }, icon: {glass0:hide,glass1:hide,glass2:hide,glass3:hide},	then},

	{ id:"jumphere",   now:"next" 	},
 
	{ dialog:{ claro:"mission" }, pic:{ claro:"big",    romeo:"show"  }, scope:hide, reticle:hide, plot:false, spin:false, then},
	{ id:"replay",   now:"next" 	},
	{ dialog:{ romeo:"intro"   }, pic:{ claro:"fadeout"               }, music:{ volume:0.03, play:true }, then },
	{ dialog:{ romeo:"context" }, pic:{ claro:"hide",   romeo:"medium"}, map:{ range:hide, bridges:show},
		icon:{ blue: { img:"blue", x: 266, y: 735,  size: [  60,  40], show:true },
			red0: { img:"red1", x:  10, y: 660,  size: [  60,  40], show:true },
			red1: { img:"red3", x: 211, y: 190,  size: [ 135,  75], show:true },
			red2: { img:"red3", x:1100, y:  30,  size: [ 135,  75], show:true },
			red3: { img:"red1", x:1225, y: -20,  size: [  55,  36], show:true }
			} ,
	then	},
	{ id:"blue",      monolog:{ romeo:"blue"  }, 	find:{ domain:"intro", answers:{ blue:"right", default:"wrong" }},
//		icon:{ 	blue: { img:"blue", x: 266, y: 735, size: [  60,  40], show:true }},
													respond: {pickRightWrong:"blue"}  	 },
	{ id:"blue_ask"  , dialog:{ romeo:"blue_ask"    } },
	{ id:"blue_wrong", dialog:{ romeo:"blue_wrong"  } },
	{ id:"blue_close", dialog:{ romeo:"blue_close"  } },
	{ id:"blue_right", dialog:{ romeo:"blue_right"  },	then },

	
	{ id:"red",      monolog:{ romeo:"red"  }, 		find:{ domain:"intro", answers:{ red0:"right", default:"wrong" }},
//		icon:{	red0: { img:"red1", x:  10, y: 660, size: [  60,  40], show:true }},
													respond: {pickRightWrong:"red"}   },
	{ id:"red_ask"  , dialog:{ romeo:"red_ask"    	} },
	{ id:"red_wrong", dialog:{ romeo:"red_wrong"  	} },
	{ id:"red_close", dialog:{ romeo:"red_close"  	} },
	{ id:"red_right", dialog:{ romeo:"red_right"  	}, then },

	{ id:"reds",      dialog:{ romeo:"reds"  }, 	find:{ domain:"intro", answers:{ red1:"right",red2:"right",red3:"right",default:"wrong" }},
//		icon:{
//			red1: { img:"red3", x: 211, y: 190,  size: [ 135,  75], show:true },
//			red2: { img:"red3", x:1100, y:  30,  size: [ 135,  75], show:true },
//			red3: { img:"red1", x:1225, y: -20,  size: [  55,  36], show:true }},
													respond: {pickRightWrong:"reds"}  },
	{ id:"reds_ask"  , dialog:{ romeo:"reds_ask"    } },
	{ id:"reds_wrong", dialog:{ romeo:"reds_wrong"  } },
	{ id:"reds_close", dialog:{ romeo:"reds_close"  } },
	{ id:"reds_right", dialog:{ romeo:"reds_right"  },	then },

	{ id:"hq",      monolog:{ romeo:"hq"  }, 		find:{ domain:"intro", answers:{ hq:"right", default:"wrong" }},
													respond: {pickRightWrong:"hq"}    },
	{ id:"hq_ask"  , dialog:{ romeo:"hq_ask"  		} },
	{ id:"hq_wrong", dialog:{ romeo:"hq_wrong"  	} },
	{ id:"hq_close", dialog:{ romeo:"hq_close"  	} },
	{ id:"hq_right", dialog:{ romeo:"hq_right"  	},	then  },
	
	{ id:"bridge1",      monolog:{ romeo:"bridge1"},	find:{ domain:"intro", answers:{ bridge1:"right", default:"wrong" }},
														respond: {pickRightWrong:"bridge1"}   },
	{ id:"bridge1_ask"  , dialog:{ romeo:"bridge1_ask"  } },
	{ id:"bridge1_wrong", dialog:{ romeo:"bridge1_wrong"} },
	{ id:"bridge1_close", dialog:{ romeo:"bridge1_close"} },
	{ id:"bridge1_right", dialog:{ romeo:"bridge1_right"},	then },
	
	{ id:"bridge2",      monolog:{ romeo:"bridge2"  }, 	find:{ domain:"intro", answers:{ bridge2:"right", default:"wrong" }},
														respond: {pickRightWrong:"bridge2"}    },
	{ id:"bridge2_ask"  , dialog:{ romeo:"bridge2_ask"   } },
	{ id:"bridge2_wrong", dialog:{ romeo:"bridge2_wrong" } },
	{ id:"bridge2_close", dialog:{ romeo:"bridge2_close" } },
	{ id:"bridge2_right", dialog:{ romeo:"bridge2_right" },	then },
	
	{ id:"bridge3",      monolog:{ romeo:"bridge3"  }, 	find:{ domain:"intro", answers:{ bridge3:"right", default:"wrong" }},
														respond: {pickRightWrong:"bridge3"}  },
	{ id:"bridge3_ask"  , dialog:{ romeo:"bridge3_ask"   } },
	{ id:"bridge3_wrong", dialog:{ romeo:"bridge3_wrong" } },
	{ id:"bridge3_close", dialog:{ romeo:"bridge3_close" } },
	{ id:"bridge3_right", dialog:{ romeo:"bridge3_right" },	then },
	

	{ id:"prebomb1", equation:hide,	scope:hide,	reticle:hide, now},
	

	{ id:"aim1",    	monolog:{ romeo:"aim1"  },		find:{ domain:"aim1", answers:{ bridge1:"right", default:"wrong", blue:"close"}},
													   	respond: {pickRightWrong:"aim1"}    },
	{ id:"aim1_ask"  ,	dialog:{ romeo:"aim1_ask"    	} },
	{ id:"aim1_wrong", 	dialog:{ romeo:"aim1_wrong"  	} },
	{ id:"aim1_close", 	dialog:{ romeo:"blue_right"  	} },
	{ id:"aim1_right", 	dialog:{ romeo:"aim1_right"  	},	then   },

	{ id:"aim1_end",  
		map:{ bridges1:show },
		find:false,
		reticle:{  x: 300, y:352, listen:true,  show:true },
		trace:true,
		equation: hide,
		pic:   { romeo:"small"},
		scope: { show:true, bounds: "steel hg760"},
	 	icon:{	red1:hide, red2:hide, red3:hide, 
	     		blue:  { drive:0, size:[65,65] },
	            red0:  { chase:0, size:[65,65] },

		 	},										now },	





	{ id:"bomb1",      monolog:{ romeo:"bomb1"},	spin:{ domain:"xplo", answers:{ xp0:"low",xp1:"low",xp2:"low",xp3:"low",xp4:"right",xp5:"high"}},
											 		respond: { pickHighLow:"bomb1"}},
	{ id:"bomb1_ask", 	dialog:{ romeo:"bomb1_ask" } },
	{ id:"bomb1_low",   dialog:{ romeo:"bomb1_low" } },
	{ id:"bomb1_high",  dialog:{ romeo:"bomb1_high"}  },
	{ id:"bomb1_right", 							respond: { pickLateEarly:"bomb1"}, now:"bomb1_time" 	},
	{ id:"bomb1_time", 	icon:{ blue:{ time:true } }								},
	{ id:"bomb1_late",  voice:{ romeo:"bomb1_late"   },	now: "bomb1_lose"  },
	{ id:"bomb1_early", voice:{ romeo:"bomb1_early"  }, now: "bomb1_lose"  },
	{ id:"bomb1_okay",  voice:{ romeo:"bomb1_okay"   },	now: "bomb1_win"  	},
	{ id:"bomb1_lose",	scope:hide, reticle:hide,plot:false, spin:false, equation: hide, icon:{ blue:hide, red1:hide},
							pic:{ lose:"pulse"     },           				then: "bda1"  },
	{ id:"bomb1_win",	scope:hide, reticle:hide,plot:false, spin:false, equation: hide, icon:{ blue:hide, red1:hide},
							pic:{ win: "pulse" 	   },           				then: "bda1"  },
	{ id:"bda1",  		   	pic:{ bridge1:"bdapulse"  },                        then: "shrine" },


	//	{ id:"bomb1_late",  monolog:{ romeo:"bomb1_late"   },	then: "bomb1_end"  	},
//	{ id:"bomb1_early", monolog:{ romeo:"bomb1_early"  },  	then: "bomb1_end"  	},
//	{ id:"bomb1_okay",  monolog:{ romeo:"bomb1_okay"   },	then: "bomb1_end"  	},
//	{ id:"bomb1_end",	scope:hide, reticle:hide,plot:false, spin:false, equation: hide, icon:{ blue:hide, red1:hide},
//										now:"next"  },
						



	



/*						
	{ id:"bda1",       dialog:{ romeo:"bda"  },   	find:{ domain:"bda1", answers:{ bridge1:"right", win:"close", lose:"close", default:"wrong" }}, 
													respond: {pickRightWrong:"bda1"}  },
	{ id:"bda1_ask"  , monolog:{ romeo:"aim1_ask"   }  },
	{ id:"bda1_wrong",   voice:{ romeo:"aim1_wrong" }  },
	{ id:"bda1_close",   voice:{ romeo:"bomb1_right"}  },
	{ id:"bda1_right",  dialog:{ romeo:"bomb1_right"}, then },
*/


	{ id:"shrine",       dialog:{ romeo:"shrine"  },    find:{ domain:"aim2", answers:{ shrine:"right", target0:"right", default:"close" }},
						    pic:{ romeo:"small"   },	respond: {pickRightWrong:"shrine"}   },
	{ id:"shrine_ask"  , dialog:{ romeo:"shrine_ask"    } },
	{ id:"shrine_wrong",  voice:{ romeo:"shrine_wrong"  } },
	{ id:"shrine_close",  voice:{ romeo:"shrine_close"  } },
	{ id:"shrine_right", dialog:{ romeo:"shrine_right"  }, then },
	

	{ id:"aim2",    	dialog:{ romeo:"aim2"  },		find:{ domain:"aim2", answers:{ bridge23:"right",bridge2:"close",bridge3:"close", default:"wrong"}},
													   	respond: {pickRightWrong:"aim2"}    },
	{ id:"aim2_ask"  , monolog:{ romeo:"aim2_ask"    	} },
	{ id:"aim2_wrong", 	 voice:{ romeo:"aim2_wrong"  	} },
	{ id:"aim2_close", 	 voice:{ romeo:"aim2_close"  	} },
	{ id:"aim2_right", 	dialog:{ romeo:"aim2_right"  	},	then   },

	{ id:"aim2_end",  
		map:{ bridges23:show },
		find:false,
		reticle:{  x: 300, y:294, listen:true,  show:true },
		trace:true,
		equation: hide,
		pic:   { romeo:"small"},
		scope: { show:true, bounds: "steel stone glass hg760"},
	 	icon:{  all:	hide,
		 		shrine: { x:483, y:768, size:[40,75], show:true },
	     		red2:  { img:"red3", show:true, drive:1,  size:[130,65] },
	            red3:  { img:"red3", show:true, drive2:2, size:[130,65] }},	now },	

	
	{ id:"bomb2",      dialog:{ romeo:"bomb2"  }, 	spin:{ domain:"xplo", answers:{ xp0:"close",xp1:"close",xp2:"close",xp3:"close",xp4:"right",xp5:"wrong"}},
													respond: {pickRightWrong:"bomb2"} },
//	{ id:"bomb2_ask"  , dialog:{ romeo:"bomb2_ask"  } },
	{ id:"bomb2_wrong", voice:{ romeo:"bomb2_wrong"}, now:"bomb2_lose" },
	{ id:"bomb2_close", voice:{ romeo:"bomb2_close"}, now:"bomb2_weak"  },
	{ id:"bomb2_right", voice:{ romeo:"bomb2_right"}, now:"bomb2_win" },





	{ id:"bomb2_weak",	scope:hide, reticle:hide,plot:false, spin:false, equation: hide, icon:{ blue:hide, red1:hide},
		  		 		   	pic:{ bridge2:"pulse"  },                      		then: "bda3" },
	{ id:"bomb2_lose",	scope:hide, reticle:hide,plot:false, spin:false, equation: hide, icon:{ blue:hide, red1:hide},
							pic:{  target0:"bdapulse"     },           			then: "bda2"  },
	{ id:"bomb2_win",	scope:hide, reticle:hide,plot:false, spin:false, equation: hide, icon:{ blue:hide, red1:hide},
							pic:{ win: "pulse" 	   },           				then: "bda2"  },
	{ id:"bda2",  		   	pic:{ bridge2:"bdapulse"  },                        then },
	{ id:"bda3",  			pic:{ bridge3:"bdapulse"  },                        then },



/*







	{ id:"bomb2_time", 	icon:{ blue:{ time:true }}     },
	{ id:"bomb2_late",  monolog:{ romeo:"bomb2_right"   },	then: "bomb2_end"  	},
	{ id:"bomb2_early", monolog:{ romeo:"bomb1_early"  },  	then: "bomb2_end"  	},
	{ id:"bomb2_okay",  monolog:{ romeo:"bomb2_right"  },	then: "bomb2_end"  	},
	{ id:"bomb2_end",	scope:hide, reticle:hide,plot:false, spin:false, equation: hide, icon:{ all:hide },	then },


	{ id:"bda2",      dialog:{ romeo:"bda"  }, 	find:{ domain:"bda2", answers:{ win:"close", lose:"close", bridge2:"right",bridge3:"right", default:"wrong" } }, 
													respond: {pickRightWrong:"bda2"}, then  },
	{ id:"bda2_ask"  , dialog:{ romeo:"bridge3_ask"   }  },
	{ id:"bda2_wrong", dialog:{ romeo:"bridge2_ask" }  },
	{ id:"bda2_close", dialog:{ romeo:"blue_right"}  },
	{ id:"bda2_right", dialog:{ romeo:"bomb1_right"},then },
*/
	{ id:"romeo_out",  dialog:{ romeo:"end"}, icon:{ all:hide }, find:false, reticle:hide, map:{blur:show }, pic:{romeo:"big"},  then },
	{ id:"fade_out",   dialog:{ claro:"end"}, pic:{ claro:"big", romeo:"fadeout"},  then  }, 
	{ id:"gameover",  map:{blur:show }, find:{ domain:"gameover", answers:{}},    					       },
//	{ id:"gameover",   reboot:true  },
	];
