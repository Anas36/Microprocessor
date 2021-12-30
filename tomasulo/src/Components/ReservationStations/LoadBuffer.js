class LoadBuffer{

    constructor(size){
        this.size = size;
        this.loadBuffer = new Array();
        console.log('created new ReservationStations')
    }


    addROOM(Address,busy)
    {
        if(loadBuffer.size >= this.size)
        {
            return -1; //no space
        }
        room = {Address,busy};
        storeBuffer.push(room);
        return 1;
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