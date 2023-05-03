import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function Plant({random}){
    const [loaded, setLoaded] = useState(false)
    const [loaded2, setLoaded2] = useState(false)

    const [plant, setPlant] = useState(null)
    const { id } = useParams()
    const [favorited, setFavorited] = useState(false)

    useEffect(()=>{
        fetch("http://127.0.0.1:5555/userplants").then(resp=>resp.json())
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
            console.log(arr)
            if((arr.length)!=0){
                return arr[0]
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
        .then(_=>{if(_){setLoaded2(true)}})
            
        }, [id])


    function handleFavorite(){
        fetch(`http://127.0.0.1:5555/userplants}`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({"user_id":1, "plant_id":id,"liked":1,"planted":0})
        })
    }

    function handleUnfavorite(){
        fetch("http://127.0.0.1:5555/userplants").then(resp=>resp.json())
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
            fetch(`http://127.0.0.1:5555/userplants/${userplant.id}`, {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                }
            })

        })


    }


    let fetch_route = "randomplant"
    if (!random){
        fetch_route = `plants/${id}`
    }



        if (!loaded || !loaded2){
            return <Text>loading...{loaded}{random ? "true":"false"}</Text>
        }
    return (
    <div>
        <img src = {plant.image} style={{width:"50%"}}></img>
        <Text>Name:{plant.name}</Text>
        <Text>Scientific name:{plant.scientific_name}</Text>
        <Text>Family/Genus: {plant.family}/{plant.genus}</Text>
        <Text>Characteristics
            <Text>Flower color:{plant.flower_color}</Text>
        </Text>
        <Text>Growing Recomendations
            <Text>ph_max:{plant.ph_max}</Text>
            <Text>ph_min:{plant.ph_min}</Text>
            <Text>salinity:{plant.salinity}</Text>
            <Text>light:{plant.light}</Text>
            <Text>atmospheric humidity:{plant.atmo_humidity}</Text>
        </Text>
        <Text>Source:{plant.api_link}</Text>
        {favorited ?         
        <button  onClick={handleUnfavorite}>Unfavorite</button>:
        <button onClick={handleFavorite}>Favorite</button>
        }
    </div>)
}