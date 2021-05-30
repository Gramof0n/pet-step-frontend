import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Walk from "./screens/Walk";

/*
  Ok ovaj screen je generalno samo da se u njega trpaju STACK NAVIGATOR komponente

  Vrlo je bitno da ovdje idu samo ove Stack.Navigator stvari i generalno ne prikazuje ama bas bukvalno nista

  Mislim, ja sam ovdje vec potrpao generalno sve screenove koji ce nam trebat,
  al recimo ako neko oce da uzme da se iz jednog screena ide na drugi, navigaciju na taj ce trpat ovdje
  bez obzira sto se pomjera iz recimo drawer shita (tamo dje je hamburger dugmence) na ovaj shit
  (ne umijem da objasnim al to je to ofrlje valjda ne znam)

  Sve u svemu svaki od ovih screenova ima onu back strelicu

  To je fora

  lmao
  */

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
