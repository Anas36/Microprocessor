class RegisterFile{

    constructor(size){
        this.size = size;
        this.RegisterFile = new Array();
        console.log('created new RegisterFile')
    }


    addRegister(register,qi,content)
    {
       
            const Register = {Register:register,Qi:qi,Content:content};
            this.RegisterFile.push(Register);
    }
   
    //getters
    getQi(register) //get Qi of register by the name of the register
    {
        for(let i = 0;i<this.RegisterFile.length;i++)
        {
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
            flag = true
            if(this.RegisterFile[i].Register == register)
            {
                 this.RegisterFile[i].Qi = qi;
                 this.RegisterFile[i].content = null;

            }
        }
        return flag? 1: -1;
    }
    setContent(register,content)  //set content of register by the name of the register
    { 
        let flag = false;
        for(let i = 0;i<this.RegisterFile.length;i++)
        {
            flag = true
            if(this.RegisterFile[i].Register == register)
            {
                 this.RegisterFile[i].Content = content;

            }
        }
        return flag? 1: -1;
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