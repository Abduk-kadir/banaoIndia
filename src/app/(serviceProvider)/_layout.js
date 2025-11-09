
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Avatar } from '@kolking/react-native-avatar';
import { router, Tabs } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export default function CusotmerLayout() {
  
  return (
  
     
        <Tabs
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity style={{marginRight:10}} onPress={()=>router.push('userDetail')}>
           <View>
              <Avatar size={50} name="Avishay Bar"   />
     
           </View>
            </TouchableOpacity>
          ),
          tabBarStyle: { 
          height: 70,  // Adjusted height
          paddingBottom: 10, // Prevents icon from getting cut off
          paddingTop: 10, 
        },
        tabBarLabelStyle: { 
          fontSize: 13,
          color:"gray"  // Increased font size
          
      },
     
        }}
          
        
        >
          <Tabs.Screen 
          name="index" 
          options={{
            title: 'All Booking', // Tab title
            headerStyle:{backgroundColor:"#4626f9"},
            headerTintColor:"white",
            tabBarIcon: ({ focused, color }) => (
              <Feather
                name='list'
                size={25} // Larger icon size
                color='#bfb9e4'
              />
            ),
          }}
          
          />
         



          <Tabs.Screen 
          name="setPrice"
          options={{
            title: 'Set Own Price',
            headerStyle:{backgroundColor:"#4626f9"},
            headerTintColor:"white", // Set title for the tab
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialIcons
                name='shopping-cart'
                size={25}
                color='#bfb9e4'
              />
            ),
          }}
          
          />
        </Tabs>
      );
   
  
}
