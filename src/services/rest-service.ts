import axios from "axios";
import authHeader from "./auth-header";
import { Airline } from "../models/Airline";
import { Flight } from "../models/Flight";
import { Booking } from "../models/Booking";
import { Passenger } from "../models/Passenger";
import User from "../models/user";

const baseUrl: string = "http://localhost:8080/api";

class RestService{

    header: {} = {headers: authHeader()};

    async getAirlines(){
        const response = await axios.get<GetResponseAirlines>(baseUrl+ "/airlines", this.header);
        return response.data._embedded.airlines;
    }

    createFlight(flight: Flight, airline: Airline){
        let data = {
            flight,
            airline
        }
        axios.post(baseUrl + "/flight/create", data, this.header);
    }

    async getFlight(){
        const response = await axios.get<FlightsWithAirline[]>(baseUrl + "/flight/get", this.header);
        return response.data;
    }

    createBooking(booking: Booking, passengers:Passenger[]){
        let data = {
            booking,
            passengers,
        }
        axios.post(baseUrl + "/booking/create", data, this.header);
    }
    
    async getBooking(){
        const response = await axios.get<GetResponseBookings>(baseUrl + "/bookings", this.header);
        return response.data._embedded.bookings;
    }
}

interface GetResponseAirlines{
    _embedded:{
        airlines: Airline[];
    }
}

interface FlightsWithAirline{
    flight: Flight;
    airline: Airline;
}

interface GetResponseBookings{
    _embedded:{
        bookings: Booking[];
    }
}

export default new RestService();