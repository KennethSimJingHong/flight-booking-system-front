import {createSlice} from "@reduxjs/toolkit";
import User from "../models/user";


const initialState = {
    currentUser: new User(0,"","","","",[]),
    showManagement: false
};

const reducers = {
    setCurrentUser(state: { currentUser: User }, action: {payload: User}){
        state.currentUser = action.payload;
    },

    setShowManagement(state: {showManagement: boolean}, action: {payload: boolean}){
        state.showManagement = action.payload;
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: reducers
})

export const userActions = userSlice.actions;

export default userSlice;
