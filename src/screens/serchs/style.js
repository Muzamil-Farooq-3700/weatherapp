import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  skipText: {
    position: 'absolute',
    top: 60,
    right: 50,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bitmapContainer: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
    width: '100%',
  },
  bitmap: {
    width: 150,
    height: 150,
  },
  
  circle: {
    width: 700,
    height: 700,
    borderRadius: 350,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom:500,
  },
  titleText: {
    color: '#FFFFFF',  // Set to white color
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitleText: {
    color: '#FFFFFF',  // Set to white color
    fontSize: 16,
    textAlign: 'center',
  },
  groIcon: {
    width: 50,
    height: 50,
    marginBottom: 100,
  },
});

export default styles;
