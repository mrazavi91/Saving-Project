import { StyleSheet, Text, View,Button, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BottomBar from '../Components/BottomBar'
import { useLogout } from '../Hooks/UseLogout'
import useSavingContext from '../Hooks/UseSavingContext'
import usePlanContext from '../Hooks/UsePlanContext'
import { useUserContext } from '../Hooks/UseUserContext'
import axios from 'axios'


const Home = () => {
  // const [saving, setSaving] = useState('10')
  const { logout } = useLogout()
  const {user} =  useUserContext()
  const [list, setList] = useState([])
  const { current: myArray } = useRef(list);
  const { dispatch, plan } = usePlanContext()

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
        }).catch((error) => console.log(error))
    }
    //calling function and setting up if statement

    if (user) {
      getPlans()
    }
  }, [myArray])
  // console.log(list)

  let totalSaving = []
  
  
    
  

  for (let i = 0; i < list.length; i++) {
    let each  = list[i].amountSaved
    totalSaving.push(each)
    console.log(each)
  }
  const totalSavingNumber = totalSaving.reduce((a, b) => a + b, 0)
  console.log(totalSavingNumber)

  
  return (
    <View>
      
      {plan && <Text>Your Earnings:{totalSavingNumber}</Text> }
          <Button title= 'logout' onPress={()=> logout()}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  saving: {
    display: 'flex',
    flexDirection: 'row'
  }
})