import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Image, ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import SanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    SanityClient.fetch(
      `*[_type == "featured"]{
        ...,
        restaurants[]->{
          ...,
        dishes[]->
        }
      }`,
    )
      .then((data) => setFeaturedCategories(data))
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }, []);


  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://img.icons8.com/bubbles/50/user.png",
            }}
            style={styles.profileImage}
          />
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              Bellevue <ChevronDownIcon size={20} color="#00CCBB" />
            </Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <View style={styles.searchInputContainer}>
            <MagnifyingGlassIcon color="gray" />
            <TextInput placeholder="Restaurants and cuisines" keyboardType="default" style={styles.searchInput} />
          </View>
          <AdjustmentsVerticalIcon color="#00CCBB" />
        </View>

        <ScrollView style={styles.body} contentContainerStyle={styles.scrollViewContent}>
          <Categories />
          {featuredCategories.map((category) => (
            <FeaturedRow
              key={category._id}
              title={category.name}
              description={category.short_description}
              id={category._id}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    paddingTop: 10,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImage: {
    height: 40,
    width: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  locationContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  locationText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  searchInputContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
    color: '#444',
  },
  body: {
    backgroundColor: '#f2f2f2',
  },
  scrollViewContent: {
    paddingBottom: 120,
  },
});


export default HomeScreen;
