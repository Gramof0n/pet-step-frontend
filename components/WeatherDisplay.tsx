import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, StyleSheet } from "react-native";
import { get } from "../utils/weatherApi";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { WeatherData } from "../types";
import { formatDate } from "../utils/formatDate";

import { TouchableOpacity } from "react-native-gesture-handler";

const WeatherDisplay = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData>();
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getLocation();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (location !== null) {
        getWeather();
      }
    }, [location])
  );

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Nema lokacije");
      setErrorMsg(
        "Location permissions required for weather data. Click to enable."
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    console.log("Uzelo lokaciju");
    setErrorMsg("");
    setLocation(location);
  }

  async function getWeather() {
    try {
      setIsLoading(true);
      const data = await get(
        location?.coords.latitude,
        location?.coords.longitude,
        "metric"
      );
      setWeather(data);
      //console.log(data);
      setIsLoading(false);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <Text>
          <ActivityIndicator size="large" color="#5E73BD" />
        </Text>
      ) : errorMsg !== "" ? (
        <TouchableOpacity
          onPress={async () => {
            await getLocation();
          }}
        >
          <Text>{errorMsg}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.wrapper}
          onPress={async () => {
            await getWeather();
          }}
        >
          <Image
            style={styles.weather_icon}
            source={{
              uri: `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`,
            }}
          />
          <Text style={styles.weather_type}>
            {weather?.weather[0].main} {weather?.main.temp.toString()}°C
          </Text>
          <Text style={styles.weather_wind}>
            Wind: {weather?.wind.speed}m/s
          </Text>

          <Text>{`${formatDate(weather!.dt)}, ${weather?.name}`}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    padding: 10,
    borderRadius: 10,
  },

  weather_icon: {
    height: 100,
    width: 100,
    alignSelf: "center",
  },

  weather_type: {
    fontSize: 20,
    fontWeight: "bold",
  },

  weather_wind: {
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default WeatherDisplay;
