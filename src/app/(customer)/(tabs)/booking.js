import { useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/loader'
import { getcustomerBookingAction, resetcreateBooking } from '../../../redux/slices/booking/booking'


const Booking= () => {
  const dispatch = useDispatch()
  const loading= useSelector((state) => state?.bookings?.customerLoading)
  let bookings = useSelector((state) => state?.bookings?.customerBooking?.data)
  bookings = bookings ? bookings : []
  const isLoading = loading

  useEffect(() => {
    Promise.all([
      
      dispatch(getcustomerBookingAction({})),
      dispatch(resetcreateBooking({}))
    ])
  }, [dispatch])

  const getStatusStyle = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'confirmed':
        return { bg: '#e8f5e9', color: '#2e7d32' }
      case 'pending':
        return { bg: '#fff3e0', color: '#ef6c00' }
      case 'completed':
        return { bg: '#e3f2fd', color: '#1976d2' }
      case 'cancelled':
        return { bg: '#ffebee', color: '#c62828' }
      default:
        return { bg: '#f5f5f5', color: '#616161' }
    }
  }

  if (isLoading) return <Loader />

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {bookings.map((elem, index) => {
        const statusStyle = getStatusStyle(elem.status)

        return (
          <View key={index} style={styles.card}>
            {/* Header: Customer Name + Status */}
            <View style={styles.header}>
              <View>
                 <Image source={{ uri: elem.serviceprovider[0]?.photo}} style={styles.image} />
                <Text style={styles.customerName}>
                  {elem.serviceprovider[0]?.name || 'Unknown Customer'}
                </Text>
                <Text style={styles.email}>{elem.serviceprovider[0]?.email}</Text>
              </View>
              <View>
              <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                <Text style={[styles.statusText, { color: statusStyle.color }]}>
                  {elem.status || 'Unknown'}
                </Text>
                
              </View>
               <Text style={styles.value}>{elem.category || '-'}</Text>
                <Text style={styles.value}>{elem.work || '-'}</Text>
                 <Text style={styles.price}>₹ {elem.price}</Text>
              </View>
            </View>

            {/* Consistent Rows */}
           

            

           <View style={styles.buttonRow}>
           <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.payBtn}>
          <Text style={styles.cancelBtnText}>Pay</Text>
          </TouchableOpacity>
          </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor:"white"
  },
  image: {
    width:70,
    height: 70,
    resizeMode:"cover",
    borderRadius: 10,
    marginBottom: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 12,
  },
  card: {
    backgroundColor: '#eaece4ff',
    borderRadius: 16,
    padding: 5,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
   
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  email: {
    fontSize: 13.5,
    color: '#666',
    marginTop: 3,
  },
  statusBadge: {
    paddingHorizontal:5,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-end',         // keeps it aligned right
    marginBottom: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // Only these three lines changed — category & work now look premium
  value: {
    fontSize: 15.5,
    color: '#1f2937',
    backgroundColor: '#f1f5f9',
    alignSelf: 'flex-end',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  price: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#2e7d32',
    backgroundColor: '#ecfdf5',
    alignSelf: 'flex-end',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 100,
  },

  cancelBtn: {
  
    backgroundColor: '#c55b5bff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  payBtn: {
   
    backgroundColor: '#55ab72ff',
    paddingVertical: 10,
    paddingHorizontal: 34,
    borderRadius: 10,
  },
  cancelBtnText: {
    color: 'white',
    fontSize: 14.5,
    fontWeight: '600',
  },
})
export default Booking