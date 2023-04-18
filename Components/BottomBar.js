import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const BottomBar = () => {
  const navigation = useNavigation()
  
  return (
    <View style={styles.container}>
          <TouchableOpacity onPress={()=> navigation.navigate('Home')}><Image style={styles.home} source={require('../assets/HomeIcon.png')} /></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Wallet')} ><Image style={styles.home} source={require('../assets/WalletIcon.png')} /></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Road Map')} ><Image style={styles.home} source={require('../assets/LevelIcon.png')} /></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('History')} ><Image style={styles.home} source={require('../assets/HistoryIcon.png')} /></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} ><Image style={styles.home} source={require('../assets/ProfileIcon.png')} /></TouchableOpacity>
    </View>
  )
}

export default BottomBar

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: '15rem',
        bottom: -650
    },
    home: {
        height: 65,
        width: 65
    }
})