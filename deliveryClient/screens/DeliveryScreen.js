import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { XMarkIcon, PhoneArrowDownLeftIcon } from "react-native-heroicons/solid";
import { setJSExceptionHandler } from "react-native-exception-handler";
import { emptyBasket } from "../slices/basketSlice";

const DeliveryScreen = ({ navigation }) => {
  setJSExceptionHandler((error, Fatal) => {
    alert(error.name);
  }, true);

  const restaurant = useSelector(selectRestaurant);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {
            navigation.navigate("Home")
            dispatch(emptyBasket())}}>
            <XMarkIcon color="#fff" size={30} />
          </TouchableOpacity>
          <Text style={styles.orderHelpText}>Order Help</Text>
        </View>

        <View style={styles.orderInfoContainer}>
          <View style={styles.orderDetails}>
            <View>
              <Text style={styles.estimatedArrivalText}>Estimated Arrival</Text>
              <Text style={styles.arrivalTime}>10-15 Minutes</Text>
            </View>
            <Image
              source={require("./assets/order.png")}
              style={styles.orderImage}
            />
          </View>
          <Progress.Bar size={30} color="#00ccbb" indeterminate={true} />
          <Text style={styles.orderStatusText}>
            Your order at {restaurant.title} is being Prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        provider={PROVIDER_GOOGLE}
        mapType="mutedStandard"
        style={styles.map}
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00ccbb"
        />
      </MapView>

      <View style={styles.riderInfoContainer}>
        <Image
          source={{
            uri: "https://img.icons8.com/doodle/48/user.png",
          }}
          style={styles.riderImage}
        />
        <View style={styles.riderDetails}>
          <Text style={styles.riderName}>Alex</Text>
          <Text style={styles.riderRole}>Your Rider</Text>
        </View>

        <TouchableOpacity style={styles.phoneIcon}>
          <PhoneArrowDownLeftIcon size={20} color="#00ccbb" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ccbb',
  },
  safeAreaView: {
    zIndex: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  orderHelpText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300',
  },
  orderInfoContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    padding: 20,
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowColor: 'black',
    shadowOffset: { height: 5, width: 0 },
    zIndex: 50,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  estimatedArrivalText: {
    color: 'gray',
    fontSize: 16,
  },
  arrivalTime: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  orderImage: {
    height: 56,
    width: 56,
  },
  orderStatusText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 10,
  },
  map: {
    flex: 1,
    marginTop: -40,
    zIndex: 0,
  },
  riderInfoContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 90,
  },
  riderImage: {
    marginRight: 10,
    height: 48,
    width: 48,
    backgroundColor: 'lightgray',
    borderRadius: 24,
  },
  riderDetails: {
    flex: 1,
    marginLeft: 10,
  },
  riderName: {
    fontSize: 18,
  },
  riderRole: {
    color: 'gray',
  },
  phoneIcon: {
    marginLeft: 10,
  },
});

export default DeliveryScreen;