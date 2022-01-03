class StoreBuffer{

    constructor(size){
        this.size = size;
        this.storeBuffer = new Array(size);
        console.log('created new StoreBuffer');
        this.build();
    }
    emptyIndex()  //return index of empty space to reserve for a new inst.
    {
        for(let i = 0;i<this.storeBuffer.length;i++)
        {
            if(this.storeBuffer[i]== null || this.storeBuffer[i]== undefined || this.storeBuffer[i]== '' || this.storeBuffer[i]== ' ' || this.storeBuffer[i].Busy == 0)
            {
                return i;

            }
        }
        return -1;
    }
    build()
    {   
        for(let i = 0;i<this.storeBuffer.length;i++)
        {
            this.storeBuffer[i] =  {Address:null,V:null,Q:null,Busy:0}
        }
    }
    addByIndex(index,address,v,q)
    {
        if(index == -1)
        {
            return -1; //no space
        }
       
        const room = {Address:address,V:v,Q:q,Busy:1};
        this.storeBuffer[index] = room;
        return index;
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
        // console.log('ROOM',room)
        // console.log('STORE BUFFER',this.storeBuffer)
        return index;
    }
    deleteRoom(index)
    {
        if(index > this.storeBuffer.length-1)
            return;
        this.storeBuffer[index] = {Address:null,V:null,Q:null,Busy:0}
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
    display()
    {   
        let tag = 'S';
        let result = `Store Buffer:\n`
        result += 'Tag  Address       V    Q  Busy\n'
        for(let i = 0; i < this.storeBuffer.length; i++)
        {
            
            result += tag+(i+1)+' : '+ this.displayInstruction(this.storeBuffer[i])+'\n';
        }
        return result;
    }

    displayInstruction(room)
    {
        let result = '';
        
        Object.entries(room).forEach(item => {
            result +=item[1] + '   '
        })
        return result.trim();
    }
}

export default StoreBuffer;