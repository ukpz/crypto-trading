import LoadingOverlay from "@/components/LoadingOverlay";
import { store } from "@/store";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from "react-redux";
import "../global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <Stack screenOptions={{
          headerShown: false
        }} />
        <LoadingOverlay />
      </GestureHandlerRootView>
    </Provider>

  );

  // return (
  //   <Stack>
  //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //   </Stack>
  // );
}
