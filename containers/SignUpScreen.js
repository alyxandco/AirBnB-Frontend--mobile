import Constants from "expo-constants";
import { useState } from "react";
import airbnblogo from "../assets/airbnblogo.png";
import {
  ScrollView,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Platform,
  StyleSheet,
  Image,
} from "react-native";

export default function SignUpScreen({ setToken }) {
  console.log(Platform.OS);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  console.log("email : ", email);
  console.log("username : ", username);
  console.log("description : ", description);
  console.log("password : ", password);
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
    input_textarea,
  } = styles;

  return (
    <SafeAreaView>
      <ScrollView style={[viewDimension, scrollView]}>
        <View style={main_container}>
          <View style={logo_container}>
            <Image style={logo} source={airbnblogo} />
            <Text style={text_logo}>Sign up</Text>
          </View>
          <View>
            <View style={input_container}>
              <TextInput
                placeholder="email"
                autoCapitalize="none"
                style={input}
                value={email}
                onChangeText={(input) => {
                  setEmail(input);
                }}
              />
              <TextInput
                placeholder="username"
                autoCapitalize="none"
                style={input}
                value={username}
                onChangeText={(input) => {
                  setUsername(input);
                }}
              />
              <View style={input_textarea}>
                <TextInput
                  autoCapitalize="none"
                  editable
                  multiline
                  numberOfLines={5}
                  maxLength={200}
                  placeholder="Describe yourself in a few words..."
                  value={description}
                  style={{ padding: 10 }}
                  onChangeText={(input) => {
                    setDescription(input);
                  }}
                />
              </View>

              <TextInput
                placeholder="password"
                autoCapitalize="none"
                secureTextEntry={true}
                style={input}
                value={password}
                onChangeText={(input) => {
                  setPassword(input);
                }}
              />
              <TextInput
                placeholder="confirm password"
                autoCapitalize="none"
                secureTextEntry={true}
                style={input}
                onChangeText={(text) => {}}
              />
            </View>
            <View>
              <TouchableOpacity
                style={button}
                onPress={async () => {
                  try {
                    console.log(data);
                    const response = await axios.post(
                      "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
                      {
                        email: email,
                        username: username,
                        description: description,
                        password: password,
                      }
                    );
                    console.log("response.data : ", response.data);
                    if (response.data.token) {
                      const userToken = "secret-token";
                      setToken(userToken);
                    }
                  } catch (error) {
                    console.log("error.response : ", error.response);
                  }
                }}
              >
                <Text style={text_button}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <Text style={text_bottom}>
                  Already have an account? Sign in
                </Text>
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
    height: "100%",
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

  input_textarea: {
    // height: 40,
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
    marginBottom: 50,
  },
});
