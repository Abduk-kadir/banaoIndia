import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";
const initialState = {
  loading: false,
  error: null,
  complaint: null,

  cComplaint: null,
  cError: null,
  cLoading: false,

  cancelError: null,
  cancelLoading: false,
  cancelComplaint:false
};

export const createComplaintAction = createAsyncThunk(
  "/complain/create",
  async (
    { booking, photo,complainText},
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      console.log("create  compain text  action is called");

      const formData = new FormData();
      console.log('booking,',booking),
      console.log('complaint:',complainText)
      console.log('photo',photo)
      formData.append("booking", booking);
      formData.append("complainText", complainText);
    
      if (photo) {
        formData.append("photo", {
          uri: photo,
          type: "image/jpeg", // you can detect mime if needed
          name: photo.split('/').pop(), // extract filename from path
        });
      }
    
      const userData = await AsyncStorage.getItem("user");
      const parsed = JSON.parse(userData);
      const token = parsed?.token;
     
      const { data } = await axios.post(`${baseURL}/api/createComplaint`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('data is:',data)
      return data;
    } catch (err) {
      console.log("error is:", err.response.data);
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const getComplaintAction = createAsyncThunk(
  "/complaint/get",
  async (booking, { rejectWithValue, getState }) => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const parsed = JSON.parse(userData);
      const token = parsed?.token;

      const { data } = await axios.get(`${baseURL}/api/completeComplaint/${booking}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      console.log("error getting complaints:", err.response.data);
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const cancelComplaintAction = createAsyncThunk(
  "/complaint/cancel",
  async (booking, { rejectWithValue, getState }) => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const parsed = JSON.parse(userData);
      const token = parsed?.token;

      const { data } = await axios.put(`${baseURL}/api/cancelComplaint/${booking}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      console.log("error cancelling complaint:", err.response.data);
      return rejectWithValue(err?.response?.data);
    }
  }
);

const complaintSlice = createSlice({
  name: "complaint",
  initialState,
  extraReducers: (builder) => {
   
    builder.addCase(createComplaintAction.pending, (state, action) => {
      state.cLoading = true;
    });
    builder.addCase(createComplaintAction.fulfilled, (state, action) => {
      state.cComplaint = action.payload;
      state.cLoading = false;
      state.cError = null;
    });
    builder.addCase(createComplaintAction.rejected, (state, action) => {
      state.cError = action.payload;
      state.cLoading = false;
    });
    
    builder.addCase(getComplaintAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getComplaintAction.fulfilled, (state, action) => {
      state.complaint = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getComplaintAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    
    builder.addCase(cancelComplaintAction.pending, (state, action) => {
      state.cancelLoading = true;
    });
    builder.addCase(cancelComplaintAction.fulfilled, (state, action) => {  
      state.cancelComplaint =action.payload;
      state.cancelLoading = false;
      state.cancelError = null;
    });
    builder.addCase(cancelComplaintAction.rejected, (state, action) => {
      state.cancelError = action.payload;
      state.cancelLoading = false;
    });
        
  },
});
//generate reducer
const complaintReducer = complaintSlice.reducer;
export default complaintReducer;
