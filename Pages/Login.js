import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../Component/Navbar'

const Login = () => {
    // Provides logging for every input
    const [email,setEmail] = useState('')
    console.log(email)
    const [password,setPassword] = useState('')
    console.log(password)

    // This is an arrow function. e is the event
    const submitHandler = (e) => {
        e.preventDefault()
        Alert.alert('Login Successful')
    }


  return (
    <View>
        <Navbar />
      <Text>Please Login Here:</Text>
      <Text>Username/Email:</Text>
      <TextInput 
      placeholder='Email/Username here'
      style={styles.input}
      onChangeText={(email) => setEmail(email)}
      />
      <Text>Password:</Text>
      <TextInput 
      placeholder='Password here'
      style={styles.input}
      onChangeText={(password) => setPassword(password)}
      />
      <Button 
      title='Submit'
      onPress={submitHandler}
      />
    </View>
  )
}

export default Login

// CSS code here to make it look presentable
const styles = StyleSheet.create({
    input:{
        //Can use colour code to get any colour
        backgroundColor:'yellow'
    }
})