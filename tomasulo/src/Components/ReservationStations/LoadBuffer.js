class LoadBuffer{

    constructor(size){
        this.size = size;
        this.loadBuffer = new Array();
        console.log('created new LoadBuffer')
    }


    addROOM(address,busy)
    {
        if(this.storeBuffer.size >= this.size)
        {
            return -1; //no space
        }
            const room = {Address:address,Busy:busy};
            this.storeBuffer.push(room);
            return 1;
    }
    //getters
    getaddresseration(index)
    {
        return this.storeBuffer[index].Address;
    }
  

    getBusy(index)
    {
        return this.storeBuffer[index].Busy;
    }

    //setters
    setaddresseration(index,address)
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