import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react"; // ← important
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Loader from "../../components/loader";
import ToastMessage from "../../components/toastmessage";
import baseURL from "../../utils/baseUrl";

const UserType = () => {
  const { humanReadableLocation, location } = useLocalSearchParams();
  const email = useSelector((state) => state?.emails?.email?.data);

  console.log("Params:", { humanReadableLocation, location, email });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (role) => {
    if (loading) return;

    const params = { humanReadableLocation, location };

    if (role === "customer") {
      router.replace({
        pathname: "detailCustomer",
        params,
      });
      return;
    }

    // Service Provider flow
    if (!email) {
      Alert.alert("Error", "Email not found. Please login again.");
      ToastMessage("error", "Email not found", "Email is not found");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${baseURL}/api/loginserviceprovider`, {
        email,
      });
      console.log("API Response:", response.data);

      const { success, data } = response.data;
      // adjust key if it's data.isRegistered, data.exists, etc.

      if (success === true) {
        ToastMessage("success", "Welcome", "you are already have account");
        await AsyncStorage.setItem("user", JSON.stringify(data));
        router.replace({
          pathname: "(serviceProvider)",
          params,
        });
      } else {
        // Not registered yet → go to registration/details form
        router.replace({
          pathname: "detailServiceprovider",
          params,
        });
      }
    } catch (err) {
      console.error("Service Provider check failed:", err);

      let errorMessage = "Something went wrong. Please try again.";

      if (err.response) {
        // Server responded with error (400, 401, 500, etc.)
        errorMessage =
          err.response.data?.message || `Server error (${err.response.status})`;
      } else if (err.request) {
        // No response (network issue, timeout)
        errorMessage = "Network error. Please check your internet connection.";
      }

      Alert.alert("Error", errorMessage);

      // Optional: still allow registration even on error (fail-open)
      // router.replace({ pathname: "detailServiceprovider", params });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Please Select User Type</Text>

      <Image
        source={require("../../images/ladder.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmit("customer")}
        disabled={loading}
      >
        <Text style={{ fontSize: 23, color: "white" }}>Customer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.sbutton, loading && { opacity: 0.7 }]}
        onPress={() => handleSubmit("serviceprovider")}
        disabled={loading}
      >
        {loading ? (
          <Loader />
        ) : (
          <Text style={{ fontSize: 23, color: "white" }}>Service Provider</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  image: { width: 300, height: 300, margin: 40 },
  button: {
    backgroundColor: "#dd8f28",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    paddingHorizontal: 80,
    marginBottom: 20,
  },
  sbutton: {
    backgroundColor: "#9a9a54",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    paddingHorizontal: 50,
    marginBottom: 20,
    minWidth: 250,
    justifyContent: "center",
  },
  head: {
    marginTop: 40,
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "500",
  },
});

export default UserType;
