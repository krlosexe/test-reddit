import React, { useState } from 'react'
import UserContext from './UserContext'


const UserProvider = ({ children }) => {
  const [ userDetails, setUserDetails ] = useState({
    PermissionCamera        : false,
    PermissionNotifications : false,
    PermissionLocation      : false,
})

  const _retrieveData = async () => {

    try {
        const value = JSON.parse(await AsyncStorage.getItem('@Passport'));
        if (value) {
            setUserDetails(value)
            return value
      }
    } catch (error) {
      // Error retrieving data
    }
  };



  setInterval(()=>{
    _retrieveData()   
    },2000)


  
  const obj = { ...userDetails , setUserDetails }
  

  return (
    <UserContext.Provider value={obj}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider