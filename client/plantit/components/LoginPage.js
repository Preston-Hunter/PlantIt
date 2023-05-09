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
            <div id="user-info" className=" float-user-elements">
                {/* <div className="text-3xl text-center break-words pb-2">Name:</div> */}
                <div id = "username" className="text-3xl text-center break-words pb-2">Username:{user.username}</div>
                <div id = "email" className="text-3xl text-center break-words pb-2">email:{user.email}</div>
            </div>
            <div className="profile-pic-container float-user-elements">
                <input type="text" onChange={(e)=>{setimgURL(e.target.value)}}/>
                <button onClick={handleURLUpdate}>upload URL</button>
                <br></br>
                {/* <input type="file" onChange={handleAvatarChange}/> */}
                <img onClick={()=>{console.log("image clicked")}} src = "https://th.bing.com/th?id=OSK.1cd4f39e37aeaa997bfca886bce2e910&w=188&h=132&c=7&o=6&dpr=2.5&pid=SANGAM" alt="hey" id = "profile-pic"/>
                <div id = "bio">This is where we pull description of the user, made by them</div>
            </div>
    </View>
    );
    
}

