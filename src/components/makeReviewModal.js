import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { createReviewAction, resetcreateReview } from '../redux/slices/review/review';
import Loader from './loader';
import ToastMessage from './toastmessage';


const MakeReviewModal = ({ isModalVisible, toggleModal, data }) => {
  const dispatch=useDispatch()
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);
 const loader=useSelector((state)=>state?.reviews?.cLoading);
 const success=useSelector((state)=>state?.reviews?.cReview?.success)
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need permission to access your photos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.mediaTypes,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // Handle submit
  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a star rating');
      return;
    }
    if (!message.trim()) {
      Alert.alert('Error', 'Please write a review message');
      return;
    }

    // Here you would send the review to your backend
   
    let reviewData={ rating, message, photo, user: data?.customer,serviceProvider:data?.serviceProvider};
    console.log('reviewdata:',reviewData)
    dispatch(createReviewAction(reviewData))
  

   
  };

  // Star component
  const StarRating = () => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={40}
              color="#FFD700"
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  useEffect(() => {
  if (success) {
    ToastMessage('success', 'Review submitted successfully');
    toggleModal();
    dispatch(resetcreateReview({}))
  
  }

 
}, [success]);

  return (
    <>
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      style={styles.modalWrapper}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Leave a Review</Text>
          <Text style={styles.subtitle}>for {data?.servicetype || 'Service'}</Text>

          {/* Star Rating */}
          <View style={styles.ratingSection}>
            <Text style={styles.label}>Your Rating</Text>
            <StarRating />
            <Text style={styles.ratingText}>
              {rating > 0 ? `${rating} out of 5 stars` : 'Tap to rate'}
            </Text>
          </View>

          {/* Review Message */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Your Review</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Share your experience..."
              multiline
              numberOfLines={5}
              value={message}
              onChangeText={setMessage}
              textAlignVertical="top"
            />
          </View>

          {/* Photo Upload */}
          <View style={styles.photoSection}>
            <Text style={styles.label}>Add Photo (Optional)</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Ionicons name="camera-outline" size={24} color="#007AFF" />
              <Text style={styles.uploadText}>
                {photo ? 'Change Photo' : 'Upload Photo'}
              </Text>
            </TouchableOpacity>

            {photo && (
              <View style={styles.photoPreview}>
                <Image source={{ uri: photo }} style={styles.previewImage} />
                <TouchableOpacity
                  style={styles.removePhoto}
                  onPress={() => setPhoto(null)}
                >
                  <Ionicons name="close-circle" size={28} color="red" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {
          loader?<Loader/>:<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Review</Text>
          </TouchableOpacity>
          }

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={toggleModal}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    justifyContent: 'center',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    maxHeight: '85%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  ratingSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  star: {
    marginHorizontal: 5,
  },
  ratingText: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  inputSection: {
    marginVertical: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 120,
  },
  photoSection: {
    marginVertical: 15,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  uploadText: {
    color: '#007AFF',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
  photoPreview: {
    position: 'relative',
    marginTop: 15,
    alignSelf: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  removePhoto: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 14,
    alignItems: 'center',
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
  },
});

export default MakeReviewModal;