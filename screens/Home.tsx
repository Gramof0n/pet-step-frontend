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
import { get } from "../utils/apiCalls";
import MainContent from "./MainContent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Achievements from "./Achievements";
import WalkHistory from "./WalkHistory";

type Props = DrawerContentComponentProps<DrawerContentOptions> & {};

const Home = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    isLoggedIn();
    return () => {};
  }, []);

  async function isLoggedIn() {
    const res = await get("users/me");

    AsyncStorage.setItem("loggedUser", JSON.stringify(res?.data));

    if (Object.keys(res?.data).length === 0) {
      props.navigation.dispatch(StackActions.replace("Login"));
      console.log("Nije logovan");
    } else {
      setIsLoading(false);
    }
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
