import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2D35",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp('5%'),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: hp('2%'),
  },
  topRowText: {
    fontSize: wp('4%'),
    color: '#fff',
    fontWeight: 'bold',
    marginRight: wp('10%'),
  },
  line: {
    height: 1,
    backgroundColor: '#8B95A2',
    marginVertical: hp('2%'),
    width: '100%',
  },
  weatherContainer: {
    alignItems: 'flex-start',
    marginRight: wp('8%'),
  },
  iconContainer: {
    marginBottom: hp('3%'),
  },
  degreeText: {
    fontSize: wp('12%'),
    color: '#868794',
    position: 'absolute',
    top: hp('5%'),
    left: wp('50%'),
  },
  detailTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#fff',
    height: hp('12%'),
    marginRight: wp('3%'),
  },
  detailText: {
    fontSize: wp('3.5%'),
    color: '#fff',
    marginVertical: hp('1%'),
  },
  svgContainer: {
    marginVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  windContainer: {
    marginVertical: hp('3%'),
    paddingVertical: hp('1%'),
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherIcon: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('12.5%'),
    top: hp('2%'),
  },
  infoText: {
    fontSize: wp('5%'),
    color: '#8B95A2',
  },
  tempText: {
    fontSize: wp('3.5%'),
    color: '#8B95A2',
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },
  errorText: {
    fontSize: wp('4.5%'),
    color: 'white',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: wp('4.5%'),
    color: '#fff',
    textAlign: 'center',
  },
  svgIcon: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('2%'),
  },
  sunsetIcon: {
    width: wp('6%'),
    height: wp('6%'),
    marginLeft: wp('4%'),
  },
  daysScroll: {
    marginVertical: hp('2%'),
    borderColor: '#fff',
    borderRadius: wp('4%'),
    padding: wp('5%'),
    backgroundColor: '#232329',
    width: wp('87%'),
    height: hp('60%'),
    marginRight: wp('4%'),
  },
  hourlyScroll: {
    marginVertical: hp('3%'),
    width: wp('90%'),
  },
  hourlyItem: {
    backgroundColor: '#32333E',
    padding: wp('3%'),
    marginRight: wp('2%'),
    borderRadius: wp('18%'),
    height: hp('15%'),
    alignItems: 'center',
  },
  hourlyTime: {
    fontSize: wp('3.5%'),
    color: 'white',
  },
  hourlyIcon: {
    width: wp('10%'),
    height: wp('10%'),
  },
  hourlyTemp: {
    fontSize: wp('3.5%'),
    color: '#FFF',
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('1%'),
  },
  dayName: {
    fontSize: wp('3.5%'),
    color: '#FFF',
    flex: 1,
  },
  tempRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayIcon: {
    width: wp('14%'),
    height: wp('14%'),
    flex: 1,
  },
  dayHighTemp: {
    fontSize: wp('3.5%'),
    color: '#FFF',
    marginRight: wp('5%'),
  },
  dayLowTemp: {
    fontSize: wp('3.5%'),
    color: '#FFF',
  },
  sunsetText: {
    fontSize: wp('4%'),
    color: '#8B95A2',
    marginRight: wp('8%'),
  },
  header: {
    fontSize: wp('6%'),
    fontWeight: "bold",
    marginBottom: hp('3%'),
    color: "white",
    
  },
  sunset: {
    marginLeft: wp('7%'),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp('2%'),
  },
  text: {
    fontSize: wp('4%'),
    color: "white",
  },
  containers: {
    padding: wp('5%'),
    backgroundColor: '#2F313A',
    borderRadius: wp('3%'),
    marginVertical: hp('3%'),
    marginHorizontal: wp('2%'),
    width: wp('89%'),
    right:hp(1)
  },
});

export default styles;
