class StoreBuffer{

    constructor(size){
        this.size = size;
        this.storeBuffer = new Array(size);
        console.log('created new StoreBuffer')
    }
    emptyIndex()  //return index of empty space to reserve for a new inst.
    {
        for(let i = 0;i<this.storeBuffer.length;i++)
        {
            if(this.storeBuffer[i]== null || this.storeBuffer[i]== undefined || this.storeBuffer[i]== '' || this.storeBuffer[i]== ' ')
            {
                return i;

            }
        }
        return -1;
    }
  
    addROOM(address,v,q)
    {
        const index = this.emptyIndex(); 
        if(index == -1)
        {
            return -1; //no space
        }
       
        const room = {Address:address,V:v,Q:q,Busy:1};
        this.storeBuffer[index] = room;
        return index;
    }
    //getters
    getAddress(index)
    {
        return this.storeBuffer[index].Address;
    }
    getv(index)
    {
        return this.storeBuffer[index].V;
    }
   
    
    getQ(index)
    {
        return this.storeBuffer[index].Q;
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
    setV(index,v)
    {
        this.storeBuffer[index].V = v;
    }
 
    setQ(index,q)
    {
        this.storeBuffer[index].Q = q;
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

export default StoreBuffer;