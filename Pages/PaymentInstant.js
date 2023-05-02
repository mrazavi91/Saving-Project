import { Alert, StyleSheet, Text, View, Button, SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import {useStripe} from '@stripe/stripe-react-native'
import axios from 'axios'

const PaymentInstant = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('')

    //fetch payment post request
    const fetchPayment = async () => {
        const res = await axios.post('http://localhost:12000/payment/intent', { amount: 123450 })

        const { clientSecret, ephemeralKey, customer } = res.data
        setClientSecret(clientSecret)
        
        return { clientSecret, ephemeralKey, customer }
    }

    //lets initialize the payment
    const initializePayment = async () => {
        const { clientSecret, ephemeralKey, customer } = await fetchPayment()
        console.log(clientSecret)

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: clientSecret,
            allowsDelayedPaymentMethods: true,
            // applePay: {
            //     merchantCountryCode: 'US'
            // }
        })
        

        if (!error) {
            setLoading(true);
        }
    }
    const openPayment = async () => {
        const presentSheet = await presentPaymentSheet({ clientSecret: clientSecret, confirmPayment: true });
        console.log(presentSheet)
        if (presentSheet.error) {
            Alert.alert(`Error code: ${presentSheet.error.code}`, presentSheet.error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
    }

    useEffect(() => {
        initializePayment()
    },[])
    // const stripe = useStripe()

    // const checkoutHandler = async () => {
        
    //     try {
            
    //         // sending request
    //         const response = await fetch("http://localhost:12000/payment/intent", {
    //             method: "POST",
    //             body: JSON.stringify({ amount: 1790 }),
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         const data = await response.json();
    //         if (!response.ok) return Alert.alert(data.message);
    //         const clientSecret = data.clientSecret;
    //         const initSheet = await stripe.initPaymentSheet({
    //             paymentIntentClientSecret: clientSecret,
    //         });

    //         if (initSheet.error) return Alert.alert(initSheet.error.message);
    //         const presentSheet = await stripe.presentPaymentSheet({ clientSecret: clientSecret, confirmPayment: true })

    //         if (presentSheet.error) return Alert.alert(presentSheet.error.message);
    //         Alert.alert("Payment complete, thank you!");
    //     } catch (error) {
    //         console.log(error)
            
    //     }
    // }
    
  return (
    //   <View>
          
    //       <Button title="Checkout" onPress={checkoutHandler} />
    //   </View>
      <View>
          <Button
              variant="primary"
              disabled={!loading}
              title="Checkout"
              onPress={openPayment}
          />
      </View>
  )
}

export default PaymentInstant

const styles = StyleSheet.create({})