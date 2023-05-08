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
    const forgotUsernamePasswordHandler = (e) => {
      e.preventDefault()
      Alert.alert('Please Enter your Account Email on this page')
    }


  return (
    <View>
        <Navbar />
      <Text style={styles.headline}>Please Login Below</Text>
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

      <Text>Forgot Username/Password? Please Click Here:</Text>
      <Button 
      title='Reset Username/Password'
      onPress={forgotUsernamePasswordHandler}
      />
    </View>
  )
}

export default Login

// CSS code here to make it look presentable
const styles = StyleSheet.create({
    headline:{
      textAlign:'center'
    },
    input:{
        //Can use colour code to get any colour
        backgroundColor:'yellow'
    }
})