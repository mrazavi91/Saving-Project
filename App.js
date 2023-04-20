import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import {StackNav, TabNavigation} from './Navigator/StackNavigation';
import BottomBar from './Components/BottomBar';
import { PlanContextProvider } from './Context/PlanContext';
import { UserContextProvider } from './Context/UserContext';


export default function App() {
  return (
    <UserContextProvider>
      <PlanContextProvider>
        <NavigationContainer>
          <StackNav />
        </NavigationContainer>
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
