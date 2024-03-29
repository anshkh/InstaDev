import React, { Component } from 'react'
import {View, Button, TextInput, Text} from 'react-native'
import firebase from 'firebase'

export class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            name : ''
        };
        this.onSignUp = this.onSignUp.bind(this);
    }
    onSignUp(){
        const {email,password,name} = this.state;
        firebase.default.auth().createUserWithEmailAndPassword(email,password)
        .then((result) => {
            firebase.default.firestore().collection("users")
            .doc(firebase.default.auth().currentUser.uid)
            .set({
                name,
                email
            });
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
                placeholder="name"
                onChangeText={(name)=> this.setState({name:name})}/>
                <TextInput
                placeholder="email"
                onChangeText={(email)=> this.setState({email:email})}/>
                <TextInput
                placeholder="password"
                secureTextEntry = {true}
                onChangeText={(password)=> this.setState({password: password})}/>
                <Button title="Sign Up" onPress={() =>  this.onSignUp()}/>
            </View>
        )
    }
}

export default Register
