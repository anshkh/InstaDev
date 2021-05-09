import React from 'react'
import { View, Text } from 'react-native'
import {GlobalStyles} from '../../utils/style/GlobalStyles'

export default function Profile() {
    return (
        <View style={GlobalStyles.droidSafeArea}>
            <Text>
                Profiles of User
            </Text>
        </View>
    )
}
