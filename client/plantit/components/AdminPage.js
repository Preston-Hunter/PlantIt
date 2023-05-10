import { useState } from "react"
import { View, Text, TextInput, Pressable } from "react-native"

export default function AdminPage(){
    const [displayPlant, setDisplayPlant] = useState(true)
    const [displayUser, setDisplayUser] = useState(true)
    const [displayUserPlant, setDisplayUserPlant] = useState(true)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const [sciName, setSciName] = useState("")


    return (
        <View>
            <Text>New User</Text>
            {displayUser?
            <>
            <TextInput
            type="text"
            value={username}
            onChangeText={(text) => setUsername(text)}
            />
            <TextInput
            type="text"
            value={email}
            onChangeText={(text) => setEmail(text)}
            />
            <TextInput
            type="text"
            value={password}
            onChangeText={(text) => setPassword(text)}
            />
            <TextInput
            type="text"
            value={image}
            onChangeText={(text) => setImage(text)}
            />
            <Pressable onPress={()=>setIsAdmin(!isAdmin)}><Text>{isAdmin?"admin":"basic"}</Text></Pressable></>:null}
    
        </View>



    )
}