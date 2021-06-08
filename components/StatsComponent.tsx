import React from 'react'
import { Text, StatusBar, StyleSheet, View } from 'react-native'

interface Props {
     no_of_steps: number,
     no_of_km_walked: number,
     time_spent: string,
}

const StatsComponent = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
            <Text style={styles.ContainersHead}>Total number of steps covered : </Text>
            <Text style={styles.ContainersInfo}>{props.no_of_steps}</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomSide}>
                <Text style={styles.ContainersHead}>Total kilometers: </Text>
                <Text style={styles.ContainersInfo}>{props.no_of_km_walked} </Text>
                </View>
                <View style={styles.bottomSide2}>
                <Text style={styles.ContainersHead}>Total time: </Text>
                <Text style={styles.ContainersInfo}>{props.time_spent}</Text>
                </View>    
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    upperContainer: {
        flex:1,
        //borderWidth: 0.5,
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor : "grey"
    },
    bottomContainer: {
        flexDirection: 'row',
        flex:1,
    },
    bottomSide: {
        flex:1,
        borderColor: 'grey',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'white'
    },
    bottomSide2: {
        flex:1,
        borderColor: 'grey',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'yellow',
    },
    ContainersHead: {
        flex:0.5,
        fontFamily:'normal',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 0
    },
    ContainersInfo: {
        fontFamily:'normal',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 60
    }
    
  });

export default StatsComponent
