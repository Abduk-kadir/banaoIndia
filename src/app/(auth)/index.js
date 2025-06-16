import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader";
import ToastMessage from "../../components/toastmessage";
import { enterEmailAction } from "../../redux/slices/email/emailSlice";
const Email = () => {
  const dispatch=useDispatch()
  const loading=useSelector((state)=>state?.emails?.emailLoading)
  const errormessage=useSelector((state)=>state?.emails?.emailError?.message?.email)
  const successMessage=useSelector((state)=>state?.emails?.email?.message)
  const success=useSelector((state)=>state?.emails?.email?.success)
  console.log('loading is:',loading)
  console.log('error message:',errormessage)
  console.log('success message',success)
  const [email,setEmail]=useState("")
  const handleSubmit=()=>{
    dispatch(enterEmailAction({email}))
  }

  useEffect(() => {
  if (success) {
    ToastMessage('success', successMessage, 'please enter otp');
    setTimeout(()=>{
      router.replace("otp");

    },500)
  
  }
 }, [success]);
  return (
    <View style={styles.container}>
       <StatusBar backgroundColor="#4626f9"  barStyle="light-content" />
       {
       loading?<Loader/>:(
        <>
      <Text style={styles.head}>Thank you for choosing us</Text>
      <TextInput
       style={styles.input} 
       placeholder="Enter Email"
       value={email}
       onChangeText={setEmail}
       
       />
       {errormessage&&<Text style={{color:'red',marginBottom:20}}>{errormessage}</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={{ fontSize: 23, color: "white" }}>Submit</Text>
      </TouchableOpacity>
      </>
      
      )
}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
   
  },
  input: {
    fontSize: 16,
    borderWidth: 0.3,
    paddingTop:20,
    paddingBottom:20,
    marginBottom: 20,
    borderRadius: 5,
    borderColor: "#bfb9e4",
    paddingHorizontal:70
  },
  button: {
    backgroundColor: "#ffe003",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    paddingHorizontal:80
  },
  head: {
    marginTop: 40,
    fontSize: 22,
    marginBottom: 30,
    fontWeight: "500",
  },
});
export default Email;
