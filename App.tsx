/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Colors} from './src/Constants/Colors';
import InputForm from './src/screens/FormScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from './src/screens/MapScreen';
import MyPlaces from './src/screens/MyPlaces';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: 'rgba(255,255,255,1)'},
          headerTintColor: Colors.PRIMARY,
          headerTitleStyle: {fontSize: 18, fontFamily: 'Lumanosimo'},
          headerBackTitleStyle: {
            fontSize: 12,
            fontFamily: 'Lumanosimo',
          },
        }}>
        <Stack.Screen
          name="MyPlaces"
          component={MyPlaces}
          options={{
            title: 'My Places',
          }}
        />
        <Stack.Screen
          name="Form"
          component={InputForm}
          options={{
            title: 'Input Form',
          }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: 'Map View',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
