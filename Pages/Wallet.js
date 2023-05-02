import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PaymentInstant from './PaymentInstant'
import { useNavigation } from '@react-navigation/native'


const Wallet = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>Wallet</Text>
      <Button title='go to checkout' onPress={() => navigation.navigate('Payment')} />
      <Button title='Subscribe' onPress={() => navigation.navigate('Subscription')} />
    </View>
  )
}

export default Wallet

const styles = StyleSheet.create({})