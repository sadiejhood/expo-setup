import React, { useEffect, setState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const hasPermission = true;
  const cameraType = Camera.Constants.Type.back;

  getPermissionAsync = async () => {
      // Camera roll Permission 
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      // Camera Permission
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      
    }

  useEffect(() => {
      getPermissionAsync()
  }, []);


  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }

  takePicture = async () => {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
    }
  }
    
  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={cameraType}>
          <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',                  
                }}
                onPress={() => this.pickImage()}>
                <Ionicons
                    name="ios-photos"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={() => this.takePicture()}
                >
                <FontAwesome
                    name="camera"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
            </View>
          </Camera>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

// 'use strict';
// import React, { PureComponent, useState, useEffect } from 'react';
// import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import * as Permissions from 'expo-permissions';


// const CameraApp = () => {
//     let [flash, setFlash] = useState('off')
//     let [zoom, setZoom] = useState(0)
//     let [autoFocus, setAutoFocus] = useState('on')
//     let [depth, setDepth] = useState(0)
//     let [type, setType] = useState('back')
//     let [permission, setPermission] = useState('undetermined')

//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
// //       this.setState({ hasPermission: status === 'granted' });
//     // let cameraRef = useRef(null)
//     useEffect(() => {
//         Permissions.check('photo').then(response => {
//         // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
//         setPermission(response);
//         });
//     }, []);

//     toggleFlash = () => {
//         setFlash(flashModeOrder[flash])
//     }
//     zoomOut = () => {
//         setZoom(zoom - 0.1 < 0 ? 0 : zoom - 0.1)
//     }
//     zoomIn = () => {    
//         setZoom(zoom + 0.1 > 1 ? 1 : zoom + 0.1);
//     }
//     takePicture = async() => {
//         if (cameraRef) {
//             const options = { quality: 0.5, base64: true };
//             const data = await cameraRef.current.takePictureAsync(soptions);
//             console.log(data.uri);  
//         }
//     };
//     return (
//       <View >
//         <RNCamera
//           type={type}
//           flashMode={flash}
//         />
//         <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//           <TouchableOpacity onPress={takePicture}>
//             <Text style={{ fontSize: 14 }}> SNAP </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
// }
// export default CameraApp;