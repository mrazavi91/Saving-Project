import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import EditProfile from '../Components/EditProfile'



const Profile = () => {
  
  const navigation =  useNavigation()
  return (
    
    <View>
      <Button title='Edit' onPress={() => navigation.navigate('Edit')} />
      <Button title='Start a plan' onPress={() => navigation.navigate('New Plan')} />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})