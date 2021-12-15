import React, { useEffect, useState } from 'react';
import restService from '../services/rest-service';
import { Booking } from '../models/Booking';
import { Flight } from '../models/Flight';
import { Airline } from '../models/Airline';

interface FlightsWithAirline{
    flight: Flight;
    airline: Airline;
}

const airasia = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_New_Logo.svg/1024px-AirAsia_New_Logo.svg.png";
const mas = "https://cdn.iconscout.com/icon/free/png-256/malaysia-airlines-3441616-2874385.png";

const History = () => {
    const [flightsWithAirline, setFlightsWithAirline] = useState<FlightsWithAirline[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        let result = restService.getBooking().then(data => 
            data.map(a => setBookings(old => [...old, new Booking(a.number, a.price, a.quantity, a.flightId, a.userId)])
        ));

        let data = restService.getFlight().then(data => 
            setFlightsWithAirline([...data])
        );
    }, [])

    const properHM = (duration: number) => {
        const hour = String(Math.trunc(duration/60)).padStart(2,"0");
        const min = String(duration%60).padStart(2,"0");

        return `${hour}h ${min}m`;
    }

    return (
        <div className="col-lg-6 mx-auto mt-5">
            <div className="container-fluid">
                <div className="row">
                    {bookings.map(booking => {
                        return <div className="container border border-danger shadow px-4 py-3 mb-2 bg-body rounded text-center">
                            <div className="row mb-4 pb-2 border-bottom">
                                <div style={{fontWeight:"bold", marginRight:"10px"}}>Booking ID: </div>
                                <div>{booking.number}</div>
                            </div>
                            {flightsWithAirline.filter(flight => flight.flight.id === booking.flightId)
                            .map( flight => <div className="my-2">
                                <div className="row">
                                    <div className="col-3 my-auto">
                                        <img style={{width:"45px", margin:"auto"}} src={flight.airline.name == "MAS" ? mas : airasia}/>
                                        <div>{flight.airline.name}</div>
                                    </div>
                                    <div className="col my-auto border-left">
                                        <div>{`${flight.flight.departure} - ${flight.flight.arrival}`}</div>
                                        <hr className="m-2"/>
                                        <div>{properHM(flight.flight.duration)}</div>
                                    </div>
                                </div>
                            </div>)}
                            <div className="d-flex justify-content-around mt-4 pt-2 border-top border-dark">
                                <div>Total Ticket: <span style={{fontWeight:"bold"}}>{booking.quantity}</span></div>
                                <div>Total Price: <span style={{fontWeight:"bold"}}>RM{booking.price}</span></div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};

export default History;