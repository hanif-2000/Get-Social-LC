import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigation from "./src/navigation/StackNavigation";

function App() {

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "green" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
    tomatoToast: ({ text1, props }: any) => (
      <View style={{ height: 60, width: "100%", backgroundColor: "red" }}>
        <Text>{text1}</Text>
      </View>
    ),
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <NavigationContainer> */}
        <StackNavigation />
      {/* </NavigationContainer> */}

      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
});

export default App;
