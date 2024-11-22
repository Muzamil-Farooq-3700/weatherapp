// src/screens/serchbar/Serchbar.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';

const Serchbar = ({ navigation, route }) => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (location.trim() === '') {
      alert('Please enter a location');
      return;
    }
    
    setLoading(true);
    try {
      const apiKey = "2a0235b040231eceb04be90d42cb634a"; // Replace with your actual OpenWeather API key
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
      const data = await response.json();
      
      if (data.cod === 200) {
        const weatherData = {
          location: data.name,
          temperature: data.main.temp,
          description: data.weather[0].description,
        };
        route.params.onGoBack(weatherData); // Pass data back to drawer
        navigation.goBack();
      } else {
        alert('Location not found');
      }
    } catch (error) {
      alert('Error fetching weather data');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter a location to check the weather:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
        placeholderTextColor="white" 
      />
      <Button title="Search" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" color="#8B95A2" style={{ marginTop: 20 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#2F313A',
  },
  input: {
    height: 50,
    borderColor: '#8B95A2',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'white',
  },
  title: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
});

export default Serchbar;
