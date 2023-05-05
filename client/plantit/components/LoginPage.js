import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import GenericButton from "./GenericButtons";


export default function LoginPage({user, setUser}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    useEffect(()=>{},[])

    function handleSubmit(e) {
      e.preventDefault();
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "username": username, "password":password }),
      })
        .then((r) =>{
            console.log(r)
            if(r.status==401){
                return null
            }
            return r.json()})
        .then((user) => {setUser(user)});
    }

    function handleLogout(){
        fetch("/api/logout", {
            method: "DELETE",
             }).then(_=>{setUser(null)})
    }
  
    function onLogin(us){
        console.log(us)
    }

    return (
    <View>
        <Text>{!user ? "none": user["username"]}</Text>


            <TextInput
            type="text"
            value={username}
            onChangeText={(text) => setUsername(text)}
            />
            
            <TextInput
            type="text"
            value={password}
            onChangeText={(text) => setPassword(text)}
            />
        <View>
            <GenericButton theme="submit"  label="login" onPressed={handleSubmit}/>

            <GenericButton label="logout" onPressed={handleLogout}/>
        </View>
    </View>
    );
    
}