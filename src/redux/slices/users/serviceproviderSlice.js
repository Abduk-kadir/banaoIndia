import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";
const initialState={
    loading:false,
    error:null,
    serviceProvider:null,
    nearestLoading:false,
    nearestError:null,
    nearestServiceProvider:null
   
}
export const createServiceProviderAction=createAsyncThunk('/serviceProvider/create',async({name,email,location,selectedId,photoUri},{rejectWithValue,getState,dispatch})=>{
       try{
      console.log('service provider action is called')
     
       const formData = new FormData();
       formData.append("name", name);
       formData.append("email", email);
       formData.append('location',location)
       formData.append('id',selectedId)
       if (photoUri) {
       formData.append("image", {
       uri: photoUri,
       type: "image/jpeg",  // you can detect mime if needed
       name: photoUri.split("/").pop(), // extract filename from path
           });
        }

       const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          },
      };
     
        const {data}=await axios.post(`${baseURL}/api/createserviceprovider`,formData,config)
        console.log('data is:',data)
       // await AsyncStorage.setItem('user',JSON.stringify(data.data))
        return data
       }
       catch(err){
        console.log('error is:',err.response.data)
        return rejectWithValue(err?.response?.data)

       }

})

export const getNearestServiceProviderAction=createAsyncThunk('/serviceProvider/nearest',async({ longitude,latitude,servicetype},{rejectWithValue,getState,dispatch})=>{
       try{
         console.log('nearest Service provider is called')
         console.log(longitude,latitude,servicetype)
         const {data}=await axios.get(`${baseURL}/api/nearestServiceProvider/${longitude}/${latitude}/${servicetype}`)
         console.log('service provider are:',data)
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
            state.error=null
          
        });
        builder.addCase(createServiceProviderAction.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false;
           
        });
        builder.addCase(getNearestServiceProviderAction.pending,(state,action)=>{
         
            state.nearestLoading=true;
        });
        builder.addCase(getNearestServiceProviderAction.fulfilled,(state,action)=>{
            state.nearestServiceProvider=action.payload
            state.nearestLoading=false;
            state.nearestError=null
          
        });
        builder.addCase(getNearestServiceProviderAction.rejected,(state,action)=>{
            state.error=action.payload
            state.nearestLoading=false;
           
        });


     }
   
})
//generate reducer
const serviceProviderReducer=serviceProviderSlice.reducer
export default serviceProviderReducer

