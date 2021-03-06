import React, { Component } from 'react';
import { StyleSheet} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import {Icon} from 'react-native-elements'
import Plants from './Plants'
import SearchBody from './SearchBody'
import DiseaseController from './DiseaseController'
export default class PlantsController extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({tintColor}) => (
    <Icon name='search' style={{color: tintColor}} />
    )
  };

  render() {
    return (
      <AppStackNavigator/>
    );
  }
}

const AppStackNavigator =createAppContainer(createStackNavigator({
  Plants:Plants,
  Search:SearchBody,
  Disease:DiseaseController
}, {
  defautNavigationOptions: {
    gesturesEnabled: false
  },
}));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
