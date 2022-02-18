import React, {useState, useEffect, useContext}  from 'react';
import {PermissionsAndroid} from 'react-native';

import UserContext from '../contexts/UserContext'
import AsyncStorage from '@react-native-community/async-storage'

import Splash from './Splash'
import PermissionCamera from './PermissionCamera'
import PermissionNotification from './PermissionNotification'
import PermissionLocation from './PermissionLocation'
import Dashboard from './Dashboard'



function Index(props){

    const { setUserDetails }                = useContext(UserContext)
    const userDetails                       = useContext(UserContext)
    const [ isSplashing , setIsSplashing  ] = useState(true)

    useEffect(()=>{
        _retrieveData()
    },[])

    const _retrieveData = async () => {
        try {
            const value = JSON.parse(await AsyncStorage.getItem('@Passport'));
                
            if (value) {
                setUserDetails(value)
                console.log(value, "value.email")
                setTimeout(()=>{
                setIsSplashing(false)
            },1000)
                return value
          }else{
              setTimeout(()=>{
                setIsSplashing(false)
                },3000)
            
          }
        } catch (error) {
          // Error retrieving data
        }
      };

    if(isSplashing){
        setTimeout(() => {
            setIsSplashing(false)
        }, 3000)
        return <Splash />
    }


    if(!userDetails.PermissionCamera && !isSplashing)
        return <PermissionCamera {...props} goToSlide={false}/>
    
    if(!userDetails.PermissionNotifications && !isSplashing)
        return <PermissionNotification {...props } goToSlide={false}/>   

    if(!userDetails.PermissionLocation && !isSplashing)
        return <PermissionLocation {...props} goToSlide={false}/> 
        
        
    if(userDetails.PermissionLocation && !isSplashing)
        return <Dashboard {...props}/> 

        
    return <></>
}

export default Index;

