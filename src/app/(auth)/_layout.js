
import { Stack } from 'expo-router';


export default function AuthLayout() {
  

  return (
     
      <Stack>
        <Stack.Screen
        options={{
       title: "Thank you for choosing  us ",
       headerStyle:{backgroundColor:"#4626f9"},
       headerTintColor:"white"
       
       }}
        name="index"/>
         <Stack.Screen
        options={{
       title: "Otp ",
       headerStyle:{backgroundColor:"#4626f9"},
       headerTintColor:"white"
       
       }}
        name="otp"/>
        <Stack.Screen
        options={{
       title: "Your Detail ",
       headerStyle:{backgroundColor:"#4626f9"},
       headerTintColor:"white"
       
       }}
        name="detailCustomer"/>
        <Stack.Screen
        options={{
       title: "Select user type ",
       headerStyle:{backgroundColor:"#4626f9"},
       headerTintColor:"white"
       
       }}
        name="userType"/>
       
      </Stack>
     
    
   
  );
}
