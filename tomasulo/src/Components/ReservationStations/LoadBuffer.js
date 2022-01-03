class LoadBuffer{

    constructor(size){
        this.size = size;
        this.loadBuffer = new Array(size);
        console.log('created new LoadBuffer')
        this.build();
    }

    emptyIndex()  //return index of empty space to reserve for a new inst.
    {
        for(let i = 0;i<this.loadBuffer.length;i++)
        {
            if(this.loadBuffer[i]== null || this.loadBuffer[i]== undefined || this.loadBuffer[i]== '' || this.loadBuffer[i]== ' ' || this.loadBuffer[i].Busy == 0)
            {
                return i;

            }
        }
        return -1;
    }
    build()
    {   
        for(let i = 0;i<this.loadBuffer.length;i++)
        {
            this.loadBuffer[i] =  {Address:null,Busy:0}
        }
    }
    addROOM(address)
    {
        const index = this.emptyIndex(); 
        // console.log('empty',index)
        if(index == -1)
        {
            return -1; //no space
        }
            const room = {Address:address,Busy:1};
            this.loadBuffer[index] = room;
            return index;
    }
    deleteRoom(index)
    {
        if(index > this.loadBuffer.length-1)
            return;
        this.loadBuffer[index] = {Address:null,Busy:0}
    }
    //getters
    getAddress(index)
    {
        return this.loadBuffer[index].Address;
    }
  

    getBusy(index)
    {
        return this.loadBuffer[index].Busy;
    }

    //setters
    setAddress(index,address)
    {
        this.loadBuffer[index].Address = address;
    }
  
   
    setBusy(index,busy)
    {
        this.loadBuffer[index].Busy = busy;
    }

    display(type)
    {   
        let tag = 'L'
        let result = `Load Buffer:\n`
        result += 'Tag   Address    Busy\n'
        for(let i = 0; i < this.loadBuffer.length; i++)
        {
            
            result += tag+(i+1)+' :    '+ this.displayInstruction(this.loadBuffer[i])+'\n';
        }
        return result;
    }
    displayInstruction(room)
    {
        let result = '';
        Object.entries(room).forEach(item => {
            result +=item[1] + '      '
        })
        return result.trim();
    }
}

export default LoadBuffer;