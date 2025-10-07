import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader";
import ToastMessage from "../../components/toastmessage";
import { createUserAction } from "../../redux/slices/users/userSlice";

const UserDetail = () => {
  const dispatch = useDispatch();
  const { humanReadableLocation,location} = useLocalSearchParams();
  const success = useSelector((state) => state?.users?.gUser?.success);
  const cSuccess=useSelector((state)=>state?.users?.user?.success)
  const loading=useSelector((state)=>state?.users?.loading)
  const nameError=useSelector((state)=>state?.users?.error?.message?.name)
  const locationError=useSelector((state)=>state?.users?.error?.message?.location)
  const email = useSelector((state) => state.emails.email.data);
  console.log("success is *************:", success);
  const [name, setName] = useState("");
  
  const handleSubmit = async () => {
  let result = await dispatch(createUserAction({ email, name, location }));
  console.log("check****", createUserAction.fulfilled.match(result));

  if (createUserAction.fulfilled.match(result)) {
    ToastMessage("success", "Welcome", "solve your problem with us");
    router.replace("(customer)");
  } else {
    console.log("error");
  }
};
 
  

  return (
    <View style={styles.container}>
      {loading?<Loader/>:(<><TextInput
        style={styles.input}
        placeholder="Enter Name   "
        value={name}
        onChangeText={setName}
      />
       {nameError&&<Text style={{color:'red',marginTop:20}}>{nameError}</Text>}
     
       {locationError&&<Text style={{color:'red',marginTop:20}}>{locationError}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ fontSize: 23, color: "white" }}>Submit</Text>
      </TouchableOpacity>
      </>)
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
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 20,
    borderRadius: 5,
    borderColor: "#bfb9e4",
    paddingHorizontal: 70,
  },
  button: {
    backgroundColor: "#ffe003",
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    alignItems: "center",
    paddingHorizontal: 80,
  },
  head: {
    marginTop: 40,
    fontSize: 22,
    marginBottom: 30,
    fontWeight: "500",
  },
});
export default UserDetail;
