import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Txt from '../../SVG/Txt.svg';
import Camera from '../../SVG/Camera.svg';

const Serch = () => {
  const navigation = useNavigation();

  const navigateToConnection = () => {
   
    navigation.navigate('About' ); 
  };

  return (
    <View style={styles.container}>
      <Txt width="100%" height="100%" style={styles.background} />
      <View style={styles.fileContainer}>
        <TouchableOpacity onPress={navigateToConnection}>
          <Camera width={22} height={22} style={styles.fileIcon} />
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
    marginRight: 162,
    color: "black",
  },
});

export default Serch;
