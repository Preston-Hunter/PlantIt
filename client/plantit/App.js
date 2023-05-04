import Base from "./Base.js"
import Home from "./components/Home.js"
import Plant from "./components/Plant.js"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React, { Component, useEffect, useState } from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom"
import {Platform } from "react-native"
import UserProfile from "./components/UserProfile.js";
import PlantsDisplay from "./components/PlantsDisplay.js";
import LoginPage from "./components/LoginPage.js";




const Stack = createNativeStackNavigator();
// navigation.navigate("About")
const Tab = createBottomTabNavigator();
export default function App(){
    const [plantsList, setPlantsList]= useState([])
    const [loaded, setLoaded] = useState(false)
    const [user,setUser] = useState(null)
    // const [filteredPlantsList, setFilteredPlantsList] = useState([])

    //For filters/searching
    const [minPh, setMinPh] = useState(-20)
    const [maxPh, setMaxPh] = useState(20)

    const [lowerSalinity, setLowerSalinity] = useState(0)
    const [higherSalinity, setHigherSalinity] = useState(Infinity)

    const [lowerLight, setLowerLight] = useState(0)
    const [higherLight, setHigherLight] = useState(Infinity)

    const [lowerHimidity, setLowerHimidity] = useState(0)
    const [higherHumidity, setHigherHimidity] = useState(Infinity)

    const [name, setName] = useState("")
    const [scientificName, setScientificName] = useState("")
    const [genus, setGenus] = useState("")
    const [family, setFamily] = useState("")
    const [flowerColor, setFlowerColor] = useState("")
    //End SearchTerms

    function checkSession(){
        
    return fetch("http://127.0.0.1:5555/check_session").then((response) => {

        if (response.ok) {
            response.json().then((user) => setUser(user));
        }
        })
    }
    

    useEffect(()=>{
        fetch("http://localhost:5555/plants").then(res=>res.json()).then(arr=>{setPlantsList(arr);}).then(checkSession().then(_=>setLoaded(true)));
      }, []);


    if (Platform.OS !== 'web') {
        return (
        <>
        <NavigationContainer >
            <Tab.Navigator >
                <Tab.Screen name = "Base" component = {Base}/>
                <Tab.Screen name = "Home" component = {Home}/>
                <Tab.Screen name = "Plant">
                    {props=>{return <Plant random={true} {...props}/>}}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
        {/* <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name = "null" component={<div/>}></Stack.Screen>
                <Stack.Screen name = "plan" component={Plant}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer> */}
        </>
        );
    }
    else{
        return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Base/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path = "/plants/:id" element={<Plant random = {false}/>}/>
                <Route path = "/plants" element={<PlantsDisplay loaded={loaded} plantsList={plantsList}
                setHigherSalinity={setHigherSalinity} setLowerSalinity={setLowerSalinity} setLowerLight={setLowerLight} setHigherLight={setHigherLight}
                setLowerHimidity={setLowerHimidity} setHigherHimidity={setHigherHimidity} setName={setName}
                setScientificName={setScientificName} setGenus={setGenus} setFamily={setFamily} setFlowerColor={setFlowerColor}
                minPh={minPh} maxPh={maxPh} lowerSalinity={lowerSalinity} higherSalinity={higherSalinity} lowerLight={lowerLight} 
                higherLight={higherLight} lowerHimidity={lowerHimidity} higherHumidity={higherHumidity} name={name}
                scientificName={scientificName} genus={genus} family={family} flowerColor={flowerColor}/>}/>
                <Route path = "/login" element = {<LoginPage user={user} setUser={setUser}></LoginPage>}></Route>
                <Route path = "/users/:id" element={<UserProfile></UserProfile>}></Route>
            </Routes>
        </BrowserRouter>
        );
    }

}