import React, { useCallback } from 'react';
import { View } from 'react-native';
import styles from './style';
import { useFocusEffect } from '@react-navigation/native';
import Filter from '../../SVG/Filter.svg'; 

const Home = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate('Detail'); 
      }, 4000); 

      return () => clearTimeout(timer); 
    }, [navigation])
  );

  return (
    <View>
      <Filter width="100%" height="100%"  />
    </View>
  );
};

export default Home;
