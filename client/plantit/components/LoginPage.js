import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import GenericButton from "./GenericButtons";


export default function LoginPage({user, setUser, isAdmin}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("")
    const [textEditable, setTextEditable] = useState(false)
    const [email, setEmail] = useState("")
    const [imgURL, setimgURL] = useState("")

    // useEffect(()=>{},[])
    useEffect(()=>{
        if(user!==null){
          setEmail(user.email)
          setimgURL(user.image)
          setBio(user.bio)
        }
      },[user])

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
        .then((user) => {console.log(user);setUser(user)});
    }

    function handleLogout(){
        fetch("https://plantitweb.onrender.com/logout", {
            method: "DELETE",
             }).then(_=>{setUser(null)})
    }
  
    function onLogin(us){
        console.log(us)
    }


    function tempp(){
    return fetch("http://127.0.0.1:5555/check_session").then((response) => {
        if (response.ok) {
            response.json().then((user) => setUser(user));
        }
        })
    }

      function toggleText(){
        setTextEditable(!textEditable)
      }

      function handleSubmitChanges(){
          fetch(`https://plantitweb.onrender.com/users/${user.id}`,{
            method:"PATCH",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({"email":email, "image":imgURL})
          }).then(resp=>{if (resp.status==400){
            handleCancel()
            // do an alert
            return null
          }
        else{
          // do an alert
          console.log("success")
          toggleText()
        }})
      }

      function handleCancel(){
        setBio(user.bio)
        setEmail(user.email)
        setimgURL(user.image)
        toggleText()
      }



    return (
    <View>
        <Text>{!user ? "none": user["username"]}{!user?null:(user["admin"] ? "true":"false")}</Text>


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
        {user!==null?
        <View>
            <View id="user-info" style={{...styles.user_info, ...styles.float_user_elements}} className="float-user-elements">
                {/* <div className="text-3xl text-center break-words pb-2">Name:</div> */}
                <Text id = "username" className="text-3xl text-center break-words pb-2">Username:{user.username}</Text>
                {textEditable? <View style={{flexDirection:"row", display:"flex"}}><Text>email:</Text><TextInput style={{width:"100%"}} value={email} onChangeText={(text)=>{setEmail(text)}}></TextInput></View>:
                <Text onPress={()=>{toggleText()}} id = "email" className="text-3xl text-center break-words pb-2">email:{email}</Text>}
            </View>
            <View style={{...styles.profile_pic_container}} className="profile-pic-container">
                {textEditable?<TextInput type="text" placeholder={imgURL} onChangeText={(text)=>{setimgURL(text)}}/>:null}
                <img onClick={()=>{if(!textEditable){toggleText()}}} src = {user.image} alt="hey" id = "profile-pic"/>
                {textEditable?
                    <TextInput style={styles.bio} id = "bio" value={bio} onChangeText={(text)=>{setBio(text)}}/>:
                    <Text onPress={toggleText}>{bio}</Text>}
                {textEditable?<View><Pressable onPress={()=>{handleSubmitChanges()}}><Text>Save Changes</Text></Pressable>
                <Pressable onPress={()=>{handleCancel()}}><Text>Cancel Changes</Text></Pressable>
                </View>:null}
            </View>
        </View>:null}

    </View>
    );
    
}


const styles = StyleSheet.create({
    profile_pic_container:{
        // float:"right",
        padding_right: "10px",
        width:"50%",
        float:"right"
    
      },
      bio:{
        width:"100%"
      },
      
      user_page:{
        padding_left: "160px",
        height: "100%"
      
      },
      
      user_info:{
        // height: "80%",
        max_width: "50%",
        margin_top: "150px",
        align_items: "center"
        /* position: relative; */
      },
      
      
      float_user_elements:{
        width:"50%",
        float:"left"
      },
    })