import instructions from "./Test1";
import React, {Component} from "react";



class Controller2 extends Component{

constructor(props)
{
    super();
    let Instructions = new instructions();
}
  



 addInstruction = ()=>   //usage : Instruction Table
  {
    instructions.addInstruction({student: 'anas'});
  } 
 
 Next = ()=>{
    this.addInstruction();
    this.forceUpdate();
}
render(){
    
    return (
    <>
    <button onClick={()=>this.Next()}>Next</button>
    <br/>
    Instructon :{this.state.Instructions.instructions}

    </>
    );
        
    }
}

export default Controller2;