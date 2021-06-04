import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import React from "react";
import { View, Text, StyleSheet, ToastAndroid, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProfileData_type, UserProfile_type } from "../types";
import { update } from "../utils/apiCalls";
import ProfileInput from "./ProfileInput";

interface Props {
  profileData: ProfileData_type;
}

const PersonalInfo = (props: Props) => {
  return (
    <Formik
      initialValues={{
        name: props.profileData.user_profile.name,
        surname: props.profileData.user_profile.surname,
        pet_name: props.profileData.user_profile.pet_name,
      }}
      onSubmit={async (values) => {
        console.log(values);

        const res = await update(
          `profile/${props.profileData.id_user}`,
          values
        );

        props.profileData.user_profile = res?.data.profile;

        console.log(props.profileData);

        if (typeof res?.data.error === "undefined") {
          if (Platform.OS === "android") {
            ToastAndroid.show(res!.data.message, ToastAndroid.SHORT);
            await AsyncStorage.setItem(
              "loggedUserData",
              JSON.stringify(props.profileData)
            );
          }
        } else {
          if (Platform.OS === "android") {
            ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
          }
        }
      }}
    >
      {({ handleSubmit, handleBlur, handleChange, values }) => (
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              marginBottom: 20,
              paddingBottom: 10,
              borderBottomColor: "grey",
              borderBottomWidth: 2,
            }}
          >
            <Text style={styles.label_big}>Personal information</Text>
            <Text style={styles.subtitle}>
              Tell us yours and your pet's name!
            </Text>
          </View>

          <ProfileInput
            label="Name:"
            name="name"
            value={values.name}
            onBlur={handleBlur("name")}
            onChangeText={handleChange("name")}
          />
          <ProfileInput
            label="Surname:"
            name="surname"
            value={values.surname}
            onBlur={handleBlur("surname")}
            onChangeText={handleChange("surname")}
          />
          <ProfileInput
            label="Pet name:"
            name="pet_name"
            value={values.pet_name}
            onBlur={handleBlur("pet_name")}
            onChangeText={handleChange("pet_name")}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={{ color: "white" }}>Update personal</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
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

  button: {
    marginTop: 5,
    backgroundColor: "#5E73BD",
    padding: 7,
    maxWidth: 130,
    width: 130,
    alignItems: "center",
  },
});

export default PersonalInfo;
