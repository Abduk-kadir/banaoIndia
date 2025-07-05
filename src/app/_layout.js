import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from '../redux/store/store';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [role,setRole]=useState('')

  useEffect(()=>{
    setTimeout(()=>{
       SplashScreen.hideAsync()
    },1000)

  },[])
   useEffect(()=>{
    const getUser=async()=>{
      try{
      let user=await AsyncStorage.getItem('user')
      let parsedUser=user?JSON.parse(user):null
      console.log('user is:',parsedUser)
      let role=parsedUser?parsedUser.role:''
      setRole(role)
      }
      catch(err){
        console.log('error',err)
      }
    }
    getUser()

  },[])

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }} />
      {role === 'customer' ? (
        <Redirect href="/(customer)" />
      ) : role === 'serviceprovider' ? (
        <Redirect href="/(serviceProvider)" />
      ) : (
        <Redirect href="/(auth)" />
      )}
     <Toast/>
    </Provider>
  );
}
