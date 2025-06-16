import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const Booking = () => {
    return(
          <View style={styles.container}>
            
              <Text style={styles.head}>Your Wallet Have only</Text>
              <Text  style={{color:"green",fontWeight:"bold"}}> 500 Inr</Text>
        
             
              <TouchableOpacity
                style={styles.button}
              >
                <Text style={{ fontSize: 23, color: "white" }} onPress={()=>router.push('servicType')}>Add Money</Text>
              </TouchableOpacity>
            </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
   
  },
 
  button: {
    backgroundColor: "#ffe003",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop:10
   
  },
  head: {
    marginTop: 18,
    fontSize: 22,
    marginBottom: 5,
    fontWeight: "500",
  },
});



export default Booking;