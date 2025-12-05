import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../slices/booking/booking";
import crasoulReducer from "../slices/crasoul/crasoulSlice";
import emailReducer from "../slices/email/emailSlice";
import reviewReducer from "../slices/review/review";
import serviceReducer from "../slices/service/serviceSlice";
import serviceProviderReducer from "../slices/users/serviceproviderSlice";
import userReducer from '../slices/users/userSlice';

const store=configureStore({
    reducer:{
        users:userReducer,
        emails:emailReducer,
        services:serviceReducer,
        crasouls:crasoulReducer,
        serviceProviders:serviceProviderReducer,
        reviews:reviewReducer,
        bookings:bookingReducer
     
    }
})
export default store