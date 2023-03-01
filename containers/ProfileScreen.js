import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import {
  Platform,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// assets
import LottieView from "lottie-react-native";
import airbnblogo from "../assets/airbnblogo.png";
import avatar from "../assets/avatar.png";
import { Entypo } from "@expo/vector-icons";

export default function ProfileScreen({ navigation, setToken, setId }) {
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("Lorem Ipsum");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPicture, setSelectedPicture] = useState(null);

  // console.log("email : ", email);
  // console.log("username : ", username);
  // console.log("description : ", description);
  // console.log("data : ", data);

  const getPermissionLibraryPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      // console.log("result.assets[0].uri : ", result.assets[0].uri);
      setSelectedPicture(result.assets[0].uri);
    } else {
      alert("Permission refusée");
    }
  };

  const getPermissionAndTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    // console.log(status);
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      // console.log(result);
      setSelectedPicture(result.assets[0].uri);
    } else {
      alert("Permission refusée");
    }
  };

  const sendPicture = async () => {
    const id = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("userToken");
    try {
      if (!selectedPicture) {
        alert("Merci de sélectionner une photo");
        return;
      }
      const fileExtension = selectedPicture.split(".")[1];

      const formData = new FormData();
      formData.append("photo", {
        uri: selectedPicture,
        name: `my-pic.${fileExtension}`,
        type: `image/${fileExtension}`,
      });
      // console.log("fileExtension : ", fileExtension);
      // console.log("formData : ", formData);

      const response = await axios.put(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      // console.log("response route photo : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const submit = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      if (!email || !username || !description) {
        alert("Merci de remplir tous les champs");
        return;
      }
      setIsLoading(true);
      const response = await axios.put(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update/",
        { email: email, username: username, description: description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
      }
      console.log("response.data : ", response.data);
      // console.log(response.data);
      setData(response.data);
      setEmail(response.data.email);
      setUsername(response.data.username);
      setDescription(response.data.description);
      alert("Profil mis à jour !");
      setIsLoading(false);
    } catch (error) {
      console.log("error : ", error);
      const message = error.response.data.error;
      const statusCode = error.response.status;

      console.log(error.response.data.error);
      console.log(error.response.status);

      if (statusCode === 400 || statusCode === 401) {
        alert(message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");
      // console.log(id);
      // console.log(token);
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          // console.log(response.data);
          setData(response.data);
          setEmail(response.data.email);
          setUsername(response.data.username);
          setDescription(response.data.description);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  const {
    image_button,
    profile_first_section_container,
    image_buttons,
    profile_picture_image,
    profile_picture_container,
    button_logout,
    animationContainer,
    viewDimension,
    scrollView,
    logo,
    logo_container,
    input_container,
    main_container,
    input,
    button,
    text_button,
    input_textarea,
  } = styles;

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
      <ScrollView style={[viewDimension, scrollView]}>
        <View style={main_container}>
          <View style={logo_container}>
            <Image style={logo} source={airbnblogo} />
            {/* <Text style={text_logo}>My profile</Text> */}
          </View>

          <View style={profile_first_section_container}>
            <View style={profile_picture_container}>
              {selectedPicture ? (
                <Image
                  source={{ uri: selectedPicture }}
                  style={profile_picture_image}
                />
              ) : data.photo ? (
                <Image
                  style={profile_picture_image}
                  source={{ uri: data.photo.url }}
                ></Image>
              ) : (
                <Image source={avatar} style={profile_picture_image} />
              )}
            </View>
            <View style={image_buttons}>
              <View style={image_button}>
                <Entypo
                  name="images"
                  size={30}
                  color="grey"
                  onPress={getPermissionLibraryPicture}
                />
              </View>
              <View>
                <Entypo
                  name="camera"
                  size={30}
                  color="grey"
                  onPress={getPermissionAndTakePhoto}
                />
              </View>
            </View>
          </View>

          <View>
            <View style={input_container}>
              <TextInput
                placeholder={data.email}
                autoCapitalize="none"
                style={input}
                value={email}
                onChangeText={(input) => {
                  setEmail(input);
                }}
              />
              <TextInput
                placeholder={data.username}
                autoCapitalize="none"
                style={input}
                value={username}
                onChangeText={(input) => {
                  setUsername(input);
                }}
              />
              <View style={input_textarea}>
                <TextInput
                  editable
                  multiline
                  numberOfLines={5}
                  maxLength={200}
                  placeholder={data.description}
                  value={description}
                  style={{ padding: 10 }}
                  onChangeText={(input) => {
                    setDescription(input);
                  }}
                />
              </View>
              <View>
                <TouchableOpacity style={button} onPress={sendPicture}>
                  <Text style={text_button}>Update photo</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={button}
                  onPress={() => {
                    submit();
                  }}
                >
                  <Text style={text_button}>Update infos</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={button_logout}
                  onPress={() => {
                    setToken(null);
                    setId(null);
                  }}
                >
                  <Text style={text_button}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

//**----- ----- ------**//
//**----- STYLE ------**//
//**----- ----- ------**//

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  viewDimension: {
    height: "100%",
    width: "100%",
  },

  scrollView: {
    paddingTop: Constants.statusBarHeight,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: "white",
  },

  main_container: {
    alignItems: "center",
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

  profile_first_section_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  profile_picture_container: {
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 3,
    width: 143,
    height: 143,
    marginVertical: 20,
    borderRadius: 100,
    // alignItems: "center",
  },

  profile_picture_image: {
    // flex: 1,
    width: 138,
    height: 138,
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 100,
    resizeMode: "cover",
  },

  image_buttons: { paddingLeft: 10 },

  image_button: { paddingBottom: 10 },

  input_container: {
    width: 250,
    marginBottom: 50,
    paddingBottom: 30,
  },
  input: {
    height: 40,
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomColor: "red",
    borderStyle: "solid",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },

  input_textarea: {
    paddingBottom: 10,
    marginBottom: 20,
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 1,
  },

  button: {
    height: 50,
    paddingBottom: 10,
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 25,
    marginVertical: 10,
  },

  button_logout: {
    backgroundColor: "#E7E7E7",
    height: 50,
    paddingBottom: 10,
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 25,
    marginVertical: 10,
  },

  text_button: {
    color: "grey",
    lineHeight: 40,
    justifyContent: "center",
    textAlign: "center",
    fontSize: 15,
  },
  text_bottom: {
    lineHeight: 50,
    textAlign: "center",
    fontSize: 12,
    color: "grey",
    marginBottom: 50,
  },
});
