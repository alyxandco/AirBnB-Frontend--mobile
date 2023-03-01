import { useNavigation } from "@react-navigation/core";
import Constants from "expo-constants";
import axios from "axios";
import { useState } from "react";
import { PasswordVisible } from "../components/PasswordVisible";

import { Ionicons } from "@expo/vector-icons";
import airbnblogo from "../assets/airbnblogo.png";
import {
  Pressable,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image,
} from "react-native";

export default function SignInScreen({ setToken, setId }) {
  const { passwordVisibility, eyeIcon, handlePasswordVisibility } =
    PasswordVisible();

  // console.log(Platform.OS);

  const [email, setEmail] = useState("ab21@test.com");
  const [password, setPassword] = useState("azerty");

  // console.log("email : ", email);
  // console.log("password : ", password);

  const submit = async () => {
    try {
      if (!email || !password) {
        alert("Merci de remplir tous les champs");
        return;
      }

      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      // console.log(response.data);
      if (response.data) {
        setToken(response.data.token);
        setId(response.data.id);
        alert(`Bienvenue ${response.data.username}`);
      }
    } catch (error) {
      const message = error.response.data.error;
      const statusCode = error.response.status;

      console.log(error.response.data.error);
      console.log(error.response.status);

      if (statusCode === 400 || statusCode === 401) {
        alert(message);
      }
    }
  };

  const navigation = useNavigation();
  const {
    pwd_input_container,
    pwd_container,
    viewDimension,
    scrollView,
    logo,
    logo_container,
    text_logo,
    input_container,
    main_container,
    input,
    button,
    text_button,
    text_bottom,
  } = styles;

  return (
    <SafeAreaView>
      <ScrollView style={[viewDimension, scrollView]}>
        <View style={main_container}>
          <View style={logo_container}>
            <Image style={logo} source={airbnblogo} />
            <Text style={text_logo}>Sign in</Text>
          </View>
          <View>
            <View style={input_container}>
              <TextInput
                autoCapitalize="none"
                placeholder="email"
                style={input}
                value={email}
                onChangeText={(input) => {
                  setEmail(input);
                }}
              />

              <View style={pwd_container}>
                <View style={pwd_input_container}>
                  <TextInput
                    autoCapitalize="none"
                    placeholder="password"
                    secureTextEntry={passwordVisibility}
                    style={input}
                    value={password}
                    onChangeText={(input) => {
                      setPassword(input);
                    }}
                  />
                  <Pressable onPress={handlePasswordVisibility}>
                    <Ionicons name={eyeIcon} size={22} color="black" />
                  </Pressable>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={button}
                onPress={async () => {
                  submit();
                }}
              >
                <Text style={text_button}>Sign in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Sign Up");
                }}
              >
                <Text style={text_bottom}>No account ? Register</Text>
              </TouchableOpacity>
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
  viewDimension: {
    width: "100%",
  },

  scrollView: {
    paddingTop: Constants.statusBarHeight,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },

  main_container: {
    alignItems: "center",
  },

  signin_container: {
    alignItems: "center",
  },

  logo: { width: 85, height: 85, resizeMode: "cover", marginVertical: 25 },

  text_logo: { color: "black", fontSize: 22 },

  logo_container: {
    marginVertical: 40,
    alignItems: "center",
  },

  input_container: {
    width: 250,
    marginBottom: 80,
    paddingBottom: 30,
  },
  input: {
    width: "90%",
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

  pwd_container: {
    Flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  pwd_input_container: {
    flexDirection: "row",
  },

  button: {
    height: 50,
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 25,
  },

  text_button: {
    lineHeight: 40,
    textAlign: "center",
    fontSize: 15,
  },

  text_bottom: {
    lineHeight: 50,
    textAlign: "center",
    fontSize: 12,
    color: "grey",
  },
});
