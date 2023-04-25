import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import usePlanContext from '../Hooks/UsePlanContext'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useUserContext } from '../Hooks/UseUserContext'


const Plan = () => {
    const [amount, setAmount] = useState()    
    const [duration,setDuration] = useState()
    const [purpose, setPurpose] = useState()
    const { dispatch, plan } = usePlanContext()
    const navigation = useNavigation()
    const {user} = useUserContext()

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!amount || !duration || !purpose) {
            alert('please fill up the form')
        }else if (amount <= 20 ) {
            Alert.alert('£21 at least')
        }else if (duration < 1) {
            Alert.alert('1 week at least')
        }
        
        await axios.post('http://localhost:12000/plan', { amount, duration, purpose }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                dispatch({
                    type: 'CREATE_PLAN',
                    payload: res.data
                })
                navigation.navigate('RoadMap')
            })
            .catch((error)=>{ console.log(error)})
        
        
        

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