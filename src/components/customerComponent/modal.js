import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from 'react-native-modal';


const ServiceModal = ({ isModalVisible, toggleModal, data }) => {
  const { works = [] } = data || {};
 
  let allCategories = works.reduce((acc, curr) => {
  if (!acc.find(item => item.category === curr.category)) {
    acc.push(curr);
  }
  return acc;
}, []);
  
  const handlesubmit=(category)=>{
    console.log('category is:',category)
    let selectedWorks=works.filter(elem=>elem.category==category)
   
    toggleModal()
  
    router.push({
  pathname: '/(customer)/selectedWorks',
  params: { category, servicetype: data.servicetype }
});
    
  }
  const renderWorkTypeItem = (item, index) => (
  
    <View key={index} style={styles.workItem}>
        <TouchableOpacity onPress={()=>handlesubmit(item.category)}>
      <Image
        source={{ uri: item.catimageUrl|| 'https://via.placeholder.com/50' }}
        style={styles.image}
      />
      <Text style={styles.workText}>{item.category}</Text>
      </TouchableOpacity>
    </View>
      );

  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        style={styles.modalWrapper}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Home applicances</Text>

          {/* Scrollable content */}
          <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
            <View style={styles.gridContainer}>
              {allCategories.map(renderWorkTypeItem)}
            </View>
          </ScrollView>
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
  scrollArea: {
    flexGrow: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  workItem: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: 20,
   
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 5,
  },
  workText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ServiceModal;
