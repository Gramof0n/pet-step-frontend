import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import WalkButton from "../components/WalkButton";
import WeatherDisplay from "../components/WeatherDisplay";

type Props = DrawerContentComponentProps<DrawerContentOptions> & {};

const MainContent = (props: Props) => {
  return (
    <View style={styles.container}>
      <WeatherDisplay />
      <View style={styles.wrapper}>
        <WalkButton navigation={props.navigation} />
      </View>
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

  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default MainContent;
