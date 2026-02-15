import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { Avatar } from "@kolking/react-native-avatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react"; // important
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
const badgeProps = {
  size: 50,
  radius: 5,
  position: "top-left",
};

const ServiceProviderDetail = () => {
  const [walletHistoryOpen, setWalletHistoryOpen] = useState(false); // 👈 add this
  const serviceProvider = useSelector(
    (state) => state?.serviceProviders?.getServiceProvider?.data,
  );
  let wallet = serviceProvider?.wallet;
  let name = serviceProvider?.name;
  let work = serviceProvider?.work;
  let sevicephotourl = serviceProvider?.photo;
  let servicetype = serviceProvider?.servicetype;
  console.log("service provider is:", serviceProvider);
  let data = [{ department: "Electrican" }, { department: "Plumber" }];

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      router.replace("(auth)");
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <View style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcome}>
        <View style={{ flexDirection: "row", marginBottom: 10, marginTop: 5 }}>
          <Avatar
            size={50}
            source={sevicephotourl ? { uri: sevicephotourl } : undefined}
            name={name || "Service Provider"} // fallback to initials
            badge="✓"
            badgeProps={{
              position: "top-left",
              size: 12,
              backgroundColor: "green",
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20 }}>
            Welcome to
            <Text style={{ color: "green", fontWeight: "600" }}>
              {"  " + name}
            </Text>
          </Text>
          <Text style={{ fontSize: 20 }}>
            Your wallet have only
            <Text style={{ color: "green", fontWeight: "600" }}>
              {"  " + wallet}
            </Text>
          </Text>
        </View>
      </View>

      {/* Profession Section */}
      <View style={styles.section}>
        <Text style={styles.head}>Your Profession</Text>

        <View style={styles.subsection}>
          <FontAwesome5 name="wallet" size={25} color="#bfb9e4" />
          <Text style={styles.text}>{servicetype}</Text>
        </View>
      </View>

      {/* Account Setting Section */}
      <View style={styles.section}>
        <Text style={styles.head}>Account Setting</Text>

        <View style={styles.subsection}>
          <AntDesign name="user" size={20} color="#bfb9e4" />
          <Text style={styles.text}>Edit Profile</Text>
        </View>

        <View style={styles.subsection}>
          <Entypo name="language" size={20} color="#bfb9e4" />
          <Text style={styles.text}>Select Language</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={{ fontSize: 20, color: "blue" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  head: { fontSize: 23, fontWeight: "700", marginBottom: 5 },
  welcome: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#e4eee4",
    padding: 10,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 5,
    backgroundColor: "white",
    padding: 10,
  },
  subsection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text: { marginLeft: 10, fontSize: 20, fontWeight: "400" },
  button: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "rgba(128,128,128,0.3)",
  },
});

export default ServiceProviderDetail;
