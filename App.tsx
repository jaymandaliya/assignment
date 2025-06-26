import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import ApplicationNavigator from "./app/navigator";
import { AppStyle, Colors } from "./app/theme";
const App = () => {
  return (
    <SafeAreaView style={[AppStyle.fill]}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ApplicationNavigator />
    </SafeAreaView>
  )
}
export default App