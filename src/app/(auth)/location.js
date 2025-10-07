import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Loader from "../../components/loader";
import ToastMessage from "../../components/toastmessage";

const LocationScreen = () => {
  const [location, setLocation] = useState("");
  const [humanReadableLocation, setHumanReadableLocation] = useState("");
  const [loading, setLoading] = useState(false);
 

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to fetch your location automatically. Please enter it manually."
        );
      
        setLoading(false);
        return;
      }

      let locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = locationResult.coords;
      console.log("Coordinates:", latitude, longitude);

      let addressResponse = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      console.log("Address response:", addressResponse);

      if (addressResponse.length > 0) {
        const { city, region, country, district, street } = addressResponse[0];
        const addressParts = [street, district, city, region, country].filter(
          (part) => part
        );
        const formattedAddress =
        addressParts.length > 0 ? addressParts.join(", ") : "Unknown Address";
        setHumanReadableLocation(formattedAddress);
        setLocation(`${latitude},${longitude}`);
        ToastMessage('success','Location','Fetched location successfully')
      } else {
        setHumanReadableLocation("Address not found");
        setLocation(`${latitude},${longitude}`);
         ToastMessage('error','Location','address not found')
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      ToastMessage('error','Location','Error fetching location')
      setManualInput(true);
    } finally {
      setLoading(false);
    }
  };
  const handleNext=()=>{
   router.replace({
      pathname: "userType",
      params: {
        humanReadableLocation,
        location,
      },
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4626f9" barStyle="light-content" />
      
      {loading ? (
        <Loader />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <MaterialIcons name="location-pin" size={24} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Enable Fetch Location</Text>
          </TouchableOpacity>

          {humanReadableLocation&&<TouchableOpacity style={styles.button2} onPress={handleNext}>
           <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>}

         
         
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  head: {
    marginTop: 60,
    fontSize: 22,
    marginBottom: 30,
    fontWeight: "500",
    color: "#333",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "rgba(231, 231, 12, 1)",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop:40
  },
  button2: {
   
    backgroundColor: "rgba(245, 223, 27, 1)",
    borderRadius: 8,
    paddingHorizontal: 60,
    paddingVertical:12,
    marginTop:20
   
  },
  icon: {
    marginRight: 10, // Increased spacing for better balance
  },
  buttonText: {
    fontSize: 20, // Slightly reduced for better fit
    color: "#fff",
    fontWeight: "600",
  },
  manualInputLabel: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    marginTop: 20,
    color: "#333",
  },
});

export default LocationScreen;