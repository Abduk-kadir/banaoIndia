import { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader'
import { getBookingAction } from '../../redux/slices/booking/booking'
import { getServiceProviderAction } from '../../redux/slices/users/serviceproviderSlice'

const Home = () => {
  const dispatch = useDispatch()
  const loading1 = useSelector((state) => state?.serviceProviders.loading)
  const loading2 = useSelector((state) => state?.bookings?.loading)
  let bookings = useSelector((state) => state?.bookings?.allBooking?.data)
  bookings = bookings ? bookings : []
  const isLoading = loading1 || loading2

  useEffect(() => {
    Promise.all([
      dispatch(getServiceProviderAction({})),
      dispatch(getBookingAction({})),
    ])
  }, [dispatch])

  const getStatusStyle = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'confirmed':
      case 'accepted':
        return { bg: '#e8f5e9', color: '#2e7d32' }
      case 'pending':
        return { bg: '#fff3e0', color: '#ef6c00' }
      case 'completed':
      case 'done':
        return { bg: '#e3f2fd', color: '#1976d2' }
      case 'cancelled':
      case 'rejected':
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
                <Text style={styles.customerName}>
                  {elem.customer[0]?.name || 'Unknown Customer'}
                </Text>
                <Text style={styles.email}>{elem.customer[0]?.email}</Text>
              </View>

              <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                <Text style={[styles.statusText, { color: statusStyle.color }]}>
                  {elem.status || 'Unknown'}
                </Text>
              </View>
            </View>

            {/* Consistent Rows */}
            <View style={styles.row}>
              <Text style={styles.label}>Equipment</Text>
              <Text style={styles.value}>{elem.category || '-'}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Work</Text>
              <Text style={styles.value}>{elem.work || '-'}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Price</Text>
              <Text style={styles.price}>Rs {elem.price || 0}</Text>
            </View>
           <TouchableOpacity style={styles.quotationBtn}>
    <Text style={styles.quotationBtnText}>Other Charge</Text>
  </TouchableOpacity>
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
  },
  card: {
    backgroundColor: '#f7fdddff',
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
    marginBottom: 16,
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
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
  },
  label: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
    
  },
  value: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    textAlign: 'center',
    
    borderWidth:.5
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  quotationBtn: {
  alignSelf: 'flex-end',
  marginTop: 6,
  backgroundColor: '#6366f1',
  paddingVertical: 8,
  paddingHorizontal: 14,
  borderRadius: 8,
},

quotationBtnText: {
  color: 'white',
  fontSize: 14,
  fontWeight: '500',
},
})

export default Home