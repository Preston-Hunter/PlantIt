import { useEffect, useState } from "react"
import { StyleSheet, Text, View, Pressable,Image } from 'react-native';
import {Platform } from "react-native"
import {useNavigate} from "react-router-dom"
import ImageViewer from "./ImageViewer";
export default function PlantCard({image, plantId, scientific_name, name, navigation, plantIdForNative, web}){
    const [loaded, setLoaded] = useState(false)
    const [plant, setPlant] = useState(null)
    let navigate = null
    if(web){
        navigate = useNavigate()
    }

    function handleClick(){
        if (!web){
            navigation.navigate("Plant",{"plantIdForNative":plantIdForNative, "web":web})
        }
        navigate(`/plants/${plantId}`)  
    }

    return (
        <View style={{"width":"20%", "height":"200px"}}>
            <Pressable onPress={handleClick} style={{width:"100%", height:"80%"}}>
                {/* <img src = {image} style={{"width":"80%", maxHeight:"100%"}}/> */}
                <ImageViewer img={{uri:image}} styles={{"width":"80%", height:"100%"}}/>
            </Pressable>
            {/* <br></br> */}
            <Text>{scientific_name}{name!="" ? `(${name})`:""}</Text>
        </View>
    )

}