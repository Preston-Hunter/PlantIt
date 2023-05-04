import { useEffect, useState } from "react"
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {Platform } from "react-native"
import {useNavigate} from "react-router-dom"

export default function PlantCard({image, plantId, scientific_name, name, navigation}){
    const [loaded, setLoaded] = useState(false)
    const [plant, setPlant] = useState(null)
    const navigate = useNavigate()


    function handleClick(){
        if (Platform.OS != "web"){
            // todo: this
            navigation.navigate("")
            return "not web"
        }
        // import {Router}
        navigate(`/plants/${plantId}`)  
        return "web"
    }

    return (
        <div style={{"flexDirection":"row","width":"20%", "height":"auto"}}>
            <img src = {image} onClick={handleClick} style={{"width":"80%"}}/>
            <br></br>
            <Text>{scientific_name}{name!="" ? `(${name})`:""}</Text>
        </div>
    )

}