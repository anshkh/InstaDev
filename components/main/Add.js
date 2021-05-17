import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Button,Image} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function App({navigation}) {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const cameraStatus  = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1,1],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };

    const takePicture = async () => {
        if(camera){
            const data = await camera.takePictureAsync(null);
            setImage(data.uri);
        }
    }
    if (hasCameraPermission === null || hasGalleryPermission === false) {
        return (
            <View>
                
            </View>
        );
    }
    if (hasCameraPermission === false || hasGalleryPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
    <View style={styles.container}>
      <Camera style={styles.camera} 
        type={type} 
        ratio={"1:1"} 
        ref = {ref => setCamera(ref)}/>
 
          <Button
            title = "Flip Image"
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}/>
          <Button 
            title = "Take Picture"
            onPress={
                () => takePicture()
            }/>
            {image && <Image source={{uri:image}} style={{flex:1}}/>}
          <Button title="Pick from Gallery" 
            onPress={
                () => pickImage()
            } />
          <Button title="Save" 
            onPress={
                () => navigation.navigate('Save',{image})
            } />
    </View >
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        flex: 1,
        flexDirection:'row',
        aspectRatio:1,
        alignSelf:'flex-end',
        alignItems:'center'
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
