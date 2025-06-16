import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "../slices/email/emailSlice";
import userReducer from '../slices/users/userSlice'

const store=configureStore({
    reducer:{
        users:userReducer,
        emails:emailReducer
    }
})
export default store