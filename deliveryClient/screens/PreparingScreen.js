import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { SafeAreaView, StyleSheet } from "react-native";

const PreparingScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.Image
        source={require("./assets/delivery-boy.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={styles.image}
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={styles.text}
      >
        Assigning Delivery partner to your order
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00ccbb',
  },
  image: {
    height: 240,
    width: 240,
  },
  text: {
    fontSize: 16,
    marginVertical: 40,
    paddingHorizontal: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PreparingScreen;