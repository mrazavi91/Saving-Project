import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BottomBar from '../Components/BottomBar'


const Home = () => {
  const [saving, setSaving] = useState('10')
  return (
    <View>
      <View style={styles.saving}>
        <Text>Total Saving: </Text>
        <Text>£{saving}</Text>
      </View>
      <Text>Your Earnings:</Text>
          
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