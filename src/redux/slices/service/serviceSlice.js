import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";
const initialState = {
 
  gLoading:false,
  gError:null,
  allServices:null,
  
 
};

export const getServiceAction = createAsyncThunk("/service/get",async ({}, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log('get secvice action is called')
      const { data } = await axios.get(
        `${baseURL}/api/services`,
      
      );
    
      return data;
      
    } catch (err) {
      console.log("error is:", err?.response?.data);
      return rejectWithValue(err?.response?.data);
    }
  }
);





export const resetService = createAsyncThunk("/service/reset",async ({}, { rejectWithValue, getState, dispatch }) => {
     return {}
  }
);


const serviceSlice = createSlice({
  name: "service",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getServiceAction.pending, (state, action) => {
        
         state.gLoading=true
        });
        builder.addCase(getServiceAction.fulfilled, (state, action) => {
          state.allServices=action.payload;
          state.gLoading = false;
          state.gError = null;
        });
        builder.addCase(getServiceAction.rejected, (state, action) => {
          state.gError = action.payload;
          state.gLoading = false;
        });


   

    
  },
});
//generate reducer
const serviceReducer=serviceSlice.reducer;
export default serviceReducer;
