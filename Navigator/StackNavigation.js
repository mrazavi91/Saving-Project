import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../Pages/Home'
import Wallet from '../Pages/Wallet'
import Level from '../Pages/Level'
import Profile from '../Pages/Profile'
import History from '../Pages/History'
import EditProfile from '../Components/EditProfile';
import Plan from '../Pages/Plan';


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();


export const TabNavigation = () => {
  return (

    
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'home',
            Wallet: 'wallet',
            RoadMap: 'map',
            History: 'history',
            Profile: 'account',
          };

          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              color={color}
              size={size}
            />
          );
        },
      })}
    >
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Wallet' component={Wallet} />
        <Tab.Screen name='RoadMap' component={Level} />
        <Tab.Screen name='History' component={History} />
        <Tab.Screen name='Profile' component={Profile} />
        {/* <Stack.Group screenOptions={{ headerShown: true , presentation: }}>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='Wallet' component={Wallet} />
              <Stack.Screen name='Road Map' component={Level} />
              <Stack.Screen name='History' component={History} />
              <Stack.Screen name='Profile' component={Profile} />
        </Stack.Group> */}

      </Tab.Navigator>
  )
}

export const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home Screen' component={TabNavigation} />
        
      </Stack.Group>
      <Stack.Screen name='New Plan' component={Plan} />
      {/* <Stack.Screen name='Home Screen' component={Home} /> */}
      <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name= 'Edit' component={EditProfile}/>
      </Stack.Group>
    </Stack.Navigator>
  )
  
}




const styles = StyleSheet.create({})