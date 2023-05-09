import { useState } from "react"
import { SearchBar } from "react-native-elements"
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import {Platform } from "react-native"
import PlantCard from "./PlantCard";

export default function GardenHelper({plantsList, loaded,
    setHigherSalinity, setLowerSalinity, setLowerLight, setHigherLight,
    setLowerHimidity, setHigherHimidity, setName,
    setScientificName, setGenus, setFamily, setFlowerColor,
    minPh, maxPh, lowerSalinity, higherSalinity, lowerLight, 
    higherLight, lowerHimidity, higherHumidity, name,
    scientificName, genus, family, flowerColor, temp, navigation, web }){
    
    const [stringSearch, setStringSearch] = useState("")
    const [val, setVal] = useState("")
    const defaultValue = ""

    let filteredPlants = plantsList.filter((plant)=>{
        // String
        if ((plant.name.includes(stringSearch))){return true}
        if ((plant.scientific_name.includes(stringSearch))){return true}
        if ((plant.flower_color.includes(stringSearch))){return true}
        if ((plant.genus.includes(stringSearch))){return true}
        if ((plant.family.includes(stringSearch))){return true}
        return false;
      })


    return(      
        <ScrollView style={{width:"100%"}}>

            <SearchBar inputStyle={{width:"100%"}} value={val} containerStyle={Platform.OS==="web"? {width:"100%"}:{width:"100%"}} placeholder={"search"} id = {"broad-search"} 
            onChangeText={(text)=>{
                if(text===""){
                    setStringSearch(defaultValue)
                    setVal(undefined)
                }
                else{setStringSearch(text); setVal(text)}
            }}/>
            <View className="cards" style={{display:"flex","flexDirection":"row", "alignContent": "stretch","flexWrap": "wrap", "width":"100%"}}>
            {filteredPlants.map((plant=>{return <PlantCard web={web} navigation={navigation} plantId={plant.id} name={plant.name}  scientific_name={plant.scientific_name} image = {plant.image} key = {plant.id}></PlantCard>}))}
            </View>

        </ScrollView>

    )
    
}