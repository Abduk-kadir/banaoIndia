
import { Stack } from 'expo-router';

export default function CustomerMainLayout() {
  
  return (
  
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    
   
  );
}
