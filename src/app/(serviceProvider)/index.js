import { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader'
import { getBookingAction } from '../../redux/slices/booking/booking'
import { getServiceProviderAction } from '../../redux/slices/users/serviceproviderSlice'



const Home=()=>{
   const dispatch=useDispatch()
   const loading1=useSelector((state)=>state?.serviceProviders.loading)
   const loading2=useSelector((state)=>state?.bookings?.loading)
   let bookings=useSelector((state)=>state?.bookings?.allBooking?.data)
   bookings=bookings?bookings:[]
   const isLoading=loading1||loading2
   console.log('all booking:',bookings)
   useEffect(()=>{
     Promise.all([
        dispatch(getServiceProviderAction({})),
        dispatch(getBookingAction({}))
     ])
    
   },[]) 

   if (isLoading) {
    return <Loader />
  }
    return(
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          {
            bookings.map(elem=>{
                return(
                    <View style={styles.booking}>
                   
                    <Text>{elem.price}</Text>
                    <Text>{elem.category}</Text>
                    <Text>{elem.work}</Text>
                    
                    </View>
                )
            })
          }
        </ScrollView>    
    )

}

const styles=StyleSheet.create({
    container:{

        flex:1

    },
    booking:{
        backgroundColor:"red",
        margin:5

    }

})




export default Home
