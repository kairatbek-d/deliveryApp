import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketContainer from "../components/BasketContainer";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../slices/restaurantSlice";

const RestaurantScreen = ({ route, navigation }) => {
  const {
    params: { id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat },
  } = route;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      }),
    );
  }, [dispatch]);

  return (
    <>
      <BasketContainer />
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: urlFor(imgUrl).url() }} style={styles.image} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack(null)}
          >
            <ArrowLeftIcon size={20} color="#00ccbb" />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.ratingContainer}>
              <StarIcon color="green" opacity={0.5} size={22} />
              <Text style={styles.ratingText}>
                <Text style={styles.rating}>{rating}</Text> . {genre}
              </Text>
            </View>
            <View style={styles.addressContainer}>
              <MapPinIcon color="gray" opacity={0.5} size={22} />
              <Text style={styles.addressText}>Nearby . {address}</Text>
            </View>
            <Text style={styles.description}>{short_description}</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Menu</Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    marginTop: 30,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#e0e0e0',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 30,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  rating: {
    color: 'green',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  description: {
    color: '#444',
    marginTop: 10,
    paddingBottom: 16,
  },
  menuContainer: {
    paddingBottom: 150,
    backgroundColor: '#f8f8f8',
  },
  menuTitle: {
    paddingHorizontal: 20,
    paddingTop: 30,
    marginBottom: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});


export default RestaurantScreen;
