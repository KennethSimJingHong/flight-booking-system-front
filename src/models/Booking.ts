import User from "./user";

export class Booking{
    number: string;
    price: number;
    quantity: number;
    flightId: number;
    userId: number;

    constructor(number: string, price: number, quantity: number, flightId: number, userId: number){
        this.number = number;
        this.price = price;
        this.quantity = quantity;
        this.flightId = flightId;
        this.userId = userId
    }
}