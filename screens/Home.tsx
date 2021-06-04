import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import { StackActions } from "@react-navigation/routers";
import React, { useState } from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { CustomDrawer } from "../components/CustomDrawer";
import { get, post } from "../utils/apiCalls";
import MainContent from "./MainContent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Achievements from "./Achievements";
import WalkHistory from "./WalkHistory";
import Stats from "./Stats";

/**
 E sad, ono sto je bio Stack.Navigator tamo u App.ts komponenti, ova komponenta je za Drawer.Navigator

 Znaci svaki novi screen koji ce da bude "veci" da kazem (znaci da ce da ima podscreenove koji idu u onaj Stack tamo u App-u)
 ide ovdje.

 Ista filozofija ko sa onim Stackom, lako za baratat sa.
 */

type Props = DrawerContentComponentProps<DrawerContentOptions> & {};

const Home = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    isLoggedIn();
    return () => {};
  }, []);

  async function isLoggedIn() {
    const res = await get("users/me");

    await createProfile(res?.data.id);

    const profile_data = await get(`users/get-one/${res?.data.id}`);

    AsyncStorage.setItem("loggedUser", JSON.stringify(res?.data));
    AsyncStorage.setItem("loggedUserData", JSON.stringify(profile_data?.data));

    console.log(profile_data?.data);

    if (Object.keys(res?.data).length === 0) {
      props.navigation.dispatch(StackActions.replace("Login"));
      console.log("Nije logovan");
    } else {
      setIsLoading(false);
    }
  }

  async function createProfile(id: number) {
    await post(`profile/${id}`, {});
  }

  const Drawer = createDrawerNavigator();
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <Drawer.Navigator
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: "#5E73BD" },
          }}
          drawerType="slide"
          drawerContent={(props) => {
            return <CustomDrawer {...props} />;
          }}
        >
          <Drawer.Screen
            component={MainContent}
            name="Main"
            options={{
              title: "Home",
              headerStyle: { backgroundColor: "#5E73BD" },
              headerTintColor: "white",
              drawerIcon: () => {
                return <Icon name="home" size={20} color="#5E73BD" />;
              },
            }}
          />

          <Drawer.Screen
            component={Achievements}
            name="Achievements"
            options={{
              title: "Achievements",
              headerStyle: { backgroundColor: "#5E73BD" },
              headerTintColor: "white",
              drawerIcon: () => {
                return <Icon name="trophy-variant" size={20} color="#5E73BD" />;
              },
            }}
          />

          <Drawer.Screen
            component={WalkHistory}
            name="History"
            options={{
              title: "History",
              headerStyle: { backgroundColor: "#5E73BD" },
              headerTintColor: "white",
              drawerIcon: () => {
                return <Icon name="history" size={20} color="#5E73BD" />;
              },
            }}
          />

          <Drawer.Screen
            component={Stats}
            name="Stats"
            options={{
              title: "Statistics",
              headerStyle: { backgroundColor: "#5E73BD" },
              headerTintColor: "white",
              drawerIcon: () => {
                return (
                  <Icon
                    name="clipboard-list-outline"
                    size={20}
                    color="#5E73BD"
                  />
                );
              },
            }}
          />
        </Drawer.Navigator>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
