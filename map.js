
export const newMap = cnfg => {

	const dom ={
		root:	document.createElement("div"),
		parent: cnfg?.parent || document.querySelector("#map"), 
		}
	const svgFile= cnfg?.svgFile || "./assets/bigmap.svg"	

    const self={
      construct: ()=>{

		fetch(  svgFile )
		  .then(response => response.text())
		  //.then(svg => document.body.insertAdjacentHTML("afterbegin", svg))
		   //.then(  svg => console.log(dom.root.innerHTML=svg)  )
		//.then(  svg => dom.root.innerHTML=svg )
		.then(  svg => document.querySelector("#map").innerHTML = svg)
		.catch( err => dom.root.innerHTML=err )
		dom.parent.append( dom.root );

		console.log(dom.root ); 
	    return self;
        },
      show: ()=>{
        return self;
        },
      immediacy:1,
      move: (x,y)=>{ 
        return self;
        },
      destruct: ()=>{ 
        return self;
        }
      }
    return self.construct();
    }