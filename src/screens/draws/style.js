import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    padding: 20,
  },
  content: {
    alignItems: 'center', // Center align the items horizontally
    flexDirection: 'column', // Arrange items in a column
  },
  rowContainer: {
    flexDirection: 'row', // Arrange items in a row
    justifyContent: 'space-between', // Space out the items evenly
    width: '100%', // Use full width of the container
    marginBottom: 20, // Space below the row
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    marginRight: 10, // Space between header and next text
    
  },
  forecastText: {
    fontSize: 24,
    color: '#FFFFFF',
    marginHorizontal: 10,
    color: "#8B95A2"
     // Space between forecast and Rad
  },
  radText: {
    fontSize: 24,
    color: '#FFFFFF',
    color: "#8B95A2"
  },
});

export default styles;
