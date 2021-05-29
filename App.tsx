import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Walk from "./screens/Walk";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          component={Home}
          name="Home"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Login}
          name="Login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Register}
          name="Register"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Profile}
          name="Profile"
          options={{
            headerShown: true,
            title: "Your profile",
            headerStyle: { backgroundColor: "#5E73BD" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          component={Walk}
          name="Walk"
          options={{
            headerShown: true,
            title: "Walk",
            headerStyle: { backgroundColor: "#5E73BD" },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
