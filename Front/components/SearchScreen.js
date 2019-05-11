import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation'

const apiData = {
    url: 'http://192.168.2.130:5000'
}

class MainScreen extends React.Component {

    

    render() {
        return (
            <View style = {styles.container}>
                <Text>SÖKMIG</Text>
            </View>
        )
    }
}
export default MainScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });