import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  selectBasketItemsWithId,
  removeFromBasket,
} from "../slices/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);

  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };
  const items = useSelector((state) => selectBasketItemsWithId(state, id));

  const removeItemFromBasketHandler = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        style={styles.container}
      >
        <View style={styles.row}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.price}>
              <Currency quantity={price} currency="USD" />
            </Text>
          </View>
          <Image
            source={{ uri: urlFor(image).url() }}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View style={styles.controlsContainer}>
          <View style={styles.controls}>
            <TouchableOpacity onPress={removeItemFromBasketHandler} disabled={items.length === 0}>
              <MinusCircleIcon color={items.length > 0 ? "#00ccbb" : "gray"} size={40} />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color="#00ccbb" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: 'gray',
    fontSize: 12,
  },
  price: {
    color: 'gray',
    marginTop: 8,
  },
  image: {
    height: 80,
    width: 80,
    backgroundColor: 'lightgray',
    padding: 16,
    borderRadius: 10,
  },
  controlsContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
});

export default DishRow;
