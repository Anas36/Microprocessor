class MemoryFile{

    constructor(size){
        this.size = size;
        this.MemoryFile = new Array();
        console.log('created new MemoryFile')
    }

        emptyIndex()  //return index of empty space to reserve for a new inst.
        {
            for(let i = 0;i<this.MemoryFile.length;i++)
            {
                if(this.MemoryFile[i]== null || this.MemoryFile[i]== undefined || this.MemoryFile[i]== '' || this.MemoryFile[i]== ' ')
                {
                    return i;

                }
            }
            return -1;
        }
    addWord(address,content)
    {
       
            const word = {Address:address,Content:content};
            this.MemoryFile.push(word);
    }
   
    //getters
  
    getContent(address)  //get content of address by the name of the address
    {
        
        for(let i = 0;i<this.MemoryFile.length;i++)
        {
            if(this.MemoryFile[i] == undefined)
                continue;
            if(this.MemoryFile[i].Address == address)
            {
                return this.MemoryFile[i].Content

            }
        }
        return -1;
    }
   
    //setters
    
    setContent(address,content)  //set content of address by the name of the address
    { 
        //missing erease qi
        let flag = false;
        for(let i = 0;i<this.MemoryFile.length;i++)
        {
            if(this.MemoryFile[i] == undefined)
                continue;
            if(this.MemoryFile[i].Address == address)
            {
                 this.MemoryFile[i].Content = content;
                 flag = true


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

export default MemoryFile;