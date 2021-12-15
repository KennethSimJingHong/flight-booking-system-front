import React, { useEffect, useState, useRef, FormEvent } from 'react';
import restService from '../services/rest-service';
import { Airline } from '../models/Airline';
import { Flight } from '../models/Flight';
import Flights from '../components/flightList/Flights';


const Management = () => {
    const [airlines, setAirlines] = useState<Airline[]>([]);
    
    const flightId = useRef<HTMLInputElement>(null);
    let airlineType = useRef<HTMLSelectElement>(null);
    const departure = useRef<HTMLInputElement>(null);
    const arrival = useRef<HTMLInputElement>(null);

    useEffect(() =>  {
        restService.getAirlines().then(data => 
            data.map(a => setAirlines(old => [...old, new Airline(a.id,a.name)])
        ));
    
        flightId.current!.value = Date.now().toString().slice(-10);
    }, []);

    const saveHandler = (event: FormEvent) => {
        event.preventDefault();

        const airline = airlines.find(airline => airline.name == airlineType.current?.value);
        const depart = new Date(departure.current?.value!);
        const departTime = depart.getTime();
        const arrive = new Date(arrival.current?.value!);
        const arriveTime = arrive.getTime();
        const diffMs = Math.abs(arriveTime - departTime);
        const diffMin = Math.ceil(diffMs / (60000));

        const newFlight = new Flight(0,flightId.current?.value!, depart, arrive, diffMin);
        restService.createFlight(newFlight, airline!);

        refreshHandler();
    }

    // const options = {
    //     year:"2-digit",
    //     month: "long",
    //     day:"numeric",
    //     hour: "2-digit",
    //     minute: "2-digit",
    // }

    // const dateFormat = (date: Date) => {
    //     return Intl.DateTimeFormat(navigator.language, options).format();
    // }

    const refreshHandler = () => {
        flightId.current!.value = Date.now().toString().slice(-10);
        airlineType.current!.value = "Please select an airline";
        departure.current!.value = "";
        arrival.current!.value = "";
    }

    return (
        <div>
           <div>
            <form className="col-lg-10 mx-auto mt-5 border border-danger shadow p-3 mb-5 bg-body rounded">
                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-3">
                            <label htmlFor="duration" className="form-label">Flight No</label>
                            <input type="text" ref={flightId} className="form-control" id="departureInput" disabled/>
                        </div> 
                        <div className="col-3">
                            <label htmlFor="airlineInput" className="form-label">Airline Type</label>
                            <select className="form-control" id="airlineInput" ref={airlineType}>
                                <option defaultValue="">Please select an airline</option>
                                {airlines.map(airline => <option key={airline.id}>{airline.name}</option>)}
                            </select>
                        </div> 
                        <div className="col-3">
                            <label htmlFor="departureInput" className="form-label">Departure</label>
                            <input type="datetime-local" className="form-control" id="departureInput" ref={departure} />
                        </div>
                        <div className="col-3">
                            <label htmlFor="arrivalInput" className="form-label">Arrival</label>
                            <input type="datetime-local" className="form-control" id="arrivalInput" ref={arrival} />
                        </div>
                    </div>
                    <button type="button" className="btn btn-danger m-2 px-5" onClick={saveHandler}>Save</button>
                    <button type="button" className="btn btn-black m-2 px-5" onClick={refreshHandler}>Refresh</button>
                </div>
            </form>
        </div>
        
        <Flights/>
        
        </div>
    );
};


export default Management;