import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import CommentsSection from "./CommentsSection";
import ImageViewer from "./ImageViewer";
import GenericButton from "./GenericButtons";

export default function Plant({web, user, route }){
    const [loaded, setLoaded] = useState(false)
    const [loaded2, setLoaded2] = useState(false)
    // const route = useRoute()
    const [plant, setPlant] = useState(null)

    let id = 0
    if (!web){
        const {plantId} = route.params
        id = plantId
    }
    else{
        id = useParams()["id"]
    }
    const [favorited, setFavorited] = useState(false)

    useEffect(()=>{
        fetch("https://plantitweb.onrender.com/userplants").then(resp=>resp.json())
        .then(arr=>arr.filter((up)=>{
            if (up.plant_id == id){
                if (up.user_id == 1){
                    return true
                }
            }
            return false

        }))
        .then(arr=>{

            if((arr.length)!=0){
                if(arr[0]["liked"]!=0){
                    return arr[0]
                }
            }
            return false
        }).then(_=>{
            setLoaded(true)
            if(_==false){
                setFavorited(false)
                return false
            }
            setFavorited(true)
            return true
        })
    },[])

    useEffect(()=>{
        fetch(`https://plantitweb.onrender.com/plants/${id}`)
        .then(resp=>{

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
        .then(_=>{if(_){setLoaded2(true)}})
            
        }, [id])

// delete favorite liked or platned im tired
    function handleFavorite(){
        fetch(`https://plantitweb.onrender.com/userplants`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({"user_id":1, "plant_id":id,"liked":1,"planted":0})
        }).then(_=>{setFavorited(!favorited)})
    }

    function handleUnfavorite(){
        fetch("https://plantitweb.onrender.com/userplants").then(resp=>resp.json())
        .then(arr=>arr.filter((up)=>{
            if (up.plant_id == id){
                if (up.user_id == 1){
                    return true
                }
            }
            return false

        }))
        .then(arr=>{
            if(arr.length!=0){
                return arr[0]
            }
            return false
        })
        .then(userplant=>{
            if(userplant===false){
                return false
            }
            fetch(`https://plantitweb.onrender.com/userplants/${userplant.id}`, {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                }
            })

        }).then(_=>{setFavorited(!favorited)})


    }






    if (!loaded || !loaded2 || (plant==null)){
        return <Text>loading...{loaded? "true":"false"}</Text>
    }

    return (
    <View>
        {/* <img src = {plant.image} style={{width:"50%"}}></img> */}
        <ImageViewer img={{uri:plant.image}} styles={{width:"50%"}}/>
        <Text><Text style={{fontWeight:"bold"}}>{"\n"}Name:</Text>{plant.name}     </Text>
        <Text><Text style={{fontWeight:"bold"}}>Scientific name:</Text>{plant.scientific_name}     </Text>
        <Text><Text style={{fontWeight:"bold"}}>Family/Genus:</Text>{plant.family}/{plant.genus}     {"\n"}</Text>
        <Text>Characteristics:{"\n"}
            <Text>     Flower color:{plant.flower_color}</Text>{"\n"}
        </Text>
        <Text >Growing Recomendations:
            <Text>     <Text style={{fontWeight:"bold"}}>ph_max:</Text>{plant.ph_max}</Text>
            <Text>     <Text style={{fontWeight:"bold"}}>ph_min:</Text>{plant.ph_min}</Text>
            <Text>     <Text style={{fontWeight:"bold"}}>salinity:</Text>{plant.salinity}</Text>
            <Text>     <Text style={{fontWeight:"bold"}}>light:</Text>{plant.light}</Text>
            <Text>     <Text style={{fontWeight:"bold"}}>atmospheric humidity:</Text>{plant.atmo_humidity}</Text>{"\n"}
        </Text>
        <Text style={{fontStyle:"italic"}}>Source:{plant.api_link}</Text>
        {favorited ?         
        <GenericButton  label="UnFavorite" onPressed={handleUnfavorite}></GenericButton>:
        <GenericButton label = "Favorite" onPressed={handleFavorite}></GenericButton>
        }
        <CommentsSection plantId={plant.id}/>
    </View>)
}