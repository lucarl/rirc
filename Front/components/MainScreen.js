import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

const apiData = {
    url: 'http://192.168.2.130:5000'
}

class MainScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            recipes: []
        }
        this.recipes = this.getRecipes.bind(this)
    }

    async getRecipes(){
        let items = null;
        await fetch(apiData.url + '/recipes', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(function(responseJson){
            items = responseJson
        })
        console.log("hello: " + items)
        this.setState({
            recipes: items
        })
    }

    async componentDidMount() {
        await this.getRecipes()
        console.log(this.state.recipes)
    }

    render() {
        if(this.state.inventory === []){
            return (
                <View style = {styles.container}>
                    <Text>You have no items!</Text>}/>
                </View>
            )
        }else{
            return (
                <View>
                    <Text style={{
                        fontSize: 32,
                        padding: 20,
                        marginTop: 50
                        }}>You can cook:</Text>
                    <FlatList data = {this.state.recipes} renderItem={({item}) => 
                        <View style={styles.container}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Recipe', {
                                recipe: item
                            })}>
                                <Image style={{width: 120, height: 120}} 
                                    source={{uri: item.image}}/>
                            </TouchableOpacity>
                        </View> 
                    } numColumns={3}/>
                </View>
        )
        }
    }
}
export default MainScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
      margin: 1
    },
    footer: {
        flex: 1,
        flexDirection: 'row'
    },
    footerHeight: {
        height: 20
    }
  });
    
