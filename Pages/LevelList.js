import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../Hooks/UseUserContext'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const LevelList = () => {
    const { user } = useUserContext()
    const [list, setList] = useState([])
    const navigation = useNavigation()
    

    useEffect(() => {
        const getPlans = async () => {
            await axios.get('http://localhost:12000/plan', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then((res) => {
                    setList(res.data)
                
            }).catch((error)=> console.log(error))
        }
        
        //calling function and setting up if statement
        if (user) {
            getPlans()
        }
    }, [])
    
    const mapping = list.map((plan) => (
        <View key={plan._id}>
            <TouchableOpacity onPress={()=> navigation.navigate('Level') }>
                <Text>{plan.purpose}</Text>
            </TouchableOpacity>
        </View>
    ))
    

  return (
    <View>
      <ScrollView>{mapping}</ScrollView>
    </View>
  )
}

export default LevelList

const styles = StyleSheet.create({})
