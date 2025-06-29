import { configureStore } from "@reduxjs/toolkit";
import crasoulReducer from "../slices/crasoul/crasoulSlice";
import emailReducer from "../slices/email/emailSlice";
import serviceReducer from "../slices/service/serviceSlice";
import userReducer from '../slices/users/userSlice';
const store=configureStore({
    reducer:{
        users:userReducer,
        emails:emailReducer,
        services:serviceReducer,
        crasouls:crasoulReducer,
     
    }
})
export default store