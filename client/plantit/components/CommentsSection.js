import { useEffect, useState } from "react"
import { Text, TextInput, View } from "react-native";
import Comment from "./Comment";
import GenericButton from "./GenericButtons";

export default function CommentsSection({plantId}){
    console.log(plantId)
    const [comments, setComments] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [newComment, setNewComment] = useState("")
    function retrieveComments(){
        return fetch(`https://plantitweb.onrender.com/commentsforplant/${plantId}`).then(resp=>{
            console.log(plantId)
            if(resp.status==500){
                return []
            }
            return resp.json()})
        .then(arr=>setComments(arr))

    }

    function postComment(){
        fetch(`https://plantitweb.onrender.com/comments`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ "user_id": 1, "plant_id":plantId, "contents":newComment}),
        }).then(resp=>retrieveComments())
    }

    useEffect(()=>{retrieveComments().then(_=>setLoaded(true))},[plantId])

    if(!loaded){
        return <Text>loading comments...</Text>
    }

    return (
    <View>
        <TextInput       
            placeholder="enter comment here"     
            type="text"
            value={newComment}
            onChangeText={(text) => setNewComment(text)}/>
            <GenericButton label="submit" onPressed={postComment}></GenericButton>
        <Text>{"\n"}Comments Section</Text>
        <View>
        {comments.map((c)=><Comment key = {c.id} user = {c.user_id} content = {c.contents}/>)}
        </View>
    </View>)
}