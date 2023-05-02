import { useRef, useState, ChangeEvent, useEffect } from "react"
import { useParams } from "react-router-dom"
import {StyleSheet} from "react-native"
export default function UserProfile(){
    const inputFile = useRef(null)
    // const [file, setFile] = useState<File>(null);
    const [imgURL, setimgURL] = useState(null)
    const [user, setUser] = useState(null)
    const [loaded, setLoaded] = useState(false)

    // const {username} = useParams()
    let username = 4
    const { id } = useParams()
    useEffect(()=>{

        fetch(`http://127.0.0.1:5555/users/${id}`)
        .then(resp=>resp.json())
        .then(userData=>{
            console.log(userData);
            setUser(userData); 
            if (userData !== null){
                return true
            }})
            .then(_=>{setLoaded(true)})
            
        }, [id])

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
//  min-h-screen bg-gray-100 justify-center pt-32
        return (
            <div className="user-page">
                <div id="user-info" className=" float-user-elements">
                    <div className="text-3xl text-center break-words pb-2">Name:</div>
                    <div id = "username" className="text-3xl text-center break-words pb-2">username:{username}</div>
                    <div id = "email" className="text-3xl text-center break-words pb-2">email:placeholder{username}@gmail.com</div>
                </div>
                <div className="profile-pic-container float-user-elements">
                    <input type="text" onChange={(e)=>{setimgURL(e.target.value)}}/>
                    <button onClick={handleURLUpdate}>upload URL</button>
                    <br></br>
                    {/* <input type="file" onChange={handleAvatarChange}/> */}
                    <img onClick={()=>{console.log("image clicked")}} src = "https://th.bing.com/th?id=OSK.1cd4f39e37aeaa997bfca886bce2e910&w=188&h=132&c=7&o=6&dpr=2.5&pid=SANGAM" alt="hey" id = "profile-pic"/>
                    <div id = "bio">This is where we pull description of the user, made by them</div>
                </div>
            </div>
            )
}


const styles = StyleSheet.create({
profile_pic_container:{
    /* float:left; */
    padding_right: "10px",
    /* width:20%; */
  },
  bio:{
    width:"100%"
  },
  
  user_page:{
    padding_left: "160px",
    height: "100%"
  
  },
  
  user_info:{
    height: "80%",
    max_width: "50%",
    margin_top: "150px",
    align_items: "center"
    /* position: relative; */
  },
  
  
  float_user_elements:{
    width:"50%",
    float:"left"
  },
  
  /* I assigned percent heights to these so that percentage based heights work on their children (used above) */
   main : {
    height: "100%"
  }
})