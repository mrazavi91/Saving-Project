import { StyleSheet, Text, Touchable, View, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import usePlanContext from '../Hooks/UsePlanContext'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

const Level = ({ route }) => { 
  
  

  const [modalVisible, setModalVisible] = useState(false);


  const { amount, duration } = route.params.plan
  let days =[]
  const savingPlan = ((amount / duration) / 7)
  console.log(!Number.isInteger(savingPlan) ? `£ ${Math.ceil(savingPlan)} average per day` : `£${savingPlan} per day`)

  
    for (let i = 1; i <= duration * 7; i++) {
      days.push(i)
    }
  console.log(days)
  const mapping = days.map((day,index) => (
    day% 7 === 0 ? 
      <View key={index} style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
              <Text style={styles.modalText}>Congrats!!!</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
            </View>
        </Modal>
        <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>day {day}</Text>
        </TouchableOpacity>
      </View>
     :
      <Text key={index} >day{day}</Text>
    
    ))
  
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
  }
})