import { SearchBar } from "react-native-elements"
import {Platform } from "react-native"
import { useState } from "react"


export default function GenericSearchInput({setSearchTerm, prompt, defaultValue}){
    const [val, setVal] = useState(undefined)
    return (
    <div style={{"flexDirection":"row", width:"25%"}} >

        <SearchBar  inputStyle={{width:"100%"}} value={val} containerStyle={Platform.OS==="web"? {maxWidth:"100%"}:{width:"100%"}} placeholder={"search " + prompt} id = {prompt} 
        onChangeText={(text)=>{
            if(text===""){
                setSearchTerm(defaultValue)
                setVal(undefined)
            }
            else{setSearchTerm(text); setVal(text)}
        }}/>
        </div>
            
    )
}


