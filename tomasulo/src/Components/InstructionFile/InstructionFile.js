class InstructionFile{
    
    constructor(){
        this.instructions = new Array();
         this.NumberOfInst = 0;
        console.log('created new InstructionFile')
    }


    addInstruction(inst)
    {
        this.instructions.push({instruction : inst,Issue : -1,Execute:-1,ExecuteFinish : -1,Write_Result : -1,index : this.NumberOfInst,reservedRomm : ''});
        this.NumberOfInst++;
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
 
    display()
    {   
        let result = 'Instructions:\n'
       //  result += 'Instruction                   Issue              Execute                Write_Result\n'
        for(let i = 0; i < this.instructions.length; i++)
        {
            result += (i+1)+' : '+ this.displayInstruction(this.instructions[i].instruction)+'\n';
        }
        return result;
    }
    displayInstruction(instruction)
    {
        let result = '';
        Object.entries(instruction).forEach(item => {
            // if(item[1][0] ==  'L')
            //     result +=item[1] + '           '
            // else if(item[1][0] ==  'L')
            //     result +=item[1] + '       '
            // else if(item.length < 5)
            //     result +=item[1] + '       '
            // else //ALU
                 result +=item[1] + ''



        })
        return result.trim();
    }
}

export default InstructionFile;