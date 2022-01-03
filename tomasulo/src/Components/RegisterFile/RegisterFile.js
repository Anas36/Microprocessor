class RegisterFile{

    constructor(size){
        this.size = size;
        this.RegisterFile = new Array(size);
        console.log('created new RegisterFile')
    }

        emptyIndex()  //return index of empty space to reserve for a new inst.
        {
            for(let i = 0;i<this.RegisterFile.length;i++)
            {
                if(this.RegisterFile[i]== null || this.RegisterFile[i]== undefined || this.RegisterFile[i]== '' || this.RegisterFile[i]== ' ')
                {
                    return i;

                }
            }
            return -1;
        }
    addRegister(register,qi,content)
    {
            const index = this.emptyIndex();
            const Register = {Register:register,Qi:qi,Content:content};
            this.RegisterFile[index]=Register;
    }
   
    //getters
    getQi(register) //get Qi of register by the name of the register
    {
        for(let i = 0;i<this.RegisterFile.length;i++)
        {
            if(this.RegisterFile[i] == undefined)
                continue;
            if(this.RegisterFile[i].Register == register)
            {
                return this.RegisterFile[i].Qi

            }
        }
        return -1;
    }
    getContent(register)  //get content of register by the name of the register
    {
        
        for(let i = 0;i<this.RegisterFile.length;i++)
        {
            if(this.RegisterFile[i] == undefined)
                continue;
            if(this.RegisterFile[i].Register == register)
            {
                return this.RegisterFile[i].Content

            }
        }
        return -1;
    }
   
    //setters
    setQi(register,qi)  //set Qi of register by the name of the register
    { 
        let flag = false;
        for(let i = 0;i<this.RegisterFile.length;i++)
        {
            if(this.RegisterFile[i] == undefined)
                continue;
            if(this.RegisterFile[i].Register == register)
            {
                 this.RegisterFile[i].Qi = qi;
                 this.RegisterFile[i].Content = null;
                 flag = true


            }
        }
        if(flag == false)
        {
            const index = this.emptyIndex();
            this.RegisterFile[index] = {Register:register,Qi:qi,Content:null}
        }
    }
    setContent(register,content)  //set content of register by the name of the register
    { 
        //missing erease qi
        let flag = false;
        for(let i = 0;i<this.RegisterFile.length;i++)
        {
            if(this.RegisterFile[i] == undefined)
                continue;
            if(this.RegisterFile[i].Register == register)
            {
                 this.RegisterFile[i].Content = content;
                 flag = true


            }
        }
        return flag? 1: -1;
    }
    spaces(i)
    {
       
    }
    display()
    {   
        let result = 'Registers:\n'
        let space = '';
     
        for(let i = 0; i < this.RegisterFile.length; i++)
        {
            if(i< 9)
                space = ' '
            else if(i < 100)
                space = ''
            else if(i < 9999)
                space = ''
            result += (i+1)+space+' :   '+ this.displayInstruction(this.RegisterFile[i])+'\n';
        }
        return result;
    }
    displayInstruction(room)
    {
        let result = '';
        Object.entries(room).forEach(item => {
            result +=item[1] + ' '
        })
        return result.trim();
    }
}

export default RegisterFile;