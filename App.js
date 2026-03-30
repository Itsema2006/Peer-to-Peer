import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import LearnScreen from './src/screens/LearnScreen';
import EarnScreen from './src/screens/EarnScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: '🏠',
  Learn: '📚',
  Earn: '💼',
  Profile: '👤',
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: () => (
            <Text style={{ fontSize: 22 }}>{TAB_ICONS[route.name]}</Text>
          ),
          tabBarActiveTintColor: '#4A90E2',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopColor: '#EEE',
            paddingBottom: 4,
            height: 56,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Learn" component={LearnScreen} />
        <Tab.Screen name="Earn" component={EarnScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
