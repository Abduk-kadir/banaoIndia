import { router, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UserType = () => {
  const { humanReadableLocation, location } = useLocalSearchParams();
  console.log(humanReadableLocation, location);
  console.log("user type");
  const handleSubmit = (role) => {
    const params = { humanReadableLocation, location }; // Data to pass
    if (role === "customer") {
      router.replace({
        pathname: "detailCustomer",
        params,
      });
    } else {
      router.replace({
        pathname: "detailServiceprovider",
        params,
      });
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
      >
        <Text style={{ fontSize: 23, color: "white" }}>Customer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sbutton}
        onPress={() => handleSubmit("serviceprovider")}
      >
        <Text style={{ fontSize: 23, color: "white" }}>Service Provider</Text>
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
  },
  head: {
    marginTop: 40,
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "500",
  },
});
export default UserType;
