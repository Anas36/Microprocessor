class LoadBuffer{

    constructor(size){
        this.size = size;
        this.loadBuffer = new Array(size);
        console.log('created new LoadBuffer')
    }

    emptyIndex()  //return index of empty space to reserve for a new inst.
    {
        for(let i = 0;i<this.loadBuffer.length;i++)
        {
            if(this.loadBuffer[i]== null || this.loadBuffer[i]== undefined || this.loadBuffer[i]== '' || this.loadBuffer[i]== ' ')
            {
                return i;

            }
        }
        return -1;
    }
  
    addROOM(address)
    {
        console.log('here in add room')
        const index = this.emptyIndex(); 
        console.log('empty',index)
        if(index == -1)
        {
            return -1; //no space
        }
            const room = {Address:address,Busy:1};
            this.loadBuffer[index] = room;
            return index;
    }
    //getters
    getAddress(index)
    {
        return this.storeBuffer[index].Address;
    }
  

    getBusy(index)
    {
        return this.storeBuffer[index].Busy;
    }

    //setters
    setAddress(index,address)
    {
        this.storeBuffer[index].Address = address;
    }
  
   
    setBusy(index,busy)
    {
        this.storeBuffer[index].Busy = busy;
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

export default LoadBuffer;