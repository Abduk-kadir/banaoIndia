import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";
const initialState={
    loading:false,
    error:null,
    serviceProvider:null,
   
}
export const createServiceProviderAction=createAsyncThunk('/serviceProvider/create',async({email,name,location,id,image},{rejectWithValue,getState,dispatch})=>{
       try{
      console.log('service Provider create action is called')

       const formData = new FormData();
       formData.append("name", name);
       formData.append("email", email);
       formData.append('location',location)
       formData.append('id',id)
       formData.append("image", image); // Assuming photo is a File object
       const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          },
      };
         const {data}=await axios.post(`${baseURL}/api/createserviceprovider`,formData,config)
         console.log('data is:',data)
        /// await AsyncStorage.setItem('user',JSON.stringify(data.data))
         return data
       }
       catch(err){
        console.log('error is:',err.response.data)
        return rejectWithValue(err?.response?.data)

       }

})



const serviceProviderSlice=createSlice({
     name:"serviceProvider",
     initialState,
     extraReducers:(builder)=>{
        builder.addCase(createServiceProviderAction.pending,(state,action)=>{
         
            state.loading=true;
        });
        builder.addCase(createServiceProviderAction.fulfilled,(state,action)=>{
            state.serviceProvider=action.payload
            state.loading=false;
          
        });
        builder.addCase(createServiceProviderAction.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false;
           
        });


     }
   
})
//generate reducer
const serviceProviderReducer=serviceProviderSlice.reducer
export default serviceProviderReducer

