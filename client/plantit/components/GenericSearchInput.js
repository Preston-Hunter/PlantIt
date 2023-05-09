import { SearchBar } from "react-native-elements"
import {Platform } from "react-native"
import { useState } from "react"
import { StyleSheet, Text, View, Pressable } from 'react-native';



export default function GenericSearchInput({setSearchTerm, prompt, defaultValue}){
    const [val, setVal] = useState(undefined)
    return (
    <View style={Platform.OS==="web"? {width:"25%", ...styles.container}:{width:"50%", ...styles.container}} >

        <SearchBar  inputStyle={{width:"100%"}} value={val} containerStyle={Platform.OS==="web"? {width:"100%"}:{width:"100%"}} placeholder={"search " + prompt} id = {prompt} 
        onChangeText={(text)=>{
            if(text===""){
                setSearchTerm(defaultValue)
                setVal(undefined)
            }
            else{setSearchTerm(text); setVal(text)}
        }}/>
    </View>
            
    )
}

// {"flexDirection":"row", width:"25%"}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignContent:"stretch",
      flexWrap: 'wrap',

    },
  });
  