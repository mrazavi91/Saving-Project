import { StyleSheet, Text, View,Button, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BottomBar from '../Components/BottomBar'
import { useLogout } from '../Hooks/UseLogout'
import useSavingContext from '../Hooks/UseSavingContext'
import usePlanContext from '../Hooks/UsePlanContext'
import { useUserContext } from '../Hooks/UseUserContext'
import axios from 'axios'
import useGetPlan from '../Hooks/UseGetPlan'
import useGetReward from '../Hooks/UseGetReward'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'


const Home = () => {
  // const [saving, setSaving] = useState('10')
  const { logout } = useLogout()
  const { user } = useUserContext()
  const { dispatch, plan } = usePlanContext()
  const planUrl = "http://localhost:12000/plan"
  const rewardUrl = "http://localhost:12000/rewards"
  const { isLoading, apiData, serverError } = useGetPlan(planUrl)
  const { isLoading: isLoadingReward, apiData: rewards , serverError: rewardsError } = useGetPlan(rewardUrl)
  
  console.log(rewards)
  const isFocused = useIsFocused()

  

 
  // console.log(list)

  let totalSaving = []
  
  
    
  // console.log(list)

  if(apiData){
    for (let i = 0; i < apiData.length; i++) {
    let each  = apiData[i].amountSaved
    totalSaving.push(each)}
    
  }
  const totalSavingNumber = totalSaving.reduce((a, b) => a + b, 0)

  

  

  //---------------------getting the rewards-------------------------- 

  
  
    
    
  






  return (
    <View>
          {isLoading && <Text>Loading...</Text>}
      {apiData && <Text>Your Savings:{totalSavingNumber}</Text>}
    
      <Button title='logout' onPress={() => logout()} />
      
      <Text>Your rewards: </Text>
      {rewards && rewards.map((reward) => (
        <Text key={reward._id}>{reward.name}</Text>
      ))}

      
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