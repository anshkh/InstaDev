import {USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE} from '../constants/index'
import firebase from 'firebase'

export function fetchUser(){
    return ((dispatch) => {
        firebase.default.firestore()
        .collection("users")
        .doc(firebase.default.auth().currentUser.uid)
        .get()
        .then((user) => {
            if(user.exists){
                dispatch({type: USER_STATE_CHANGE, currentUser : user.data()});
            }
            else{
                console.log('User does not exist')
            }
        })
    })
}

export function fetchUserPosts(){
    return ((dispatch) => {
        firebase.default.firestore()
        .collection("posts")
        .doc(firebase.default.auth().currentUser.uid)
        .collection("userPosts")
        .orderBy("created","asc")
        .get()
        .then((snapshot) => {
            let posts = snapshot.docs.map(doc => {
                const data = doc.data(); 
                const id = doc.id;
                return {id,...data};
            })
            dispatch({type: USER_POSTS_STATE_CHANGE, posts});
            console.log(posts);
        })
    })
}