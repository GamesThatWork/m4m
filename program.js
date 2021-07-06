export const program=[
	{ id:"sortcut", say:{ claro:"null" }, then:"jumphere" },
	{ say:{ claro:"null" }    },
	{ id:"init", say:{ claro:"welcome" }},
	{ say:{ claro:"challenge"  }  },
	{ say:{ claro:"intro"      }  },
	{ say:{ claro:"model"      }  },
	{ say:{ claro:"heros"      }, pic:{ romeo:"show"}  },
	{ say:{ claro:"instrument" }, pic:{ romeo:"hide", claro:"small"},  scope: { show: true} },
	{ say:{ claro:"left"   },  scope: { bounds: "                              left" },    },
	{ say:{ claro:"right"  },  scope: { bounds: "                        right left" },    },
	{ say:{ claro:"normal" },  scope: { bounds: "                  hg760 right left" },    },
	{ say:{ claro:"glass"  },  scope: { bounds: "            glass hg760 right left" },    },
	{ say:{ claro:"steel"  },  scope: { bounds: "      steel glass hg760 right left" },    },
	{ say:{ claro:"stone"  },  scope: { bounds: "stone steel glass hg760 right left" },    },
	{ say:{ claro:"null"   },  scope: { bounds: "      steel                       " },    },
	{ id:"Xjumphere", say:{ claro:"null"  },   scope: { show: true},  pic: {claro:"small"},        },

	{ say:{ claro:"equation"  },  },
	{ id:"start",       say:{ claro:"start"  }, spin:{ domain:"math", answers:{ start:{win:true}}}  },
	{ id:"start_ask"  , say:{ claro:"start_ask"    }, respond: { right:"start_right", wrong:"start_wrong"  }  },
	{ id:"start_wrong", say:{ claro:"start_wrong"  }, then:"start_ask"  },
	{ id:"start_close", say:{ claro:"start_close"  }, then:"start_ask"  },
	{ id:"start_right", say:{ claro:"start_right"  }, then:"next"   },
	
	{ id:"power",       say:{ claro:"power"  }, spin:{ domain:"math", answers:{ power:{win:true}}}  },
	{ id:"power_ask"  , say:{ claro:"power_ask"    }, respond: { right:"power_right", wrong:"power_wrong"  }  },
	{ id:"power_wrong", say:{ claro:"power_wrong"  }, then:"power_ask"  },
	{ id:"power_close", say:{ claro:"power_close"  }, then:"power_ask"  },
	{ id:"power_right", say:{ claro:"power_right"  }, then:"next"   },


	{ id:"pulse",       say:{ claro:"pulse"  }, spin:{ domain:"math", answers:{ pulse:{win:true}, decay:{signal:"close"}  }}  },
	{ id:"pulse_ask"  , say:{ claro:"pulse_ask"    }, respond: { right:"pulse_right", wrong:"pulse_wrong"  }  },
	{ id:"pulse_wrong", say:{ claro:"pulse_wrong"  }, then:"pulse_ask"  },
	{ id:"pulse_close", say:{ claro:"pulse_close"  }, then:"pulse_ask"  },
	{ id:"pulse_right", say:{ claro:"pulse_right"  }, then:"next"   },


	{ id:"wave",       say:{ claro:"wave"  }, spin:{ domain:"math", answers:{ wave:{win:true}}}  },
	{ id:"wave_ask"  , say:{ claro:"wave_ask"    }, respond: { right:"wave_right", wrong:"wave_wrong"  }  },
	{ id:"wave_wrong", say:{ claro:"wave_wrong"  }, then:"wave_ask"  },
	{ id:"wave_close", say:{ claro:"wave_close"  }, then:"wave_ask"  },
	{ id:"wave_right", say:{ claro:"wave_right"  }, then:"next"   },


	{ id:"decay",       say:{ claro:"decay"  }, spin:{ domain:"math", answers:{ decay:{win:true}}}  },
	{ id:"decay_ask"  , say:{ claro:"decay_ask"    }, respond: { right:"decay_right", wrong:"decay_wrong"  }  },
	{ id:"decay_wrong", say:{ claro:"decay_wrong"  }, then:"decay_ask"  },
	{ id:"decay_close", say:{ claro:"decay_close"  }, then:"decay_ask"  },
	{ id:"decay_right", say:{ claro:"decay_right"  }, then:"next"   },


	{ id:"prop",       say:{ claro:"prop"  }, spin:{ domain:"math", answers:{ prop:{win:true}}}  },
	{ id:"prop_ask"  , say:{ claro:"prop_ask"    }, respond: { right:"prop_right", wrong:"prop_wrong"  }  },
	{ id:"prop_wrong", say:{ claro:"prop_wrong"  }, then:"prop_ask"  },
	{ id:"prop_close", say:{ claro:"prop_close"  }, then:"prop_ask"  },
	{ id:"prop_right", say:{ claro:"prop_right"  }, then:"next"   },

	{ id:"jumphere", say:{ claro:"scrub"  }, pic: {claro:"small"},  trace: true,  pic: {claro:"small"}, 
			icon:{ glass1:{img:"glass", x:1100, y:100, size:[50,50], show:true } }, spin:{ domain:"xplo", answers:{ xp3:{win:true}}}  },

	{ id:"",},

	{ id:"",},

	];
