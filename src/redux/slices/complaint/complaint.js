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
};


export const createComplainAction = createAsyncThunk(
  "/complain/create",
  async (
    { booking,complaintText, photo},
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      console.log("create  compain text  action is called");

      const formData = new FormData();
      console.log('booking,',booking),
      console.log('complaint:',complaintText)
      console.log('photo',photo)
      formData.append("booking", booking);
      formData.append("complaintText", complaintText);
      if (photo) {
        formData.append("photo", {
          uri: photo,
          type: "image/jpeg", // you can detect mime if needed
          name: photo.split("/").pop(), // extract filename from path
        });
      }

      const userData = await AsyncStorage.getItem("user");
      const parsed = JSON.parse(userData);
      const token = parsed?.token;
      console.log("token is:", token);
      const { data } = await axios.post(`${baseURL}/api/createComplaint`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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



const complaintSlice = createSlice({
  name: "review",
  initialState,
  extraReducers: (builder) => {
   
    builder.addCase(createReviewAction.pending, (state, action) => {
      state.cLoading = true;
    });
    builder.addCase(createReviewAction.fulfilled, (state, action) => {
      state.cComplaint = action.payload;
      state.cLoading = false;
      state.cError = null;
    });
    builder.addCase(createReviewAction.rejected, (state, action) => {
      state.cError = action.payload;
      state.cLoading = false;
    });
    
        
  },
});
//generate reducer
const complaintReducer = complaintSlice.reducer;
export default complaintReducer;
