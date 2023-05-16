import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import usePlanContext from '../Hooks/UsePlanContext'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useUserContext } from '../Hooks/UseUserContext'
import Subscription from './Subscription'
import { useStripe, CardField, useConfirmPayment, confirmPayment } from '@stripe/stripe-react-native'
import { addWeeks } from "date-fns"




const Plan = () => {
    const [amount, setAmount] = useState()    
    const [duration,setDuration] = useState()
    const [purpose, setPurpose] = useState()
    const { dispatch, plan } = usePlanContext()
    const navigation = useNavigation()
    const { user } = useUserContext()
    const { createPaymentMethod } = useStripe();
    const [cardDetails, setCardDetails] = useState({})
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState('')
    const [currentDate, setCurrentDate] = useState('')
    const [newPlan, setNewPLan] = useState({})

    //calculations 
    const savingPerDay = ((amount / duration) / 7).toFixed(1)
    // console.log((amount / duration) / 7)
    const saveTotal = savingPerDay * 7 * duration
    // console.log(saveTotal)
    
    const date = new Date();
    const newDate = addWeeks(date, duration)
    // console.log(newDate)

    //TimeStamp
    const timeStamp = Math.floor(newDate / 1000)
    // console.log(timeStamp)


    const submitHandler = async (e) => {
        e.preventDefault()
        if (!amount || !duration || !purpose) {
            alert('please fill up the form')
        }else if (amount <= 20 ) {
            Alert.alert('£21 at least')
        }else if (duration < 1) {
            Alert.alert('1 week at least')
        }
        
        

        try {
            
            
            //---- Subscription 
            const paymentMethod = await createPaymentMethod({
                paymentMethodType: 'Card',
                paymentMethodData: {
                    billingDetails: cardDetails,
                }, // optional
            });

            const response = await fetch("http://localhost:12000/payment/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: user.firstName +" "+ user.lastName,
                    email: user.email,
                    amount: savingPerDay ,
                    paymentMethod: paymentMethod.paymentMethod.id,
                    cancel_at: timeStamp
                }),
            });
            const { clientSecret, method, id: sub_id, created , status} = await response.json();
            
            

            if (response.ok) {
                alert("Payment successful!");
                
                const res = await axios.post('http://localhost:12000/plan', { savingPerDay, duration, purpose, sub_id, amountSaved: 0, created  }, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })

                // console.log(res.data)

                dispatch({
                    type: 'CREATE_PLAN',
                    payload: res.data
                })
                navigation.navigate('RoadMap')


            } else {
                alert("Payment unsuccessful!");
            }


        } catch (error) {
            console.log(error)
            
        }
        // await axios.post('http://localhost:12000/plan', { amount, duration, purpose }, {
        //     headers: {
        //         'Authorization': `Bearer ${user.token}`
        //     }
        // })
        //     .then((res) => {
        //         console.log(res.data)
        //         dispatch({
        //             type: 'CREATE_PLAN',
        //             payload: res.data
        //         })
        //         navigation.navigate('RoadMap')
        //     })
        //     .catch((error)=>{ console.log(error)})
        
        

    }


    
  return (
    <View>
          {/* setting up a form */}
          <Text>Saving goal amount:</Text>
          <TextInput placeholder='£'  onChangeText={(amount)=>setAmount(amount)}/>
          <Text>Duration:</Text>
          <TextInput placeholder='Weeks' onChangeText={(duration)=>setDuration(duration)}/>
          <Text>Purpose of saving:</Text>
          <TextInput placeholder='Goal' onChangeText={(purpose) => setPurpose(purpose)} />
          {amount && duration && purpose && <View style={styles.agree}>
              <Text>Save Per Day: {savingPerDay}</Text>
              <Text>Total Saving: {saveTotal.toFixed(2)}</Text>
          </View>}

          {amount && duration && purpose && 
              <CardField
              postalCodeEnabled={true}
              placeholders={{
                  number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                  backgroundColor: '#FFFFFF',
                  textColor: '#000000',
              }}
              style={{
                  width: '100%',
                  height: 50,
                  marginVertical: 30,
              }}
              onCardChange={(cardDetails) => {
                  //   console.log('cardDetails', cardDetails);
                  setCardDetails(cardDetails)
              }}
              onFocus={(focusedField) => {
                  console.log('focusField', focusedField);
              }}
              />}
          

          {amount && duration && purpose && <Button title='Submit' onPress={submitHandler}/>}
          
    </View>
  )
}

export default Plan

const styles = StyleSheet.create({
    agree: {
        padding: 10,
        margin: 10
    }
})