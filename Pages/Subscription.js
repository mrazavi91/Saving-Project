import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useStripe, CardField } from '@stripe/stripe-react-native'
import axios from 'axios'

const Subscription = () => {
    const { createPaymentMethod } = useStripe();
    const [cardDetails, setCardDetails] = useState({})
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState('')

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
            console.log(paymentMethod)

            const response = await fetch("http://localhost:12000/payment/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Alexqwe",
                email: "Aaqqq@yahoo.com",
                amount: "10000",
                paymentMethod: paymentMethod.paymentMethod.id    
            }),
            });
        
            

        if (response.ok) return alert("Payment successful!");
            
        //     const data = await response.json();
            
        //     setClientSecret(data.clientSecret)
        //     console.log(typeof clientSecret)

        //     const confirm = await stripe.confirmPayment("pi_3N3H2BLk6lAgcvPf2rsft4u3_secret_cFr85saD97ICu87V9NrzNfjlm", {
        //         paymentMethodType: "Card"
        //     });
            
    
        //     // const confirm = await stripe.confirmPayment({clientSecret: data.clientSecret});
        //     console.log(confirm)
        // if (confirm.error) return alert("Payment unsuccessful!");
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