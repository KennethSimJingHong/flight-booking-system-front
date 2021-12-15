export class Flight{
    id:number;
    number:string;
    departure:Date;
    arrival:Date;
    duration:number;

    constructor(id:number, flightNo:string, departure:Date, arrival: Date, duration: number){
        this.id = id;
        this.number = flightNo;
        this.departure = departure;
        this.arrival = arrival;
        this.duration = duration;
    }
}