import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useState } from "react";
import {
    Alert,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Loader from "../../components/loader";

const LocationScreen = () => {
  const [location, setLocation] = useState("");
  const [humanReadableLocation, setHumanReadableLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [manualInput, setManualInput] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to fetch your location automatically. Please enter it manually."
        );
        setManualInput(true);
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
      } else {
        setHumanReadableLocation("Address not found");
        setLocation(`${latitude}, ${longitude}`);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert(
        "Error",
        "Unable to fetch location. Please try again or enter it manually."
      );
      setManualInput(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4626f9" barStyle="light-content" />
      <Text style={styles.head}>Turn on Your Location</Text>

      {loading ? (
        <Loader />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <MaterialIcons name="location-pin" size={24} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Enable Fetch Location</Text>
          </TouchableOpacity>

          {manualInput && (
            <>
              <Text style={styles.manualInputLabel}>
                Enter location manually:
              </Text>
              <TextInput
                style={styles.input}
                value={humanReadableLocation}
                onChangeText={setHumanReadableLocation}
                placeholder="Enter your location"
                placeholderTextColor="#888"
              />
            </>
          )}

          {humanReadableLocation ? (
            <Text style={styles.locationText}>
              Location: {humanReadableLocation}
            </Text>
          ) : null}
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
    marginTop: 40,
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