import { useNavigation } from "@react-navigation/core";
import { useEffect, useState, useRef } from "react";
import airbnblogo from "../assets/airbnblogo.png";
import { Entypo } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import {
  useWindowDimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import axios from "axios";

export default function HomeScreen(setToken) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms`
        );
        setData(response.data);
        // console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const {
    safeAreaview,
    main_container,
    illustration,
    logo,
    logo_container,
    title_text,
    price_text,
    review_text,
    avatar,
    rating_container,
    er1,
    er2,
    flatlist_container,
    animationContainer,
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
    <SafeAreaView style={safeAreaview}>
      <View style={main_container}>
        <View style={logo_container}>
          <Image style={logo} source={airbnblogo} />
        </View>

        <FlatList
          data={data}
          KeyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => (
            <View style={flatlist_container}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("RoomScreen", {
                    id: item._id,
                  });
                }}
              >
                <Image
                  source={{
                    uri: `${item.photos[0].url}`,
                  }}
                  style={illustration}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <View>
                <View style={rating_container}>
                  <View style={er1}>
                    <Text style={title_text} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Image
                      source={{
                        uri: `${item.user.account.photo.url}`,
                      }}
                      style={avatar}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={er2}>
                    <Text>{generateStars(item.ratingValue)}</Text>
                    <Text style={review_text}>{item.reviews} reviews</Text>
                  </View>
                </View>
              </View>
              <Text style={price_text}>{item.price} €</Text>
            </View>
          )}
        />

        {/* <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        /> */}
      </View>
    </SafeAreaView>
  );
}

//**----- ----- ------**//
//**----- STYLE ------**//
//**----- ----- ------**//

const styles = StyleSheet.create({
  safeAreaview: { paddingBottom: 100 },

  logo_container: {
    alignItems: "center",
    marginVertical: 15,
  },
  logo: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  illustration: {
    alignItems: "center",
    height: 210,
    width: "100%",
    position: "relative",
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

  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
