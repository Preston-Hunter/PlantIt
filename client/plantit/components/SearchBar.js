import GenericSearchInput from "./GenericSearchInput";
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function SearchBar({setHigherSalinity, setLowerSalinity, setLowerLight, setHigherLight,
    setLowerHimidity, setHigherHimidity, setName,
    setScientificName, setGenus, setFamily, setFlowerColor }){
    function handleSearch(){
        console.log("searching")
    }

    return (

    <View id="search-bars" style={styles.container}>
        <GenericSearchInput setSearchTerm={setLowerSalinity} prompt={"setLowerSalinity"} defaultValue={-20}></GenericSearchInput>
        <GenericSearchInput setSearchTerm={setHigherSalinity} prompt={"setHigherSalinity"} defaultValue={20}></GenericSearchInput>
        
        <GenericSearchInput setSearchTerm={setLowerLight} prompt={"setLowerLight"} defaultValue={0}></GenericSearchInput>
        <GenericSearchInput setSearchTerm={setHigherLight} prompt={"setHigherLight"} defaultValue={Infinity}></GenericSearchInput>
        
        <GenericSearchInput setSearchTerm={setLowerHimidity} prompt={"setLowerHimidity"} defaultValue={0}></GenericSearchInput>
        <GenericSearchInput setSearchTerm={setHigherHimidity} prompt={"setHigherHimidity"} defaultValue={Infinity}></GenericSearchInput>
        
        <GenericSearchInput setSearchTerm={setName} prompt={"setName"} defaultValue={""}></GenericSearchInput>
        <GenericSearchInput setSearchTerm={setScientificName} prompt={"setScientificName"} defaultValue={""}></GenericSearchInput>

        <GenericSearchInput setSearchTerm={setGenus} prompt={"setGenus"} defaultValue={""}></GenericSearchInput>
        <GenericSearchInput setSearchTerm={setFamily} prompt={"setFamily"} defaultValue={""}></GenericSearchInput>
        
        <GenericSearchInput setSearchTerm={setFlowerColor} prompt={"setFlowerColor"} defaultValue={""}></GenericSearchInput>

    </View>)
}

// {display:"flex", "flexWrap": "wrap", width:"100%"}
const styles = StyleSheet.create({
    container: {
      display: "flex",
      width: '100%',
      "flexDirection":"row", 
      "alignContent": "stretch",
      flexWrap: 'wrap',
    },
  });
  