import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import {StackNav, TabNavigation} from './Navigator/StackNavigation';
import BottomBar from './Components/BottomBar';
import { PlanContextProvider } from './Context/PlanContext';


export default function App() {
  return (
 
    <PlanContextProvider>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </PlanContextProvider>
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
