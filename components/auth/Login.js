import React, { Component } from 'react'
import {View, Button, TextInput, Text} from 'react-native'
import firebase from 'firebase'

export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
        };
        this.onSignIn = this.onSignIn.bind(this);
    }
    onSignIn(){
        const {email,password} = this.state;
        firebase.default.auth().signInWithEmailAndPassword(email,password)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    render() {
        return (
            <View>
                <TextInput
                placeholder="email"
                onChangeText={(email)=> this.setState({email:email})}/>
                <TextInput
                placeholder="password"
                secureTextEntry = {true}
                onChangeText={(password)=> this.setState({password: password})}/>
                <Button title="Sign In" onPress={() =>  this.onSignIn()}/>
            </View>
        )
    }
}

export default Login
