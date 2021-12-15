import {createSlice} from "@reduxjs/toolkit";
import { Flight } from "../models/Flight";

const initialState = ({
    item: new Flight(0, "",new Date(),new Date(),0),
    amount: 1,
    price: 150,
});

const reducers = ({

    setItem(state: {item: Flight}, action: {payload: Flight}){
        state.item = action.payload;
    },

    increaseItem(state: {amount: number, price: number}){
        state.amount += 1;
        state.price += 150;
    },

    decreaseItem(state: {amount: number, price: number}){
        if(state.amount > 1){
            state.price -= 150;
            state.amount -= 1;
        }
    }

});

const paymentSlice = createSlice({
    name:"payment",
    initialState: initialState,
    reducers: reducers,
});

export const paymentActions = paymentSlice.actions;

export default paymentSlice;