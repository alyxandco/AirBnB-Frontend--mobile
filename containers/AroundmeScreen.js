import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/core";
import { Image, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import airbnblogo from "../assets/airbnblogo.png";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import axios from "axios";

export default function AroundmeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();
  const [arrayOfMarkers, setArrayOfMarkers] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(status);
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({});
          // console.log(location);

          setCoords({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          // console.log("response ? => ", coords);
          const response = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
          setArrayOfMarkers(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPermission();
  }, []);

  const animation = useRef(null);
  const { logo, logo_container, container, map, animationContainer } = styles;

  return isLoading ? (
    <View style={animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#fff",
        }}
        source={require("../assets/65033-home.json")}
      />
    </View>
  ) : (
    <View style={container}>
      <View style={logo_container}>
        <Image style={logo} source={airbnblogo} />
      </View>
      <MapView
        style={map}
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        {arrayOfMarkers.map((marker) => {
          return (
            <Marker
              key={marker._id}
              onPress={() => {
                navigation.navigate("Room", {
                  id: marker._id,
                });
              }}
              coordinate={{
                latitude: marker.location[1],
                longitude: marker.location[0],
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 17,
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  logo_container: {
    alignItems: "center",
    marginVertical: 15,
  },
  logo: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },

  map: {
    height: "100%",
    width: "100%",
  },

  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
