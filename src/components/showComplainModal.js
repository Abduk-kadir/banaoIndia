import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { createComplaintAction } from '../redux/slices/complaint/complaint';
import Loader from './loader';
import ToastMessage from './toastmessage';


const ShowComplain = ({ isModalVisible, toggleModal, data }) => {
  const dispatch=useDispatch()
 const loader=useSelector((state)=>state?.complaints?.cLoading);
 const success=useSelector((state)=>state?.complaints?.cComplaint?.success)
 let {text}=data
 
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);
// const loader=useSelector((state)=>state?.reviews?.cLoading);
// const success=useSelector((state)=>state?.reviews?.cReview?.success)
  

  // Handle submit
  const handleSubmit = () => {
    console.log('complain data:',data)
    if (!message.trim()) {
      Alert.alert('Error', 'Please write your complain');
      return;
    }

    // Here you would send the review to your backend
   
     let complaintData={booking:data?._id, photo, complainText:message};
     dispatch(createComplaintAction(complaintData))
  
   
  };


  useEffect(() => {
  if (success) {
   ToastMessage('success', 'complain create successfully');
   toggleModal();
  
  }

 
}, [success]);
const renderPhoto = ({ item }) => (
    <View style={styles.photoPreview}>
      <Image source={{ uri: item }} style={styles.previewImage} resizeMode="cover" />
    </View>
  );

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
          <Text style={styles.title}>Complain</Text>
         

         

          {/* Review Message */}
          <View style={styles.inputSection}>
              <Text style={styles.label}>Message</Text>
              <Text style={styles.complainText}>{data?.complainText || 'No message provided'}</Text>
            </View>

          {/* Photo Upload */}
          <View style={styles.photoSection}>
              <Text style={styles.label}>Attached Photos:</Text>
              {data?.photos && data.photos.length > 0 ? (
                <FlatList
                  data={data.photos}
                  renderItem={renderPhoto}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal // Optional: horizontal scroll for multiple images
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingVertical: 10 }}
                />
              ) : (
                <Text style={styles.noPhotoText}>No photos attached</Text>
              )}
            </View>

          {
          loader?<Loader/>:<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>{text}</Text>
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  inputSection: {
    marginVertical: 10,
  },
  complainText: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  
 
  
 photoSection: {
    marginVertical: 15,
  },
  photoPreview: {
    marginRight: 10,
    position: 'relative',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
 noPhotoText: {
    fontSize: 15,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  
  submitButton: {
    backgroundColor: '#f26e62ff',
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

export default ShowComplain;