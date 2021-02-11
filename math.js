
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
      pulse: ()=>  self.construct( eq.head + eq.pulse                                                             ),
      wave:  ()=>  self.construct( eq.head             + eq.cosine                                      ),
      decay: ()=>  self.construct( eq.head + '<mfrac>' + eq.cosine + eq.decay + '</mfrac>'              ),
      prop:  ()=>  self.construct( eq.head + '<mfrac>' + eq.cosine + eq.decay + '</mfrac>' + eq.cuberoot),
      full:  ()=>  self.construct( eq.head + '<mfrac>' + eq.cosine + eq.decay + '</mfrac>' + eq.cuberoot),


      }
    return self.construct();
    }





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
        <mi>Ï€</mi>
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


cuberoot:
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


const eqML= eq.head + '<mfrac>' + eq.cosine + eq.decay + '</mfrac>' + eq.cuberoot;

