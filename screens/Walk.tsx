import { useFocusEffect } from "@react-navigation/core";
import { LocationObject } from "expo-location";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { getPathLength } from "geolib";
import Timer from "../components/Timer";
import { formatDate } from "../utils/formatDate";
import { TouchableOpacity } from "react-native-gesture-handler";
import { encodePolyline } from "../utils/encodePath";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { post, update } from "../utils/apiCalls";
import { Pedometer } from "expo-sensors";

/*
  OVDJE ISPOD SAM ISPISAO NEKI SHIT STO SE TICE POLYLINEA, BITNO ZA ONOG KO CE SE BAKCAT ISTORIJOM 
*/

type Props = DrawerContentComponentProps<DrawerContentOptions> & {};

type LatLng = {
  latitude: number;
  longitude: number;
};

const Walk = (props: Props) => {
  const [location, setLocation] = useState<Array<LocationObject | null>>([]);
  const [latLng, setLatLng] = useState<Array<LatLng>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date>();
  const [isPedometerAvailable, setIsPedometerAvailable] =
    useState<boolean>(false);

  const [time, setTime] = useState("");

  const mapRef = useRef<MapView>(null);

  useFocusEffect(
    useCallback(() => {
      console.log("Uzelo lokaciju prvi put");
      getCurrentLocation();
      setStartDate(new Date());
      Pedometer.isAvailableAsync().then((res) => {
        setIsPedometerAvailable(res);
      });
    }, [])
  );

  async function getCurrentLocation() {
    const loc = await Location.getCurrentPositionAsync();
    setLocation(() => [...location, loc]);
    setLatLng(() => [
      ...latLng,
      {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      },
    ]);
    setIsLoading(false);
    return;
  }

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <View>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: location[0]!.coords.latitude,
              longitude: location[0]!.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            loadingEnabled
            showsUserLocation={true}
            followsUserLocation={true}
            minZoomLevel={18}
            onUserLocationChange={(e) => {
              e.persist();
              setLatLng(() => [
                ...latLng,
                {
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                },
              ]);
              mapRef.current!.animateToRegion({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}
          >
            <Polyline
              coordinates={latLng}
              strokeWidth={4}
              strokeColor="#5E73BD"
            />
          </MapView>
          <Text style={styles.text_km}>
            {`${getPathLength(latLng) / 1000} km`}
          </Text>
          <Text style={styles.text_date}>
            {formatDate(Math.floor(new Date().getTime() / 1000))}
          </Text>
          <Timer setTime={setTime} />

          <TouchableOpacity
            style={styles.button_stop}
            onPress={async () => {
              /*
              Ovo zove funkciju da se enkodiraju koordinate hodanja u onaj polyline

              Funkciju za taj shit bi iskreno valjalo prebacit na backend ali eto, moze cucat i ovdje

              Sad ovaj polyline koji se ovdje enkodira treba slat na backend da se storeuje u databazu (ne znam ko radi history, al on bi trebao to da handleuje)

              Naravno u history screenu bi se opet uzela ova mapa i samo bi se dekodirao polyline (ima neka biblioteka na netu, nisam je instalirao)

              (kod za enkodiranje sam fala bogu nasao na netu lmao, ne bi ja cackao sad algoritam crni daleko bilo)

              Sve ove podatke ispod iz ovog console log-a bi trebalo slat na backend ko sto rekoh
              
              Vrijeme se u bazi cuva nekako drukcije, ovdje je string samo, valja to vidjet pa ga konvertovat u taj bazni format ili prebacit bazu na string, ne znam.
              */

              const encoded_polyline = encodePolyline(latLng);
              console.log(
                `Enkodiran polyline: ${encoded_polyline}\nVrijeme: ${time}\nDatum: ${new Date()}\nDistanca: ${
                  getPathLength(latLng) / 1000
                } `
              );

              const date = new Date();
              const steps = isPedometerAvailable
                ? await Pedometer.getStepCountAsync(startDate!, date)
                : 500;
              const user = await AsyncStorage.getItem("loggedUser");
              const id = JSON.parse(user!).id;
              const distance = getPathLength(latLng) / 1000;

              console.log(
                "Start date je " + startDate + " end date je " + date
              );
              await update(`achievements/add/${id}`, { requirement: distance });
              await post("walk", {
                user_id_user: id,
                distance,
                time,
                date: date,
                encoded_polyline,
              });

              await update(`stats/add/${id}`, {
                no_of_steps: steps,
                no_of_km_walked: distance,
                time_spent: time,
              });

              props.navigation.goBack();
            }}
          >
            <Text style={styles.text_stop}>Stop</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 400,
  },

  text_km: {
    fontSize: 22,
    marginTop: 10,
    textAlign: "center",
  },

  text_date: { marginTop: 15, textAlign: "center", fontSize: 16 },

  text_stop: {
    fontSize: 20,
    color: "white",
  },

  button_stop: {
    backgroundColor: "#5E73BD",
    width: 100,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2 * 10 * Math.PI,
    alignSelf: "center",
    marginTop: 40,
  },
});

export default Walk;
