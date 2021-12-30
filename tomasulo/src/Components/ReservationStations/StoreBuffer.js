class StoreBuffer{

    constructor(size){
        this.size = size;
        this.storeBuffer = new Array();
        console.log('created new StoreBuffer')
    }

    addROOM(address,v,q,busy)
    {
        if(this.storeBuffer.size >= this.size)
        {
            return -1; //no space
        }
            const room = {Address:address,V:v,Q:q,Busy:busy};
            this.storeBuffer.push(room);
            return 1;
    }
    //getters
    getaddresseration(index)
    {
        return this.storeBuffer[index].Address;
    }
    getv(index)
    {
        return this.storeBuffer[index].V;
    }
   
    
    getq(index)
    {
        return this.storeBuffer[index].Q;
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
    setv(index,v)
    {
        this.storeBuffer[index].V = v;
    }
 
    setq(index,q)
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