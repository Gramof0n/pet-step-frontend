import React from "react";
import { Text, View, StyleSheet } from "react-native";
import WeatherDisplay from "../components/WeatherDisplay";

interface Props {}

const MainContent = (props: Props) => {
  return (
    <View style={styles.container}>
      <WeatherDisplay />
      <Text>MAIN CONTENT</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexGrow: 1,
    padding: 10,
  },
});

export default MainContent;
