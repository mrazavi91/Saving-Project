import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import {StackNav, TabNavigation} from './Navigator/StackNavigation';
import BottomBar from './Components/BottomBar';
import { PlanContextProvider } from './Context/PlanContext';
import { UserContextProvider } from './Context/UserContext';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentInstant from './Pages/PaymentInstant';
import { SavingContextProvider } from './Context/SavingContext';


export default function App() {
  const stripeKey = 'pk_test_51N14wjLk6lAgcvPf0uIwHswCdRwHlunyDL3Ac6C2RgHRsbIGkRKYpdDUinZZco9LLSQ6cBWLuLfd8aqfSEoqe3a6002M7LLZMS' 
  return (
    <UserContextProvider>
      
      <PlanContextProvider>
        <StripeProvider publishableKey='pk_test_51N14wjLk6lAgcvPf0uIwHswCdRwHlunyDL3Ac6C2RgHRsbIGkRKYpdDUinZZco9LLSQ6cBWLuLfd8aqfSEoqe3a6002M7LLZMS' >
    
              <NavigationContainer>    
                    <StackNav />
            </NavigationContainer>
    
        </StripeProvider>
      </PlanContextProvider>
      
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
