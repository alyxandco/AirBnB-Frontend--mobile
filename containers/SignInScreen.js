import { useNavigation } from "@react-navigation/core";
import Constants from "expo-constants";
import axios from "axios";
import { useState } from "react";
import airbnblogo from "../assets/airbnblogo.png";
import {
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

export default function SignInScreen({ setToken }) {
  console.log(Platform.OS);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("email : ", email);
  console.log("password : ", password);

  const navigation = useNavigation();
  const {
    viewDimension,
    scrollView,
    signin_container,
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
                onChangeText={(input) => {
                  setEmail(input);
                }}
              />
              <TextInput
                autoCapitalize="none"
                placeholder="password"
                secureTextEntry={true}
                style={input}
                onChangeText={(input) => {
                  setPassword(input);
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                style={button}
                onPress={async () => {
                  try {
                    const response = await axios.post(
                      "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
                      {
                        email: email,
                        password: password,
                      }
                    );
                    console.log(response.data);
                    if (response.data.token) {
                      setToken(response.data.token);
                      alert(`Bienvenue ${response.data.username}`);
                    }
                  } catch (error) {
                    console.log("error.response : ", error.response.data.error);
                    if (error.response.data.error === "undefined") {
                      alert(`Utilisateur et/ou mot de passe inconnu`);
                    }
                    if (error.response.data.error === "Unauthorized") {
                      alert(`Utilisateur et/ou mot de passe incorrect`);
                    }
                    if (error.response.status === "401") {
                      alert(`Utilisateur et/ou mot de passe incorrect`);
                    }
                  }
                  // const userToken = "secret-token";
                  // setToken(userToken);
                }}
              >
                <Text style={text_button}>Sign in</Text>
              </TouchableOpacity>
              <TouchableOpacity
              // onPress={() => {
              //   navigation.navigate("SignUp");
              // }}
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
    // height: 200,
    width: "100%",
  },

  scrollView: {
    paddingTop: Constants.statusBarHeight,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },

  main_container: {
    // paddingLeft: 20,
    alignItems: "center",
  },

  signin_container: {
    alignItems: "center",
  },

  logo: { width: 85, height: 85, resizeMode: "cover", marginVertical: 25 },

  text_logo: { color: "black", fontSize: 22 },

  logo_container: {
    marginVertical: 40,
    // backgroundColor: "red",
    alignItems: "center",
  },

  input_container: {
    width: 250,
    marginBottom: 80,
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

  button: {
    height: 50,
    paddingBottom: 10,
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 25,
    marginVertical: 20,
  },
  text_button: {
    lineHeight: 25,
    justifyContent: "center",
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
