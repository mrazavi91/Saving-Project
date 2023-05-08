import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'

const EmailForPasswordReset = () => {
    const [accountEmail,setAccountEmail] = useState('')
    console.log(setAccountEmail)

    const submitHandler = (e) => {
      e.preventDefault()
      Alert.alert('You will recieve an email with instructions on how to reset your password')
    }

  return (
    <View>
      <Text style={styles.headline}>Please Enter your Account Email Below</Text>

      <Text>Email:</Text>
      <TextInput 
      placeholder='Email here'
      style={styles.input}
      onChangeText={(accountEmail) => setAccountEmail(accountEmail)}
      />

      <Button 
      title='Submit'
      onPress={submitHandler}
      />

    </View>
  )
}

export default EmailForPasswordReset

const styles = StyleSheet.create({
    headline:{
      textAlign:'center'
    },
    input:{
        backgroundColor:'yellow'
    }
})