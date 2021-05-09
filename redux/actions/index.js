import {USER_STATE_CHANGE} from '../constants/index'
import firebase from 'firebase'

export function fetchUser(){
    return ((dispatch) => {
        firebase.default.firestore()
        .collection("users")
        .doc(firebase.default.auth().currentUser.uid)
        .get()
        .then((user) => {
            if(user.exists){
                console.log(user.data())
                dispatch({type: USER_STATE_CHANGE, currentUser : user.data()});
            }
            else{
                console.log('User does not exist')
            }
        })

    })
}