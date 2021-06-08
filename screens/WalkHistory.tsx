import Walks from "../components/WalkComponent";
import React, { useEffect, useState } from 'react';
import { Walks_type } from "../types"
import { View, StatusBar, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from '../utils/apiCalls';

const WalkHistory = () => {

  const [walks, setWalks] = useState<Array<Walks_type>>([]);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchAllWalks();
  }, [])

  const fetchAllWalks = async () => {
    const userFromStorage = await AsyncStorage.getItem('loggedUser')
    //console.log(userFromStorage)
    const id = JSON.parse(userFromStorage!).id
    //console.log(id)
    const res = await get(`users/get-one/${id}`) 
    setWalks(res?.data.walks)
    setLoading(false);
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {
          loading ? <ActivityIndicator 
          size= {30}
          color= "#5E73BD" /> 
          : walks.map((walk, index) => {
            return <Walks 
            key={index}
            distance={walk.distance}
            date={walk.date}
            encoded_polyline={walk.encoded_polyline}
            time={walk.time}
            />
          })
      }
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
})

export default WalkHistory;
