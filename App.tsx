import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

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
  };

  return (
    <SafeAreaView style={styles.container}>
      <StackNavigation />
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
