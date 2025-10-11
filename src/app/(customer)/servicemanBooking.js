import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { getNearestServiceProviderAction } from '../../redux/slices/users/serviceproviderSlice';

const ServiceManBooking = () => {
  const dispatch = useDispatch();
  const { servicetype, category, name } = useLocalSearchParams();
  const loading = useSelector((state) => state?.serviceProviders?.nearestLoading);
  const nearestServiceProviders = useSelector((state) => state?.serviceProviders?.nearestServiceProvider?.providers);

  useEffect(() => {
    let latitude, longitude;
    const getUser = async () => {
      try {
        let user = await AsyncStorage.getItem('user');
        let parsedUser = user ? JSON.parse(user) : null;
        let { location } = parsedUser;
        let { coordinates } = location;
        longitude = coordinates[0];
        latitude = coordinates[1];
        dispatch(getNearestServiceProviderAction({ longitude, latitude, servicetype }));
      } catch (err) {
        console.log('error', err);
      }
    };
    getUser();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} name="star" size={16} color="#FFD700" style={styles.star} />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="star-half-full" size={16} color="#FFD700" style={styles.star} />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="star-o" size={16} color="#FFD700" style={styles.star} />);
    }

    return <View style={styles.starContainer}>{stars}</View>;
  };

  const renderServiceMan = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.starContainer}>{renderStars(item.rating)}</View>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.serviceName}>{name}</Text>
      <Text style={styles.price}>
        Price: ₹{item.works.find((elem) => elem.name === name).price}
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={nearestServiceProviders}
        renderItem={renderServiceMan}
        keyExtractor={(item) => item._id.toString()}
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
    backgroundColor: '#f5f5f5', // Light background for better contrast
  },
  list: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20, // Circular image for better aesthetics
    marginBottom: 10,
  },
  name: {
    fontWeight: '600', // Bolder for emphasis
    fontSize: 18,
    color: '#333', // Darker color for readability
    marginBottom: 5,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  star: {
    marginHorizontal: 2, // Spacing between stars
  },
  category: {
    fontSize: 18, // Larger font size for heading prominence
    fontWeight: '800', // Extra bold for stronger emphasis
    color: '#1e90ff', // Vibrant blue for visual distinction
    textTransform: 'uppercase', // Uppercase for heading style
    backgroundColor: '#e6f0ff', // Light blue background for emphasis
    paddingHorizontal: 10, // Padding for background
    paddingVertical: 4, // Vertical padding for balance
    borderRadius: 5, // Rounded corners for the background
    marginBottom: 8, // Increased spacing below
    textAlign: 'center', // Center the text
  },
  serviceName: {
    fontSize: 14, // Match category's font size for heading-like appearance
    fontWeight: '800', // Extra bold for emphasis
    color: '#1e90ff', // Same blue color as category for consistency
    textTransform: 'uppercase', // Uppercase for heading style
    backgroundColor: '#e6f0ff', // Light blue background for visual distinction
    paddingHorizontal: 10, // Padding for background
    paddingVertical: 4, // Vertical padding for balance
    borderRadius: 5, // Rounded corners for the background
    marginBottom: 8, // Increased spacing below
    textAlign: 'center'
  },
  price: {
    fontSize: 16,
    fontWeight: '700', // Bold for emphasis
    color: '#e91e63', // Vibrant color to highlight price
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%', // Full-width button
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ServiceManBooking;