import React from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{ uri: imgUrl }}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 2,
    position: 'relative',
  },
  image: {
    height: 80, // Adjusted from 20 units to 80 for better visibility, feel free to modify
    width: 80, // Adjusted from 20 units to 80 for better visibility, feel free to modify
    borderRadius: 10,
  },
  title: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  // Add more styles as needed
});

export default CategoryCard;
