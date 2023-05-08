import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'

const ResetPassword = () => {
    const [password,setPassword] = useState('')
    console.log(password)
    const [passwordConfirm,setPasswordConfirm] = useState('')
    console.log(passwordConfirm)

    const submitHandler = (e) => {
        e.preventDefault()
        Alert.alert('Password Successfully Reset')
    }
  return (
    <View>
      <Text style={styles.headline}>Please Enter Your New Password Below</Text>

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

    </View>
  )
}

export default ResetPassword

const styles = StyleSheet.create({
    headline:{
        textAlign:'center'
    },
      input:{
        backgroundColor:'yellow'
    }
})