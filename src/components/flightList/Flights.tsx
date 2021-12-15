import React, { useEffect, useState, Fragment, useRef, FormEvent } from 'react';
import restService from '../../services/rest-service';
import { Airline } from '../../models/Airline';
import { Flight } from '../../models/Flight';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { paymentActions } from "../../store/payment-slice";

const airasia = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_New_Logo.svg/1024px-AirAsia_New_Logo.svg.png";
const mas = "https://cdn.iconscout.com/icon/free/png-256/malaysia-airlines-3441616-2874385.png";

interface FlightsWithAirline{
    flight: Flight;
    airline: Airline;
}

const Flights = () => {
    const dispatch = useDispatch();
    const [airlines, setAirlines] = useState<Airline[]>([]);
    const [flightsWithAirline, setFlightsWithAirline] = useState<FlightsWithAirline[]>([]);
    const [filtered, setFiltered] = useState<FlightsWithAirline[]>([]);
    let airlineType = useRef<HTMLSelectElement>(null);    
    
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const navigate = useNavigate();

    const purchaseHandler = (flight: Flight) => {
        if(currentUser != null){
            dispatch(paymentActions.setItem(flight));
            navigate("/payment")
        }else{
            navigate("/login")
        }
    }
     
    useEffect(() =>  {
        getAllFlights();

        let result = restService.getAirlines().then(data => 
            data.map(a => setAirlines(old => [...old, new Airline(a.id,a.name)])
        ));
    }, []);

    const getAllFlights = async () => {
        let data = await restService.getFlight();
        setFlightsWithAirline([...data]);
        setFiltered([...data]);
    }

    const properHM = (duration: number) => {
        const hour = String(Math.trunc(duration/60)).padStart(2,"0");
        const min = String(duration%60).padStart(2,"0");

        return `${hour}h ${min}m`;
    }

    const sortHandler = () => {
        const select = airlineType.current?.value;
        setFiltered(select === "Default" ? flightsWithAirline : flightsWithAirline.filter(fwa => fwa.airline.name === select)); 

    }

    return (
        <Fragment>
            <div className="col-lg-10 mx-auto mt-5 border border-danger shadow p-3 mb-5 bg-body rounded">
                <div className="col-3">
                    <div className="my-2">Sort By</div>
                    <select className="form-control" ref={airlineType} onChange={sortHandler}>
                        <option defaultValue="default">Default</option>
                        {airlines.map(airline => <option key={airline.id}>{airline.name}</option>)}
                    </select>
                </div> 
            </div>
            <div className="col-lg-6 mx-auto mt-5">
                <div className="d-flex bd-highlight">
                    <div className="d-flex">
                        <div className="row ">
                            {filtered.map(fwa => {
                                return <div className="container border border-danger shadow py-2 mb-2 bg-body rounded text-center">
                                    <div className="row">
                                        <div className="col-2 mx-auto">
                                            <p className="text-center" style={{width:"100%", color:"#919191", margin:"auto"}}>{fwa.airline.name}</p>
                                            <img src={fwa.airline.name == "AirAsia" ? airasia : mas} alt={fwa.airline.name} style={{width:"45px", margin:"auto"}}/>
                                        </div>
                                        <div className="col my-auto border-left border-right">
                                            <div>{`${fwa.flight.departure} - ${fwa.flight.arrival}`}</div>
                                            <hr className="m-2"/>
                                            <div>{properHM(fwa.flight.duration)}</div>
                                        </div>
                                        <div className="col-3 my-auto">
                                            <div className="mb-1">RM 150</div>
                                            <button type="button" className="btn btn-danger" onClick={() => purchaseHandler(fwa.flight)}>Purchase</button>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Flights;