import { useEffect, useRef, useState } from 'react';
import {
  Alert,
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
import { completeComplaintAction } from '../redux/slices/complaint/complaint';
import { emailVerifyAction, enterEmailAction } from '../redux/slices/email/emailSlice';
import Loader from './loader';


const ShowComplain = ({ isModalVisible, toggleModal, data }) => {
  const dispatch=useDispatch()
 const loader=useSelector((state)=>state?.complaints?.cLoading);
 const success=useSelector((state)=>state?.complaints?.cComplaint?.success)     // For Send OTP input
 const emailLoading = useSelector((state) => state?.emails?.emailLoading);
 const loading = useSelector((state) => state.emails.verifyLoading);
 const verifystatus = useSelector((state) => state?.emails?.verifyData?.success);
 const completeComplainSuccess=useSelector((state)=>state?.complaints?.complaint?.success)
 const completeComplainLoading=useSelector((state)=>state?.complaints?.loading)
  const [otp, setOtpCode] = useState('');
 const isVerifyRef = useRef(false);
 let {text}=data
 console.log('text is:',text)
 
  const handleSendOtp = async() => {
      let {email}=data
     const result = await dispatch(enterEmailAction({ email }));
     if (result.meta.requestStatus === 'fulfilled') {
       Alert.alert('Success', 'OTP is sent to customer');
     } else {
       Alert.alert('error', 'something went wrong');
     }
   };
  const handleVerifyOtp = async() => {
    let {email}=data
     console.log(email,otp)
     const result = await dispatch(emailVerifyAction({ email, otp}));
     if (result.meta.requestStatus === 'fulfilled') {

       isVerifyRef.current=true
       Alert.alert('Success', 'otp is varified');
     } else {
       Alert.alert('error', 'something went wrong');
     }
  };

  // Handle submit
   const handleSubmit = () => {
    if(text=='Complete'){
      
       
       if (!isVerifyRef.current) {
       Alert.alert('Error', 'Please ask for verification code from customer');
       return;
     }
     dispatch(completeComplaintAction({booking:data?.booking}))

    }
    

   };

  useEffect(() => {
  console.log('success or not',completeComplainSuccess)
  if (completeComplainSuccess) {
  
   toggleModal();
  
  }

 
}, [completeComplainSuccess]);
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
                value={data?.email}
                
                keyboardType="default"
              />
              {emailLoading?<Loader/>:<TouchableOpacity style={styles.otpButton} onPress={handleSendOtp}>
                <Text style={styles.otpButtonText}>Send OTP</Text>
              </TouchableOpacity>}

            </View>

            {/* Verify OTP Row */}
            <View style={styles.otpRow}>
              <TextInput
                style={styles.otpInput}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtpCode} 
                keyboardType="numeric"
                maxLength={6}
               
              />
              {loading?<Loader/>:<TouchableOpacity style={styles.otpButton} onPress={handleVerifyOtp}>
                <Text style={styles.otpButtonText}>Verify OTP</Text>
              </TouchableOpacity>}
            </View>
          </View>
           } 
          
            

          {
          completeComplainLoading?<Loader/>:<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
    marginVertical: 5,
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
    marginVertical: 5,
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