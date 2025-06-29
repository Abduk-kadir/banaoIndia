
import { Stack } from 'expo-router';
export default function CustomerMainLayout() {
  
  return (
  
     <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="selectedWorks"
        options={{
          title: 'Select Your Problem',
          headerStyle: { backgroundColor: '#4626f9' },
          headerTintColor: 'white',
        }}
      />
    </Stack>
    
   
  );
}
