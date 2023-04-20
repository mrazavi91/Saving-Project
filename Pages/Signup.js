import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../Component/Navbar'

const Signup = () => {
    const [firstName,setFirstName] = useState('')
    console.log(firstName)
    const [lastName,setLastName] = useState('')
    console.log(lastName)
    const [username,setUsername] = useState('')
    console.log(username)
    const [email,setEmail] = useState('')
    console.log(email)
    const [password,setPassword] = useState('')
    console.log(password)
    const [passwordConfirm,setPasswordConfirm] = useState('')
    console.log(passwordConfirm)

    const submitHandler = (e) => {
        e.preventDefault()
        Alert.alert('Signup Successful')
    }
    const loginPageHandler = (e) => {
      e.preventDefault()
      Alert.alert('Loading Login Page')
    }


  return (
    <View>
        <Navbar />
      <Text style={styles.headline}>Please Signup Below</Text>

      <Text>First Name:</Text>
      <TextInput 
      placeholder='First Name here'
      style={styles.input}
      onChangeText={(firstName) => setFirstName(firstName)}
      />

      <Text>Last Name:</Text>
      <TextInput 
      placeholder='Last Name here'
      style={styles.input}
      onChangeText={(lastName) => setLastName(lastName)}
      />

      <Text>Username:</Text>
      <TextInput 
      placeholder='Username here'
      style={styles.input}
      onChangeText={(username) => setUsername(username)}
      />

      <Text>Email:</Text>
      <TextInput 
      placeholder='Email here'
      style={styles.input}
      onChangeText={(email) => setEmail(email)}
      />

      <Text>Password:</Text>
      <TextInput 
      placeholder='Password here'
      style={styles.input}
      onChangeText={(password) => setPassword(password)}
      />

      <Text>Password Confirmation:</Text>
      <TextInput 
      placeholder='Please Re-enter Password'
      style={styles.input}
      onChangeText={(passwordConfirm) => setPasswordConfirm(passwordConfirm)}
      />

      <Button 
      title='Submit'
      onPress={submitHandler}
      />

      <Text>Already have an account? Please Click Here:</Text>
      <Button 
      title='Login'
      onPress={loginPageHandler}
      />

    </View>
  )
}


export default Signup

const styles = StyleSheet.create({
    headline:{
      textAlign:'center'
    },
    input:{
        backgroundColor:'yellow'
    }
})