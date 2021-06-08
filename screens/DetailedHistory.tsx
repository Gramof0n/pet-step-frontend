import { useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import MapView, { Polyline } from 'react-native-maps';


const decodePolyline : any = require('decode-google-map-polyline');

interface Props {
    
}


const DetailedHistory = (props: Props) => {

    const route : any = useRoute()
    const [latLng, setLatlng] = useState<Array<{latitude: number, longitude: number}>>([])

    useEffect(() => {
        const coordinates = decodePolyline(route.params.encoded_polyline)
        for(let c of coordinates) {
            setLatlng(previous => {
                return[
                    ...previous, {latitude: c.lat, longitude: c.lng}
                ]
            }) 
        }
    }, [])

    console.log(route.params.time)

    return (
        latLng.length==0 ? null : 
        <View>
            <MapView
            style={styles.map}
            initialRegion={{
              latitude: latLng[Math.floor(latLng.length/2)]!.latitude,
              longitude: latLng[Math.floor(latLng.length/2)]!.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            loadingEnabled   
            minZoomLevel={16}
          >
                  <Polyline
              coordinates={latLng}
              strokeWidth={4}
              strokeColor="#5E73BD"
            />
          </MapView>
    
          <View style={styles.bottomContainer}>
              <View>
              <Text style={styles.bottomText}> Time taken  </Text>
              <Text> {route.params.time}</Text>
              </View>
              <View>
              <Text style={styles.bottomText}> Date </Text>
              <Text> {route.params.date.split('T')[0]}</Text>
              </View>
              <View>
              <Text style={styles.bottomText}> Km walked  </Text>
              <Text> {route.params.distance}</Text>
              </View>
          </View>
        
        </View>
    )
}


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
    bottomContainer: {
        marginTop: 50,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly' 
    },
    bottomText: {
        fontStyle: 'normal',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
  });

export default DetailedHistory
