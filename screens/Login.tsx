import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import { StackActions } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  ToastAndroid,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import InputField from "../components/InputField";
import { post } from "../utils/apiCalls";
import { mapError } from "../utils/mapError";

type Props = DrawerContentComponentProps<DrawerContentOptions> & {};

const Login = (props: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={{ height: 100, width: 100, marginBottom: 10 }}
      />
      <Text style={styles.title}>Login</Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const res = await post("login", values);

            if (res?.data.error && typeof res !== "undefined") {
              setErrors(mapError(res.data.error));
              return;
            }

            props.navigation.dispatch(StackActions.replace("Home"));
          } catch (err) {}
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
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              name="password"
              autoCapitalize="none"
              label="Password"
              secureTextEntry
            />
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
              style={styles.button}
            >
              <Text style={{ color: "white", fontSize: 14 }}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View style={{ marginTop: 8, display: "flex", flexDirection: "row" }}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Register");
          }}
        >
          <Text style={{ color: "#607ebf" }}> Register.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  button: {
    marginTop: 10,
    backgroundColor: "#284785",
    padding: 7,
    maxWidth: 70,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default Login;
