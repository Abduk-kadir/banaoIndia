import { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { getServiceProviderAction } from '../../redux/slices/users/serviceproviderSlice'

const Home=()=>{
   const dispatch=useDispatch()
   useEffect(()=>{
       dispatch(getServiceProviderAction({}))
   },[]) 
    return(
        <View>
            <Text>service provider</Text>
            <Text>service provider</Text>
            <Text>service provider</Text>
        </View>
    )

}
export default Home
