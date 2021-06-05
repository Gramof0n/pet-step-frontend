import React from 'react'
import { Text,TouchableOpacity, StatusBar, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
    name: string,
    requirement: number,
    is_achieved: boolean
}

const Achievement = (props: Props) => {
    return (
        <TouchableOpacity style={[styles.buttonAchieved, {backgroundColor: props.is_achieved ? "#5E73BD" :"#525769",
    }]}
        onPress= {() => {Alert.alert(
            props.name,
            `Congratulations, you have walked for more than ${props.requirement} kilometers`
        )}}>
            <Text style={styles.buttontext}>{props.name}</Text>
            <Icon
            name = {props.is_achieved ? 'party-popper' : 'lock' }
              size= {35}
            />
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
      textAlign: 'center',
      paddingLeft: 45
    },
    buttonAchieved: {
      height: 50,
      width: 320,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      margin: 10,
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
      borderRadius: 10,
    }
    
  });

export default Achievement
