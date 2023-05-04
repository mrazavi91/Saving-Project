import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../Hooks/UseUserContext'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import usePlanContext from '../Hooks/UsePlanContext'

const LevelList = () => {
    const { user } = useUserContext()
    const {dispatch,plan} = usePlanContext()
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
                    dispatch({
                        type: 'SET_PLAN',
                        payload: res.data
                    })

                
            }).catch((error)=> console.log(error))
        }
        
        //calling function and setting up if statement
        if (user) {
            getPlans()
        }
    }, [list])
    
    
    const mapping = list.map((plan) => (
        <View key={plan._id}>
            <TouchableOpacity onPress={()=> navigation.navigate('Level',{plan: plan}) }>
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
