class InstructionFile{
    constructor(){
        this.instructions = new Array();
        console.log('created new InstructionFile')
    }


    addInstruction(operation,destination,first_source,second_source)
    {
        if(operation == 'L.D')
            this.instructions.push({operation:operation,destination:destination,first_source:first_source})
        else
            this.instructions.push({operation:operation,destination:destination,first_source:first_source,second_source:second_source})

    }
}

export default InstructionFile;