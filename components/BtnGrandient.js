import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

function Index(props) {
  
  return (
    <TouchableOpacity style={{width: "50%"}} onPress={props.action} >
        <LinearGradient style={styles.btnGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#FB689B", "#FB689B", "#FC8663"]}
        >
        <Text style={styles.btnGradientText}>{props.title}</Text>
        </LinearGradient>
    </TouchableOpacity>
 )
}

const styles = StyleSheet.create({
    btnGradient : {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius : 40,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:5,
        marginBottom:30     
    },
    btnGradientText : {
        color : "white"
    }
});
export default Index;