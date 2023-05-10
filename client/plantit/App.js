import Base from "./Base.js"
import Home from "./components/Home.js"
import Plant from "./components/Plant.js"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';

import React, { Component, useEffect, useState } from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom"
import {Platform, TextComponent } from "react-native"
import UserProfile from "./components/UserProfile.js";
import PlantsDisplay from "./components/PlantsDisplay.js";
import LoginPage from "./components/LoginPage.js";
import GardenHelper from "./components/GardenHelper.js";
import AdminPage from "./components/AdminPage.js";
import NavBar from "./components/NavBar.js";

const Stack = createNativeStackNavigator();
// navigation.navigate("About")
const Tab = createBottomTabNavigator();
export default function App(){
    const [plantsList, setPlantsList]= useState([])
    const [loaded, setLoaded] = useState(true)
    const [user,setUser] = useState(null)
    // const [web, setWeb] = useState(Platform.OS==="web")
    const [web, setWeb] = useState(false)

    const [isAdmin, setIsAdmin] = useState(determineAdminStatus(user))
    function determineAdminStatus(us){
        if (us==null){
            return false
        }
        return user.admin
    }

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
    const [temp, setTemp] = useState("yay")
    //End SearchTerms

    function checkSession(){
        
    return fetch("http://127.0.0.1:5555/check_session").then((response) => {

        if (response.ok) {
            response.json().then((user) => setUser(user));
        }
        })
    }
    

    useEffect(()=>{
        fetch("http://127.0.0.1:5555/plants").then(res=>{setTemp("777");return res.json()}).then(arr=>{setPlantsList(arr);}).then(checkSession().then(_=>setLoaded(true))).catch(function(error) {
            setTemp(error.message);
            console.log('There has been a problem with your fetch operation: ' + error.message);
            });
      }, []);

      useEffect(()=>{
        setIsAdmin(determineAdminStatus(user))
      },[user]
      )

    if (!web) {
        return (
        <>
        <NavigationContainer >
            {/* <Text className="text-3xl text-center break-words pb-2 bg-white">Hey</Text> */}

            <Tab.Navigator screenOptions={({route})=>({
                tabBarButton:[
                    "Plant"
                ].includes(route.name)? ()=>{
                    return null;
                }: undefined,
            })} >
                <Tab.Screen name = "Home" component = {Home}/>
                {isAdmin?<Tab.Screen name = "AdminPage" component = {AdminPage}/>: null}
                <Tab.Screen name = "Plant">
                    {props=>{return <Plant plantIdForNative = {1} random={true} {...props}/>}}
                </Tab.Screen>
                <Tab.Screen name="login">
                    {props=>{return <LoginPage isAdmin = {isAdmin} setUser = {setUser} user={user} {...props}/>}}
                </Tab.Screen>
                <Tab.Screen name = "Plants">                    
                    {props=>{return <PlantsDisplay loaded={loaded} plantsList={plantsList}
                setHigherSalinity={setHigherSalinity} setLowerSalinity={setLowerSalinity} setLowerLight={setLowerLight} setHigherLight={setHigherLight}
                setLowerHimidity={setLowerHimidity} setHigherHimidity={setHigherHimidity} setName={setName}
                setScientificName={setScientificName} setGenus={setGenus} setFamily={setFamily} setFlowerColor={setFlowerColor}
                minPh={minPh} maxPh={maxPh} lowerSalinity={lowerSalinity} higherSalinity={higherSalinity} lowerLight={lowerLight} 
                higherLight={higherLight} lowerHimidity={lowerHimidity} higherHumidity={higherHumidity} name={name}
                scientificName={scientificName} genus={genus} family={family} flowerColor={flowerColor} temp={temp} {...props}/>}}
                </Tab.Screen>
                <Tab.Screen name="gardenhelper">
                {props=>{return <GardenHelper loaded={loaded} plantsList={plantsList}
                setHigherSalinity={setHigherSalinity} setLowerSalinity={setLowerSalinity} setLowerLight={setLowerLight} setHigherLight={setHigherLight}
                setLowerHimidity={setLowerHimidity} setHigherHimidity={setHigherHimidity} setName={setName}
                setScientificName={setScientificName} setGenus={setGenus} setFamily={setFamily} setFlowerColor={setFlowerColor}
                minPh={minPh} maxPh={maxPh} lowerSalinity={lowerSalinity} higherSalinity={higherSalinity} lowerLight={lowerLight} 
                higherLight={higherLight} lowerHimidity={lowerHimidity} higherHumidity={higherHumidity} name={name}
                scientificName={scientificName} genus={genus} family={family} flowerColor={flowerColor} temp={temp} {...props}/>}}

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
            {/* <Text className="text-3xl text-center break-words pb-2">Heyg</Text> */}
            <div style={{ display: 'flex', flexDirection: 'column', width:"100%" }}>
            <NavBar isAdmin={isAdmin} />
            <br></br>
            <Routes>
            
                <Route path="/" element={<Home/>}/>
                <Route path = "/plants/:id" element={<Plant web={web} />}/>
                <Route path = "/plants" element={<PlantsDisplay loaded={loaded} plantsList={plantsList}
                setHigherSalinity={setHigherSalinity} setLowerSalinity={setLowerSalinity} setLowerLight={setLowerLight} setHigherLight={setHigherLight}
                setLowerHimidity={setLowerHimidity} setHigherHimidity={setHigherHimidity} setName={setName}
                setScientificName={setScientificName} setGenus={setGenus} setFamily={setFamily} setFlowerColor={setFlowerColor}
                minPh={minPh} maxPh={maxPh} lowerSalinity={lowerSalinity} higherSalinity={higherSalinity} lowerLight={lowerLight} 
                higherLight={higherLight} lowerHimidity={lowerHimidity} higherHumidity={higherHumidity} name={name}
                scientificName={scientificName} genus={genus} family={family} flowerColor={flowerColor} web={web} />}/>
                <Route path = "/gardenhelper" element={<GardenHelper loaded={loaded} plantsList={plantsList}
                setHigherSalinity={setHigherSalinity} setLowerSalinity={setLowerSalinity} setLowerLight={setLowerLight} setHigherLight={setHigherLight}
                setLowerHimidity={setLowerHimidity} setHigherHimidity={setHigherHimidity} setName={setName}
                setScientificName={setScientificName} setGenus={setGenus} setFamily={setFamily} setFlowerColor={setFlowerColor}
                minPh={minPh} maxPh={maxPh} lowerSalinity={lowerSalinity} higherSalinity={higherSalinity} lowerLight={lowerLight} 
                higherLight={higherLight} lowerHimidity={lowerHimidity} higherHumidity={higherHumidity} name={name}
                scientificName={scientificName} genus={genus} family={family} flowerColor={flowerColor} web={web} />}/>
                <Route path = "/login" element = {<LoginPage user={user} setUser={setUser}></LoginPage>}></Route>
                <Route path = "/users/:id" element={<UserProfile></UserProfile>}></Route>
                {isAdmin?<Route path = "/adminpage" element={<AdminPage/>}></Route>:null}
            </Routes>
            </div>
        </BrowserRouter>
        );
    }

}