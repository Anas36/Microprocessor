class ReservationStations{

    constructor(size){
        this.size = size;
        this.reservationStations = new Array();
        console.log('created new ReservationStations')
    }


    addROOM(op,vj,vk,qj,qk,busy)
    {
        if(this.reservationStations.size >= this.size)
        {
            return -1; //no space
        }
            const room = {OP:op,Vj:vj,Vk:vk,Qj:qj,Qk:qk,Busy:busy};
            this.reservationStations.push(room);
            return 1;
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