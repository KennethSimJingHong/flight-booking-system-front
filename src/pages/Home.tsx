import React from 'react';
import Flights from '../components/flightList/Flights';

const Home = () => {

    return (
        <div>
            {/* <form className="col-lg-10 mx-auto mt-5 border border-danger shadow p-3 mb-5 bg-body rounded">
                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-3">
                            <select className="form-control">
                                <option defaultValue="round-trip">Round-trip</option>
                                <option value="one-way">One-way</option>
                            </select>
                        </div> 
                        <div className="col-3 text-center px-2">
                            <button type="button" className="btn btn-light border border-black">-</button>
                            <span> 0 Guest, Economy </span>
                            <button type="button" className="btn btn-light border border-black">+</button>
                        </div>
                        <div className="border border-black"></div>
                        <div className="col-3 text-center px-2">
                            <button type="button" className="btn btn-light border border-black">-</button>
                            <span> 0 Guest, Business </span>
                            <button type="button" className="btn btn-light border border-black">+</button>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <label htmlFor="fromInput" className="form-label">From</label>
                            <input type="text" className="form-control" id="fromInput" />
                        </div>
                        <div className="col-5">
                            <label htmlFor="toInput" className="form-label">To</label>
                            <input type="text" className="form-control" id="toInput" />
                        </div>
                    </div>
                    <button type="button" className="btn btn-danger mt-5 px-5" onClick={bookingHandler}>Booking</button>
                </div>
            </form> */}
            <Flights/>
        </div>
    );
};

export default Home;