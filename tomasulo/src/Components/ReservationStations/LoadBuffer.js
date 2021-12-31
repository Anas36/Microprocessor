class LoadBuffer{

    constructor(size){
        this.size = size;
        this.loadBuffer = new Array();
        console.log('created new LoadBuffer')
    }

    emptyIndex()  //return index of empty space to reserve for a new inst.
    {
        for(let i = 0;i<this.loadBuffer.length;i++)
        {
            if(this.loadBuffer[i]== null)
            {
                return i;

            }
        }
        return -1;
    }
  
    addROOM(address)
    {
        const index = this.emptyIndex(); 
        if(index == -1)
        {
            return -1; //no space
        }
            const room = {Address:address,Busy:1};
            this.storeBuffer[index] = room;
            return 1;
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