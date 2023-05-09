import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useStripe, CardField, useConfirmPayment , confirmPayment} from '@stripe/stripe-react-native'
import axios from 'axios'

const Subscription = () => {
    const { createPaymentMethod } = useStripe();
    const [cardDetails, setCardDetails] = useState({})
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState('')
    // const {loading , confirmPayment} = useConfirmPayment()

    const subscribeController = async (e) => {
        //create payment method
        e.preventDefault()
        
        try{
            const  paymentMethod = await createPaymentMethod({
                paymentMethodType: 'Card',
                paymentMethodData: {
                    billingDetails: cardDetails,
                }, // optional
            });
            // console.log(paymentMethod)

            const response = await fetch("http://localhost:12000/payment/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "hsgdd",
                email: "paydddy22@yahoo.com",
                amount: "600",
                paymentMethod: paymentMethod.paymentMethod.id    
            }),
            });
        
            

            if (!response.ok) return alert("Payment unsuccessful!");
            
            
            const res = await response.json();
           
            
            
            
            // const { error, paymentIntent } = await confirmPayment(clientSecret, {
            //     paymentMethodType: "Card",
            //     paymentMethodData: { paymentMethodId: method }
            // })
            // const paymentConfirm = await confirmPayment(clientSecret)
            
    
        //     // const confirm = await stripe.confirmPayment({clientSecret: data.clientSecret});
            // console.log(paymentConfirm)
            // if (paymentConfirm.error) return alert("Payment unsuccessful!");
            // if(paymentConfirm.paymentIntent) return alert("Payment Successful!")
        // alert("Payment Successful! Subscription active.");
    } catch (err) {
        console.error(err);
        alert("Payment failed! " + err.message);
    }
    }

   
    
    
  return (
    <View>
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
          />
          <Button title='subscribe' onPress={subscribeController}/>

          
    </View>
  )
}

export default Subscription

const styles = StyleSheet.create({
    cardField: {
        width: '100%',
        height: 50,
        marginVertical: 30,
    }
})