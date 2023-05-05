import { StyleSheet, Text, Touchable, View, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { addWeeks, addDays } from "date-fns"

const Level = ({ route }) => { 
  

  const [modalVisible, setModalVisible] = useState(false);
  console.log(route)

  const { amount, duration } = route.params.plan
  console.log(amount, duration)
  let days = []
  let dates = []
  let dateArray = []


  
  for (let i = 0; i <= duration * 7 -1; i++) {
    const date = new Date();
    const result = addDays(date, i)
    dates.push(result)
    
  }
  console.log(dates)

 
  for (let i = 1; i <= duration * 7; i++) {
    days.push(i)
  }


  dates.forEach((element, index) => {
    let obj ={}
    obj[element] = days[index]
    dateArray.push(obj)
  })
  console.log(dateArray)
  


  
  // const mapping = days.map((day, index) => (
    
  //   day% 7 === 0 ?
  //     <View key={index} style={styles.centeredView}>
  //       <Modal
  //         animationType="slide"
  //         transparent={true}
  //         visible={modalVisible}
  //         onRequestClose={() => {
  //           Alert.alert('Modal has been closed.');
  //           setModalVisible(!modalVisible);
  //         }}>
  //         <View style={styles.modalView}>
  //             <Text style={styles.modalText}>Congrats!!!</Text>
  //             <TouchableOpacity
  //               onPress={() => setModalVisible(!modalVisible)}>
  //               <Text style={styles.textStyle}>Hide Modal</Text>
  //           </TouchableOpacity>
  //           </View>
  //       </Modal>
  //       <TouchableOpacity
  //         style={[styles.button, styles.buttonOpen]}
  //         onPress={() => setModalVisible(true)}>
  //         <Text style={styles.textStyle}>day {day}</Text>
  //       </TouchableOpacity>
  //     </View>
  //    :
  //     <Text key={index} >day{day}</Text>
    
  //   ))
  const mapping = dateArray.map((day, index) => (

    parseInt(Object.values(day)) % 7 === 0 ?
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
          <Text style={styles.textStyle}>day {parseInt(Object.values(day))}</Text>
        </TouchableOpacity>
      </View>
      :
      <Text key={index} >day{parseInt(Object.values(day))} {Object.keys(day)}</Text>

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