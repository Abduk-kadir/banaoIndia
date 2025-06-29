import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useDispatch, useSelector } from 'react-redux';
import ServiceModal from '../../../components/customerComponent/modal';
import { getCrasoulAction } from '../../../redux/slices/crasoul/crasoulSlice';
import { getServiceAction } from '../../../redux/slices/service/serviceSlice';


const width = Dimensions.get('window').width;
const numColumns = 3;
const containerPadding = 10;
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - containerPadding * 2) / numColumns;

const Home = () => {
  const dispatch=useDispatch()
  const [isModalVisible, setModalVisible] = useState(false);
  const [selecteddata, setSelectedData] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);

  let allService=useSelector((state)=>state?.services?.allServices)
  let allCrasoul=useSelector((state)=>state?.crasouls?.allCrasoul)
  allService=allService?allService?.data:[]
  allCrasoul=allCrasoul?allCrasoul?.data:[]
  console.log('carsoul data is:',allCrasoul)
  
  
  const toggleModal = (item) => {
    setSelectedData(item)
    setModalVisible(!isModalVisible);
  
  };

  useEffect(()=>{
  

    const fetchDashboardData = async () => {
      try {
         let result=await Promise.all([
          dispatch(getCrasoulAction({})).unwrap(),
          dispatch(getServiceAction({})).unwrap()
        ]);
        console.log("All dashboard data loaded");
        
      } catch (err) {
        
        console.error("Dashboard loading failed:", err);
      }
    };
    fetchDashboardData();




   
  
  },[])
 
  const services = [
    { id: '1', department: 'Ac & Appliance',workType:[{name:"pipe fitting",image:""},{name:"fan fitting",image:""},{name:"washing maching",image:""},{name:"washing maching",image:""}], image: 'https://via.placeholder.com/50' },
    { id: '2', department: 'Electrician', image: 'https://via.placeholder.com/50',workType:[{name:"pipe fitting",image:""},{name:"fan fitting",image:""},{name:"washing maching",image:""},{name:"washing maching",image:""}] },
    { id: '3', department: 'Plumber', image: 'https://via.placeholder.com/50',workType:[{name:"pipe fitting",image:""},{name:"fan fitting",image:""},{name:"washing maching",image:""},{name:"washing maching",image:""}] },
    { id: '4', department: 'Carpenter', image: 'https://via.placeholder.com/50',workType:[{name:"pipe fitting",image:""},{name:"fan fitting",image:""},{name:"washing maching",image:""},{name:"washing maching",image:""}] },
    { id: '5', department: 'Home Cleaning', image: 'https://via.placeholder.com/50',workType:[{name:"pipe fitting",image:""},{name:"fan fitting",image:""},{name:"washing maching",image:""},{name:"washing maching",image:""}] },
    { id: '6', department: 'Car Mechanic', image: 'https://via.placeholder.com/50',workType:[{name:"pipe fitting",image:""},{name:"fan fitting",image:""},{name:"washing maching",image:""},{name:"washing maching",image:""}] },
  ];
 
 // Data for the outer FlatList (single item to hold all content)
  const outerData = [{ id: 'main' }];

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity  onPress={()=>{ toggleModal(item)}}>
    <View style={styles.itemContainer}>
      
      <Image source={{ uri: item.serviceimageUrl}} style={styles.image} />
      <Text>{item.servicetype}</Text>
     
    </View>
    </TouchableOpacity>
    
  );

  const renderHorizontalServiceItem = ({ item }) => (
    <TouchableOpacity  onPress={()=>{toggleModal(item)}}>
    <View style={styles.horizontalItem}>
      
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text>{item.department}</Text>
      
    </View>
    </TouchableOpacity>
  );
 

  const renderOuterItem = () => (
    <View style={styles.container}>
      {/* Carousel Section */}
      <Carousel
      
        width={width}
        height={170}
        data={allCrasoul}
        scrollAnimationDuration={2000}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.tittle}</Text>
             <Text>{item.description}</Text>
             <TouchableOpacity style={styles.button}>
               <Text style={styles.buttonText}>{item.buttonText}</Text>
             </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.pagination}>
        {allCrasoul.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Provided Services Section */}
      <Text style={styles.head}>Provided Services</Text>
      <FlatList
        data={allService}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item._id}
        numColumns={numColumns}
        scrollEnabled={false} // Disable scrolling to let outer FlatList handle it
      />

      {/* Most Booked Services Section */}
      <Text style={styles.head}>Most Booked Services</Text>
      <FlatList
        data={services}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderHorizontalServiceItem}
      />
    </View>
  );

  return (
    <>
    <FlatList
      data={outerData}
      renderItem={renderOuterItem}
      keyExtractor={(item) => item.id}
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    />
    {/* Render ServiceModal conditionally */}
    {isModalVisible && (
        <ServiceModal isModalVisible={isModalVisible} toggleModal={toggleModal} data={selecteddata}/>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: containerPadding,
    alignItems: 'center',
    marginTop: 10,
  },
  horizontalItem: {
    width: 150,
    height: 180,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
  },
  itemContainer: {
    width: itemWidth - 10,
    marginHorizontal: 5,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 1,
  },
  head: {
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#999',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
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

export default Home;