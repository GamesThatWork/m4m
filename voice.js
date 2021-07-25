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
			if( 	 self?.audio[  line ] )	{
						self.audio[line].onended= e=>  {
				//				clearInterval( self.jiggle );
								available= true;
								last.time=Date.now();
								signal.fire("spoken");
								};
						self.audio[line].play()
						}
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
		We could use help here at the Air Force Research Lab.
		We are looking for a brave young person who is not afraid to use math and science.
		Maybe you can help.`,
	challenge:
	`	Let’s see if you have what it takes to be a Lab scientist.
		In our Lab, we study many things. One thing we study is how munitions work.
		When a munition explodes, it sends a shockwave through the air.`,
	intro:
	`	You and I will use science and math to create a model of the shockwave.
		This shockwave model can help us solve tough problems in the real world.`,
		
	model: 	
		`I’ll explain parts of the shock wave model one bit at a time
		and you find the expressions that match.
		We’ll put it all together in one big equation.
		Then we will use that equation to perform a special mission.`,
	heros: 	
		`You can help our heros get home safely!`,
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
	altright:
		`The right edge shows one mile from ground zero.
		Let's study what happens in that one mile.`,
	normal:
		`The green line shows normal air pressure.
		When the pressure rises, it can break things.`,
	glass:
		`The yellow line shows where the pressure can break glass.`,
	steel:
		`Pressure can break steel when it reaches this.`,
	stone:
		`Or break up a stone structure at the level of this red line.`,

	equation:
		`Now, let's build a mathematical model of air pressure in action.
	  	When I say "model", I mean an equation.
		You build this equation out of many small expressions.
	  	Each one models an important feature of the shock wave.`,
	
	start:
		`Build the model using this math wheel.
		It is a tool that lets you insert mathematical expressions.`,
	start_ask:   `Turn the wheel to the Start position and press the button.`,
	start_wrong: `No. That’s not the start button.`,
	start_right: `Right. Let's get started.`,

	power:
		`To get high pressure, you use high explosives.
		Explosive power is the first feature of our shockwave model. 
		Start building the model with “omega”, the symbol for explosive power.`,
	power_ask:	`Find omega. It looks like a “w”.`,
	power_wrong: `No. That’s not it. It looks like a little “w”.`,
	power_close: `Almost right - but completely wrong.`,
	power_right: `Right. Omega means explosive power.
				Each time the simulator detonates, we see that power.
				Our model shows all the pressure everywhere instantly.
				But that's not right. Let's model the movement of pressure.`,

	pulse: 
		`We need an expression with “t” for time, “d” for distance, 
		and “s” for speed - to model how fast the wave travels.`,
	pulse_ask:   `Find "d" for distance, "t" for time and "s" for speed.`,
	pulse_wrong: `No... Make sure you see the "s" for speed.`,
	pulse_close: `That's very close, but you really need the "s" for speed`,
	pulse_right: `That’s it. The "H" function is like a trigger, all or nothing.
				 Our model shows a supersonic wall of pressure moving through the air.
				 But it isn't really a wall.
				 Pressure really moves through air in waves. Like ripples in water.`,

	wave:
		`The shape of a natural wave is described by the sine function.`,
	wave_ask:   `Add the sine wave function to our equation.`,
	wave_wrong: `Try again,   we need the sine function.`,
	wave_close: `Not that one, choose the sine function.`,
	wave_right: `Excellent. Now we see waves moving through the air. 
		These waves are all perfect. And all the same strength.
		But in a real explosion, the first waves are much much stronger.`,

	decay: 
		`We want math to show each wave weaker than the one before.
		We can call this a decay function.
		We can use the symbol "dK"`,
	decay_ask:   `Use "dK" to represent the wave Decay function.`,
	decay_wrong: `Not that one, choose “dK” for Decay.`,
	decay_right: `Bingo! Our model is looking great.
		Our pressure wave is shaped beautifully as it expands outward.
		But real waves lose power as they expand in three dimensions.`,

	prop: 
		`When energy spreads out in three dimensions,
		pressure dissipates according to distance -  to the third power.
		Divide pressure by the distance cubed.`,
	prop_ask:   `Find the term for expanding in three dimensions.`,
	prop_wrong: `Keep looking.`,
	prop_right: `Very good! You have built a very useful shockwave model.
				We can use it to predict the power of any munition.
				At any distance.`,

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
		and the same distance on the map, as a circle around ground zero.
		When you are ready for a challenge, press the button.`,
	
	q1: 
		`We put a stone wall on the map near the explosion. 
		What is the smallest charge that can damage the wall?
		Spin up and down to change omega.
		Roll left and right to explore distance.`,
	q1_ask:   	`Spin the ball and roll it.
				Find the smallest omega that can damage the wall.`,
	q1_high:	`No, that omega is too high. You'll cause unnecessary damage. Try a lighter touch.`,
	q1_low: 	`Sorry - that omega is too low. It won't knock down the wall.
				The pressure peak must be above the red line when the wave hits the wall.`,
	q1_right: `That’s it. That's the smallest munition that will serve this purpose.
			You did well.`,


	q2: 
		`We put a lot of glass windows on the map.
		This time I want you to find the largest munition.`,
	q2_ask:   	`Spin the ball and roll it.
				Find the largest munition that does not break any glass.`,
	q2_high:	`No, that omega is too high. You're going to break windows like that.
				The pressure peak must be below the yellow line when it hits the first window.`,
	q2_low: 	`Sorry - that is too small. Make it bigger, without breaking any glass.`,
	q2_right: `That’s it. That's the largest munition for this situation.
			You did well.`,


	mission:
		`You are ready for a mission. And just in time.
		We have an urgent call from our allies in the Rumini Conflict. 
		They’re in trouble and need you to rescue them.`,

// ROMEO TALKS NOW

/*
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
*/
	end: `You did very well.
		Thank you so much for your help with math and science.
		`},




		
romeo:	{
	pronto: 
		`You bet! We could use a little help here. 
		We got a tough problem and need some science. 
		Pronto!`,
	
	intro: 
		`Hey, Doc!
		We have a tough problem here. 
		It's gonna take an engineer or scientist to figure it out.
		Can you help?`,
		
	context: 
		`My team just ran an exfil raid in Red territory. 
		Mission accomplished!
		But now the Reds are chasing us. 
		They are plenty mad... and they brought their friends.`,
		
	blue:	`You see us? We’re the Blue guys.`,
	blue_ask:	`Find the Blue hummer.`,
	blue_wrong: `No, the good guys are always Blue.`,
	blue_close: `No, we're in a jeep.`,
	blue_right: `There you go. That's us.`,

	red:	`The Red squad is getting kind of close.`,
	red_ask:  `See the Reds chasing us?`,
	red_wrong:`No, the Red jeep following us.`,
	red_close:`The guys right on our tail.`,
	red_right:`That’s them!`,

	reds: 	`There's a lot more Reds behind them,
			And they brought some big guns to the party.
			I think they're coming to attack our base!`,
	reds_ask:	`See all those guys?`,
	reds_wrong: `No. Up north, coming down fast.`,
	reds_close: `The other Reds.`,
	reds_right: `Yeah, that’s the bad guys.`,

	hq: `Today is a bad day for us to get visitors.
		Our guys are all out EaSt and we don't have much air support.
		Nobody to protect our Base.`,
	hq_ask: `Do you see our Headquarters?`,
	hq_wrong: `No. Up north, coming down fast.`,
	hq_close: `The other Reds.`,
	hq_right: `Yeah, that’s them.`,

	bridge1:	`It looks to me like they plan to cross the Josko river
		and attack our Base
		But you can stop them, Doc. 
		They can't cross the Josko if you knock out the bridges.`,
	bridge1_ask:	`Do you see Bridge Number One?
					Right in front of our blue jeep.`,
	bridge1_wrong: `No- not there.`,
	bridge1_close: `Not that one.`,
	bridge1_right: `Yeah. It's a steel truss bridge. Gotta hit it hard.`,

	bridge2:	`Bridge Two is upriver a few kilometers.`,
	bridge2_ask:	`Can you see Bridge Two?`,
	bridge2_wrong: `No- not there.`,
	bridge2_close: `Not that one.`,
	bridge2_right: `Yeah. That's a simple steel beam bridge.
				Let's take it out.`,


	bridge3:	`There also an old stone bridge up there.`,
	bridge3_ask: 	`Do you see the stone bridge - number three?`,
	bridge3_wrong: 	`No- not there.`,
	bridge3_close: 	`Not that one.`,
	bridge3_right: 	`Yeah. It's pretty. I hate to bust it.
					But it won't be the first time.`,

	aim1:	`Let's start with Bridge One
			and stop the guys who are chasing us.`,
	aim1_ask: 	`Bridge One`,
	aim1_wrong: `No- not there.`,
	aim1_close: `Not that one.`,
	aim1_right: `Good. Just do me a favor.
			Make sure we get across before you hit it.
			And make sure the bad guys don't.`,

	bomb1:
		`You have your target, and the estimated point of impact.
		Now choose a munition. 
		Small munitions mean less damage. Less danger for us on the ground. 
		But it has to be big enough to knock out the bridge.`,
	bomb1_ask:   `Design your munition 
				And deploy it.
				After we get across!`,
	bomb1_late:  `Too late. You let the Reds get into Rumini territory.`,
	bomb1_early: `Too soon. You dropped the munition on top of us. Somebody will get hurt.`,
	bomb1_low: `Sorry. That munition was not powerful enough to disable the bridge.`,
	bomb1_high: `Ouch. That blast was too big. People can get hurt.`,
	bomb1_right: `Good work.`,
	bomb1_okay:	 `Perfect timing.`,

	shrine: `
		Let's knock out the other bridges.
		But first, look at the Rumini Historic Shrine.`,
	shrine_ask:  `Do you see the shrine?`,
	shrine_wrong:`That isn’t the shrine`,
	shrine_close:`Look for the obelisk on the map.`,
	shrine_right:
		`Those ancient stained glass windows are protected structures.
		These are cultural treasures of the Rumini people.
		You must be careful not to break the windows.`,
		
	aim2:
		`Uh oh. We're out of time. You can only make one more strike!
		You must design a munition to disable both remaining bridges in one blow!
		Remember one is stone and one is steel. 
		And you must be very careful not to break the ancient glass!`,
	aim2_ask: `Both remaining bridges in one blow`,
	aim2_wrong: `Pick a target in the right area.`,
	aim2_close: `Pick a better target.`,
	aim2_right: `Good target.`,

	bomb2:
		`Tough problem, Doc.
		You have oner shot to knock out both a steel bridge and a stone bridge
		without damaging the ancient stained glass windows.`,

	bomb2_ask: `Choose the munition very carefully.`,
	bomb2_wrong: `That munition is too big. We can’t damage the windows! Try another one.`,
	bomb2_close: `Your munition was too small. It didn't disable the bridge. Try again.`,
	bomb2_right: `Good choice. You disabled the bridge without damaging the shrine.`,

	bda:	`Let's take a look.
			Check out the results of your strike`,

	end:   `Good work, Doc.
			You saved Rumini from the Red invasion!			`
	}
}

const audio= { claro: {}, romeo:{}};

Object.keys( script.claro).forEach( name => audio.claro[ name ]=new Audio(`./assets/voice/claro/${name}.ogg`) );
Object.keys( script.romeo).forEach( name => audio.romeo[ name ]=new Audio(`./assets/voice/romeo/${name}.ogg`) );
