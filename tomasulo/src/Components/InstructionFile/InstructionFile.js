class InstructionFile{
    
    constructor(){
        this.instructions = new Array();
         this.NumberOfInst = 0;
        console.log('created new InstructionFile')
    }


    addInstruction(operation,destination,first_source,second_source)
    {
        this.NumberOfInst++;
        if(operation == 'L.D')
            this.instructions.push({operation:operation,destination:destination,first_source:first_source})
        else
            this.instructions.push({operation:operation,destination:destination,first_source:first_source,second_source:second_source})

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