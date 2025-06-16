import { AntDesign, Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Avatar } from '@kolking/react-native-avatar';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react"; // important
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const badgeProps = {
  size: 50,
  radius: 5,
  position: 'top-left',
};

const UserDetail = () => {
  const [walletHistoryOpen, setWalletHistoryOpen] = useState(false);  // 👈 add this

  let data = [{ department: "Electrican" }, { department: "Plumber" }];


  const handleLogout=async()=>{
    try{
    await AsyncStorage.removeItem('user')
    router.replace('(auth)')
    }
    catch(err){
      console.log('error')
    }
  }

  return (
    <View style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcome}>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Avatar
            size={50}
            name="Avishay Bar"
            badge="✓"
            badgeProps={{
              position: 'top-left',
              size: 12,
              backgroundColor: 'green',
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Welcome To Abdul Kadir</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>Your Wallet only have 500</Text>
        </View>
      </View>

      {/* Wallet Section */}
      <View style={styles.section}>
        <Text style={styles.head}>Wallet</Text>

        
        <TouchableOpacity onPress={()=>router.push('wallet')}>
        <View style={styles.subsection}>
          <FontAwesome5 name="rupee-sign" size={20} color="#bfb9e4" />
          <Text style={styles.text}>Wallet</Text>
          <Feather 
              name= "chevron-down"
              size={20} 
              color="black" 
              style={{ marginLeft: 'auto' }} 
            />
        </View>
        </TouchableOpacity>

        {/* Wallet History with Arrow */}
        <TouchableOpacity onPress={() => router.push('history')}>
          <View style={styles.subsection}>
            <FontAwesome5 name="history" size={20} color="#bfb9e4" />
            <Text style={styles.text}>Wallet History</Text>
            <Feather 
              name= "chevron-down"
              size={20} 
              color="black" 
              style={{ marginLeft: 'auto' }} 
            />
          </View>
        </TouchableOpacity>

        
      </View>

      {/* Profession Section */}
      <View style={styles.section}>
        <Text style={styles.head}>Your Profession</Text>
        {data.map((elem) => (
          <View key={elem.department} style={styles.subsection}>
            <FontAwesome5 name="wallet" size={20} color="#bfb9e4" />
            <Text style={styles.text}>{elem.department}</Text>
          </View>
        ))}
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
  head: { fontSize: 20, fontWeight: "500", marginBottom: 5 },
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: { marginLeft: 10 },
  button: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    margin: 10,
    borderWidth: 1,
   borderColor: "rgba(128,128,128,0.3)",
  }
});

export default UserDetail;
