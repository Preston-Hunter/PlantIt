import { useEffect, useState } from "react";
import PlantCard from "./PlantCard"
import { StyleSheet, Text, View, Pressable } from 'react-native';
import SearchBar from "./SearchBar";

export default function PlantsDisplay({plantsList, loaded,
  setHigherSalinity, setLowerSalinity, setLowerLight, setHigherLight,
  setLowerHimidity, setHigherHimidity, setName,
  setScientificName, setGenus, setFamily, setFlowerColor,
  minPh, maxPh, lowerSalinity, higherSalinity, lowerLight, 
                higherLight, lowerHimidity, higherHumidity, name,
                scientificName, genus, family, flowerColor 
}){
  
    let filteredPlants = plantsList.filter((plant)=>{
      // String
      if (!(plant.name.includes(name))){return false}
      if (!(plant.scientific_name.includes(scientificName))){return false}
      if (!(plant.flower_color.includes(flowerColor))){return false}
      if (!(plant.genus.includes(genus))){return false}
      if (!(plant.family.includes(family))){return false}

      // Numerical
      if (!(plant.ph_min >= minPh)){return false}
      if (!(plant.ph_max <= maxPh)){return false}
      
      if (!(plant.salinity >= lowerSalinity)){return false}
      if (!(plant.salinity <= higherSalinity)){return false}
      
      if (!(plant.light >= lowerLight)){return false}
      if (!(plant.light <= higherLight)){return false}
      
      if (!(plant.atmo_humidity >= lowerHimidity)){return false}
      if (!(plant.atmo_humidity <= higherHumidity)){return false}      
      return true;
    })
    // setFilteredPlantsList(filteredPlants)

    if (!loaded){
        return <Text>loading</Text>
    }
    // console.log(plantsList)
    return (   
      <div>
        <SearchBar setHigherSalinity={setHigherSalinity} setLowerSalinity={setLowerSalinity} setLowerLight={setLowerLight} setHigherLight={setHigherLight}
                setLowerHimidity={setLowerHimidity} setHigherHimidity={setHigherHimidity} setName={setName}
                setScientificName={setScientificName} setGenus={setGenus} setFamily={setFamily} setFlowerColor={setFlowerColor}/>
        <ul className="cards" style={{display:"flex", "flexWrap": "wrap", "width":"100%"}}>
          {filteredPlants.map((plant=>{return <PlantCard plantId={plant.id} name={plant.name}  scientific_name={plant.scientific_name} image = {plant.image} key = {plant.id}></PlantCard>}))}
        </ul>
      </div>
        )
}