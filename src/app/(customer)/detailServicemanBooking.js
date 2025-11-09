import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getreviewAction } from "../../redux/slices/review/review";

const DetailServicemanBooking = () => {
 const dispatch=useDispatch()
 const { id } = useLocalSearchParams();
  let allService=useSelector((state)=>state?.reviews?.review?.data)
 let loading=useSelector((state)=>state?.reviews)

 useEffect(() => {
  
  dispatch(getreviewAction({id}));
 
}, []); // dependency array


  return (
    <View style={styles.container}>
      {/* Booking Details */}
      <View style={styles.content}>
        <Text style={styles.text}>fjkdghjkfkdhgkjfdhgj</Text>
        <Text style={styles.text}>fjkdghjkfkdhgkjfdhgj</Text>
        <Text style={styles.text}>fjkdghjkfkdhgkjfdhgj</Text>
        <Text style={styles.text}>fjkdghjkfkdhgkjfdhgj</Text>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.beforeButton]}>
          <Text style={styles.beforeButtonText}>Pay After Service</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.afterButton]}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailServicemanBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding:5
  },
  content: {
    flex: 1,
  
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor:"#f5f5f5",
    paddingBottom:10,
    paddingTop:10
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 0
  },
  beforeButton: {
   borderWidth:1,
   borderColor:"#e4576f"
  },
  afterButton: {
    backgroundColor: "#e4576f", // blue
  },
  beforeButtonText:{
   color:"#e4576f",
     fontSize: 16,
    fontWeight: "600",
    

  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    
  },
});
