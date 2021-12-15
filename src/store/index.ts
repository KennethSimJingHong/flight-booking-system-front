import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import paymentSlice from "./payment-slice";

const store = configureStore({
    reducer: {user: userSlice.reducer, payment: paymentSlice.reducer},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;