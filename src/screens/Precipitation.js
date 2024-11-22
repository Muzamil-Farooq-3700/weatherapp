import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, FlatList } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import * as Location from 'expo-location'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Precipitation() {
  const [forecastData, setForecastData] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)

  const API_KEY = "2a0235b040231eceb04be90d42cb634a"

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Get user location
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied')
          return
        }

        const userLocation = await Location.getCurrentPositionAsync({})

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&units=metric&appid=${API_KEY}`
        )
        const data = await response.json()
        setForecastData(data.list) 
        setLoading(false)
      } catch (error) {
        console.error("Error fetching weather data:", error)
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [])

  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        data: [30, 50, 70, 40, 60],
      },
    ],
  }

  const renderHourlyForecast = ({ item }) => {
    const day = new Date(item.dt * 1000).toLocaleString('en-US', { weekday: 'long' })
    const month = new Date(item.dt * 1000).toLocaleString('en-US', { month: 'long' })

    return (
      <View style={styles.hourlyItemColumn}>
        {/* Day and Month Section */}
        <View style={styles.dateContainer}>
          <Text style={styles.hourlyText}>{day}</Text>
          <Text style={styles.hourlyMonth}>{month}</Text>
        </View>

        {/* Weather Icon Section */}
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
            style={styles.weatherIcon}
          />
        </View>

        {/* Weather Description Section */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.weatherDescription}>
            {item.weather[0].description}
          </Text>
        </View>

        <View style={styles.windContainer}>
          <Text style={styles.weatherDescription}>
            <Text style={{color:"white",}}><Text > {item.wind.speed} km/h</Text></Text>
          </Text>
        </View>

        <View style={styles.precipitationContainer}>
          
        </View>

        <View style={styles.tempContainer}>
          <Text style={styles.hourlyTexts}> <Text style={{left:18,color:"white"}}>{item.main.temp}°</Text></Text>
          <Text style={{fontSize:16,color:"white",left:18,bottom:12}}>30%</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Precipitation</Text>

      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - wp(5)} // Using wp for responsiveness
        height={hp(25)} // Using hp for responsiveness
        chartConfig={{
          backgroundColor: '#868794',
          backgroundGradientFrom: '#2F313A',
          backgroundGradientTo: '#868794',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        style={styles.graph}
      />
      <Text style={{fontSize: 19, left: wp(1), color: "white"}}>Precipitation</Text>
      
      {/* Forecast Data */}
      {loading ? (
        <Text>Loading weather data...</Text>
      ) : errorMsg ? (
        <Text >{errorMsg}</Text>
      ) : (
        <FlatList
          data={forecastData.slice(0, 2)} 
          renderItem={renderHourlyForecast}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(3), 
    backgroundColor: "#2C2D35",
  },
  header: {
    fontSize: wp(5), 
    fontWeight: 'bold',
    marginBottom: hp(2), 
    color: "white",
  },
  graph: {
    marginVertical: hp(2), 
    borderRadius: 16,
  },
  hourlyItemColumn: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: hp(1), 
    borderRadius: 10,
    backgroundColor: "#2F313A",
   
     
  },
  dateContainer: {
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2), 
  },
  hourlyText: {
    fontSize: wp(4), 
    fontWeight: 'bold',
    color: "#868794",
    left:13,
    
    
  },
  hourlyMonth: {
    fontSize: wp(3.5), 
    color: 'white',
   
    left:6,
  },
  weatherIcon: {
    width: wp(12), 
    height: wp(12), 
    marginVertical: hp(1),
    left: wp(3), 
   
    
  },
  iconContainer: {
    marginBottom: hp(2), 
  },
  descriptionContainer: {
    marginVertical: hp(1), 
   bottom:wp(5),
    
  },
  weatherDescription: {
    fontSize: wp(3.5), 
    color: '#FFBD00',
    textAlign: 'center',
   
    left: wp(8), 
  },
  windContainer: {
  
    
    right: wp(16), 
  },
  tempContainer: {
    marginVertical: hp(1), 
    left: wp(1), 
  },
  hourlyTexts: {
    fontSize: wp(4), // Responsive font size based on screen width
    fontWeight: 'bold',
    color: "#484B5B",
    left: wp(3), // 3% of screen width from the left
    bottom:wp(2)
  },
})
