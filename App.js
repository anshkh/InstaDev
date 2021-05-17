import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main"
import AddScreen from './components/main/Add'
import ProfileScreen from './components/main/Profile'
import ChatsScreen from './components/main/Chats'
import SaveScreen from './components/main/Save'
import fbConfig from './utils/Config'
const Stack = createStackNavigator();

//firebase setup
import firebase from 'firebase/app';

const firebaseConfig = fbConfig;
console.log(firebaseConfig);

if(firebase.apps.length === 0)
{
 firebase.initializeApp(firebaseConfig);
}

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk))

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded : false,
      loggedIn : false
    };
  }

  componentDidMount(){
    firebase.default.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({loggedIn : false, loaded : true})
      }else{
        this.setState({loggedIn : true, loaded : true})
      }
    });
  }

  render() {
    const {loggedIn,loaded} = this.state;
    if(!loaded){
      //ToastAndroid.show('Hi I am Simple Toast', ToastAndroid.SHORT);
      return(
      <View style={{flex:1, justifyContent:'center'}}>
        <Text>
          Loading....
        </Text>
      </View>
      )
    }
    if(!loggedIn){
      return(
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Landing">
            <Stack.Screen name="Landing" component = {LandingScreen} options = {{headerShown:false}}/>
            <Stack.Screen name="Register" component = {RegisterScreen} options = {{headerShown:true}}/>
            <Stack.Screen name="Login" component = {LoginScreen} options = {{headerShown:true}}/>
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return(
      <Provider store = {store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Main">
              <Stack.Screen name="Main" component = {MainScreen} options = {{headerShown:false}}/>
              <Stack.Screen name="Add" component = {AddScreen} navigation = {this.props.navigation}/>
              <Stack.Screen name="Save" component = {SaveScreen} navigation = {this.props.navigation}/>
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
