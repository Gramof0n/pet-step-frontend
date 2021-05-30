import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import WalkButton from "../components/WalkButton";
import WeatherDisplay from "../components/WeatherDisplay";

type Props = DrawerContentComponentProps<DrawerContentOptions> & {};

/*
  E OVDJE se zapravo zove sve sto ce da se vidi golim okom

  Mislim, ovo je vec gotovo jelte, osim ako neko nece jos nesto da dodaje,
  al po Subarinom dizajnu, main screen ovako izgleda i radi sve
*/

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
