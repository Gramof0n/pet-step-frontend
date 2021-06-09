import Achievement from "../components/Achievement";
import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Achievement_type } from "types";
import { get } from "../utils/apiCalls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";

const Achievements = () => {
  const [achievements, setAchievements] = useState<Array<Achievement_type>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [completedAchs, setCompletedAchs] = useState<Array<Achievement_type>>(
    []
  );

  useFocusEffect(
    useCallback(() => {
      fetchAchievements();
      fetchCompletedAchievements();
    }, [])
  );

  const fetchAchievements = async () => {
    const res = await get("achievements");
    setAchievements(res?.data);
  };

  const fetchCompletedAchievements = async () => {
    const userFromStorage = await AsyncStorage.getItem("loggedUser");
    const id = JSON.parse(userFromStorage!).id;
    const res = await get(`users/get-one/${id}`);
    setCompletedAchs(res?.data.achievements);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <ActivityIndicator size={30} color="#5E73BD" />
        ) : (
          achievements.map((achievement, index) => {
            return (
              <Achievement
                is_achieved={completedAchs.some((completedAchs) => {
                  return (
                    completedAchs[`id_achievements`] ==
                    achievement.id_achievements
                  );
                })}
                key={index}
                name={achievement.name}
                requirement={achievement.requirement}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 22,
  },
  resizeIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttontext: {
    flex: 1,
    fontSize: 20,
    color: "white",
    fontFamily: "normal",
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 45,
  },
  buttonAchieved: {
    height: 50,
    width: 320,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 10,
    backgroundColor: "#5E73BD",
    borderRadius: 10,
  },
  buttonNotAchieved: {
    height: 50,
    width: 320,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 10,
    backgroundColor: "#525769",
    borderRadius: 10,
  },
});

export default Achievements;
