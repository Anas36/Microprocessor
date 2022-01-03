class Instructions{
    
    constructor(){
        this.instructions = new Array();
         this.NumberOfInst = 0;
        console.log('created new InstructionFile')
    }


    addInstruction(instruction)
    {
        this.instructions.push(instruction);
        this.NumberOfInst++;
    }
  
}

export default Instructions;