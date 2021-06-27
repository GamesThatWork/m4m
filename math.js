
export const mathFunction={}, newMath = cnfg => {
    const dom = {
		equation:   document.querySelector("#math"),
		expression: document.querySelector("#math"),
		}
    const self={
/*      get x(   ) { return graphicLayers[0].position.x;        },
      get y(   ) { return graphicLayers[0].position.y;        },
      set x( v ) { graphicLayers.forEach(g => g.position.x=v) },
      set y( v ) { graphicLayers.forEach(g => g.position.y=v) },
  */
	construct:  name =>{
		if( !expression[ name ] )	return;
		let markup = name=="start"? {head:"",tail:""}: mathML;		
		self.name        = name;
		self.expression  = markup.head + expression[ name ]                  + markup.tail;
		self.equation    = markup.head + `<mi>p</mi><mo>=</mo>` + eq[ name ] + markup.tail;
		
		if( name=="start")
		mathFunction[ name ]= self;
		return self;
		},
	showEquation:  newDom=>{
		console.log("showEquation:  newDom = ",newDom );
		if( newDom )	dom.equation=newDom;
		dom.equation.innerHTML = self.equation;
		setTimeout( MathJax.typeset, 500 );
		},
	hideEquation:  ()=> dom.equation.innerHTML = "",
	showExpression:  newDom=>{
		if( newDom )	dom.expression=newDom;
		dom.expression.innerHTML = self.expression;
		setTimeout( MathJax.typeset, 500 );
		},

	toggle: ()=>   dom.equation.innerHTML? self.destruct() : self.construct(),
	destruct: ()=>{ 
		dom.equation.innerHTML ="";
		dom.expression.innerHTML ="";
		return self;
        },
	hide: ()=> {
		dom.equation.style.display="none";
		return self;
		},
	show: ()=> {
		dom.equation.style.display="block";
		return self;
		},

      }
    return self.construct( cnfg );
    };



const e = part=>eq[part];


const mathML = {
	head:`<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">`,
  	tail: `</math>`
	};

const expression ={
	start:
/*	`<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="-50 -10 150 150" style="enable-background:new 0 0 60 60;" xml:space="preserve"
	 class="play">
	<g>	<path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
			c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
			C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
		<path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
			S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
	</g></svg>`*/
	`<?xml version="1.0" ?><svg height="120" viewBox="0 0 24 24" width="120" xmlns="http://www.w3.org/2000/svg">
	 <g class="play"> <circle cx="12" cy="12" fill="none" r="10" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><polygon fill="none" points="10 8 16 12 10 16 10 8"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g>
	 <g class="pause" visibility="hidden" ><circle cx="12" cy="12" fill="none" r="10" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="10" x2="10" y1="15" y2="9"/><line fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14" x2="14" y1="15" y2="9"/></svg>`,
	power:`
		<mrow class="power">
			<mi>&omega;</mi>
		</mrow>`,
	pulse:`
		<mrow class="pulse">
			<mi>H</mi>
			<mfenced  separators="" >    
				<mi>s</mi>
				<mfrac>
					<mrow>
						<mi>t</mi>
					</mrow>
					<mrow>
						<mi>d</mi>
					</mrow>
				</mfrac>
			</mfenced>    
		</mrow>`,
	wave:`
		<mrow class="wave">
			<mo>sin</mo>
			<mfenced  separators="" >
				<mfrac>
					<mrow>
						<mi>t</mi>
					</mrow>
					<mrow>
						<mi>d</mi>
					</mrow>
				</mfrac>
			</mfenced>
		</mrow>		`,
	decay:`
		<mrow class="decay">
			<mn>D</mn>
			<mfenced  separators="" >    
			<mn>t</mn>
			</mfenced>
		</mrow>`,
	prop:`
		<mfenced separators=""  class="prop" >
			<mfrac>
				<mrow>
					<mn>1</mn>
				</mrow>
				<mrow>
				<msup>  
					<mi>d</mi>
					<mn>3</mn>
				</msup>
				</mrow>
			</mfrac>
		</mfenced>`
	};

const eq={}
	eq.start= `                                                                   `;
	eq.power= `                                    ${expression.power}            `;
	eq.pulse= `<mrow>  ${eq.power} <mo>&sdot;</mo> ${expression.pulse}   </mrow>  `;
	eq.wave = `<mrow>  ${eq.pulse}                 ${expression.wave}    </mrow>  `;
	eq.decay= `<mfrac> ${eq.wave}                  ${expression.decay}   </mfrac> `;
	eq.prop = `<mrow>  ${eq.decay}                 ${expression.prop}    </mrow>  `;
	eq.full= eq.prop;
