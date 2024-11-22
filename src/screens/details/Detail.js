import React from 'react';
import { View, StyleSheet, TouchableOpacity,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Index from '../../SVG/Index.svg';
import Camera from '../../SVG/Camera.svg';

const Detail = () => {
  const navigation = useNavigation();

  const navigateToConnection = () => {
    navigation.navigate('Connection'); 
  };

  return (
    <View style={styles.container}>
     
      <Index width="100%" height="100%" style={styles.background} />
      <View style={styles.fileContainer}>
        <TouchableOpacity onPress={navigateToConnection}>
          <Camera width={20} height={20} style={styles.fileIcon} />
         
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
  },
  fileContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  fileIcon: {
    marginTop: 682,
    marginRight: 163,
    color: "black",
  },
});

export default Detail;
