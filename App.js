import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthunticationScreen from './screens/AuthunticationScreen';//importing screens here!
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import QuizScreen from './screens/QuizScreen';
import DoubtScreen from './screens/DoubtScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthunticationScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthunticationScreen" component={AuthunticationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="DoubtScreen" component={DoubtScreen} />
        {/* Add more screens below as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}