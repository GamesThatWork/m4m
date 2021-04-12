
export const newMath = cnfg => {
    const parent = document.querySelector("#math");
    const self={
/*      get x(   ) { return graphicLayers[0].position.x;        },
      get y(   ) { return graphicLayers[0].position.y;        },
      set x( v ) { graphicLayers.forEach(g => g.position.x=v) },
      set y( v ) { graphicLayers.forEach(g => g.position.y=v) },
  */
 construct: (equation=eqML)=>{
    console.log(parent ) ;
    parent.innerHTML =equation;
    MathJax.typeset()
    return self;
    },

  toggle: ()=>   parent.innerHTML? self.destruct() : self.construct(),
  destruct: ()=>{ 
        parent.innerHTML ="";
        return self;
        },
      hide: ()=> {
        parent.style.display="none";
        return self;
        },
      show: ()=> {
        parent.style.display="block";
        return self;
        },
      power: ()=>  self.construct( eq.head + eq.power               + eq.tail ),
      pulse: ()=>  self.construct( eq.head + eq.pulse               + eq.tail ),
      wave:  ()=>  self.construct( eq.head + eq.cosine              + eq.tail ),
      decay: ()=>  self.construct( eq.head + eq.decay               + eq.tail ),
      prop:  ()=>  self.construct( eq.head + eq.propa            + eq.tail ),
      full:  ()=>  self.construct( eq.head + eq.decay + eq.propa + eq.tail ),


      }
    return self.construct();
    }



const e = part=>eq[part];

const eq={}

eq.hi = `<mrow color="yellow">`;
eq.ih = `</mrow>`;




eq.head= 
`<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mi>p</mi>
  <mo>=</mo>`;
//<mo>&prop;</mo>`;

eq.power= 
`<mi class="power">&omega;</mi>`;
eq.pulse=
 `
 <mrow>
 ${eq.power}
 <mo>&sdot;</mo>
 <mrow class="pulse">
 <mi>H</mi>
 <mfenced  separators="" >    
 <mi>S</mi>
 <mfrac>
      <mrow>
        <mi>t</mi>
      </mrow>
      <mrow>
        <mi>R</mi>
      </mrow>
    </mfrac>
   </mfenced>    
  </mrow>
</mrow>
   `;
eq.cosine=`
<mrow>  
${eq.pulse}
  <mrow class="cosine">
   <mo>sin</mo>
    <mfenced  separators="" >    
    <mfrac>
    <mrow>
      <mi>t</mi>
    </mrow>
    <mrow>
      <mi>R</mi>
    </mrow>
  </mfrac>
 </mfenced>
 </mrow>
</mrow>
 `;

eq.decay=`
<mfrac>
  ${eq.cosine}
       
  <mrow class="decay">
    <mn>D</mn>
    <mfenced  separators="" >    
      <mn>t</mn>
    </mfenced>
  </mrow>
</mfrac>
  `;

eq.propa=
` <mfenced separators=""  class="propa" >
    <mfrac>
      <mrow>
        <mn>1</mn>
      </mrow>
      <mrow>
       <msup>  
         <mi>R</mi>
         <mn>3</mn>
       </msup>
      </mrow>
    </mfrac>
 </mfenced>
 `;

eq.tail=`</math>`;


eq.full= eq.head + eq.decay +eq.propa +eq.tail;



const eqML= eq.head + '<mfrac>' + eq.cosine + eq.decay + '</mfrac>' + eq.propa;


/*

   
    
    
    const eq={
    
    head:`
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mi>p</mi>
      <mo>=</mo>`,
    pulse: `  <mfrac>
    <mrow>
      <mn>0.9575</mn>
      <mi>t</mi>
    </mrow>
    <mrow>
      <msup>
        <mi>R</mi>
        <mfrac>
          <mn>3</mn>  
          <mn>4</mn>  
        </mfrac>
      </msup>
      <msup>
        <mi>w</mi>
        <mfrac>
          <mn>1</mn>  
          <mn>12</mn>  
        </mfrac>
      </msup>
    </mrow>
    </mfrac>`,
    cosine:`
      <mrow>
        <mn>0.1838</mn>
        <mo>cos</mo>
        <mfenced  separators="" >    
          <mfrac>
            <mrow>
              <mn>0.9575</mn>
              <mi>t</mi>
            </mrow>
            <mrow>
              <msup>
                <mi>R</mi>
                <mfrac>
                  <mn>3</mn>  
                  <mn>4</mn>  
                </mfrac>
              </msup>
              <msup>
                <mi>w</mi>
                <mfrac>
                  <mn>1</mn>  
                  <mn>12</mn>  
                </mfrac>
              </msup>
            </mrow>
          </mfrac>
          <mo>+</mo>
          <mfrac>
            <mi>π</mi>
            <mn>4</mn>
          </mfrac>
        </mfenced>
      </mrow>`,
    
      decay:`
      <mrow>
        <msup>
          <mfenced  separators="" >
           <mfrac>
            <mrow>
              <mn>1.915</mn>
              <msup>
                <mi>w</mi>
                <mfrac>
                  <mn>1</mn>
                  <mn>4</mn>
                </mfrac>
              </msup>
              </mrow>
            <msup>
              <mi>R</mi>
              <mfrac>
                <mn>7</mn>
                <mn>4</mn>
              </mfrac>
            </msup>
         </mfrac> 
      
      
            <mi>t</mi>
          </mfenced>
          <mn>1.4</mn>
        </msup>
      <mo>+</mo>
      <mn>0.13</mn>
      
      
      </mrow>`,
    
    
    propa:
    `<mo>.</mo>
    
      <mfenced  separators="" >
        <mfrac>
          <mrow>
            <msub>
              <mi>S</mi>
              <mn>1</mn>
            </msub>
          </mrow>
          <mrow>
            <mfrac>
              <mrow>  
                <mi>R</mi>
              </mrow>
              <mrow> 
                <mroot>
                  <mi>w</mi>
                  <mn>3</mn>
                </mroot>
              </mrow>
            </mfrac>
          </mrow>
        </mfrac>
          
      
    
        <mo >+</mo>
        
        <mfrac>
          <mrow>
            <msub>
              <mi>S</mi>
              <mn>2</mn>
            </msub>
          </mrow>
          <mrow>
            <msup>
              <mfenced  separators="" >
                <mfrac>
                  <mrow>  
                    <mi>R</mi>
                  </mrow>
                  <mrow> 
                    <mroot>
                      <mi>w</mi>
                      <mn>3</mn>
                    </mroot>
                  </mrow>
                </mfrac>
              </mfenced> 
              <mn>2</mn>
            </msup>
          </mrow>
        </mfrac>
    
      <mo>+</mo>
    
      <mfrac>
        <mrow>
          <msub>
            <mi>S</mi>
            <mn>3</mn>
          </msub>
        </mrow>
        <mrow>
          <msup>
            <mfenced  separators="" >
              <mfrac>
                <mrow>  
                  <mi>R</mi>
                </mrow>
                <mrow> 
                  <mroot>
                    <mi>w</mi>
                    <mn>3</mn>
                  </mroot>
                </mrow>
              </mfrac>
            </mfenced> 
            <mn>3</mn>
          </msup>
        </mrow>
      </mfrac>
     </mfenced>          
    </math>
    `};
   
    
    const eqML= eq.head + '<mfrac>' + eq.cosine + eq.decay + '</mfrac>' + eq.propa;
    
*/