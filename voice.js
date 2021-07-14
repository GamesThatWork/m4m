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
		We look for brave young people who are not afraid to use math and science.
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
		We can call this the decay function.
		We can use the symbol "d", "K"`,
	decay_ask:   `Use "dK" to represent the wave Decay function.`,
	decay_wrong: `Not that one, choose “dK” for Decay.`,
	decay_right: `Bingo! Our model is looking great.
		Our pressure wave expands outward - never changing shape.
		But real waves lose power as they expand in three dimensions.`,

	prop: 
		`The inverse cube - distance to the power of three - 
		shows energy spreading out in three dimensione.`,
	prop_ask:  `Find the term for expanding in three dimensions.`,
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

	end: `You did very well.
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
		Perfect operation… but the Reds are chasing us now and they’re pretty mad. 
		There is an awful lot of them. It looks like they will attack our base.`,
		
	blue:	`You see us? We’re the blue guys.`,
	blue_ask:	`Find the blue hummer.`,
	blue_wrong: `No, the good guys are blue.`,
	blue_close: `No, we're in a jeep.`,
	blue_right: `There you go. You can see us.`,

	red:	`The Red squad is getting kind of close.`,
	red_ask:  `See the Reds chasing us?`,
	red_wrong:`No, the Red jeep following us.`,
	red_close:`The guys right on our tail.`,
	red_right:`That’s it!`,

	reds: 	`There's a lot more Reds behind them, and they brought big guns.
			Looks like they have a plan.`,
	reds_ask:	`See them all?`,
	reds_wrong: `No. Up north, coming down fast.`,
	reds_close: `The other Reds.`,
	reds_right: `Yeah, that’s them.`,

	hq: `Today is a bad day for us to get visitors.
		Our guys are all out EaSt and we don't have much air support.
		Nobody to protect our Base.`,
	hq_ask: `Do you see our Headquarters?`,
	hq_wrong: `No. Up north, coming down fast.`,
	hq_close: `The other Reds.`,
	hq_right: `Yeah, that’s them.`,

	bridge1:	`It looks like they plan to cross the Josko river and attack our Base
		But you can stop them. 
		They can't cross the Josko if you knock out the bridges.`,
	bridge1_ask:	`Do you see Bridge Number One?
					Right in front of our blue jeep.`,
	bridge1_wrong: `No- not there.`,
	bridge1_close: `Not that one.`,
	bridge1_right: `Yeah. It's a steel truss bridge.`,

	bridge2:	`Bridge Two is upriver a few kilometers.`,
	bridge2_ask:	`Can you see Bridge Two?`,
	bridge2_wrong: `No- not there.`,
	bridge2_close: `Not that one.`,
	bridge2_right: `Yeah. It's a simple steel beam bridge.`,


	bridge3:	`There  is a little old stone bridge.`,
	bridge3_ask: 	`Do you see the stone bridge - number three?`,
	bridge3_wrong: 	`No- not there.`,
	bridge3_close: 	`Not that one.`,
	bridge3_right: 	`Yeah. Pretty. I hate to bust it.`,

	bombsite1:	`Let's start with Bridge One
				and stop the guys who are chasing us.`,
	bombsite1_ask: 	 `Quick. Pick Bridge One`,
	bombsite1_wrong: `No- not there.`,
	bombsite1_close: `Not that one.`,
	bombsite1_right: `Good. Just make sure we get across before you hit it.`,


	bomb1:
		`You have your target, and an estimated point of impact.
		Now you choose a munition. 
		Small munitions mean less damage. Less danger for us. 
		But it has to be big enough to destroy the bridge.`,
	bomb1_ask:   `Design your munition 
					And deploy it.
					After we get across!`,
	bomb1_wrong: `Too late. You let the Reds get into Rumini territory.`,
	bomb1_close: `Too soon. You dropped the munition on top of us. Somebody will get hurt.`,
	bomb1_right: `Good work. Perfect timing.
				Let's knock out the other bridges.`,

	shrine: `But first, look at the Rumini Historic Shrine.`,
	shrine_ask:  `Do you see the shrine?`,
	shrine_wrong:`That isn’t the shrine`,
	shrine_close:`Look for the obelisk on the map.`,
	shrine_right:
		`Those ancient stained glass windows are protected by treaty.
		They are cultural treasures of the Rumini people.
		You must be careful not to break the windows.`,
		
	bombsite2:
		`Uh oh. You can only make one more strike!
		You must design a munition to disable both remaining bridges in one blow!
		Be careful: One is stone and one is steel. 
		And you must be very careful not to break the ancient glass!`,
	bombsite2_ask: `Set your target.`,
	bombsite2_wrong: `Pick a target in the right area.`,
	bombsite2_close: `Pick a better target.`,
	bombsite2_right: `Good target.`,

	bomb2:
		`This is a very tough problem.
		You have to knock out a steel bridge and a stone bridge with one shot
		without damaging the ancient windows right nearby.`,

	bomb2_ask: `Choose the munition very carefully.`,
	bomb2_wrong: `That munition is too big. We can’t damage the windows! Try another one.`,
	bomb2_close: `Your munition was too small. It didn't disable the bridge. Try again.`,
	bomb2_right: `Good choice. You disabled the bridge without damaging the shrine.`,


	bda:	`Check out the results`,

	end:   `Good work. You saved Rumini from the Red invasion!`
	}
}

const audio={};
