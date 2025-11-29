import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";
const initialState = {
 
  loading:false,
  error:null,
  allBooking:null,

  cLoading:false,
  cError:null,
  cBooking:null
  
 
};

export const createBookingAction = createAsyncThunk(
  "/booking/create",
  async ({price,work,category,serviceProvider,serviceType,bookingDate}, { rejectWithValue, getState, dispatch }) => {
    try {
      let bookingData={price,work,category,serviceProvider,serviceType,bookingDate}
      console.log('booking data:',bookingData)
      console.log("get booking  action is called");
      const userData = await AsyncStorage.getItem("user");
      const parsed = JSON.parse(userData);
      const token = parsed?.token;
      console.log('token is:',token)
      const { data } = await axios.post(
        `${baseURL}/api/createBooking`,
         bookingData,
         {
          headers: {
            Authorization:`Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
     //console.log("all booking is:", data);
      return data;
    } catch (err) {
      console.log("error is:", err.response.data);
      return rejectWithValue(err?.response?.data);
    }
  }
);


export const getBookingAction = createAsyncThunk(
  "/booking/get",
  async ({}, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log("get booking  action is called");
      const userData = await AsyncStorage.getItem("user");
      const parsed = JSON.parse(userData);
      const token = parsed?.token;
      console.log('token is:',token)
      const { data } = await axios.get(
        `${baseURL}/api/bookings`,
         {
          headers: {
            Authorization:`Bearer ${token}`,
          },
        }
      );
     //console.log("all booking is:", data);
      return data;
    } catch (err) {
      console.log("error is:", err.response.data);
      return rejectWithValue(err?.response?.data);
    }
  }
);








const bookingSlice = createSlice({
  name: "service",
  initialState,
  extraReducers: (builder) => {
       builder.addCase(getBookingAction.pending, (state, action) => {
        
         state.loading=true
        });
        builder.addCase(getBookingAction.fulfilled, (state, action) => {
          state.allBooking=action.payload;
          state.loading = false;
          state.error = null;
        });
        builder.addCase(getBookingAction.rejected, (state, action) => {
          state.error = action.payload;
          state.loading = false;
        });


        builder.addCase(createBookingAction.pending, (state, action) => {
        
         state.cLoading=true
        });
        builder.addCase(createBookingAction.fulfilled, (state, action) => {
          state.cBooking=action.payload;
          state.cLoading = false;
          state.cError = null;
        });
        builder.addCase(createBookingAction.rejected, (state, action) => {
          state.cError = action.payload;
          state.cLoading = false;
        });


   

    
  },
});
//generate reducer
const bookingReducer=bookingSlice.reducer;
export default bookingReducer;
