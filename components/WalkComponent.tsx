import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Text,TouchableOpacity, StatusBar, StyleSheet} from 'react-native'

interface Props {
  distance: number,
  date: string,
  encoded_polyline: string
  time: string
}

const HistoryComponent = (props: Props) => {
  const navigation = useNavigation()
  //console.log(props.distance)
    return (
        <TouchableOpacity style={styles.button}
        onPress= {() => {
          navigation.navigate('Detailed_history', {time: props.time, distance: props.distance, date: props.date, encoded_polyline: props.encoded_polyline})
        }}>
            <Text style={styles.buttonTextDistance}>{props.distance} kilometers </Text>
            <Text style={styles.buttonTextDate}>{props.date.split('T')[0]}</Text>
          </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      marginHorizontal: 22,
    },
    buttonTextDistance: {
      marginLeft: 20,
      fontSize: 20,
      color: "white",
      fontFamily: "normal",
      fontWeight: "bold",
      textAlign: 'center',
    },
    buttonTextDate: {
      flex: 1,
      fontSize: 20,
      color: "white",
      fontFamily: "normal",
      fontWeight: "bold",
      textAlign: 'right',
      marginRight: 20
    },
    button: {
      height: 50,
      width: 320,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      margin: 10,
      borderRadius: 10,
      backgroundColor: "#5E73BD"
    },
    
  });

export default HistoryComponent
