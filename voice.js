import  { signal  } from './signal.js'    ;

const selfs={};
var utterance;
const pitch={ claro:1.1, romeo:0.7 };
const last= {};
var available = true;

export 	const Voice={ get speaking() { return !available }} 

export 	const newVoice= (speaker, cfg={})=> {

	if( selfs[ speaker ]	)	return selfs[ speaker ];
	let self = 	{
		name:	 speaker,
		voice:   speechSynthesis.getVoices()[9],
		script:	 script[ speaker ] || {},
		audio:	 audio [ speaker ] || {},
		caption: cfg.caption ?? document.querySelector("caption") ?? false,
		jiggle:  null,

		say:	 line=>{
			if(  self.caption )	self.caption.innerText= self?.script[ line ] || "";
			console.log( "VOICE SAYS: " + line );
			if( 	 self?.audio[  line ] )	self.audio[line].play()
			else if( self?.script[ line ] )	self.speak( self.script[ line ] );
			else signal.fire("spoken");
			return self;
			},
		speak:	words=>{

			if( !available || ((last.words === words )&& ((Date.now()-last.time)<1000 )) )		return self;
			last.words = words;
			speechSynthesis.cancel( );
			available=false;	
//			self.jiggle= setInterval( e=>speechSynthesis.resume(), 500 );
			console.log( "  < speak >  ", words);
			let utterance = new SpeechSynthesisUtterance(words);
//			utterance.voice = speechSynthesis.getVoices()[21*Math.random()],//self.voice;
			utterance.pitch = pitch[ speaker ];
			utterance.onend= e=> {
//				clearInterval( self.jiggle );
				available= true;
				last.time=Date.now();
				signal.fire("spoken");
				};
			speechSynthesis.speak(  utterance );
			return self;
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
		We look for brave, young people who are not afraid to use math and science.
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
		We’ll put it all together in one big equation`,
	heros: 	
		`Then we will use that equation to perform a special mission.
		You will help our heros get home safely.`,
	instrument:	
		`Lets learn the tools.
		This instrument shows air pressure across distance.
		Munitions create a lot of pressure when they explode.`,
	left:
		`The left edge of the instrument shows Ground Zero.
		This is where the shockwave starts.`,
	right:
		`The right edge is 5 miles away from ground zero.
		Let's study what happens between zero and five miles.`,
	normal:
		`The green line shows normal air pressure.
		When the pressure rises, it can break things.`,
	glass:
		`The yellow line shows where the pressure can break glass.`,
	steel:
		`Pressure can break steel when it reaches the level of this red line.`,
	stone:
		`Or break up a stone structure at this level.`,

	equation:
		`Now we build a mathematical model of air pressure in action.
	  	When I say "model", I mean an equation,
		You build this equation out of many small expressions.
	  	Each one describes an important feature of our shockwave model.`,
	
	start:
		`Build the model using this math wheel.
		It is a tool that gives you expressions to insert.`,
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
	pulse_wrong: `No... Make sure you see the "s" for speed.`,
	pulse_close: `That's very close, but you really need the "s" for speed`,
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
	prop_right:  `Very good! You have built a very useful shockwave model.
				We can use it to predict the power of any munition.
				We can see its effect at any distance.`,

	omega:
		`Let's experiment with different values of omega. 
		Remember: Omega represents the amount of explosives.
		This new wheel has six different omega values.
		Spin the wheel, see the different values. Then press the button.`,
	
	scrub:
		`Here is a new way to use the instrument: 
		Roll the ball sideways. Left and right.
		Roll it slow, to see the pressure at any distance.
		Press the button when you are done.`,
	
	mapped:
		`Let's now see how this looks on a map.
		You can see the distance on the instrument 
		and the same distance on the map, as a circle around the munition.
		When you are ready for a challenge, press the button.`,
	
	q1: 
		`We put a stone wall on the map.
		Find the smallest omega that will damage the structure.
		Change omega by spinning up and down. 
		Explore pressure and distance by rolling left and right.`,
	q1_ask:   	`Spin the ball and roll it. Press the buttton when you have the answer.`,
	q1_high:	`No, that omega is too high. You'll cause unnecessary damage. Try a lighter touch.`,
	q1_low: 	`Sorry - that omega is too low. It won't knock down the wall at that distance.`,
	q1_right: `That’s it. That's the smallest munition that will serve this purpose.
			You did well.`,


	q2: 
		`We put a lot of glass windows on the map.
		This time I want you to find the largest munition.
		The largest munition that does not break any glass.`,
	q2_ask:   	`Spin the ball and roll it. Press the buttton when you have the answer.`,
	q2_high:	`No, that omega is too high. You're going to break windows like that.`,
	q2_low: 	`Sorry - that is too small. Make it bigger, without breaking any glass.`,
	q2_right: `That’s it. That's the largest munition for this situation.
			You did well.`,


	mission:
		`You are ready for a mission. And just in time.
		We have an urgent call from our allies in the Rumini Conflict. 
		They’re in trouble and need you to rescue them.`,

// ROMEO TALKS NOW


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
	pronto: 
		`Yeah. 
		We need some help here.
		Pronto !`,
	
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
