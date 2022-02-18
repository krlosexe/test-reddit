import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './contexts/UserProvider'


import Home from './screens/Home'
import CarrouselPermisions from './screens/CarrouselPermisions'
const Drawer = createDrawerNavigator();


function App(){
  return (
    <NavigationContainer>
      <UserProvider>
       <Drawer.Navigator>
         <Drawer.Screen name="Home"                 component={ Home } />
         <Drawer.Screen name="CarrouselPermisions"  component={ CarrouselPermisions } />
       </Drawer.Navigator>
      </UserProvider>
    </NavigationContainer>
  )
}
console.disableYellowBox = true
export default App;

