import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function Plant({random}){
    const [loaded, setLoaded] = useState(false)
    const [plant, setPlant] = useState(null)
    const { id } = useParams()

    let fetch_route = "randomplant"
    if (!random){
        fetch_route = `plants/${id}`
    }

    useEffect(()=>{
        fetch(`http://127.0.0.1:5555/${fetch_route}`)
        .then(resp=>{
            console.log(fetch_route)

            if (resp.status == 404){
                return null
            }
            return resp.json()})
        .then(plantData=>{

            if (plantData !== null){
                console.log(plantData)
                setPlant(plantData); 
                return true
            }
            return false
        })
        .then(_=>{if(_){setLoaded(true)}})
            
        }, [id])
        if (!loaded){
            return <Text>loading...{typeof(random)}{random ? "true":"false"}</Text>
        }
    return (
    <Text>
        hmmm {plant}
    </Text>)
}