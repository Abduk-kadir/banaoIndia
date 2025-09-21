import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader';
import ToastMessage from '../../components/toastmessage';
import { getServiceAction } from "../../redux/slices/service/serviceSlice";
import { createServiceProviderAction } from "../../redux/slices/users/serviceproviderSlice";

const Profession = () => {
    const dispatch=useDispatch()
    const {name, photoUri,location } = useLocalSearchParams();
    let allService=useSelector((state)=>state?.services?.allServices)
    const email = useSelector((state) =>state?.emails?.email?.data);
    const loading=useSelector((state)=>state?.serviceProviders?.loading)
    const success=useSelector((state)=>state?.serviceProviders?.serviceProvider?.success)
    const successMessage=useSelector((state)=>state?.serviceProviders?.serviceProvider?.message)
    let data=allService?allService?.data:[]
    data=data.map(elem=>({id:elem._id,label:elem.servicetype}))
   console.log('success is:',success)
   console.log('loading is:',loading)
   //console.log(name, photoUri,location);
  const [selectedId, setSelectedId] = useState();
  
  const handleSubmit=()=>{
    console.log('submit is called')
   dispatch(createServiceProviderAction({name,email,location,selectedId,photoUri}))
  }

useEffect(()=>{
   if (success) {
    ToastMessage('success', successMessage, 'Please set our service price');
    setTimeout(()=>{
     router.replace('(serviceProvider)')

    },500)
    return;
  
  }
  dispatch(getServiceAction({}))
},[success])


  return (
    <View style={styles.container}>
      {
      loading?<Loader/>:(
      <><Text style={styles.head}>Select Your Profession</Text>
      <RadioGroup
        radioButtons={data}
        onPress={setSelectedId}
        selectedId={selectedId}
        containerStyle={styles.radioGroup}
        labelStyle={styles.radioLabel}
      
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      </>)
}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  head: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 20,
    marginTop: 30,
  },
  radioGroup: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    backgroundColor: '#ffe003',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    fontSize: 23,
    color: 'white',
    fontWeight: '500',
  },
});

export default Profession;