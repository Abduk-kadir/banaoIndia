import Icon from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const DetailServiceProvider = () => {
  const {photoUri } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [image, setSelectedPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [showErrors, setShowErrors] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (photoUri) {
      setSelectedPhoto(photoUri); // Decode the URI properly
    }
  }, [photoUri]);
 

  const handleNext = () => {

    router.push({
       pathname: '/profession',
       params: {
         photoUri: image,
         name: name,
         location: location,
        
       }
     });
  };
   const validateForm = () => {
    const hasImage = !!image;
    const hasName = !!name;
    const hasLocation = !!location;
    if (!hasImage || !hasName || !hasLocation) {
      setShowErrors(true);
      return false;
    }
    setShowErrors(false);
    return true;
  };
  const onPressNext = () => {
    if (validateForm()) {
      handleNext();
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.navigate("takePhoto")}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#bfb9e4",
                  }}
                  onError={(e) =>
                    console.log("Image load error:", e.nativeEvent.error)
                  }
                />
              ) : (
                <>
                  <Text style={{ color: "#444141a8", fontSize: 18,color:'white' }}>
                    Photo
                  </Text>
                  <Icon name="camera" size={40} color="#bfb9e4" />
                </>
              )}
            </TouchableOpacity>
           {showErrors && !image && <Text style={{color:'red',marginTop:20}}>please enter name</Text>}
          </View>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          {showErrors && !name && <Text style={{color:'red',marginTop:5}}>please enter name</Text>}
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
          {showErrors && !location && <Text style={{color:'red',marginTop:5}}>please enter location</Text>}
          <TouchableOpacity style={styles.button2} onPress={onPressNext}>
            <Text style={{ fontSize: 22 }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
   
   
  },
  formContainer: {
  alignItems: 'center', // centers children horizontally
 
},
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "#bfb9e4",
    alignItems: "center",
    backgroundColor:"black"
  },
 input: {
    fontSize: 16,
    borderWidth: 0.3,
    paddingTop:15,
    paddingBottom:15,
    marginBottom: 20,
    borderRadius: 5,
    borderColor: "#bfb9e4",
    width: '80%'
    
  },
  button2: {
    backgroundColor: "#ffe003",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    paddingTop:15,
    paddingBottom:15,
    borderColor: "#bfb9e4",
     borderWidth: 0.3,
    width: '80%'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

 
});
export default DetailServiceProvider;
