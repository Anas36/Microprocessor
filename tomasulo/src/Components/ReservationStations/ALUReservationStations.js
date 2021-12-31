class ReservationStations{

    constructor(size){
        this.size = size;
        this.reservationStations = new Array();
        console.log('created new ReservationStations')
    }

    emptyIndex()  //return index of empty space to reserve for a new inst.
    {
        for(let i = 0;i<this.reservationStations.length;i++)
        {
            if(this.reservationStations[i]== null)
            {
                return i;

            }
        }
        return -1;
    }
    
    addROOM(op,vj,vk,qj,qk)
    {
        const index = this.emptyIndex(); 
        if(index == -1)
        {
            return -1; //no space
        }
       
            const room = {OP:op,Vj:vj,Vk:vk,Qj:qj,Qk:qk,Busy:1};
            this.reservationStations[index] = room;
            return index;
    }
    //getters
    getOperation(index)
    {
        return this.reservationStations[index].OP;
    }
    getVj(index)
    {
        return this.reservationStations[index].Vj;
    }
    getVk(index)
    {
        return this.reservationStations[index].Vk;
    }
    getQk(index)
    {
        return this.reservationStations[index].Qk;
    }
    getQj(index)
    {
        return this.reservationStations[index].Qj;
    }
    getBusy(index)
    {
        return this.reservationStations[index].Busy;
    }

    //setters
    setOperation(index,op)
    {
        this.reservationStations[index].OP = op;
    }
    setVj(index,vj)
    {
        this.reservationStations[index].Vj = vj;
    }
    setVk(index,vk)
    {
        this.reservationStations[index].Vk = vk;
    }
    setQj(index,qj)
    {
        this.reservationStations[index].Qj = qj;
    }
    setQk(index,qk)
    {
        this.reservationStations[index].Qk = qk;
    }
    setBusy(index,busy)
    {
        this.reservationStations[index].Busy = busy;
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

export default ReservationStations;