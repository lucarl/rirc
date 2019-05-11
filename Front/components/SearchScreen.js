import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation'



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