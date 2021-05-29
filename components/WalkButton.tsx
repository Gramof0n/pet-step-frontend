import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

type Props = {
  navigation: any;
};

const WalkButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={styles.circle_button}
      onPress={() => {
        [props.navigation.navigate("Walk")];
      }}
    >
      <Image
        source={require("../assets/logo.png")}
        style={{
          height: 100,
          width: 100,
          alignSelf: "center",
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle_button: {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 2 * Math.PI * 15,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
});

export default WalkButton;
