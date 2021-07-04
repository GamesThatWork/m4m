
const selfs={};
var utterance;


export const newVoice= (speaker, cfg={})=> {

	if( selfs[ speaker ]	)	return selfs[ speaker ];
	let self = 	{
		name:	 speaker,
		script:	 script[ speaker ] || {},
		audio:	 audio [ speaker ] || {},
		caption: cfg.caption,
		jiggle:  null,

		say:	 line=>{
			if( caption )	caption.innerText= self?.script[ line ] || "";
			console.log( "VOICE SAYS: " + line );
			if( 	 self?.audio[  line ] )	self.audio[line].play()
			else if( self?.script[ line ] )	self.speak( self.script[ line ] );
			},
		speak:	words=>{
			speechSynthesis.cancel( );
			self.jiggle= setInterval( e=>speechSynthesis.resume(), 500 );
			console.log( "  < speak >  ", words);
			let utterance = new SpeechSynthesisUtterance(words);
			utterance.onend= e=> {
				clearInterval( self.jiggle );
				document.querySelector("#bus").dispatchEvent( new Event("end") )
				};
			speechSynthesis.speak(  utterance );
			}	
		}
	selfs[ speaker ] = self;
	return self;
}




const script ={
claro:{
	null: 
	`	`,
	welcome: 
	`	Welcome.
		We need help here at the Air Force Research Lab.
		We are looking for brave, young people who are not afraid of using math and science.
		Maybe you could help us.`,
	challenge:
	`	Let’s see if you have what it takes to be a Lab scientist.
		In our Lab, we study many things. One thing we study is how munitions work.
		When a munition explodes, it sends a shockwave through the air.`,
	intro:
	`	You and I will use science and math to create a model of the shockwave.
		This shockwave model can help us solve tough problems in the real world.`,
		
	model: 	
		`I’ll explain parts of a shockwave model one bit at a time
		and you find the expressions that match.
		We’ll put it all together in one big equation
		and use that equation to solve a special mission.`,
		
	instrument:	
		`Munitions create a lot of pressure when they explode.
		This instrument shows air pressure across distance.`,
	left:
		`The left edge is Ground Zero.
		This is where the shockwave starts.`,
	right:
		`The right edge is 5 miles away from ground zero.
		We care about all the area in between zero and five miles.`,
	normal:
		`The green line shows normal air pressure.
		When the pressure is greater, it can break things.`,
	glass:
		`The yellow line shows where the pressure can break glass.`,
	steel:
		`Pressure can break steel when it reaches the level of this red line.`,
	stone:
		`Or break up stone at this level.`,

	start:
		`Now we build a mathematical model of air pressure in action.
	  	Build the model using this wheel.
		This Math Wheel is a tool for building complex expressions. `,
	start_ask:   `Turn the wheel to the Start position and press the button.`,
	start_wrong: `No. That’s not the start button.`,
	start_right: `Right. Let's get started.`,

	power:
		`To get high pressure, you use high explosives.
		Explosive power is the first feature of our shockwave model. 
		Start building the model by finding “omega”.`,
	power_ask:	`Find omega. It means explosive power and looks like a “w”.`,
	power_wrong: `No. That’s not it. It looks like a little “w”.`,
	power_close: `Almost right - but completely wrong.`,
	power_right: `Right. Omega means explosive power.
				Each time the simulator detonates, we see the power.
				Our model shows all the pressure everywhere instantly.
				But that's not right. Let's model the speed of change.`,

	pulse: 
		`We need an expression with “t” for time, “d” for distance, 
		and “s” for speed - for how fast the wave travels.`,
	pulse_ask:   `Find "d" for distance, "t" for time and "s" for speed.`,
	pulse_wrong: `No- - - look for a little "t" for time.`,
	pulse_close: `Close, but you need the "s" for speed`,
	pulse_right: `That’s it. "H" is like a switch, so it's all or nothing.
				 Our model shows a wall of pressure moving at supersonic speed.
				 But real pressure moves in waves, like ripples on a pond.`,

	wave:
		`The shape of a natural wave is described by the sine function.`,
	wave_ask:   `Add the sine wave function to our equation.`,
	wave_wrong: `Try again,   we need the sine function.`,
	wave_close: `Not that one, choose the sine function.`,
	wave_right: `Perfect. Now we see the waves expand outward. 
		But these waves continue forever full strength.
		Real waves lose strength as they age. They decay.`,

	decay: 
		`We want math that models how waves decay.
		We can call this the "D" function.`,
	decay_ask:   `Use "D" to represent the wave Decay function.`,
	decay_wrong: `Not that one, choose the big “D” for Decay.`,
	decay_right: `Bingo! Our model is looking great.
		Our pressure wave expands outward - never changing shape.
		But real waves lose power as they expand in three dimensions.`,

	prop: 
		`The cube root shows models spreading out in three dimensione.`,
	prop_ask:  `Find the term for power expanding in three dimensions.`,
	prop_wrong:  `Keep looking.`,
	prop_right:  `Very good! You built a very useful shockwave model.
				We can use it to predict the power of any munition.
				We can see its effect at any distance.`,

	scrub:
		`Now - roll left and right.
		Move the shockwave in slow motion
		and see the pressure at any distance.`,
	scrub_wrong: `Roll the ball slowly left and right.`,
	scrub_right: `Good work`,

	mission:
		`Your munition model is ready... just in time.
		We have an urgent call from our allies in the Rumini Conflict. 
		They’re in trouble and need you to rescue them.`,
		
	choose:
		`Use your model find the right munition to break the steel bridge.
		You must disable the bridge when the munition lands within twenty yards.
		Roll up and down to choose different munitions
		each has its own Omega values.
		Role side to side to test the pressure at the likely distance .
		Should you use this munition, or pick another one?
		When you are ready, press the button to use the munition.`,
	choose_wrong: `This munition was too small. Choose another one.`,
	choose_close: `That did the job on the bridge. But it is very large and dangerous.`,
	choose_close: `Good job of munitions selection.`,

	end: 
		`You did very well.
		Thank you so much for your help with math and science.
		`},
		
romeo:	{
	intro: 
		`Hey, Doc!
		We have a tough problem here. 
		We need an engineer or scientist to figure it out.
		Can you help?`,
		
	context: 
		`My team just ran an exfil raid in Red territory. 
		Perfect operation… but the Reds are chasing us now and they’re retty mad. 
		There is an awful lot of them. It looks like they will attack our base.`,
		
	blue:
		`You see us? We’re the blue square.
		Find the blue square.
		Put us in the crosshair.		`,
	blue_wrong: `Find the blue square.`,
	blue_right: `There you go. You can see us.`,

	red:
		`Now can you see the Reds chasing us?
		Put the Red symbol in the crosshair.`,
	red_wrong:`Get the Red symbol.`,
	red_right:`That’s it!`,

	red2: 
		`There are even more of these guys further back! See them?
		Up further north - near the top of the map.`,
	red2_wrong: `Look up near the top on the map.`,
	red2_right: `Yeah, that’s them.`,

	mission: 
		`There are an awful lot of Reds and they brought their big guns.
		They’re gonna attack Rumini and overrun our base. 
		You can stop them. There are three bridges that cross the Josko River. 
		Blow up the bridges and stop the Reds.`,

	bridge1:
		`But first -stop the guys who are chasing us. 
		Blow up this bridge --  after we cross it.`,
	bridge1_wrong: `No- not there.`,
	bridge1_close: `Get that bridge later.`,
	bridge1_right: `Yeah, that’s the bridge.`,

	bridge1a:
		`Now you have to choose a munition. 
		You only have four munitions to choose from, so pick carefully.
		A small munition means less danger for us here on the ground, 
		but it has to be big enough to destroy the bridge.
		Just wait until we get across.`,
	bridge1a_wrong: `Too late. You let the Reds get into Rumini territory.`,
	bridge1a_close: `Too soon. You dropped the munition on top of us. Somebody will get hurt.`,
	bridge1a_right: `Good work. Perfect timing.`,

	shrine: 
		`Now get the next bridge. 
		But first, look at the Rumini Historic Shrine.`,
	shrine_wrong:`That isn’t the shrine`,
	shrine_close:`Look for the obelisk on the map.`,
	shrine_right:
		`This is the shrine.
		Do you see those ancient stained glass windows? 
		They are cultural treasures of the Rumini people.
		You must be careful not to break them.
		You’ll have to break the bridge without breaking the windows.`,
		
	bridge2:
		`Now get the next bridge. 
		This one is made of stone. You will need a big munition.`,
		
	bridge2_wrong: `That munition is too big. We can’t damage the windows! Try another one.`,
	bridge2_close: `Your munition was too small. It didn't disable the bridge. Try again.`,
	bridge2_right: `Good choice. The bridge is taken out but the shrine is safe`,

	bridge3:
		`This bridge is the hardest of all. It is so close to the Shrine.
		Choose the best weapon and aim very carefully.`,
		
	bridge3_wrong: `That munition is too big. We can’t damage the windows! Try another one.`,
	bridge3_close: `Your munition was too small. It didn't disable the bridge. Try again.`,
	bridge3_right: `Good choice. You disabled the bridge without demaging the shrine.`,

	end:   `Good work. You saved Rumini from the Red invasion!`
	}
}

const audio={};
