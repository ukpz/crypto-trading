import { store } from "@/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import "../global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
        <Stack screenOptions={{
          headerShown: false
        }} />
      {/* </GestureHandlerRootView> */}

    </Provider>

  );

  // return (
  //   <Stack>
  //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //   </Stack>
  // );
}
