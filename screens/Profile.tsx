import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import PersonalInfo from "../components/PersonalInfo";
import { ProfileData_type } from "../types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { update } from "../utils/apiCalls";

interface Props {}

const Profile = (props: Props) => {
  const img_base_url = "http://192.168.1.8:3000/";
  const [profileData, setProfileData] = useState<ProfileData_type>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>();

  const [localImgUri, setLocalImgUri] = useState<string>();

  useEffect(() => {
    getProfileData();
    getStoragePermissions();
    console.log("Local image uri: " + localImgUri);
  }, []);

  async function getProfileData() {
    setIsLoading(true);
    const data = await AsyncStorage.getItem("loggedUserData");
    const parsed_data: ProfileData_type = JSON.parse(data!);

    console.log(parsed_data);

    setProfileData(parsed_data);
    setImageUrl(parsed_data.user_profile.img_url);
    setIsLoading(false);
  }

  async function getStoragePermissions() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Camera permissions required");
      }
    }
  }

  async function pickImage() {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(image);

    if (image.cancelled) {
      return;
    }

    setLocalImgUri(image.uri);

    let localUri = image.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename!);
    let type = match ? `image/${match[1]}` : `image`;

    console.log(`Filename: ${filename} Match: ${match} Type: ${type}`);

    let formData = new FormData();

    formData.append(
      "user_image",
      JSON.parse(JSON.stringify({ uri: localUri, name: filename, type }))
    );

    formData.append("name", profileData!.user_profile.name);
    formData.append("surname", profileData!.user_profile.surname);
    formData.append("pet_name", profileData!.user_profile.pet_name);

    console.log(formData);

    const res = await update(`profile/${profileData?.id_user}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(res!.data);

    setProfileData((previousData) => {
      console.log((previousData!.user_profile = res!.data.profile));
      return previousData;
    });

    await AsyncStorage.setItem("loggedUserData", JSON.stringify(profileData));
    console.log(profileData);
  }
  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <ScrollView
      style={{
        padding: 10,
      }}
      contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
    >
      <View style={{ alignSelf: "center" }}>
        <TouchableOpacity
          style={{ position: "relative" }}
          onPress={() => {
            pickImage();
          }}
        >
          <Image
            source={{
              uri:
                typeof localImgUri === "undefined"
                  ? `${img_base_url}${imageUrl}`
                  : localImgUri,
            }}
            style={{ height: 120, width: 120, borderRadius: 120 }}
          />
          <Icon
            name="plus-circle"
            size={30}
            color="#5E73BD"
            style={{ position: "absolute", bottom: 0, right: 0 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center" }}>
          {profileData?.username}
        </Text>
      </View>

      <PersonalInfo profileData={profileData!} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label_small: {
    fontSize: 16,
    fontWeight: "bold",
  },

  label_big: { fontSize: 22, fontWeight: "800", color: "#5E73BD" },

  subtitle: { fontSize: 12, fontWeight: "100" },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    height: 40,
  },
});

export default Profile;
