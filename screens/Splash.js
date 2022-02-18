
import React from 'react';
import {Image, StyleSheet, StatusBar, ImageBackground} from 'react-native';



function Index(props){
    
    return(
        <ImageBackground source={require('../src/images/background_splash.png')} resizeMode="repeat"  style={styles.image}>
            <StatusBar backgroundColor="#fff" resizeMode="cover" barStyle= "dark-content"/>
            <Image style={styles.icon} source={require('../src/images/logo_reddit.png')}/>
        </ImageBackground>
    )

}


export default Index;

const styles = StyleSheet.create({

    image: {
        justifyContent: "center",
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 200,
        height: 100,
        resizeMode: "contain",
        marginBottom:40
    }
  });


