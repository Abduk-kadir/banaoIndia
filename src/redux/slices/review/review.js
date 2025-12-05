import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";
const initialState={
    loading:false,
    error:null,
    review:null,
   
}

export const getreviewAction=createAsyncThunk('/review/all',async({id},{rejectWithValue,getState,dispatch})=>{
       try{
      
         console.log('getting review')
         
         const {data}=await axios.get(`${baseURL}/api/review/${id}`)
        
         return data
       }
       catch(err){
        console.log('error is:',err.response.data)
        return rejectWithValue(err?.response?.data)

       }

})


const reviewSlice=createSlice({
     name:"review",
     initialState,
     extraReducers:(builder)=>{
        builder.addCase(getreviewAction.pending,(state,action)=>{
         
            state.loading=true;
        });
        builder.addCase(getreviewAction.fulfilled,(state,action)=>{
            state.review=action.payload
            state.loading=false;
            state.error=null
          
        });
        builder.addCase(getreviewAction.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false;
           
        });
       


     }
   
})
//generate reducer
const reviewReducer=reviewSlice.reducer
export default reviewReducer

