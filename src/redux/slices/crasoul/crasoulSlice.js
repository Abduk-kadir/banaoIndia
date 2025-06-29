import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";
const initialState = {
 
  loading:false,
  error:null,
  allCrasoul:null,
  
};

export const getCrasoulAction = createAsyncThunk("/crasoul/get",async ({}, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log('get crasoul action is called')
      const { data } = await axios.get(
        `${baseURL}/api/crasouls`,
       
      );
    
      return data;
      
    } catch (err) {
      console.log("error is:", err.response.data);
      return rejectWithValue(err?.response?.data);
    }
  }
);

const crasoulSlice = createSlice({
  name: "carsoul",
  initialState,
  extraReducers: (builder) => {
   
    builder.addCase(getCrasoulAction.pending, (state, action) => {
        
         state.loading=true
        });
        builder.addCase(getCrasoulAction.fulfilled, (state, action) => {
        
          state.allCrasoul=action.payload;
          state.loading = false;
          state.error = null;
        });
        builder.addCase(getCrasoulAction.rejected, (state, action) => {
          state.error = action.payload;
          state.loading = false;
        });


   

  },
});
//generate reducer
const crasoulReducer=crasoulSlice.reducer;
export default crasoulReducer;
