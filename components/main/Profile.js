import React from 'react'
import { FlatList, View, Image, Text } from 'react-native'
import {GlobalStyles} from '../../utils/style/GlobalStyles'
import { connect } from 'react-redux'

function Profile() {
    return (
        <View style={GlobalStyles.droidSafeArea}>
            <Text>
                Profiles of User
            </Text>
        </View>
    )
}

const mapStateToProps =  (store) => ({
    currentUser : store.userState.currentUser,
    posts : store.userState.posts
});
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts},dispatch)

export default connect(mapDispatchProps,null)(Profile);
