import { View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Today from './Today';
import Forecast from './Forecast';
import Precipitation from '../Precipitation';

const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Today"
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#868794',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            paddingBottom: 10, // Tabs ke labels ke neeche space dene ke liye
          },
          tabBarStyle: {
            backgroundColor: '#2C2D35',
            height: 60,
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'white',
            height: 3,
            width: 30,
            bottom: -8,  // Increase the negative value to push the indicator lower
            borderRadius: 3, // Optional: Indicator ko rounded corners dena
            marginLeft: 15,  // Adjust this value to align the indicator better
          },
          lazy: true,
          swipeEnabled: true,
        }}
      >
        <Tab.Screen name="Today" component={Today} />
        <Tab.Screen name="Forecast" component={Forecast} />
        <Tab.Screen name="Precipitation" component={Precipitation} />
      </Tab.Navigator>
    </View>
  );
}
