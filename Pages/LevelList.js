import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useUserContext } from '../Hooks/UseUserContext'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import usePlanContext from '../Hooks/UsePlanContext'

const LevelList = () => {
    const { user } = useUserContext()
    const {dispatch,plan} = usePlanContext()
    const [list, setList] = useState([])
    const { current: myArray } = useRef(list);
    const navigation = useNavigation()
    console.log(plan)
    

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
    }, [myArray])
    // console.log(list)    
    
    const updateNewAmount = async (plan) => {
        // console.log(plan._id)

        try {
            const { amountSaved, start_date, amount } = plan
            //today date
            const dateToady = new Date()
            const formattedToday = dateToady.getTime()
            //start date
            const start = new Date(start_date * 1000)
            // console.log(start.getTime())
            const formattedStartDate = start.getTime()
            let timeSofar = (formattedToday - formattedStartDate) / (1000 * 60 * 60)
            let savingAmount = timeSofar < 24 ? amount : amount * timeSofar / 24
            // totalSaving.push(savingAmount)

            const res = await axios.patch('http://localhost:12000/plan', {amountSaved: savingAmount , _id: plan._id}, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            console.log(res.data)


        } catch (error) {
            console.log(error)
        }
    }
    
    
    
    const mapUpdate = async () => {
        const eachPln = list.map(async (plan) => {

            const data = await updateNewAmount(plan)
            // console.log(data)
            return data
        })

    }

    mapUpdate().catch((error)=> console.log(error))
    
    
    
        
    
    
    
    
    const mapping = list.map((plan) => (
        <View key={plan._id}>
            <TouchableOpacity onPress={()=> navigation.navigate('Level',{plan: plan})}>
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
