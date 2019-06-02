/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  NativeModules,
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import ImagePicker from "react-native-image-picker";

const foodClassifier = NativeModules.FoodClassifier;

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      imageSource: null,
      identifier: null,
      confidence: null
    };
  }

  predict = imageUri => {
    foodClassifier.predict(imageUri).then(result => {
      this.setState({
        identifier: result.identifier,
        confidence: result.confidence.toString().slice(0, 5)
      });
    });
  };

  onPressPickButton = () => {
    ImagePicker.showImagePicker(null, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          imageSource: source,
          identifier: null,
          confidence: null
        });

        this.predict(response.uri);
      }
    });
  };

  render() {
    const { imageSource, identifier, confidence } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>React Native App with Core ML</Text>
        <Image style={styles.image} source={imageSource} />
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>identifier: {identifier}</Text>
          <Text style={styles.instructionText}>confidence: {confidence}</Text>
        </View>
        <TouchableOpacity
          onPress={this.onPressPickButton}
          style={styles.pickButton}
        >
          <Text style={styles.pickButtonText}>Select Image</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    width: "72%"
  },
  instructionText: {
    textAlign: "left",
    color: "#333333",
    marginBottom: 5
  },
  image: {
    marginTop: 48,
    marginBottom: 32,
    width: 299,
    height: 299,
    backgroundColor: "#eee"
  },
  pickButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 44,
    marginTop: 48,
    borderRadius: 4,
    backgroundColor: "#05a5d1"
  },
  pickButtonText: {
    fontWeight: "bold",
    color: "white"
  }
});
