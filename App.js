import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import {  TouchableWithoutFeedback,   View, Image, StyleSheet, Text, TouchableOpacity, TextInput,Modal } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import Home from './src/screens/homes/Home';
import Detail from './src/screens/details/Detail';
import Connection from './src/screens/connections/Connection';
import Serch from './src/screens/serchs/Serch';
import About from './src/screens/Abouts/About';

import Tob from './src/screens/TabTobs/Tob';
import Serchbar from './src/screens/serchbar/Serchbar';
import SignIns from './src/screens/SignIns';


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signedInName, setSignedInName] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleSignIn = () => {
    console.log("Sign In with:", { name, email, password });
    setSignedInName(name);
    setIsSigningIn(false);
  };

  const handleEditPress = () => {
    props.navigation.navigate('Serchbar', {
      onGoBack: (data) => setWeatherData(data),
    });
  };

  const handleEditclick = () => {
    props.navigation.navigate('SignIns', {
      onGoBack: (data) => setWeatherData(data),
    });
  };

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.imageContainer}>
        <Image source={require('./src/Fresh.png')} style={styles.profileImage} />
        {signedInName ? (
          <Text style={styles.signedInName}>{signedInName}</Text>
        ) : (
          <TouchableOpacity onPress={handleEditclick}>
            <Text style={styles.editTexts}>Sign In</Text>

          </TouchableOpacity>

        )}

      </View>
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
        <Image
          source={require('./src/close.png')}
          style={{ left: 250, bottom: 80 }}
        />
      </TouchableOpacity>


      <View style={styles.locationEditContainer}>
        <Text style={styles.locationText}> Location    |</Text>
        <TouchableOpacity onPress={handleEditPress}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Image source={require('./src/Map.png')} style={{ top: 30 }} />
          <Text style={styles.weatherText}>{weatherData.location}</Text>
          <Text style={styles.weatherText}>{weatherData.temperature}</Text>
          <Text style={styles.weatherText}>{weatherData.description}</Text>


        </View>

      )}

      <View style={styles.separators} />

      <View>
        
        <Text style={styles.tool}>Tools</Text>
        <TouchableOpacity>
        <Text style={styles.notification}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={require('./src/Notification.png')} style={styles.note} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.setting}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={require('./src/settings.png')} style={styles.set} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.send}>Send Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={require('./src/chat.png')} style={styles.chat} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.rate}>Rate this App</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={require('./src/stars.jpg')} style={styles.star} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.share}>Share your Weather</Text>
        <Image source={require('./src/share.png')} style={styles.weather} />
        </TouchableOpacity>
      </View>

      <DrawerItemList {...props} />

   
    </View>
  );
};
const TobDrawerNavigator = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    if (menuVisible) {
      setMenuVisible(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={{ flex: 1 }}>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#484B5B',
              width: 280,
            },
            headerStyle: {
              backgroundColor: '#2C2D35',
            },
            headerTintColor: 'white',
          }}
        >
          <Drawer.Screen
            name="  "
            component={Tob}
            options={{
              headerTitle: '',
              headerShown: true,
              headerRight: () => (
                <TouchableOpacity style={styles.iconContainer} onPress={toggleMenu}>
                  <MaterialIcons name="more-vert" size={30} color="white" />
                </TouchableOpacity>
              ),
              
            }}
          />
        </Drawer.Navigator>

        {menuVisible && (
          <View style={styles.menuContainer}>
            <TouchableOpacity>
            <Text style={styles.menuItem}>Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={styles.menuItem}>Privacy</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={styles.menuItem}>Share</Text>
            </TouchableOpacity>

          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};




const App = () => (
  
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Connection" component={Connection} />
      <Stack.Screen name="Serch" component={Serch} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Serchbar" component={Serchbar} />
     
      <Stack.Screen name="Tabs" component={TobDrawerNavigator} />
      <Stack.Screen name="SignIns" component={SignIns} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

const styles = StyleSheet.create({
  drawerContainer: {
    paddingBottom: hp('2%'),
    backgroundColor: '#232329',
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: wp('5%'),
  },
  profileImage: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('12.5%'),
    marginRight: wp('2.5%'),
  },
  signedInName: {
    fontSize: wp('5%'),
    color: 'white',
    marginTop: hp('1%'),
  },
  editText: {
    fontSize: wp('4%'),
    color: '#0077b6',
    marginRight: wp('25%'),
    paddingLeft: wp('5%'),
  },
  editTexts: {
    fontSize: wp('5%'),
    color: 'white',
    marginRight: wp('25%'),
    paddingLeft: wp('1%'),
  },
  locationEditContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp('1.5%'),
  },
  locationText: {
    fontSize: wp('4.5%'),
    color: 'white',
    marginRight: wp('1%'),
  },
  weatherContainer: {
    marginTop: hp('2.5%'),
    padding: wp('4%'),
    borderRadius: wp('2%'),
  },
  weatherText: {
    fontSize: wp('3.5%'),
    color: 'white',
    marginTop: hp('1%'),
    paddingLeft: wp('8%'),
  },
  iconImage: {
    width: wp('7.5%'),
    height: wp('7.5%'),
    marginRight: wp('3.5%'),
    fontSize: wp('3.5%'),
  },
  separators: {
    height: hp('0.2%'),
    backgroundColor: '#8B95A2',
    marginVertical: hp('1%'),
    width: '100%',
    marginTop: hp('4%'),
  },
  iconContainer: {
    marginRight: wp('2.5%'),
  },
  menuContainer: {
    position: 'absolute',
    top: hp('10%'),
    right: wp('2.5%'),
    backgroundColor: '#484B5B',
    padding: wp('2.5%'),
    borderRadius: wp('2%'),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: wp('1%'),
  },
  menuItem: {
    marginVertical: hp('0.5%'),
    color: 'white',
    fontSize: wp('4%'),
  },

  tool: {
    color: "#9B9EAD",
    fontSize: wp("5%"), 
    top: hp("3%"), 
  },
  notification: {
    color: "white",
    fontSize: wp("4%"),
    marginLeft: wp("15%"),
    top: hp("3.5%"),
  },
  note: {
    top: hp("5%"),
    left: wp("5%"),
  },
  setting: {
    color: "white",
    fontSize: wp("4%"),
    marginLeft: wp("15%"),
    top: hp("7%"),
  },
  set: {
    top: hp("8%"),
    left: wp("5%"),
  },
  send: {
    color: "white",
    fontSize: wp("4%"),
    marginLeft: wp("15%"),
    top: hp("9%"),
  },
  chat: {
    top: hp("10%"),
    left: wp("5%"),
  },
  rate: {
    color: "white",
    fontSize: wp("4%"),
    marginLeft: wp("15%"),
    top: hp("11%"),
  },
  star: {
    top: hp("12%"),
    left: wp("5%"),
  },
  share: {
    color: "white",
    fontSize: wp("4%"),
    marginLeft: wp("15%"),
    top: hp("15%"),
  },
  weather: {
    top: hp("15%"),
    left: wp("5%"),
  },
});
