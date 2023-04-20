import { StyleSheet, Text, View,Button } from 'react-native'
import React, { useState } from 'react'
import BottomBar from '../Components/BottomBar'
import { useLogout } from '../Hooks/UseLogout'


const Home = () => {
  const [saving, setSaving] = useState('10')
  const {logout} = useLogout()
  return (
    <View>
      <View style={styles.saving}>
        <Text>Total Saving: </Text>
        <Text>£{saving}</Text>
      </View>
      <Text>Your Earnings:</Text>
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