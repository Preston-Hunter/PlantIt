import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from 'react-native';


export default function LoginPage({user, setUser}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    useEffect(()=>{},[])

    function handleSubmit(e) {
      e.preventDefault();
      fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "username": username, "password":password }),
      })
        .then((r) =>{
            console.log(r.status)
            if(r.status==401){
                return null
            }
            return r.json()})
        .then((user) => {setUser(user)});
    }

    function handleLogout(){
        fetch("http://127.0.0.1:5555/logout", {
            method: "DELETE",
             }).then(_=>{setUser(null)})
    }
  
    function onLogin(us){
        console.log(us)
    }

    return (
    <div>
        <Text>{!user ? "none": user["username"]}</Text>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
          
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleLogout}>logout</button>
    </div>
    );
    
}