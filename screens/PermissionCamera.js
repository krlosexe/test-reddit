import React, {useContext, useEffect, useState} from "react";
import { PermissionsAndroid, Image, StatusBar, StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import UserContext from '../contexts/UserContext'
import AsyncStorage from '@react-native-community/async-storage'
import BtnGrandient from '../components/BtnGrandient';

function App(props){

    const userDetails  = useContext(UserContext)
    const { UserDetails, setUserDetails } = useContext(UserContext)
    const [Permission, setPermission]   = useState(false)
    
    useEffect(()=>{
      checkCameraPermission()
    },[])

    const checkCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        setPermission(granted)
        console.log(granted)
      } catch (err) {
        console.warn(err);
      }
    };



    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          userDetails.PermissionCamera = true
          _storeData(userDetails)
          checkCameraPermission()
          console.log("You can use the camera");
        } else {
          console.log("Camera permission denied");
        }
         
      } catch (err) {
        console.warn(err);
      }
    };

    const _storeData = async (data) => {
      try {
          await AsyncStorage.setItem('@Passport', JSON.stringify(data) );
          console.log(data)
          console.log('Authentication successfully')
          setUserDetails({...data})
          if(!props.goToSlide){
              props.navigation.navigate("Home")
          }else{
            checkCameraPermission()
          }
          
      }
      catch (error) {
        
      }
    }

    const Cancel = () =>{
      if(!props.goToSlide){
        userDetails.PermissionCamera = true
        _storeData(userDetails)
      }else{
        props.goToSlide()
      }
    }
  

    return(

      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle= "dark-content"/>
        <Image style={styles.image}
                source={require('../src/images/access_camera.png')} />

        <View style={styles.description}>
          <Text style={styles.descriptionText}>Camera Access</Text>
          <Text style={styles.descriptionText}>Please allow access to your camera to take photos</Text>
        </View>

        {Permission &&
          <BtnGrandient title={"Disabled"} action = {()=>Linking.openSettings()}  />
        }

        {!Permission &&
          <BtnGrandient title={"Allow"}  action = {requestCameraPermission}/>
        }
        

        <TouchableOpacity onPress={()=> Cancel()}>
          <Text>Cancel</Text>
        </TouchableOpacity>

      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
    alignItems : "center",
    padding: 8
  },
  image: {
    width: 200,
    height: 200,
    alignSelf : "center"
  },

  description : {
    width : "80%",
    marginBottom : 20
  },
  descriptionText : {
    textAlign : "center",
    color : "black",
    fontSize : 16,
    marginBottom: 10
  }
});

export default App;