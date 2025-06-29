
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const SelectedWorks = () => {
   const router=useRouter()
   let allService=useSelector((state)=>state?.services?.allServices)
   allService=allService?allService?.data:[]
   const { category, servicetype } = useLocalSearchParams();
   let selectedservice=allService.find(elem=>elem.servicetype==servicetype)
   let selectedworks=selectedservice.works.filter(elem=>elem.category==category)
   console.log('selected works',selectedworks)
 
  

  

  const renderServiceMan = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => {}}>
      <Image source={{ uri: item.workimageUrl }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    
     
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book Technician</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedworks}
        renderItem={renderServiceMan}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  list: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontWeight: '400',
    fontSize:18
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1e90ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default SelectedWorks;