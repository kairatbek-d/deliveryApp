import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import { removeFromBasket, selectBasketItems, selectBasketTotal } from "../slices/basketSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/solid";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = ({ navigation }) => {
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupItemsBasket, setGroupItemsBasket] = useState([]);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupItemsBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerTitle}>Basket</Text>
            <Text style={styles.restaurantName}>{restaurant.title}</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack(null)}
            style={styles.closeButton}
          >
            <XCircleIcon color="#00ccbb" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View style={styles.deliveryContainer}>
          <Ionicons name="fast-food" color="#2c9935" size={30} />
          <Text style={styles.deliveryText}> Deliver in 10-15 mins</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {Object.entries(groupItemsBasket).map(([key, items]) => (
            <View key={key} style={styles.itemContainer}>
              <Text style={styles.itemCount}>{items.length} x</Text>

              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                style={styles.itemImage}
              />
              <Text style={styles.itemName}>{items[0]?.name}</Text>

              <Text style={styles.itemPrice}>
                <Currency quantity={items[0]?.price} currency="USD" />
              </Text>

              <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id: key }))}>
                <AntDesign name="minuscircle" size={20} color="#edd" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.totalContainer}>
          <View style={styles.row}>
            <Text style={styles.subtotalText}>Subtotal</Text>
            <Text style={styles.subtotalText}>
              <Currency quantity={basketTotal} currency="USD" />
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.subtotalText}>Delivery Fee</Text>
            <Text style={styles.subtotalText}>
              <Currency quantity={13.3} currency="USD" />
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.orderTotalText}>Order Total</Text>
            <Text style={styles.orderTotalAmount}>
              <Currency quantity={basketTotal + 13.3} currency="USD" />
            </Text>
          </View>

          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={() => navigation.navigate("Prepare")}
          >
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  headerContainer: {
    padding: 20,
    borderBottomWidth: 2,
    borderColor: '#00CCBB',
    backgroundColor: '#FFF',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 20,
  },
  restaurantName: {
    color: '#666',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    padding: 5,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    marginVertical: 10,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
  },
  deliveryText: {
    flex: 1,
    fontSize: 16,
  },
  scrollView: {
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  itemCount: {
    color: '#2C9935',
    fontWeight: '600',
    fontSize: 16,
  },
  itemImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  itemName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  itemPrice: {
    color: '#666',
    fontSize: 14,
    marginRight: 10,
  },
  totalContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    marginTop: 10,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtotalText: {
    marginBottom: 5,
    fontSize: 15,
    color: '#666',
  },
  orderTotalText: {
    fontWeight: '700',
    color: '#333',
  },
  orderTotalAmount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
  },
  placeOrderButton: {
    backgroundColor: '#00CCBB',
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  placeOrderText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BasketScreen;
