class ReservationStations{

    constructor(size){
        this.size = size;
        this.reservationStations = new Array();
        console.log('created new ReservationStations')
    }


    addROOM(op,Vj,Vk,Qj,Qk,busy)
    {
        if(reservationStations.size >= this.size)
        {
            return -1; //no space
        }
            room = {op,Vj,Vk,Qj,Qk,busy};
            reservationStations.push(room);
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

export default ReservationStations;