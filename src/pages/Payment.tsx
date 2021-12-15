import React, { ChangeEvent, useRef, useState, FormEvent, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../store';
import { paymentActions } from '../store/payment-slice';
import {Booking} from '../models/Booking';
import { Passenger } from '../models/Passenger';
import restService from '../services/rest-service';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const currentUser = useSelector((state:RootState) => state.user.currentUser);
    const {item, amount, price} = useSelector((state: RootState) => state.payment);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<number>(1);
    let firstNameArray: string[] = [];
    let lastNameArray: string[] = [];
    let identityNoArray: string[] = [];
    let bookingId = useRef<HTMLInputElement>(null);

    const properHM = (duration: number) => {
        const hour = String(Math.trunc(duration/60)).padStart(2,"0");
        const min = String(duration%60).padStart(2,"0");

        return `${hour}h ${min}m`;
    }

    const increaseItemHandler = () => {
        dispatch(paymentActions.increaseItem());
    }

    const decreaseItemHandler = () => {
        dispatch(paymentActions.decreaseItem());
    }

    const firstNameHandler = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        firstNameArray[index] = event.currentTarget.value;
    }

    const lastNameHandler = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        lastNameArray[index] = event.currentTarget.value;
    }

    const identityNoHandler = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        identityNoArray[index] = event.currentTarget.value;
    }

    const nextStep = () => {
        setCurrentStep(c => c += 1);
    }

    const previousStep = () => {
        setCurrentStep(c => c -= 1);
    }

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const booking = new Booking(bookingId.current?.value!,price, item.id, currentUser.id, amount);
        let passengerList: Passenger[] = [];

        for(let i = 0; i < amount; i++){
            const newPassenger = new Passenger(firstNameArray[i], lastNameArray[i], identityNoArray[i]);
            passengerList.push(newPassenger);
            restService.createBooking(booking, passengerList);
        }

        navigate("/");
    }

    return (
        <div>
            {currentStep == 1 &&
                <div className="col-lg-7 mx-auto mt-5 border border-danger shadow p-3 mb-5 bg-body rounded">
                    <div className="row">
                        <div className="col-6 border-right">
                            <h3 className="mb-3">Ticket Info</h3>
                            <div className="my-2">
                                <label htmlFor="flightNo" className="form-label">Flight No.</label>
                                <input type="text" className="form-control" id="flightNo" value={item.number} disabled/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="flightTime" className="form-label">Flight Time</label>
                                <input type="text" className="form-control" id="flightTime" value={`${item.departure}   --->   ${item.arrival}`} disabled/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="duration" className="form-label">Duration</label>
                                <input type="text" className="form-control" id="duration" value={properHM(item.duration)} disabled/>
                            </div>
                        </div>  
                        <div className="col m-auto text-center">
                            <div className="my-5">
                                <button onClick={decreaseItemHandler} type="button" className="btn btn-light border border-black">-</button>
                                    <span className="px-2"> Number of ticket: <span style={{fontWeight:"bold", padding:"0 4px", fontSize:"18px"}}>{amount}</span> </span>
                                <button onClick={increaseItemHandler} type="button" className="btn btn-light border border-black">+</button>
                            </div>
                            <p className="border-top py-2 border-dark" style={{fontSize:"18px"}}>Total Price: <span style={{fontWeight:"bold"}}>RM{price}</span></p>
                        </div> 
                    </div>   
                    <button type="button" className="form-control btn btn-danger mt-2 mx-auto" onClick={nextStep}>Proceed</button>
                </div>
            }
        
            {currentStep == 2 &&
                <form className="col-lg-7 mx-auto mt-5 border border-danger shadow px-4 py-3 mb-5 bg-body rounded">
                    <h3 className="mb-3">Filling Booking Info</h3>
                        <div className="col">
                            <label htmlFor="bookingId" className="form-label" >Booking ID:</label>
                            <input type="text" className="form-control" id="bookingId" disabled ref={bookingId} value={Date.now().toString().slice(-10)}/>
                        </div>
                        {
                            new Array(amount).fill(0).map( (a, index) => {
                                return <div className="my-5 border-top">
                                    <h4 className="mt-2" style={{fontSize:"18px"}}>Passenger Info</h4>
                                    <div className="col my-2">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="firstName" onChange={(e) => firstNameHandler(index, e)}/>
                                    </div>
                                    <div className="col my-2">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="lastName" onChange={(e) => lastNameHandler(index, e)}/>
                                    </div>
                                    <div className="col my-2">
                                        <label htmlFor="identityNo" className="form-label">Identity Number</label>
                                        <input type="text" className="form-control" id="identityNo" onChange={(e) => identityNoHandler(index, e)}/>
                                    </div>
                                </div> 
                            })
                        }
                    <div className="my-5 border-top">
                        <h4 className="mt-2" style={{fontSize:"18px"}}>Payment Info</h4>
                        <div className="col my-2">
                            <label htmlFor="firstName" className="form-label">Card Number</label>
                            <input type="text" className="form-control" id="firstName" />
                        </div>
                        <div className="col my-2">
                            <label htmlFor="firstName" className="form-label">CVC</label>
                            <input type="text" className="form-control" id="firstName" />
                        </div>
                        <div className="col my-2">
                            <label htmlFor="firstName" className="form-label">Expiration Year</label>
                            <input type="text" className="form-control" id="firstName" />
                        </div>
                    </div>
                    <button type="button" className="form-control btn btn-danger mt-1 px-5 mx-auto" onClick={submitHandler}>Confirm</button>
                    <button type="button" className="form-control btn btn-light border mt-1 px-5 mx-auto" onClick={previousStep}>Back</button>
                </form>
            }
            
            
        </div>
    );
};

export default Payment;