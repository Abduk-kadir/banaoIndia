import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";
const initialState = {
  loading: false,
  error: null,
  review: null,
  cReview: null,
  cError: null,
  cLoading: false,
};

export const getreviewAction = createAsyncThunk(
  "/review/all",
  async ({ id }, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log("getting review");

      const { data } = await axios.get(`${baseURL}/api/review/${id}`);

      return data;
    } catch (err) {
      console.log("error is:", err.response.data);
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const createReviewAction = createAsyncThunk(
  "/review/create",
  async (
    { rating, message, photo, user, serviceProvider },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      console.log("create  review action is called");

      const formData = new FormData();
      console.log('rating,',rating),
      console.log('message:',message)
      console.log('photo',photo)
      console.log('user',user)
      console.log('serviceProvider',serviceProvider)

      formData.append("message", message);
      formData.append("rating", rating);
      formData.append("serviceProvider", serviceProvider);
      formData.append("user", user);
     
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
      const { data } = await axios.post(`${baseURL}/api/createReview`, formData, {
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

export const resetcreateReview = createAsyncThunk("/createreview/reset",async ({}, { rejectWithValue, getState, dispatch }) => {
     return {}
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getreviewAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getreviewAction.fulfilled, (state, action) => {
      state.review = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getreviewAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(createReviewAction.pending, (state, action) => {
      state.cLoading = true;
    });
    builder.addCase(createReviewAction.fulfilled, (state, action) => {
      state.cReview = action.payload;
      state.cLoading = false;
      state.cError = null;
    });
    builder.addCase(createReviewAction.rejected, (state, action) => {
      state.cError = action.payload;
      state.cLoading = false;
    });
    
          builder.addCase(resetcreateReview.pending, (state, action) => {
          
            state.cReview=null
         
         });
  },
});
//generate reducer
const reviewReducer = reviewSlice.reducer;
export default reviewReducer;
