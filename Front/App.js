import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation'
import MainScreen from './components/MainScreen'
import InventoryScreen from './components/InventoryScreen'
import SearchScreen from './components/SearchScreen'
import RecipeScreen from './components/RecipeScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
} 

const TabNavigator = createBottomTabNavigator({
  Explore: {
    screen: MainScreen
  },
  Search: {
    screen: SearchScreen
  },
  Inventory: {
    screen: InventoryScreen
  }
},
  { initialRouteName:"Explore",
    navigationOptions: {
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Main') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge; 
        } else if (routeName === 'Search') {
          iconName = `ios-options`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    } 
}
)

const StackNavigator = createStackNavigator({
  Explore: {
    screen: TabNavigator
  },
  Recipe: {
    screen: RecipeScreen
  }
}
)

const SwitchNavigator = createSwitchNavigator({
  Tab: {
    screen: TabNavigator
  },
  Stack: {
    screen: StackNavigator
  },
  initialRouteName: "Tab"
})

const AppContainer = createAppContainer(SwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
