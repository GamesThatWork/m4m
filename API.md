Steps




Graphics

pic: { name:<commands>, name2...}
	position: (x,y,z=1)
	small: 
	medium:
	big: 
	full:
	show:
	hide
	kill:	
	fadeout:
	bda:
	rando: (run=true) 
	pause: (pausing=true) // pause rando
	scan:
	zoom:

icon:  { name:<commands>, name2...}
	hide:
	show:
	move: [x,y] //FIX
	x: px
	y: px
	size: [w,h]
	road:  r	(set road)
	drive: r	(set road and lead driver begin) 	FIX		 chase:	()	 (chase lead driver 'lead' steps behind)
	drive2: r	(set road and secondary driver begin) 	FIX	time:  ()	(fire "late", "early" or "okay")
	destruct: 
	getTime:	return "late", "early" or "okay" 
	g = PIXI graphics

map: { name:<commands>, name2...} 
	hide
	show (autohides all others)

scope: 		script  //singleton
	show:
	hide:
	destruct: 
	bounds: <aggregated string>

trace: 		true|false    // slave scope to mouse (scrub)
plot:   	true|false    // fire weapon repeatedly

equation: 	script
	hide
	show

music: 		script
	volume
	play
	stop
	replay


reticle: 	script  // singleton
	show:
	hide:
	destruct: 
	listen:  to trace = radius
	unlisten:
	position:[x,y]
	x: px
	y: px


-- SPEECH


<script> {actor:line, actor2:line2} lines defined in voices.js

voice: 	<script> voiceover and captions only
monolog: <script> voice,caps&rando faces, respond after speech
dialog: <script> monolog+ wait for user mousemove




--- step flow


--shortcircuit
now: <id>       | goto <id> or next immediately  FIX



--Signal Generators

timeout: <secs> | fire <response> after n  seconds
await:  <event> | fire <response> on "click", "mousemove", etc

icon:{ <name>:{time:true}}   generates a signal (late|early|okay)


find: { domain, answers }
	fire one of several signals based on mousepick from big map
	domain: (one of)
		intro
		aim1 (bombsite)
		aim2
		bda1 (automated win/lose sub options)
		bda2 (automated win/lose sub options)
	answers: maps findtargetnames => signals

spin: { domain, answers }  
	fire one of several signals based on mousepick from big map
	domain:
		math
		xplo
	answers: maps spinfacetnames => signals

-- signal responders

then: 	<stepid> = short for respond: {response: <step_id>}
	
	
respond: events  
	// events is a map of signals and step ids
	and it recognizes these meta codes
	// pickRightWrong  
	// pickHighLow
	// pickLateEarly

	
