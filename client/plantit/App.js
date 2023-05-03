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

    useEffect(()=>{
        fetch("http://localhost:5555/plants").then(res=>res.json()).then(arr=>{setPlantsList(arr)}).then(setLoaded(true));
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
                <Route path = "/plants" element={<PlantsDisplay loaded={loaded} plantsList={plantsList}/>}/>
                <Route path = "/login" element = {LoginPage}></Route>
                <Route path = "/users/:id" element={<UserProfile></UserProfile>}></Route>
                
            </Routes>
        </BrowserRouter>
        );
    }

}