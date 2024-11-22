import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { LineChart } from "react-native-chart-kit";
import Drop from "../../SVG/Drop.svg";
import Play from "../../SVG/Play.svg";
import Arbaz from "../../SVG/Arbaz.svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Forecast = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "2a0235b040231eceb04be90d42cb634a";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied.");
          setLoading(false);
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation);

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        if (response.ok) {
          setWeather(data);
        } else {
          setError(data.message || "Failed to fetch weather data.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const labels = weather.list
    .filter((_, index) => index % 8 === 0)
    .map((forecast) =>
      new Date(forecast.dt * 1000).toLocaleDateString([], { weekday: "short" })
    );

  const temperatures = weather.list
    .filter((_, index) => index % 8 === 0)
    .map((forecast) => Math.round(forecast.main.temp));

  const averageTemp =
    temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;

  return (
    <ScrollView>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dailyScroll}
        >
          {weather.list
            .filter((_, index) => index % 8 === 0)
            .map((forecast, index) => (
              <View key={index} style={styles.dailyItem}>
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
                  }}
                  style={styles.dailyIcon}
                />
                <Text style={styles.dailyDate}>
                  {new Date(forecast.dt * 1000).toLocaleDateString([], {
                    weekday: "short",
                    day: "numeric",
                  })}
                </Text>
                <Text style={styles.dailyTemp}>
                  {Math.round(forecast.main.temp)}°C
                </Text>
              </View>
            ))}
        </ScrollView>

        <Text style={styles.averageText}>
          Average: <Text style={{ color: "white" }}>{averageTemp.toFixed(1)}°C</Text>
        </Text>

        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: temperatures,
              },
            ],
          }}
          width={wp("90%")}
          height={hp("30%")}
          yAxisSuffix="°C"
          chartConfig={{
            backgroundColor: "#5B5E70",
            backgroundGradientFrom: "#2C2D35",
            backgroundGradientTo: "#484B5B",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={styles.graphStyle}
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            See minute-by-minute forecasts{"\n"}
            <Text style={styles.infoSubText}>Plan for the next 5 hours</Text>
          </Text>
          <Play style={styles.infoIcon} />
          <Arbaz style={styles.infoArrows} />
        </View>

        <View style={styles.hourlyColumn}>
          {weather.list.slice(0, 2).map((forecast, index) => (
            <View key={index} style={styles.hourlyItem}>
              <Text style={styles.hourlyTime}>
                {new Date(forecast.dt * 1000).toLocaleDateString([], {
                  weekday: "long",
                })}
              </Text>
              <Text style={styles.hourlyMonth}>
                {new Date(forecast.dt * 1000).toLocaleDateString([], {
                  month: "long",
                })}
              </Text>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
                }}
                style={styles.hourlyIcon}
              />
              <Text style={styles.weatherDescription}>
                {forecast.weather[0].description}
                {"\n"}
                <Text style={{ color: "#868794" }}>{forecast.wind.speed} km/h</Text>
              </Text>
              <Drop style={styles.dropIcon} />
              <Text style={styles.hourlyTexts}>
                <Text >{forecast.main.temp}°</Text>
              </Text>
              <Text style={styles.dropText}>30%</Text>
              <Arbaz style={styles.infoArrow} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Forecast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2D35",
    justifyContent: "center",
    alignItems: "center",
    padding: wp("5%"),
  },
  loadingText: {
    fontSize: wp("4%"),
    color: "#fff",
    textAlign: "center",
    marginTop: hp("1%"),
  },
  errorText: {
    fontSize: wp("4.5%"),
    color: "#ff6b6b",
    textAlign: "center",
  },
  dailyScroll: {
    marginVertical: hp("2%"),
  },
  dailyItem: {
    padding: wp("2%"),
    marginHorizontal: wp("2%"),
    alignItems: "center",
    justifyContent: "center",
    height: hp("18%"),
  },
  dailyIcon: {
    width: wp("12%"),
    height: wp("12%"),
    marginBottom: hp("1%"),
  },
  dailyDate: {
    fontSize: wp("3.5%"),
    color: "#868794",
    marginBottom: hp("0.5%"),
  },
  dailyTemp: {
    fontSize: wp("4.5%"),
    color: "#FFF",
  },
  averageText: {
    fontSize: wp("4%"),
    color: "#868794",
    fontWeight: "bold",
    marginBottom: hp("1%"),
    alignSelf: "flex-start",
  },
  graphStyle: {
    borderRadius: wp("2%"),
    marginBottom: hp("2%"),
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#2F313A",
    width: wp("90%"),
    borderRadius: wp("2%"),
    height: hp("8%"),
    alignItems: "center",
    paddingHorizontal: wp("3%"),
    marginTop: hp("1%"),
  },
  infoText: {
    color: "#868794",
    fontSize: wp("3.5%"),
  },
  infoSubText: {
    color: "#FFF",
  },
  infoIcon: {
    left:hp("10")
  
  },
  infoArrow: {
    right: hp("2%"),
  },
  infoArrows: {
   left:hp("7")
  },
  hourlyColumn: {
    marginTop: hp("2%"),
  },
  hourlyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2F313A",
    padding: wp("3%"),
    borderRadius: wp("2%"),
    marginBottom: hp("1%"),
    width: wp("90%"),
  },
  hourlyTime: {
    fontSize: wp("4%"),
    color: "#868794",
    bottom:wp(2),
  },
  hourlyMonth: {
    fontSize: wp("3.5%"),
    color: "white",
    top:wp(4),
    right:wp(18)
  },
  hourlyIcon: {
    width: wp("10%"),
    height: wp("10%"),
    right:wp(14)
  },
  weatherDescription: {
    fontSize: wp("3.5%"),
    color: "#FFBD00",
   right:wp(12)
  },
  dropIcon: {
    width: wp("5%"),
    height: wp("5%"),
    right:hp("1"),
    top:wp(3)
  },
  hourlyTexts: {
    color: "#fff",
    fontSize: wp("4%"),
right:wp(5),
    bottom: hp("1%"), // Corrected 'Buttom' to 'bottom' and made it responsive using hp()
  },
  dropText: {
    fontSize: wp("3.5%"),
    color: "#868794",
    top:wp(3),
    right:hp("6")
  },
});
