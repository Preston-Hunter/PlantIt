import { useRef, useState, ChangeEvent, useEffect } from "react"
import { useParams } from "react-router-dom"
import {StyleSheet, Text, View, Pressable, TextInput } from 'react-native';


export default function UserProfile(){
    const inputFile = useRef(null)
    // const [file, setFile] = useState<File>(null);
    const [imgURL, setimgURL] = useState(null)
    const [user, setUser] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [bio, setBio] = useState("")
    const [textEditable, setTextEditable] = useState(false)
    const [email, setEmail] = useState("")
    // const {username} = useParams()
    let username = 4
    const { id } = useParams()
    useEffect(()=>{

        fetch(`https://plantitweb.onrender.com/users/${id}`)
        .then(resp=>resp.json())
        .then(userData=>{
            console.log(userData);
            setUser(userData); 
            if (userData !== null){
                return true
            }})
            .then(_=>{setLoaded(true)})
            
        }, [id])
    useEffect(()=>{
      if(user!==null){
        setEmail(user.email)
        setBio(user.bio)
        setimgURL(user.image)
      }
    },[user])

        function handleURLUpdate(){
            // perform fetch statement to database and change image url to this
            fetch("databaseurl", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"image": imgURL})
            })
    
            
        }

        if(!loaded){
          return <Text>loading...</Text>
        }
        function toggleText(){
          setTextEditable(!textEditable)
        }

        function handleSubmitChanges(){
            fetch(`https://plantitweb.onrender.com/${id}`,{
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
          }})
        }

        function handleCancel(){
          setBio(user.bio)
          setEmail(user.email)
          setimgURL(user.image)
          
          toggleText()
        }


//  min-h-screen bg-gray-100 justify-center pt-32
        return (
            <View className="user-page" style={styles.user_page}>
                <View id="user-info" style={{...styles.user_info, ...styles.float_user_elements}} className="float-user-elements">
                    {/* <div className="text-3xl text-center break-words pb-2">Name:</div> */}
                    <Text id = "username" className="text-3xl text-center break-words pb-2">Username:{user.username}</Text>
                    {textEditable? <View style={{flexDirection:"row", display:"flex"}}><Text>email:</Text><TextInput style={{width:"100%"}} value={email} onChangeText={(text)=>{setEmail(text)}}></TextInput></View>:
                    <Text onPress={()=>{toggleText()}} id = "email" className="text-3xl text-center break-words pb-2">email:{email}</Text>}
                </View>
                <View style={{...styles.profile_pic_container}} className="profile-pic-container">
                    {textEditable?<TextInput type="text" placeholder="url" onChangeText={(text)=>{setimgURL(text)}}/>:null}
                    <img onClick={()=>{if(!textEditable){toggleText()}}} src = {user.image} alt="hey" id = "profile-pic"/>
                    {textEditable?
                      <TextInput style={styles.bio} id = "bio" value={bio} onChangeText={(text)=>{setBio(text)}}/>:
                      <Text onPress={toggleText}>{bio}</Text>}
                    {textEditable?<View><Pressable onPress={()=>{handleSubmitChanges()}}><Text>Save Changes</Text></Pressable>
                    <Pressable onPress={()=>{handleCancel()}}><Text>Cancel Changes</Text></Pressable>
                    </View>:null}
                </View>
            </View>
            )
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