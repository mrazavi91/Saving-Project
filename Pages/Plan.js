import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import usePlanContext from '../Hooks/UsePlanContext'


const Plan = () => {
    const [amount, setAmount] = useState()    
    const [duration,setDuration] = useState()
    const [purpose, setPurpose] = useState()
    const {dispatch , plan} = usePlanContext()

    const submitHandler = (e) => {
        e.preventDefault()
        if (!amount || !duration || !purpose) {
            alert('please fill up the form')
        }else if (amount <= 20 ) {
            Alert.alert('£21 at least')
        }else if (duration < 1) {
            Alert.alert('1 week at least')
        }
        
        dispatch({
            type: 'SET_PLAN',
            payload: {amount, duration}
        })
        

    }
    
  return (
    <View>
          {/* setting up a form */}
          <Text>Saving goal amount:</Text>
          <TextInput placeholder='£'  onChangeText={(amount)=>setAmount(amount)}/>
          <Text>Duration:</Text>
          <TextInput placeholder='Weeks' onChangeText={(duration)=>setDuration(duration)}/>
          <Text>Purpose of saving:</Text>
          <TextInput placeholder='Goal' onChangeText={(purpose) => setPurpose(purpose)} />
          <Button title='Submit' onPress={submitHandler} />
          
    </View>
  )
}

export default Plan

const styles = StyleSheet.create({})