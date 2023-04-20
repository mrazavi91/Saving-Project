import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Navbar = () => {
  return (
    <View>
      <Text style={styles.headline}>WELCOME TO SAVING APP!
      </Text>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    headline:{
      textAlign:'center'
    }
})