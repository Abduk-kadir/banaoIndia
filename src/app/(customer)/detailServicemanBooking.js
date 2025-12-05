import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../../components/loader';
import ToastMesaage from '../../components/toastmessage';
import { createBookingAction } from "../../redux/slices/booking/booking";
import { getreviewAction } from "../../redux/slices/review/review";

const DetailServicemanBooking = () => {
  const dispatch = useDispatch();
  const { id, name, category ,servicetype} = useLocalSearchParams();
  const nearestServiceProviders = useSelector((state) => state?.serviceProviders?.nearestServiceProvider?.providers);
 
  const item = nearestServiceProviders?.find(elem => elem._id === id);
  const review = useSelector((state) => state?.reviews?.review?.data);
  console.log('review is:',review)
  const createbookingLoder=useSelector((state)=>state?.bookings?.cLoading);
  const createbookingSuccess=useSelector((state)=>state?.bookings?.cBooking?.success)
  console.log('success is***',createbookingSuccess)
   
  useEffect(() => {
    if (id) {
      dispatch(getreviewAction({ id }));
    }
  }, [id, dispatch]);
  useEffect(()=>{
    if(createbookingSuccess){

     ToastMesaage ('success', 'Booking is successfully done', 'please see in booking section');
     router.replace('(customer)/booking')
    }
     
  },[createbookingSuccess])

  // Safe access
  const selectedWork = item?.works?.find((elem) => elem.name === name);
  const price = selectedWork?.price;
  const payAfterService=()=>{
      const now = new Date();
      let js={status:'confirmed',price:price,work:name,category:category,serviceProvider:id,serviceType:servicetype,bookingDate:now}
     
      dispatch(createBookingAction(js))  
      
   }
  
  return (
    <View style={styles.container}>
      {/* Booking Details */}
      <ScrollView style={styles.content}>
        {/* Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item?.photo || 'https://via.placeholder.com/400x200' }}
            style={styles.image}
           
          />
        </View>

        {/* Details */}
        <View style={styles.detailsContainer}>
          {/* Name */}
          <Text style={styles.name}>{item?.name || 'Unknown'}</Text>

          {/* Category Tag */}
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>

          {/* Service Name */}
          <Text style={styles.serviceName}>{name}</Text>

          {/* Price */}
          <Text style={styles.price}>₹{price || 'N/A'}</Text>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        {createbookingLoder?<Loader/>:(<><TouchableOpacity style={[styles.button, styles.beforeButton]} onPress={payAfterService}>
          <Text style={styles.beforeButtonText}>Pay After Service</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.afterButton]}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
        </>)}
      </View>
    </View>
  );
};

export default DetailServicemanBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginTop:10
  },

  // Image
  imageWrapper: {
    width: '100%',
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    
  },
  image: {
    width: '100%',
    height: '170%', 
    resizeMode: 'cover',
  },

  // Details
  detailsContainer: {
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#e4576f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },
  categoryText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  serviceName: {
    fontSize: 18,
    color: '#444',
    marginBottom: 8,
    fontWeight: '500',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e4576f',
    marginBottom: 20,
  },

  // Buttons
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 6,
  },
  beforeButton: {
    borderWidth: 1.5,
    borderColor: "#e4576f",
  },
  afterButton: {
    backgroundColor: "#e4576f",
  },
  beforeButtonText: {
    color: "#e4576f",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});