import StatsComponent from "../components/StatsComponent";
import React, { useCallback, useState } from "react";
import { View, StyleSheet, StatusBar, ActivityIndicator } from "react-native";
import { Stats_type } from "types";
import { get } from "../utils/apiCalls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Stats = () => {
  const [stats, setStats] = useState<Stats_type>();
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      fetchStats();
    }, [])
  );

  const fetchStats = async () => {
    const user = await AsyncStorage.getItem("loggedUser");
    const id = JSON.parse(user!).id;
    //console.log(id)
    const res = await get(`users/get-one/${id}`);
    //console.log(res!.data.stats)
    setStats(res!.data.stats);
    console.log(res!.data.stats);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={30} color="#5E73BD" />
      ) : (
        <StatsComponent
          no_of_steps={stats?.no_of_steps === null ? 0 : stats!.no_of_steps}
          no_of_km_walked={
            stats?.no_of_km_walked === null ? 0 : stats!.no_of_km_walked
          }
          time_spent={
            stats?.time_spent === null ? "00:00:00" : stats!.time_spent
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default Stats;
