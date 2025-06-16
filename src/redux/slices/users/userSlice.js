import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";
const initialState={
    loading:false,
    error:null,
    user:null,
    gLoading:false,
    gUser:null,
    gError:null
}
export const createUserAction=createAsyncThunk('/user/create',async({email,name,location},{rejectWithValue,getState,dispatch})=>{
       try{
         console.log('user create action is called')
         const {data}=await axios.post(`${baseURL}/api/createcustomer`,{name,email,location})
         console.log('data is:',data)
         await AsyncStorage.setItem('user',JSON.stringify(data.data))
         return data
       }
       catch(err){
        console.log('error is:',err.response.data)
        return rejectWithValue(err?.response?.data)

       }

})

export const getAUserAction=createAsyncThunk('/user/get',async({email},{rejectWithValue,getState,dispatch})=>{
       try{
         console.log('get a user  action is called')
         console.log('email is:',email)
         const {data}=await axios.get(`${baseURL}/api/customer/${email}`)
         console.log('data is:',data)
         await AsyncStorage.setItem('user',JSON.stringify(data.data))
         return data
       }
       catch(err){
        console.log('error is:',err.response.data)
        return rejectWithValue(err?.response?.data)

       }

})

const userSlice=createSlice({
     name:"user",
     initialState,
     extraReducers:(builder)=>{
        builder.addCase(createUserAction.pending,(state,action)=>{
         
            state.loading=true;
        });
        builder.addCase(createUserAction.fulfilled,(state,action)=>{
            state.user=action.payload
            state.loading=false;
        });
        builder.addCase(createUserAction.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false;
           
        });

         builder.addCase(getAUserAction.pending,(state,action)=>{
            state.gLoading=true;
        });
        builder.addCase(getAUserAction.fulfilled,(state,action)=>{
            state.gUser=action.payload
            state.gLoading=false;
        });
        builder.addCase(getAUserAction.rejected,(state,action)=>{
            state.gError=action.payload
            state.gLoading=false;
           
        });

        


     }
   
})
//generate reducer
const userReducer=userSlice.reducer
export default userReducer

