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
import { get } from "../utils/apiCalls";

type User = {
  username: string;
  id: number;
};
type Props = DrawerContentComponentProps<DrawerContentOptions> & {};

export const CustomDrawer = (props: Props) => {
  const [loggedUser, setLoggedUser] = useState<User>();

  useFocusEffect(
    useCallback(() => {
      getLoggedUser();
    }, [])
  );

  async function getLoggedUser() {
    const user = await AsyncStorage.getItem("loggedUser");
    setLoggedUser(JSON.parse(user!));
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
            style={{ height: 80, width: 80, borderRadius: 50 }}
            source={{
              uri: "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
            }}
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
