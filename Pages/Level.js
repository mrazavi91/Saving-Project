import { StyleSheet, Text, Touchable, View, Modal, Pressable, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { addWeeks, addDays } from "date-fns"
import axios from 'axios'
import useSavingContext from '../Hooks/UseSavingContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../Hooks/UseUserContext'

const Level = ({ route }) => { 
  
  const {user} = useUserContext()
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('')
  const [startDate, setStartDate] = useState('')
  const [rewards, setRewards] = useState([])
  const [singleReward ,  setSingleRewards ] = useState({})
  // console.log(route)

  const { amount, duration ,sub_id} = route.params.plan
  // console.log(amount, duration)
  let days = []
  let dates = []
  let dateArray = []
  let savingAmount = 0
   

  if (startDate) {
    for (let i = 0; i <= duration * 7 - 1; i++) {
      const date = new Date(startDate * 1000);
      const dateFormat = date.toDateString()
      const result = addDays(date, i)
      dates.push(result.toDateString())

    }
    // console.log(typeof dates[0])


    for (let i = 1; i <= duration * 7; i++) {
      days.push(i)
    }


    dates.forEach((element, index) => {
      let obj = {}
      obj[element] = days[index]
      dateArray.push(obj)
    })
  
  }
  
  
  // date today 
  const dateToady = new Date()
  // console.log(dateToady)
  const formattedToday = dateToady.getTime()
  if (startDate) {
    const start = new Date(startDate*1000)
    console.log(start.getTime())
    const formattedStartDate = start.getTime()
    let timeSofar = (formattedToday - formattedStartDate)/(1000*60*60)
    savingAmount  = timeSofar < 24 ?  amount : amount * timeSofar/24
  }

  

  
  
  
  const newDate = new Date().toDateString()
 
  //getting the rewards 
  const getRewards = async () => {

    try {
      //fetch the data from reward.json
      const response = await axios.get("http://localhost:9999/rewards")
      setRewards(response.data)
      
    } catch (error) {
      console.log(error)
    }

    
  }
  //getting the status 
  useEffect(() => {
    const getStatus = async () => {
      await axios.get(`http://localhost:12000/payment/subscribe/${sub_id}`)
        .then((res) => {
          setStatus(res.data.status)
          setStartDate(res.data.start_date)
      }).catch((error)=> console.log(error))
    }

    getStatus()
    getRewards()
   
  }, [sub_id])
  // console.log(savingAmount)

   if (status) {
    //  console.log(status)
   }
  
  const modalController = () => {
    //choose random rewards 
    const randomReward = Math.floor(Math.random() * rewards.length)
    console.log(rewards[randomReward])
    
    setSingleRewards(rewards[randomReward])

    setModalVisible(true)
  }

  console.log(singleReward) 
  

  const rewardController = async () => {
    console.log('first')
    //post rewards 
    try {
      const res = await axios.post('http://localhost:12000/rewards', singleReward, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }

    //close after all 

    setModalVisible(!modalVisible)
    
  }
  
   

  const mapping = dateArray.map((day, index) => (
    

    parseInt(Object.values(day)) % 7 === 0 ?
      <View key={index} style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);}}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Congrats!!!</Text>
            <Text>{singleReward.name} </Text>
            <Text>{singleReward.type} </Text>
            <TouchableOpacity
              onPress={rewardController}>
              <Text style={styles.textStyle}>Claim Reward</Text>
              {/* <Button style={'claim'} title='Claim Reward' onPress={rewardController}/> */}
            </TouchableOpacity>
          </View>
        </Modal>
        
        <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={modalController}>
          {newDate == Object.keys(day) ? <Text style={styles.textStyle}>day {parseInt(Object.values(day))}**</Text> : <Text style={styles.textStyle}>day {parseInt(Object.values(day))}</Text>}
          {/* // <Text style={styles.textStyle}>day {parseInt(Object.values(day))}</Text> */}
        </TouchableOpacity>
      </View>
      :
      newDate == Object.keys(day) ? <Text key={index} >day{parseInt(Object.values(day))} {Object.keys(day)} **</Text> : <Text key={index} >day{parseInt(Object.values(day))} {Object.keys(day)}</Text>
      
    
  ))
  console.log(newDate)
  
  return (
    <View>
      <ScrollView>
        {mapping}

      </ScrollView>
    </View>
  )
}

export default Level

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 60,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  claim: {
    margin: 10,
    padding: 10
  }
})