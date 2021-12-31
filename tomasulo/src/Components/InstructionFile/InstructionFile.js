class InstructionFile{
    
    constructor(){
        this.instructions = new Array();
         this.NumberOfInst = 0;
        console.log('created new InstructionFile')
    }


    addInstruction(instruction)
    {
            this.NumberOfInst++;
            this.instructions.push(instruction);


    }
    getOperation(index)
    {
        const inst = this.instructions[index].split(/[ ,]+/);
        return inst[0];
    }
    getDestination(index)
    {
        const inst = this.instructions[index].split(/[ ,]+/);
        return inst[1];
    }
    getFirstSource(index)
    {
        const inst = this.instructions[index].split(/[ ,]+/);
        return inst[2];
    }
    getSecondSource(index)
    {
        const inst = this.instructions[index].split(/[ ,]+/);
        return inst[3];
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