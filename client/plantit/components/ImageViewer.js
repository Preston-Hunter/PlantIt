import { StyleSheet, Image, View } from 'react-native';
export default function ImageViewer({img}){
    // img = require('./champl ain.png')
    return (
    <View style={styles.imageContainer}>
        <Image source={img} style={styles.image} ></Image>
    </View>
    )
    
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        paddingTop: 58,
      },
      image: {
        width: 320,
        height: 440,
        borderRadius: 18,
      },
    }
)