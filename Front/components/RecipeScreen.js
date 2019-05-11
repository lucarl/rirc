import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

const apiData = {
    url: 'http://192.168.2.130:5000'
}

export default class RecipeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            recipe: this.props.navigation.getParam('recipe', null),
            ingredients: []
        }
    }

    componentWillMount(){
        const temp = this.state.recipe.usedIngredients.concat(this.state.recipe.unusedIngredients)
        .concat(this.state.recipe.missedIngredients)

        temp.map((item) =>
        console.log("tjohoooo"+ item.original))

        this.setState({
            ingredients: temp
        })
       
    }

    render() {
        return (
            <View style = {styles.container}>
                <Text style={{fontSize: 50}}>{this.state.recipe.title}</Text>
                <Image style={{height: 150,
                               width: 150 }} 
                        source={{uri: this.state.recipe.image}}/>
                <Text style={{fontSize: 30}}> Ingredients: </Text>
                <FlatList data = {this.state.ingredients} renderItem={({item}) => 
                        <View style={styles.container}>
                            <Text>{item.original}</Text>
                        </View> 
                    } numColumns={1}/>
            </View>
        )
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