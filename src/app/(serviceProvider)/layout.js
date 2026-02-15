import { Stack } from "expo-router";
export default function ServiceProviderMainLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="serviceProviderDetail"
        options={{
          title: "Profile",
          headerStyle: { backgroundColor: "#4626f9" },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
}
