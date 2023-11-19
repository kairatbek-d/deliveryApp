import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../slices/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

const BasketContainer = () => {
  const items = useSelector(selectBasketItems);
  const basketTotalPrice = useSelector(selectBasketTotal);
  const navigation = useNavigation();

  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => navigation.navigate("Basket")} 
        style={styles.button}
      >
        <Text style={styles.itemCount}>
          {items.length}
        </Text>
        <Text style={styles.viewBasketText}>View basket</Text>
        <Text style={styles.totalPrice}>
          <Currency quantity={basketTotalPrice} currency="USD" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 56,
    width: '100%',
    zIndex: 50,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#00ccbb',
    padding: 16,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemCount: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#01a296',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  viewBasketText: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  totalPrice: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BasketContainer;
