
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
		self.name        = name;
		self.expression  = mathML.head + expression[ name ]                  + mathML.tail;
		self.equation    = mathML.head + `<mi>p</mi><mo>=</mo>` + eq[ name ] + mathML.tail;
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
	power:`
		<mi class="power">&omega;</mi>`,
	pulse:`
		<mrow class="pulse">
			<mi>H</mi>
			<mfenced  separators="" >    
				<mi>v</mi>
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
	eq.power= `                                    ${expression.power}            `;
	eq.pulse= `<mrow>  ${eq.power} <mo>&sdot;</mo> ${expression.pulse}   </mrow>  `;
	eq.wave = `<mrow>  ${eq.pulse}                 ${expression.wave}    </mrow>  `;
	eq.decay= `<mfrac> ${eq.wave}                  ${expression.decay}   </mfrac> `;
	eq.prop = `<mrow>  ${eq.decay}                 ${expression.prop}    </mrow>  `;
	eq.full= eq.prop;
