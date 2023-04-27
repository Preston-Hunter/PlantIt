import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button'
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";

export default function App() {
  let champ =  require('./components/champlain.png')
  const [selectedImage, setSelectedImage] = useState(champ)

  
  let websit = {uri:'https://docs.expo.dev/static/images/tutorial/background-image.png'}
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage({uri:result.assets[0].uri});
    } else {
      alert('You did not select any image.');
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={{color:'#fff'}}>Open up App.js to start working on your app!</Text>
      <ImageViewer img = {selectedImage}></ImageViewer>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPressed={pickImageAsync}/>
        <Button label="Use this photo" onPressed={()=>alert("button press")} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer:{
    flex: 1 / 3,
    alignItems: 'center',
  }
});
