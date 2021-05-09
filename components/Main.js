import React, { Component } from 'react'
import { View,Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FeedScreen from './main/Feed'
import AddScreen from './main/Add'
import ProfileScreen from './main/Profile'
import ChatsScreen from './main/Chats'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
    return (null)
}
export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        const currentUser = this.props;
        if(currentUser == undefined){
            return (
                <View style={{flex:1, justifyContent:'center'}}>
                    
                </View>
            )
        }
        return (
            <Tab.Navigator initialRouteName="Feed" labeled={false}>
                <Tab.Screen name="Feed" component={FeedScreen}
                listeners = {({navigation}) => ({
                    tabPress : event => {
                        event.preventDefault();
                        navigation.navigate("Feed")
                    }
                })}
                options = {{
                    tabBarOptions: {
                        showLabel: false
                    },
                    tabBarIcon : ({color,size}) => {
                        return (<Icon name="home" showLabel = "false" color={color} size = {28}/>)
                    }
                }}/>
                <Tab.Screen name="Add Image" component={EmptyScreen} 
                listeners = {({navigation}) => ({
                    tabPress : event => {
                        event.preventDefault();
                        navigation.navigate("Add")
                    }
                })}
                options = {{
            
                    tabBarIcon : ({color,size}) => {
                        return (<Icon name="plus-box" color={color} size = {28}/>)
                    }
                }}/>
                <Tab.Screen name="Profile" component={ProfileScreen} 
                options = {{
            
                    tabBarIcon : ({color,size}) => {
                        return (<Icon name="account" color={color} size = {28}/>)
                    }
                }}/>
                <Tab.Screen name="Chats" component={ChatsScreen} 
                options = {{
            
                    tabBarIcon : ({color,size}) => {
                        return (<Icon name="chat" color={color} size = {28}/>)
                    }
                }}/>
            </Tab.Navigator>
        )
    }
}
const mapStateToProps =  (store) => {
    currentUser : store.userState.currentUser
};
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser},dispatch)

export default connect(null,mapDispatchProps)(Main);
