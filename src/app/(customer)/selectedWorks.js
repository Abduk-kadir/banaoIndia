
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
const width = Dimensions.get('window').width;

const SelectedWorks = () => {
   const router=useRouter()
   let allService=useSelector((state)=>state?.services?.allServices)
   allService=allService?allService?.data:[]
   const { category, servicetype,id } = useLocalSearchParams();
   let selectedservice=allService.find(elem=>elem.servicetype==servicetype)
   let selectedworks=selectedservice?.works.filter(elem=>elem.category==category)
  // console.log('selected works',selectedworks)
  // console.log('id:',id)
 
  const renderServiceMan = ({ item }) => (
   <View style={styles.card}>
  <Image source={{ uri: item.workimageUrl }} style={styles.image} />
  <View style={styles.textContainer}>
    <Text style={styles.tittle} >{item.name}</Text>
    <Text style={styles.description}>{item.description}</Text>
    <TouchableOpacity style={styles.button} onPress={()=>booktechnician(item.name)}>
      <Text style={styles.buttonText}>Book Technician</Text>
    </TouchableOpacity>
  </View>
</View>
  );

  const booktechnician=(name)=>{
    console.log('book technician is called')
    console.log('name of work',name)
    router.push({
      pathname:"servicemanBooking",
      params:{servicetype,category,name}
    })
  }

  return (
    <View style={styles.container}>
       <Text style={styles.heading} >{category} services</Text>
      <FlatList
        data={selectedworks}
        renderItem={renderServiceMan}
        keyExtractor={(item) => item._id}
        numColumns={1}
        contentContainerStyle={styles.list}
        //columnWrapperStyle={styles.row}
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
    padding:5,
  },
  heading:{
  padding:5,
  fontWeight: 'bold',
  fontSize: 18,
  flexWrap: 'wrap',
  marginTop:10,
  marginBottom:10

  },
  textContainer: {
  flex: 1,
  marginLeft: 10,
  justifyContent: 'center',
 
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection:'row'
  },
  image: {
    width: width/2-20,
    height: 100,
    resizeMode:'cover',
    borderRadius:10
  },
  tittle: {
  fontWeight: 'bold',
  fontSize: 16,
  flexWrap: 'wrap',
  },
  description:{
    marginBottom:5,
    marginTop:2,
  },
 
   button: {
    backgroundColor: '#f1eaea',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
    
  },
  buttonText: {
    color: '#d78fd7',
  },
});

export default SelectedWorks;