import { useEffect, useState } from "react";
import PlantCard from "./PlantCard"
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function PlantsDisplay({plantsList, setPlantsList, loaded}){
    let filterdList = []

    

    if (!loaded){
        return <Text>loading</Text>
    }
    console.log(plantsList)
    return (   
        <ul className="cards" style={{display:"flex", "flexWrap": "wrap", "height":"100%"}}>
          {plantsList.map((plant=>{return <PlantCard plantId={plant.id} name={plant.name}  scientific_name={plant.scientific_name} image = {plant.image} key = {plant.id}></PlantCard>}))}
        </ul>
        )
}