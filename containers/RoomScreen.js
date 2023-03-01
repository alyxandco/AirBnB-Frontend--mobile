import { useNavigation } from "@react-navigation/core";
import LottieView from "lottie-react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import airbnblogo from "../assets/airbnblogo.png";
import { Entypo } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Swiper from "react-native-swiper";
import ReadMore from "@fawazahmed/react-native-read-more";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import axios from "axios";

export default function RoomScreen(setToken) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [roomLatitude, setRoomLatitude] = useState();
  const [roomLongitude, setRoomLongitude] = useState();

  // console.log("lat : ", roomLatitude);
  // console.log("long : ", roomLongitude);

  const navigation = useNavigation();

  const route = useRoute();
  //   console.log("route : ", route);
  const id = route.params.id;
  //   console.log("id : ", id);
  //   console.log("data : ", data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        setData(response.data);
        setRoomLatitude(response.data.location[0]);
        setRoomLongitude(response.data.location[1]);
        // console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const {
    desc_see_less_text,
    desc_see_more_text,
    animationContainer,
    desc_text,
    slide1,
    wrapper,
    map,
    main_container,
    illustration,
    logo,
    logo_container,
    title_text,
    review_text,
    avatar,
    rating_container,
    er1,
    er2,
  } = styles;

  const generateStars = (ratingValue) => {
    const starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        starsArray.push(
          <Entypo name="star" size={24} color="#DAA520" key={i} />
        );
      } else {
        starsArray.push(<Entypo name="star" size={24} color="grey" key={i} />);
      }
    }
    return starsArray;
  };

  const animation = useRef(null);

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
    <SafeAreaView>
      <ScrollView>
        <View style={main_container}>
          <View style={logo_container}>
            <Image style={logo} source={airbnblogo} />
          </View>
          <View>
            <Swiper
              style={wrapper}
              dotColor="grey"
              activeDotColor="red"
              autoplay
            >
              {data.photos.map((slide) => {
                return (
                  <View style={slide1} key={slide.url}>
                    <Image
                      source={{ uri: slide.url }}
                      style={illustration}
                      resizeMode="cover"
                    />
                  </View>
                );
                return;
              })}
            </Swiper>

            <View>
              <View style={rating_container}>
                <View style={er1}>
                  <Text style={title_text} numberOfLines={1}>
                    {data.title}
                  </Text>
                  <Image
                    source={{
                      uri: `${data.user.account.photo.url}`,
                    }}
                    style={avatar}
                    resizeMode="cover"
                  />
                </View>
                <View style={er2}>
                  <Text>{generateStars(data.ratingValue)}</Text>
                  <Text style={review_text}>{data.reviews} reviews</Text>
                </View>
                {/* <Text style={desc_text}>{data.description}</Text> */}
                <ReadMore
                  numberOfLines={3}
                  style={desc_text}
                  seeMoreStyle={desc_see_more_text}
                  seeLessStyle={desc_see_less_text}
                >
                  {data.description}
                </ReadMore>
              </View>
            </View>
          </View>
          <View>
            <MapView
              style={map}
              showsUserLocation
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: data.location[1],
                longitude: data.location[0],
                latitudeDelta: 0.02,
                longitudeDelta: 0.04,
              }}
            >
              <Marker
                coordinate={{
                  latitude: data.location[1],
                  longitude: data.location[0],
                }}
              />
            </MapView>
          </View>

          {/* <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

//**----- ----- ------**//
//**----- STYLE ------**//
//**----- ----- ------**//

const styles = StyleSheet.create({
  logo_container: {
    alignItems: "center",
    marginVertical: 15,
  },

  logo: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },

  wrapper: {
    height: 250,
  },
  slide1: {
    height: 300,
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  illustration: {
    backgroundColor: "red",
    alignItems: "center",
    height: 210,
    width: "100%",
  },

  main_container: {
    backgroundColor: "#fff",
    padding: 17,
  },

  title_text: {
    fontSize: 20,
    width: "70%",
    marginRight: 10,
  },

  price_text: {
    position: "absolute",
    top: 130,
    fontSize: 20,
    color: "white",
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 17,
  },

  rating_container: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 15,
  },
  review_text: {
    color: "grey",
  },

  er1: { flexDirection: "row" },

  er2: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },

  avatar: { height: 80, width: 80, resizeMode: "contain", borderRadius: 50 },

  desc_text: {
    marginVertical: 15,
    fontSize: 16,
  },

  desc_see_more_text: {
    color: "red",
    fontSize: 16,
  },

  desc_see_less_text: {
    color: "red",
    fontSize: 15,
  },

  map: {
    height: 500,
    width: "100%",
  },

  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
