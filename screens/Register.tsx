import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import { StackActions } from "@react-navigation/native";
import axios from "axios";
import { Formik } from "formik";
import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  ToastAndroid,
} from "react-native";
import InputField from "../components/InputField";
import { post } from "../utils/apiCalls";
import { mapError } from "../utils/mapError";

type Props = DrawerContentComponentProps<DrawerContentOptions> & {};

const Register = (props: Props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 60,
        backgroundColor: "white",
      }}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={{
            height: 100,
            width: 100,
            marginBottom: 10,
            alignSelf: "center",
          }}
        />
        <Text style={styles.title}>Register</Text>
        <Formik
          initialValues={{
            username: "",
            password: "",
            email: "",
            confirmPassword: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const res = await post("register", values);

            if (res?.data.error && typeof res !== "undefined") {
              setErrors(mapError(res.data.error));
              return;
            }

            if (Platform.OS === "android") {
              ToastAndroid.show("Registered successfully", ToastAndroid.SHORT);
            }
            props.navigation.goBack();
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <InputField
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                name="username"
                label="Username"
              />
              <InputField
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                name="email"
                label="E-mail"
              />
              <InputField
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                name="password"
                label="Password"
                secureTextEntry
              />
              <InputField
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                name="confirmPassword"
                label="Confirm password"
                secureTextEntry
              />
              <TouchableOpacity
                onPress={handleSubmit as (values: any) => void}
                style={styles.button}
              >
                <Text style={{ color: "white", fontSize: 14 }}>Register</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={{ marginTop: 8, display: "flex", flexDirection: "row" }}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Text style={{ color: "#607ebf" }}> Login.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#fff",
  },

  container: {
    display: "flex",
    width: 250,
    alignSelf: "center",
  },

  button: {
    marginTop: 5,
    backgroundColor: "#284785",
    padding: 7,
    maxWidth: 70,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default Register;
