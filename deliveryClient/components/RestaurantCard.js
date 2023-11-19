import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { StarIcon, MapPinIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantCard({
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
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
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
        });
      }}
      style={styles.card}
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <View style={styles.row}>
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text style={styles.ratingText} numberOfLines={1}>
            <Text style={styles.rating}>{rating}</Text> . {genre}
          </Text>
        </View>
        <View style={styles.row}>
          <MapPinIcon color="gray" opacity={0.5} size={22} />
          <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="tail">
            Nearby . {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginRight: 3,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
    borderRadius: 10,
    overflow: 'hidden',
    width: 280,
    height: 250,
  },
  image: {
    height: 144,
    width: '100%',
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 16,
    paddingTop: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 4,
  },
  rating: {
    color: 'green',
  },
  addressText: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 4,
  },
});
