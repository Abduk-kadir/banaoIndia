import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './loader';
import ToastMessage from './toastmessage';


const ShowComplain = ({ isModalVisible, toggleModal, data }) => {
  const dispatch=useDispatch()
 const loader=useSelector((state)=>state?.complaints?.cLoading);
 const success=useSelector((state)=>state?.complaints?.cComplaint?.success)
 const [otpPhone, setOtpPhone] = useState('');       // For Send OTP input
  const [otpCode, setOtpCode] = useState('');
 let {text}=data
 console.log('text is:',text)
 
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);
// const loader=useSelector((state)=>state?.reviews?.cLoading);
// const success=useSelector((state)=>state?.reviews?.cReview?.success)
  const handleSendOtp = () => {
    if (!otpPhone.trim()) {
      ToastMessage('error', 'Please enter phone number or email');
      return;
    }
    // Your API call to send OTP here
    console.log('Sending OTP to:', otpPhone);
    ToastMessage('success', `OTP sent to ${otpPhone}`);
  };
  const handleVerifyOtp = () => {
    if (!otpCode.trim()) {
      ToastMessage('error', 'Please enter the OTP');
      return;
    }
    // Your API call to verify OTP here
    console.log('Verifying OTP:', otpCode);
    ToastMessage('success', 'OTP verified successfully');
  };

  // Handle submit
  const handleSubmit = () => {
    console.log('complain data:',data)
   /* if (!message.trim()) {
      Alert.alert('Error', 'Please write your complain');
      return;
    }*/

    // Here you would send the review to your backend
   
    // let complaintData={booking:data?._id, photo, complainText:message};
   //  dispatch(createComplaintAction(complaintData))
  
   
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
            {text=='Complete'&&<View style={styles.otpSection}>
            <Text style={styles.label}>OTP Verification</Text>

            {/* Send OTP Row */}
            <View style={styles.otpRow}>
              <TextInput
                style={styles.otpInput}
                placeholder="Enter phone/email"
                value={otpPhone}
                onChangeText={setOtpPhone}
                keyboardType="default"
              />
              <TouchableOpacity style={styles.otpButton} onPress={handleSendOtp}>
                <Text style={styles.otpButtonText}>Send OTP</Text>
              </TouchableOpacity>
            </View>

            {/* Verify OTP Row */}
            <View style={styles.otpRow}>
              <TextInput
                style={styles.otpInput}
                placeholder="Enter OTP"
                value={otpCode}
                onChangeText={setOtpCode}
                keyboardType="numeric"
                maxLength={6}
              />
              <TouchableOpacity style={styles.otpButton} onPress={handleVerifyOtp}>
                <Text style={styles.otpButtonText}>Verify OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
           } 
          
            

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
otpSection: {
    marginVertical: 15,
  },
  otpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  otpInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginRight: 10,
  },
  otpButton: {
    backgroundColor: '#f26e62ff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
  },
  otpButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },

  
});

export default ShowComplain;