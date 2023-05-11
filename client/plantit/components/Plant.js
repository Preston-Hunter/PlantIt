import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import CommentsSection from "./CommentsSection";

export default function Plant({plantIdForNative, web, user }){
    const [loaded, setLoaded] = useState(false)
    const [loaded2, setLoaded2] = useState(false)

    const [plant, setPlant] = useState(null)
    let id = 0
    if (!web){
        id = plantIdForNative
    }
    else{
        id = useParams()["id"]
    }
    const [favorited, setFavorited] = useState(false)

    useEffect(()=>{
        fetch("https://plantitweb.onrender.com/userplants").then(resp=>resp.json())
        .then(arr=>arr.filter((up)=>{
            console.log(up.plant_id, up.user_id)
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
            console.log(_,"gg")
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






    if (!loaded || !loaded2){
        return <Text>loading...{loaded? "true":"false"}</Text>
    }

    return (
    <div>
        <img src = {plant.image} style={{width:"50%"}}></img>
        <br></br>
        <Text><Text style={{fontWeight:"bold"}}>Name:</Text>{plant.name}     </Text>
        <Text><Text style={{fontWeight:"bold"}}>Scientific name:</Text>{plant.scientific_name}     </Text>
        <Text><Text style={{fontWeight:"bold"}}>Family/Genus:</Text>{plant.family}/{plant.genus}     </Text>
        <br></br>
        <Text>Characteristics:
            <br></br>
            <Text>     Flower color:{plant.flower_color}</Text>
        </Text>
        <br></br>
        <Text >Growing Recomendations:
            <Text>     <Text style={{fontWeight:"bold"}}>ph_max:</Text>{plant.ph_max}</Text>
            <Text>     <Text style={{fontWeight:"bold"}}>ph_min:</Text>{plant.ph_min}</Text>
            <Text>     <Text style={{fontWeight:"bold"}}>salinity:</Text>{plant.salinity}</Text>
            <Text>     <Text style={{fontWeight:"bold"}}>light:</Text>{plant.light}</Text>
            <Text>     <Text style={{fontWeight:"bold"}}>atmospheric humidity:</Text>{plant.atmo_humidity}</Text>
        </Text>
        <br></br>
        <Text style={{fontStyle:"italic"}}>Source:{plant.api_link}</Text>
        {favorited ?         
        <button  onClick={handleUnfavorite}>Unfavorite</button>:
        <button onClick={handleFavorite}>Favorite</button>
        }
        <CommentsSection plantId={plant.id}></CommentsSection>
    </div>)
}