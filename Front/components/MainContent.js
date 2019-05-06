import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

export default class MainContent extends Component {
  constructor() {
    super()
    this.state = {
        character: null
    }
  }

  componentDidMount() {
    fetch("http://172.20.10.2:5000/foob")
      .then(response => response.json())
      .then(data => {
          this.setState({
            character: data
          })
      })
  }

  render() {

    if(this.state.character === null) {
      
      return( <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>loading...</Text>
              </View>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{this.state.character[0].id}</Text>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: this.state.character[0].image}}
        />
      </View>
    );
  }
}