import { Stack } from 'expo-router';
export default function RootLayout() {
  
  return (
      <Stack>
        <Stack.Screen name="marketplace" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="category" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />      
      <Stack.Screen name="farmerConfirmation" options={{ headerShown: false }} />
      {/* <Stack.Screen name="productDetail" options={{ headerShown: false }} /> */}
      </Stack>
  );
}
