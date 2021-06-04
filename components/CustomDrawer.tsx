import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StackActions, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ProfileData_type } from "../types";
import { get } from "../utils/apiCalls";

type User = {
  username: string;
  id: number;
};
type Props = DrawerContentComponentProps<DrawerContentOptions> & {};

export const CustomDrawer = (props: Props) => {
  const img_base_url = "http://192.168.1.8:3000/";
  const [loggedUser, setLoggedUser] = useState<User>();
  const [loggedUserData, setLoggedUserData] = useState<ProfileData_type>();

  useFocusEffect(
    useCallback(() => {
      getLoggedUser();
    }, [])
  );

  async function getLoggedUser() {
    const user = await AsyncStorage.getItem("loggedUser");
    const logged_user_data = await AsyncStorage.getItem("loggedUserData");

    setLoggedUser(JSON.parse(user!));
    setLoggedUserData(JSON.parse(logged_user_data!));
  }

  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        display: "flex",
        flex: 1,
        margin: 0,
        padding: 0,
      }}
      {...props}
    >
      <View style={{ margin: 0, padding: 0 }}>
        <StatusBar backgroundColor="#5E73BD" />
        <TouchableOpacity
          style={[
            styles.image_button,
            styles.header,
            { backgroundColor: "#5E73BD", marginTop: -4 },
          ]}
          onPress={() => {
            props.navigation.navigate("Profile");
          }}
        >
          <Image
            source={{
              uri: `${img_base_url}${loggedUserData?.user_profile.img_url}`,
            }}
            style={{ height: 80, width: 80, borderRadius: 50 }}
          />
          <Text
            style={{
              alignSelf: "center",
              margin: 15,
              fontSize: 18,
              color: "white",
            }}
          >
            {loggedUser?.username}
          </Text>
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} />
      <View
        style={{
          display: "flex",
          flexGrow: 1,
          flex: 1,
          flexDirection: "column-reverse",
        }}
      >
        <DrawerItem
          label="Logout"
          onPress={async () => {
            props.navigation.closeDrawer();
            await get("users/logout");
            props.navigation.dispatch(StackActions.replace("Login"));
          }}
          icon={() => {
            return <Icon name="logout" size={20} />;
          }}
          style={{}}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  image_button: {
    padding: 10,
  },

  header: {
    display: "flex",
    flexDirection: "row",
  },
});
