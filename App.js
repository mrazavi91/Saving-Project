import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import {StackNav, TabNavigation} from './Navigator/StackNavigation';
import BottomBar from './Components/BottomBar';


export default function App() {
  return (
 
      
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
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
