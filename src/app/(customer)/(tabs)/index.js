import { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ServiceModal from '../../../components/customerComponent/modal';
const width = Dimensions.get('window').width;
const numColumns = 3;
const containerPadding = 10;
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - containerPadding * 2) / numColumns;

const Home = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selecteddata, setSelectedData] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log('my home is rendering')
  console.log('index',currentIndex)
  const toggleModal = (item) => {
    setSelectedData(item)
    setModalVisible(!isModalVisible);
  
  };
 
  const services = [
    { id: '1', department: 'Ac & Appliance',workType:[{name:"pipe fitting",image:""},{name:"fan fitting",image:""},{name:"washing maching",image:""},{name:"washing maching",image:""}], image: 'https://via.placeholder.com/50' },
    { id: '2', department: 'Electrician', image: 'https://via.placeholder.com/50',workType:[{name:"pipe fitting",image:""},{name:"fan fitting",image:""},{name:"washing maching",image:""},{name:"washing maching",image:""}] },
    { id: '3', department: 'Plumber', image: 'https://via.placeholder.com/50',workType:[{name:"pipe fitting",image:""},{name:"fan fitting",image:""},{name:"washing maching",image:""},{name:"washing maching",image:""}] },
    { id: '4', department: 'Carpenter', image: 'https://via.placeholder.com/50',workType:[{name:"pipe fitting",image:""},{name:"fan fitting",image:""},{name:"washing maching",image:""},{name:"washing maching",image:""}] },
    { id: '5', department: 'Home Cleaning', image: 'https://via.placeholder.com/50',workType:[{name:"pipe fitting",image:""},{name:"fan fitting",image:""},{name:"washing maching",image:""},{name:"washing maching",image:""}] },
    { id: '6', department: 'Car Mechanic', image: 'https://via.placeholder.com/50',workType:[{name:"pipe fitting",image:""},{name:"fan fitting",image:""},{name:"washing maching",image:""},{name:"washing maching",image:""}] },
  ];
  const carouselData = ['Item 1', 'Item 2', 'Item 3'];
 // Data for the outer FlatList (single item to hold all content)
  const outerData = [{ id: 'main' }];

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity  onPress={()=>{ toggleModal(item)}}>
    <View style={styles.itemContainer}>
      
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text>{item.department}</Text>
     
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
        data={carouselData}
        scrollAnimationDuration={2000}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity>
            <Text>{item}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.pagination}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Provided Services Section */}
      <Text style={styles.head}>Provided Services</Text>
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
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
});

export default Home;