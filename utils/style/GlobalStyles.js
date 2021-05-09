import { StyleSheet, Platform } from 'react-native';
export const GlobalStyles =  StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 50 : 0,
        paddingLeft: Platform.OS === 'android' ? 10 : 0
    },
});