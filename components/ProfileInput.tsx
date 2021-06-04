import { useField } from "formik";
import React from "react";
import { TextareaHTMLAttributes } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";

type Props = TextInputProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    name: string;
    value: any;
  };

const ProfileInput = (props: Props) => {
  const [_, { error }] = useField(props);
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.label_small}>{props.label}</Text>
      <TextInput {...props} value={props.value} style={styles.input} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label_small: {
    fontSize: 16,
    fontWeight: "bold",
  },

  label_big: { fontSize: 22, fontWeight: "800", color: "#5E73BD" },

  subtitle: { fontSize: 12, fontWeight: "100" },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    height: 40,
  },
  error: {
    color: "red",
    fontWeight: "300",
    marginBottom: 5,
    fontSize: 12,
  },
});

export default ProfileInput;
