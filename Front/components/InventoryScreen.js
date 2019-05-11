import React from 'react';
import { TextInput , StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, ListView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const apiData = {
    url: 'http://192.168.2.130:5000'
}

class MainScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            item: null,
            amount:null,
            inventory: []
        }
        this.retrieveItems = this.retrieveItems.bind(this)
    }
    
    async removeItem(item){
        await fetch(apiData.url + '/remove-item?item='+item, {
            method: 'GET'
        })
        .then(response => console.log(response))
    }
    
    async addItem(item, amount){
        console.log(item)
        await fetch(apiData.url + '/add-item?item='+item+","+amount, {
            method: 'GET'
        })
        .then(response => console.log(response))
    }
    
    async retrieveItems(){
        let items = null;
        await fetch(apiData.url + '/retrieve-items', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(function(responseJson){
            items = responseJson
        })
        console.log("hello: " + items)
        this.setState({
            inventory: items
        })
    }

    async componentDidMount() {
        await this.retrieveItems()
        console.log(this.state.inventory)
    }

    handleClick = async (item, amount) => {
        await this.addItem(item, amount)
        this.retrieveItems()
    }

    render() {
        if(this.state.inventory === []){
            return (
                <View style = {styles.container}>
                    <Text>You have no items!</Text>}/>
                    <View style = {styles.footer}>
                        <TextInput style={{
                            padding: 10
                        }} placeholder = "Item to Add" onChangeText = {(text) => this.setState({
                            item: text
                        })}/>
                        <TextInput keyboardType = 'numeric' placeholder = "1" onChangeText = {(text) => this.setState({
                            amount: text
                        })}/>
                        <TouchableOpacity style={styles.footerHeight} onPress ={() => this.handleClick(this.state.item, this.state.amount)}>
                            <Text style={{
                                fontSize: 16
                            }} > Add To Fridge </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }else{
            return (
                <View style = {styles.container}>
                    <FlatList data = {this.state.inventory} renderItem={({item}) => 
               <Text>{item.name}</Text>} numColumns={3}/>
                    <KeyboardAvoidingView  behavior="padding" enabled>
                    <View style = {styles.bottomPos}>
                    
                        <TextInput style={
                            styles.addItemInput
                        } placeholder = "Add growseries" onChangeText = {(text) => this.setState({
                            item: text
                        })}/>
                        <TextInput style={styles.inputNum} keyboardType = 'numeric' placeholder = "1" onChangeText = {(text) => this.setState({
                            amount: text
                        })}/>
                        <TouchableOpacity style={styles.footerHeight} onPress ={() => this.handleClick(this.state.item, this.state.amount)}>
                            <Text style={styles.addButton} > + </Text>
                        </TouchableOpacity>

                    </View>
                    </KeyboardAvoidingView>
                </View>
            )
        }

    }
}
export default MainScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ECECEC',
      flexDirection: 'column'
    },
    footer: {
        flex: 1,
        flexDirection: 'row'
    },



    bottomPos: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 32,
        alignItems: 'flex-end'   
      },


    addItemInput: {
        padding: 10,
        fontSize: 32,
        borderBottomColor: '#707070',
        borderBottomWidth: 1,
    
        
      },


      inputNum:{
        padding: 10,
        fontSize: 32,
        borderBottomColor: '#707070',
        borderBottomWidth: 1,
        marginLeft: 16
        
        
      },


      footerHeight: {
        color: '#fff',
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems:'center',
        width:42,
        height:42,
        backgroundColor:'#000',
        borderRadius:50,
        marginBottom:8,
        marginLeft: 16
    },

      addButton:{
        fontSize: 16,
        color: '#fff',
        justifyContent: 'center'
      }
  });