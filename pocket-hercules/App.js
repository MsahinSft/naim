import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen        from './screens/HomeScreen';
import InspirationScreen from './screens/InspirationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,          // full-screen immersive look
          cardStyle: { backgroundColor: '#0A0A0F' },
          // Smooth slide transition
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="Home"        component={HomeScreen} />
        <Stack.Screen name="Inspiration" component={InspirationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
