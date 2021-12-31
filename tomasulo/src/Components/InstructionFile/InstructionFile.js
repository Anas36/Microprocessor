class InstructionFile{
    
    constructor(){
        this.instructions = new Array();
         this.NumberOfInst = 0;
        console.log('created new InstructionFile')
    }


    addInstruction(inst)
    {
            this.NumberOfInst++;
            this.instructions.push({instruction : inst,reservedRomm : '',Issue : -1,Execute:-1,Write_Result : -1});


    }
    
    getOperationByIndex(index)
    {
        const inst = this.instructions[index].instruction.split(/[ ,]+/);
        return inst[0];
    }
    getOperationByInst(instruction)
    {
        const inst = instruction.instruction.split(/[ ,]+/);
        return inst[0];
    }
    getDestinationByIndex(index)
    {
        const inst = this.instructions[index].instruction.split(/[ ,]+/);
        return inst[1];
    }
    getDestinationByInst(instruction)
    {
        const inst = instruction.instruction.split(/[ ,]+/);
        return inst[1];
    }
    getFirstSourceByIndex(index)
    {
        const inst = this.instructions[index].instruction.split(/[ ,]+/);
        return inst[2];
    }
    getFirstSourcenByInst(instruction)
    {
        const inst = instruction.instruction.split(/[ ,]+/);
        return inst[2];
    }
    getSecondSourceByIndex(index)
    {
        const inst = this.instructions[index].instruction.split(/[ ,]+/);
        return inst[3];
    }
    getSecondSourceByInst(instruction)
    {
        const inst = instruction.instruction.split(/[ ,]+/);
        return inst[3];
    }

    getAddress(instruction) //LD F2 100    SD F2 0(R6)
    {
        const inst = instruction.instruction.split(/[ ,]+/);
        return inst[2];
    }
 
    
    displayInstruction(instruction)
    {
        let result = '';
        Object.entries(instruction).forEach(item => {
            result +=item[1] + ' '
        })
        return result.trim();
    }
}

export default InstructionFile;