import React, {useContext, useEffect, useState, useRef} from "react";
import { AppState, Image, StatusBar, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import UserContext from '../contexts/UserContext'
import AsyncStorage from '@react-native-community/async-storage'
import BtnGrandient from '../components/BtnGrandient';
import {changeNotificationSetting,checkNotificationPermission} from 'react-native-check-notification-permission';
function App(props){

    const userDetails                           = useContext(UserContext)
    const { UserDetails, setUserDetails }       = useContext(UserContext)

    const appState                                = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible]   = useState(appState.current);
    const [Permission, setPermission]             = useState(false)
    const [Change, setChange]                     = useState(false)

    const requestNotificationPermission = async () => {
      userDetails.PermissionNotifications = true
      _storeData(userDetails)
    };

    useEffect(()=>{
      checkNotification()
    },[])

   useEffect(()=>{

      const subscription = AppState.addEventListener("change", nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          console.log("App has come to the foreground!");
        }

          appState.current = nextAppState;
          setAppStateVisible(appState.current);
        // console.log("AppState", appState.current);
        });

        return () => {
          subscription.remove();
        };

   },[])
  

    useEffect(() => {
       console.log(appStateVisible, "ESTADO DEL APP")
       if(appStateVisible == "active"){
         checkNotification()
       }
    }, [appStateVisible]);


    const checkNotification = async () => {
        console.log("CHECK")
        const bool = await checkNotificationPermission();
        setPermission(bool)

        console.log(Change, "CHANGE")
        if(Change){
          console.log("cancel()")
          Cancel()
        }
        console.log(bool, "PERMISO")
    };


    const ChangePermission = ()=>{

      if(!props.goToSlide){
        console.log("CHANGE")
        setChange(true)
      }
      changeNotificationSetting()
    }


    const _storeData = async (data) => {
      try {
          await AsyncStorage.setItem('@Passport', JSON.stringify(data) );
          console.log(data)
          console.log('Authentication successfully')
          setUserDetails({...data})
          props.navigation.navigate("Home")
      }
      catch (error) {
        console.log(error)
      }
    }

    const Cancel = () =>{
      if(!props.goToSlide){
        userDetails.PermissionNotifications = true
        _storeData(userDetails)
      }else{
        props.goToSlide()
      }
    }



    return(

      <View style={styles.container}>
       <StatusBar backgroundColor="#fff" barStyle= "dark-content"/>
        <Image style={styles.image}
                source={require('../src/images/access_notifications.png')} />

        <View style={styles.description}>
          <Text style={styles.descriptionText}>Enable push notifications</Text>
          <Text style={styles.descriptionText}>Enable push notifications to let send you personal news and updates.</Text>
        </View>

        
        {Permission &&
          <BtnGrandient title={"Disabled"} action = {()=>ChangePermission()} />
        }

        {!Permission &&
          <BtnGrandient title={"Enable"} action = {()=>ChangePermission()} />
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