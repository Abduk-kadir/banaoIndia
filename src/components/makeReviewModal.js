import { router } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";
import Modal from 'react-native-modal';


const MakeReviewModal = ({ isModalVisible, toggleModal, data }) => {
 
 
 
  const handlesubmit=(category)=>{
   
   
   
    toggleModal()
  
    router.push({
     pathname: '/(customer)/selectedWorks',
     params: { category, servicetype: data.servicetype,id:data._id }
});
    
  }
  

  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        style={styles.modalWrapper}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Enter name</Text>

        
         
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    justifyContent: 'center',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    maxHeight: '80%', // Prevent modal from taking full height
  },
  
  
  
});

export default MakeReviewModal;
