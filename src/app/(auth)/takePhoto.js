import Icon from "@expo/vector-icons/Ionicons";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const saveImageToPermanentStorage = async (uri) => {
  console.log('uri is:',uri)
  const filename = uri.split("/").pop(); // Extract file name
  console.log('filename',filename)
  const newPath = FileSystem.documentDirectory + filename; // Save in permanent storage
  console.log('path',newPath)
  try {
    await FileSystem.moveAsync({
      from: uri,
      to: newPath,
    });
    return newPath;
  } catch (error) {
    console.error("Error moving image:", error);
    return null;
  }
};

const TakePhoto = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();
 
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      console.log("accessed denied");
      Alert.alert("Permission Denied", "You need to allow camera access.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
     
      const savedUri = await saveImageToPermanentStorage(result.assets[0].uri);
      if (savedUri) {
        setSelectedImage(savedUri);
        router.push({
          pathname: "/detailServiceprovider",
          params: {role:"customer", photoUri: savedUri },
        });
      }
    }
  };

  const openGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to allow gallery access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const savedUri = await saveImageToPermanentStorage(result.assets[0].uri);
      if (savedUri) {
        setSelectedImage(savedUri);
        router.push({
          pathname: "/userDetail",
          params: {role:"customer" ,photoUri: savedUri },
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Icon name="camera" size={60} color="#bfb9e4" />
        <Text style={{ fontSize: 16, paddingLeft: 10, color: "gray" }}>
          {" "}
          Take a photo from Camera
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openGallery}>
        <MaterialIcon name="photo-library" size={60} color="#bfb9e4" />
        <Text style={{ fontSize: 16, paddingLeft: 10, color: "gray" }}>
          Select photo from galary
        </Text>
      </TouchableOpacity>
      <View>
       {/* selectedImage?<Image
          source={{ uri: selectedImage }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 1,
            borderColor: "#bfb9e4",
          }}
          onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
        />:
        <Text>no image selected</Text>
       */}     
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
 
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#bfb9e4",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
export default TakePhoto;
