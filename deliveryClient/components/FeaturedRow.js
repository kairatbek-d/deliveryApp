import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import SanityClient from "../sanity";

const FeaturedRow = ({ title, description, id }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    SanityClient.fetch(
      `*[_type == "featured" && _id == $id]{
        ...,
        restaurants[]->{
          ...,
        dishes[]->,
          type-> {
            name
          }  
        }
      }[0]`, { id },
    ).then((data) => setRestaurants(data?.restaurants));
  }, [id]);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <ArrowRightIcon color="#00ccbb" />
      </View>

      <Text style={styles.description}>{description}</Text>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
        horizontal
      >
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    fontSize: 12,
    color: 'gray',
    paddingHorizontal: 16,
  },
  scrollViewContainer: {
    paddingHorizontal: 15,
    paddingTop: 16,
  },
});

export default FeaturedRow;
