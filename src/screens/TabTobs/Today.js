import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style';

import Star from '../../SVG/Star.svg';



import Loop from '../../SVG/Loop.svg';
import Heart from '../../SVG/Heart.svg';
import Edit from '../../SVG/Edit.svg';
import Azlan from '../../SVG/Azlan.svg';
import Air from '../../SVG/Air.svg';
import Virus from '../../SVG/Virus.svg';
import Suns from '../../SVG/Suns.svg';
import Moons from '../../SVG/Moons.svg';
import axios from "axios";
import { SafeAreaView } from 'react-native-safe-area-context';
const Today = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [city, setCity] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [data, setData] = useState({
    sunrise: "",
    sunset: "",
    moonrise: "07:00 PM",
    moonset: "06:00 AM",
  });
  const API_KEY = "2a0235b040231eceb04be90d42cb634a";
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&formatted=0"
      );
      const { sunrise, sunset } = response.data.results;


      setData({
        sunrise: formatTime(sunrise),
        sunset: formatTime(sunset),
      });
    } catch (error) {
      console.error("Error fetching sun and moon data:", error);
    }
  };
  function formatTime(time) {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }
  useEffect(() => {

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      if (currentLocation) {
        const { latitude, longitude } = currentLocation.coords;
        let [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
        setCity(`${place.city}, ${place.country}`);

        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          setWeather(data);
        } catch (error) {
          setErrorMsg('Error fetching weather data');
        }
      }
      setLoading(false);
    })();
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const weatherIconUrl = weather ? `https://openweathermap.org/img/wn/${weather?.list[0]?.weather[0].icon}@2x.png` : null;
  const windSpeed = weather ? weather.list[0].wind.speed : null;
  const windDirectionText = windSpeed ? `${(windSpeed * 3.6).toFixed(1)} km/h` : "N/A";
  const humidity = weather ? weather.list[0].main.humidity : null;
  const precipitation = weather?.list[0].rain ? weather.list[0].rain['3h'] : '0';
  const sunset = weather && weather?.city.sunset ? new Date(weather.city.sunset * 1000).toLocaleTimeString() : null;

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('en-US', { weekday: 'long' });
  };

  const groupedForecasts = weather ? weather.list.reduce((acc, forecast) => {
    const day = getDayName(forecast.dt);
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(forecast);
    return acc;
  }, {}) : {};

  const days = Object.keys(groupedForecasts);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : weather ? (
          <View style={styles.weatherContainer}>
            <View style={styles.iconContainer}>
              {weatherIconUrl && <Image source={{ uri: weatherIconUrl }} style={styles.weatherIcon} />}
              <Text style={styles.degreeText}>{weather?.list[0]?.main?.temp}°</Text>
              <Text style={styles.tempText}>
                {weather?.list[0]?.main?.temp}°C |<Text style={{ color: "white", }}> {weather?.list[0]?.main?.feels_like}°C</Text>        |             Wind <Text style={{ color: "white" }}>{windDirectionText}</Text>
              </Text>
              <View style={{ flexDirection: "column" }}>

                <View style={{ flexDirection: "column", gap: 10, top: 20 }}>

                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginVertical: 10 }}>
                    <Loop style={{ left: 5 }} />
                    <Text style={{ color: "#868794",left:10 }}>Precipitation: <Text style={{ color: '#FFFFFF' }}>{precipitation} mm</Text></Text>
                    <Star style={{marginLeft:36}}/>
                    <Text style={{ color: "#868794", left: 10 }}>Humidity: <Text style={{ color: '#FFFFFF', marginLeft: 19 }}>{humidity}%</Text></Text>
                  </View>

                  {/* Second Row */}
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                    <Heart style={{ left:5 }} />
                    <Text style={{ color: "#868794", right: 3 }}>Wind: <Text style={{ color: '#FFFFFF' }}>{windDirectionText}</Text></Text>
                    <Edit style={{ left: 38 }} />
                    <Text style={{ color: "#868794", left: 42 }}>Sunset: <Text style={{ color: '#FFFFFF', left: 25 }}>{sunset}</Text></Text>
                  </View>
                </View>

              </View>

            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
              {weather.list.slice(0, 5).map((forecast, index) => (
                <View key={index} style={styles.hourlyItem}>
                  <Text style={styles.hourlyTime}>{new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit' })}</Text>
                  <Image source={{ uri: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png` }} style={styles.hourlyIcon} />
                  <Text style={styles.hourlyTemp}>{forecast.main.temp}</Text>
                </View>
              ))}
            </ScrollView>

            <ScrollView style={styles.daysScroll}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ marginLeft: 200, color: "#868794" }}>high</Text>
                <Text style={{ color: "#868794" }}>|</Text>
                <Text style={{ marginRight: 10, color: "#868794" }}>low</Text>
              </View>

              {days.map((day, index) => (
                <View key={index}>
                  <TouchableOpacity style={styles.dayItem} onPress={() => setSelectedDay(selectedDay === day ? null : day)}>
                    <Text style={styles.dayName}>{day}</Text>
                    <Image
                      source={{ uri: `https://openweathermap.org/img/wn/${groupedForecasts[day]?.[0]?.weather[0]?.icon}@2x.png` }}
                      style={styles.dayIcon}
                    />
                    <View style={styles.tempRow}>
                      <Text style={styles.dayHighTemp}>{groupedForecasts[day]?.[0]?.main?.temp_max}°C</Text>
                      <Text style={styles.dayLowTemp}>{groupedForecasts[day]?.[0]?.main?.temp_min}°C</Text>
                    </View>
                  </TouchableOpacity>

                  {selectedDay === day && (
                    <ScrollView horizontal style={styles.hourlyScroll}>
                      {groupedForecasts[day].map((forecast, idx) => {
                        const forecastDate = new Date(forecast.dt * 1000);
                        return (
                          <View key={idx} style={styles.hourlyItem}>
                            <Text style={styles.hourlyTime}>{forecastDate.getHours()}:00</Text>
                            <Image
                              source={{
                                uri: `https://openweathermap.org/img/wn/${forecast.weather[0]?.icon}@2x.png`,
                              }}
                              style={styles.hourlyIcon}
                            />
                            <Text style={styles.hourlyTemp}>{forecast.main.temp}°C</Text>
                          </View>
                        );
                      })}
                    </ScrollView>
                  )}
                </View>
              ))}
            </ScrollView>
            <View style={{
              flexDirection: "column",

              marginLeft: 0,
              padding: 19,
              marginTop: 15,
              width: 338,
              backgroundColor: '#232329',
              borderRadius: 10,

            }}>
              <Text style={{ marginBottom: 10, fontSize: 20, color: "white", }}>Detail</Text>


              <View style={{ flexDirection: "row", alignItems: "center" }}>

                <Azlan style={{ marginRight: 10 }} />


                <View style={{ flexDirection: "column" }}>
                  <Text style={{ fontSize: 16, color: "#868794", marginBottom: 5 }}>
                    Feels Like <Text style={{ color: "white", }}>           {weather?.list[0]?.main?.feels_like}</Text>
                  </Text>
                  <Text style={{ fontSize: 16, color: "#868794", marginBottom: 5 }}>
                    Humidity<Text style={{ color: "white" }}>              {weather?.list[0]?.main?.humidity}%</Text>
                  </Text>
                  <Text style={{ fontSize: 16, color: "#868794", marginBottom: 5 }}>
                    UV Index<Text style={{ color: "white" }}>              low 0</Text>
                  </Text>
                  <Text style={{ fontSize: 16, color: "#868794", marginBottom: 5 }}>
                    Dew Point <Text style={{ color: "white" }}>          {weather?.list[0]?.main?.dew_point}56°C</Text>
                  </Text>
                </View>
              </View>


              <Text style={{ marginTop: 20, fontSize: 16, color: '#8B95A2' }}>
                Tonight - Clear. Winds from SW to SSW at 10 to 11 mph (16.1 to 17.7 kph). The overnight low will be 69°F (20.0°C).
              </Text>
            </View>
            <Text style={{ width: 500, top: 10}}>
              <Air />
            </Text>
            <Text style={{ top: 17, width: 450,  }}>
              <Virus />
            </Text>
            <ScrollView

              style={styles.containers}
            >
              <Text style={styles.header}>Sun & Moon</Text>
              <View style={styles.row}>
                <Text style={styles.text}>
                  {data.sunrise}{"\n"}Sunrise
                </Text>
                <Suns style={{ left: 34 }} />
                <Moons />
                <Text style={[styles.text, styles.sunset]}>
                  {data.sunset}{"\n"}Sunset
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  {data.moonrise}{"\n"}
                </Text>
                <Text style={styles.text}>
                  {data.moonset}{"\n"}
                </Text>
              </View>

            </ScrollView>


          </View>

        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}

      </View>
    </ScrollView>
  );
};

export default Today;

