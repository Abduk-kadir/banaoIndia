import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { getNearestServiceProviderAction } from '../../redux/slices/users/serviceproviderSlice';

const ServiceManBooking = () => {
  const dispatch=useDispatch()
  const {servicetype,category,name}=useLocalSearchParams()
  const loading=useSelector((state)=>state?.serviceProviders?.nearestLoading)
  const nearestServiceProviders=useSelector((state)=>state?.serviceProviders?.nearestServiceProvider?.providers)
  //console.log(servicetype,category,name)
  

   useEffect(()=>{
    let latitude,longitude;
    const getUser=async()=>{
      try{
      let user=await AsyncStorage.getItem('user')
      let parsedUser=user?JSON.parse(user):null
      //console.log('user is:',parsedUser)
      let {location}=parsedUser
      let {coordinates}=location
      longitude=coordinates[0]
      latitude=coordinates[1]
     // console.log(latitude,longitude)
      dispatch(getNearestServiceProviderAction({longitude,latitude,servicetype}))
      
      }
      catch(err){
        console.log('error',err)
      }
    }
    getUser()
   },[])


  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Whole number of stars
    const hasHalfStar = rating % 1 >= 0.5; // Check for half star
    console.log('full star:',fullStars)
    console.log('half star',hasHalfStar)

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} name="star" size={16} color="#FFD700" />);
    }

    // Add half star if applicable
    if (hasHalfStar) {
      stars.push(<Icon key="half" name="star-half-full" size={16} color="#FFD700" />);
    }

    // Optionally, add empty stars to complete 5-star scale
    const remainingStars = 5 - Math.ceil(rating);
    console.log('remaing star',remainingStars)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="star-o" size={16} color="#FFD700" />);
    }

    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  const renderServiceMan = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => {}}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      {renderStars(item.rating)}
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={nearestServiceProviders}
        renderItem={renderServiceMan}
        keyExtractor={(item) => item._id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  list: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontWeight: '400',
    fontSize:18
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1e90ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default ServiceManBooking;