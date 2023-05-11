import { useEffect, useState } from "react"
import { StyleSheet, Text, View, Pressable,Image } from 'react-native';
import {Platform } from "react-native"
import {useNavigate} from "react-router-dom"
import ImageViewer from "./ImageViewer";
export default function PlantCard({image, plantId, scientific_name, name, navigation, web}){
    const [loaded, setLoaded] = useState(false)
    const [plant, setPlant] = useState(null)
    let navigate = function(){return null}
    if(web){
        navigate = useNavigate()
    }

    function handleClick(){
        if (!web){
            navigation.navigate("Plant",{"plantId":plantId, "web":web})
        }
        navigate(`/plants/${plantId}`)  
    }
    let img_width = "20%"
    if (web){
        console.log("")
    }
    else{
        img_width = "25%"
    }

    return (
        <View style={{"width":img_width, "height":200}}>
            <Pressable onPress={handleClick} style={{width:"100%", height:"80%"}}>
                {/* <img src = {image} style={{"width":"80%", maxHeight:"100%"}}/> */}
                <ImageViewer img={{uri:image}} styles={{"width":"80%", height:"100%"}}/>
            </Pressable>
            {/* <br></br> */}
            <Text>{scientific_name}{name!="" ? `(${name})`:""}</Text>
        </View>
    )

}