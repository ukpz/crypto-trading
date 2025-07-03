import { store } from "@/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import "../global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{
        headerShown: false
      }} />
    </Provider>

  );

  // return (
  //   <Stack>
  //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //   </Stack>
  // );
}
