import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';  
import Camera from '../../SVG/Camera.svg';
import { TouchableOpacity } from 'react-native';

const About = () => {
  const navigation = useNavigation();  

  const handlePress = () => {
    navigation.navigate('Tabs');  
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../Adeel.png')} style={styles.fullScreenImage} />
      <View style={styles.overlayContainer}>
        <TouchableOpacity onPress={handlePress}>
          <Camera width={25} height={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayContainer: {
    position: 'absolute', 
    top: 701, 
    left: 178,
  },
});

export default About;
