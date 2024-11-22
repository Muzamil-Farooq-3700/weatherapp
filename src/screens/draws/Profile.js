// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView,TouchableOpacity,airQualityIndex ,airQualityDescription} from 'react-native';
// import * as Location from 'expo-location';
// import { LinearGradient } from 'expo-linear-gradient';
// import Arsln from '../../SVG/Arsln.svg';
// import Loop from '../../SVG/Loop.svg';
// import Ansir from '../../SVG/Ansir.svg';
// import Waseem from '../../SVG/Waseem.svg';
// import Mubshair from '../../SVG/Mubshair.svg';
// import Azlan from '../../SVG/Azlan.svg';
// import Musdair from '../../SVG/Musdair.svg';
// import Virus from '../../SVG/Virus.svg';
// const Profile = () => {
//   const [location, setLocation] = useState(null);
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [city, setCity] = useState('');
//   const [airQualityData, setAirQualityData] = useState(null);
//  const fetchAirQualityData = async () => {
//   try {
//     const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${AIR_QUALITY_API_KEY}`;
//     const response = await fetch(airQualityUrl);
//     const data = await response.json();
//     setAirQualityData(data);

    
//     const aqi = data.list[0]?.main.aqi;
//     const description = getAQIDescription(aqi);

//     setAirQualityIndex(aqi);
//     setAirQualityDescription(description);
//   } catch (error) {
//     setErrorMsg('Error fetching air quality data');
//   }
// };
// const getAQIDescription = (aqi) => {
//   switch (aqi) {
//     case 1:
//       return 'Good';
//     case 2:
//       return 'Fair';
//     case 3:
//       return 'Moderate';
//     case 4:
//       return 'Poor';
//     case 5:
//       return 'Very Poor';
//     default:
//       return 'Unknown';
//   }
// };

//   const AIR_QUALITY_API_KEY = "b6907d289e10d714a6e88b30761fae22"; 
// const lat = 37.7749; 
// const lon = -122.4194; 
//   const API_KEY = "2a0235b040231eceb04be90d42cb634a";

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         setLoading(false);
//         return;
//       }
//       let currentLocation = await Location.getCurrentPositionAsync({});
//       setLocation(currentLocation);
//       const fetchAirQualityData = async () => {
//         try {
//           const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${AIR_QUALITY_API_KEY}`;
//           const response = await fetch(airQualityUrl);
//           const data = await response.json();
//           setAirQualityData(data);
//         } catch (error) {
//           setErrorMsg('Error fetching air quality data');
//         }
//       };
      
//       fetchAirQualityData();
//       if (currentLocation) {
//         const { latitude, longitude } = currentLocation.coords;
//         let [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
//         setCity(`${place.city}, ${place.country}`);

//         const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

//         try {
//           const response = await fetch(apiUrl);
//           const data = await response.json();
//           setWeather(data);
//         } catch (error) {
//           setErrorMsg('Error fetching weather data');
//         }
//       }
//       setLoading(false);
//     })();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   const weatherIconUrl = weather ? `https://openweathermap.org/img/wn/${weather?.list[0]?.weather[0].icon}@2x.png` : null;
//   const windSpeed = weather ? weather.list[0].wind.speed : null;
//   const windDirectionText = windSpeed ? `${(windSpeed * 3.6).toFixed(1)} km/h` : "N/A"; 
//   const humidity = weather ? weather.list[0].main.humidity : null;
//   const precipitation = weather?.list[0].rain ? weather.list[0].rain['3h'] : '0';
//   const sunset = weather && weather?.city.sunset ? new Date(weather.city.sunset * 1000).toLocaleTimeString() : null;

//   const getDayName = (timestamp) => {
//     const date = new Date(timestamp * 1000);
//     return date.toLocaleString('en-US', { weekday: 'long' });
//   };

  
//   const groupedForecasts = weather ? weather.list.reduce((acc, forecast) => {
//     const day = getDayName(forecast.dt);
//     if (!acc[day]) {
//       acc[day] = forecast;
//     }
//     return acc;
//   }, {}) : {};

//   const days = Object.keys(groupedForecasts);

//   return ( 
//     <ScrollView 

//        style={styles.container} >
//         <View style={styles.contentContainer}>
//         <View style={styles.topRow}>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.topRowText}>Today</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.topRowText}>Precipitation</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.topRowText}>Forecast</Text>
//       </TouchableOpacity>
//     </View>
//           <Waseem style={styles.line} />
          
//           {errorMsg ? (
//             <Text style={styles.errorText}>{errorMsg}</Text>
//           ) : weather ? (
//             <View style={styles.weatherContainer}>
//               <View style={styles.iconContainer}>
//                 {weatherIconUrl && (
//                   <Image source={{ uri: weatherIconUrl }} style={styles.weatherIcon} />
//                 )}
//                 <Text style={styles.degreeText}>{weather?.list[0]?.main?.temp}°</Text>
//                 <Text style={styles.tempText}>
//                   {weather?.list[0]?.main?.temp}°C | {weather?.list[0]?.main?.feels_like}°C       |        Wind {windDirectionText}
//                 </Text>
//                 <View  style={{flexDirection:"row",justifyContent:"space-between",marginTop:26}}>
//   <Loop style={{marginLeft:50,marginTop:12,marginLeft:2}} />
//   <Text style={{marginLeft:10,marginTop:10}} >Precipitation: <Text style={{ color: '#FFFFFF' }}> {precipitation} mm</Text></Text>
//   <Arsln  style={{marginLeft:40,marginTop:12}}/>
//   <Text style={{marginLeft:10,marginTop:10}}>Humidity: <Text style={{ color: '#FFFFFF' }}> {humidity}%</Text></Text>
// </View>
// <View  style={{flexDirection:"row",justifyContent:"space-between"}}>
//   <Ansir style={{marginLeft:50,marginTop:12,marginLeft:2}} />
//   <Text style={{marginLeft:10,marginTop:10}} > Wind: <Text style={{ color: '#FFFFFF' }}>{windDirectionText}</Text></Text>
//   <Mubshair  style={{marginLeft:35,marginTop:12}}/>
//   <Text style={{marginLeft:3,marginTop:10}}>Sunset: <Text style={{ color: '#FFFFFF' }}>{sunset} </Text></Text>
// </View>
//   </View>
// <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
// {weather.list.slice(0, 8).map((forecast, index) => (
//    <View key={index} style={styles.hourlyItem}>
//     <Text style={styles.hourlyTime}>{new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit',  })}</Text>
//                     <Image
//                       source={{ uri: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png` }}
//                       style={styles.hourlyIcon}
//                     />
//                     <Text style={styles.hourlyTemp}>{forecast.main.temp}</Text>
//                   </View>
//                 ))}
//               </ScrollView>
//               <ScrollView style={styles.daysScroll}>
//                 <View style={{flexDirection:"row",justifyContent:"space-between",}}>
//               <Text style={{marginLeft:200,color:"#FFFFFF"}}>high</Text>
//               <Text style={{color:"white"}} >|</Text>
//               <Text style={{marginRight:10,color:"#FFFFFF"}}>low</Text>
//               </View>
//               {days.map((day, index) => (
//   <TouchableOpacity
//     key={index}
//     style={styles.dayItem}
//     onPress={() => {
     
//       console.log(`${day} pressed`);
//     }}
//   >
//     <View style={styles.dayItem}>
//       <Text style={styles.dayName}>{day}</Text>

//       <Image
//         source={{
//           uri: `https://openweathermap.org/img/wn/${groupedForecasts[day]?.weather[0]?.icon}@2x.png`,
//         }}
//         style={styles.dayIcon}
//       />

//       <View style={styles.tempRow}>
//         <Text style={styles.dayHighTemp}>
//           {groupedForecasts[day]?.main?.temp_max}°C
//         </Text>
//         <Text style={styles.dayLowTemp}>
//           {groupedForecasts[day]?.main?.temp_min}°C
//         </Text>
//       </View>
//     </View>
//   </TouchableOpacity>
// ))}

  
   
  
// </ScrollView>
// <ScrollView style={{ flex: 1, paddingHorizontal: 20, height: 500, width: 370,  }}>
  
 
//   <View style={{
//     flexDirection: "column", 
    
//     marginLeft:0,
//     padding: 19,
//     marginTop: 15,  
      
//     backgroundColor:  '#232329' ,
//     borderRadius: 17, 
   
//   }}>
//     <Text style={{ marginBottom: 10, fontSize: 20, color: "white", }}>Detail</Text>

    
//     <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
      
//       <Azlan style={{ marginRight: 10 }} />
      
    
//       <View style={{ flexDirection: "column" }}>
//         <Text style={{ fontSize: 16, color: "white", marginBottom: 5 }}>
//           Feels Like: {weather?.list[0]?.main?.feels_like}°C
//         </Text>
//         <Text style={{ fontSize: 16, color: "white", marginBottom: 5 }}>
//           Humidity: {weather?.list[0]?.main?.humidity}%
//         </Text>
//         <Text style={{ fontSize: 16, color: "white", marginBottom: 5 }}>
//           UV Index: low 0
//         </Text>
//         <Text style={{ fontSize: 16, color: "white", marginBottom: 5 }}>
//           Dew Point: {weather?.list[0]?.main?.dew_point}°C
//         </Text>
//       </View>
//     </View>

   
//     <Text style={{ marginTop: 20, fontSize: 16, color: '#8B95A2' }}>
//       Tonight - Clear. Winds from SW to SSW at 10 to 11 mph (16.1 to 17.7 kph). The overnight low will be 69°F (20.0°C).
//     </Text>
//   </View>
//   <ScrollView >
//   <View style={{marginTop:20,marginRight:70}}>
    
//       <View >
//         <Musdair style={{marginRight:50,}} />
//       </View>
//       <Text style={styles.description}>
//         Air Quality Index: {airQualityIndex} ({airQualityDescription})
//       </Text>
//       {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
//     </View>
// </ScrollView>

// </ScrollView>
// <Virus style={{marginTop:20}}/>
//             </View>
            
//           ) : (
//             <Text style={styles.loadingText}></Text>
//           )}
          
//         </View>
     
//     </ScrollView>
//   );
// };

// export default Profile;



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//    backgroundColor:"#484B5B",
   

//   },
//   contentContainer: {
//     flex: 1,
//     paddingHorizontal: 25,
//   },
//   topRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 14,
//   },
//   topRowText: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold',
//     marginRight: 40,
//   },
//   line: {
//     height: 1,
//     backgroundColor: '#8B95A2',
//     marginVertical: 14,
//     width: '100%',
//   },
//   weatherContainer: {
//     alignItems: 'flex-start',
//     marginRight: 29,
//   },
//   iconContainer: {
//     marginBottom: 20,
//   },
//   degreeText: {
//     fontSize: 50,
//     color: '#FFF',
//     position: 'absolute',
//     top: 15,
//     right: 25,
//   },
//   detailTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//     height:100,
//     marginRight:10
//   },
//   detailText: {
//     fontSize: 14,
//     color: '#fff',
//     marginVertical: 5,
//   },
//   svgContainer: {
//     marginVertical: 10,
//     paddingHorizontal: 20,
//   },
//   windContainer: {
//     marginVertical: 16,
//     paddingVertical: 2,
//   }, 
//    rowStyle: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',  
    
//   },
//   weatherIcon: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   infoText: {
//     fontSize: 19,
//     color: '#8B95A2',
    
//     justifyContent:"space-between"
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#FFFFFF',
//   },
//   tempText: {
//     fontSize: 13,
//     color: '#8B95A2',
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   errorText: {
//     fontSize: 18,
//     color: 'white',
//     textAlign: 'center',
//   },
//   loadingText: {
//     fontSize: 18,
//     color: '#fff',
//     textAlign: 'center',
//   },
//   svgIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 5,
    
//   },  
//   sunsetIcon: {
//     width: 24,
//     height: 24,
//     marginLeft: 15,
//   },
//   daysScroll: {
//     marginVertical: 14,
  
//     borderColor: '#fff',
//    borderRadius:16,
//     padding: 19,
//     backgroundColor: '#2C2D35',  
//     width: 352,
//     height:480,
//     marginRight:17
//   },
//   hourlyScroll: {
//     marginVertical: 20,
    
//     width:605,
   

//   },
//   hourlyItem: {
//     backgroundColor: '#2C2D35',
//     padding: 10,
//     marginRight: 3,
//     borderRadius: 30,
//     width:80,
//     height:155,
//     alignItems: 'center',
    
//   },
//   hourlyTime: {
//     fontSize: 16,
//     color: '#8B95A2',
//   },
//   hourlyIcon: {
//     width: 40,
//     height: 40,
//   },
//   hourlyTemp: {
//     fontSize: 18,
//     color: '#FFF',
//   },
//   dayItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//   },
//   dayName: {
//     fontSize: 14,
//     color: '#FFF',
//     flex: 1,
//   },
//   tempRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
   
//   },
//   dayIcon: {
//     width: 50,
//     height: 50,
//     flex: 1,
    
//   },
//    title: {
//     fontSize: 24,
//     color: '#fff',
//     marginBottom: 10,
//   },
 
//   icon: {
//     width: 100,
//     height: 100,
//   },
//   description: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 14,
//     marginTop: 10,
//   },
//   dayTemp: {
//     flexDirection:"row",
//     fontSize: 16,
//     color: '#FFD700',
//     flex: 1,
//     textAlign: 'right',
//   },
//   dayHighTemp: {
//     fontSize: 16,
//     color: '#FFF', 

//     marginRight: 16,
//   },
//   dayLowTemp: {
//     fontSize: 16,
//     color: '#FFF', 
//   },
//   sunsetIcon: {
//     width: 25,
//     height: 25,
  
// justifyContent:"space-between"  
//   },
//   sunsetText: {
//     fontSize: 16,
//    color: '#8B95A2',
//     marginRight: 30,
    
//   },
// });
