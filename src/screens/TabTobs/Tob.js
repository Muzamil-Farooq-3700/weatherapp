import { View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Today from './Today';
import Forecast from './Forecast';
import Precipitation from '../Precipitation';

const Tab = createMaterialTopTabNavigator();

export default function Top() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Today"
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#868794',
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          tabBarStyle: {
            backgroundColor: '#2C2D35',
            height: 60,  
            
          
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'white',
            height: 3,  
            width:30,
            marginBottom: 5, 
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
