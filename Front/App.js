import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainContent from './components/MainContent'

export default class App extends React.Component {
  render() {
    return (
      <MainContent/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
