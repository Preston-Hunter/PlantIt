import React from "react";
import { NavLink } from "react-router-dom";
import { StyleSheet } from "react-native";
export default function NavBar({isAdmin}){
    return (
        <div style={{ width:"100%", backgroundColor:"red"}}>
            <nav>
                <NavLink style={styles.navlink} exact="true" to="/">Home</NavLink>
                <NavLink style={styles.navlink} exact="true" to="/plants">Plants</NavLink>
                <NavLink style={styles.navlink} exact="true" to="/gardenhelper">GardenHelper</NavLink>     
                <NavLink style={styles.navlink} exact="true" to="/login">Login and UserProfile</NavLink>    
            </nav>
            {isAdmin ?  
            <nav className="admin">
                <span>ADMIN : 
                <NavLink exact="true" to="/adminpage">Admin Page</NavLink> 
                {/* <NavLink exact to="/users">Users</NavLink>  */}
                </span>       
            </nav>
            : null }
        </div>
    );}
    const styles = StyleSheet.create({
  
        navlink:{
            display: "inline-block",
            margin: ".2rem",
            padding: "0.5rem",
            textDecoration: "none",
            fontSize:"1.2em",
            color: "#7010ac",
            borderBottom: "2px solid #7010ac",  
            transition: ".5s",
          },
          
          navlinkHoverActive:{
            color: "tomato",
            borderBottom: "2px solid tomato",
          },
          
          navlinkActive:{
            color: "white",
            background: "tomato",
          },
          
          navlinkAdmin:{
            display: "inline-block",
            margin: ".2rem",
            padding: "0.5rem",
            textDecoration: "none",
            fontSize: "1.2em",
            color:" #7010ac",
            borderBottom: "2px solid #7010ac",
            transition: ".5s",
          },
          
          navlinkSpan:{
            display: "inline-block",
            padding: "0.5rem",
            fontSize: "1.1em",
            color: "yellow",
            transition: "1s",
            marginTop:"-15px",
            marginBottom:"-8px",
          }

    })

    