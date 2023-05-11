import { StyleSheet, Image, View } from 'react-native';
export default function ImageViewer({img, styles}){
    // img = require('./champl ain.png')
    return (
    <View style={oldStyles.imageContainer}>
        <Image source={img} style={styles} ></Image>
    </View>
    )
    
}

const oldStyles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        width:"100%",
        height:"100%",

      },
      image: {
        width: "80%",
        height:"100%",

        borderRadius: 18,
      },
    }
)