import { useField } from "formik";
import React from "react";
import { TextareaHTMLAttributes } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
} from "react-native";

type Props = TextInputProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label: string;
  };

const InputField = (props: Props) => {
  const [field, { error }] = useField(props);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput {...props} style={styles.input} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    marginTop: 10,
    paddingLeft: 5,
    fontSize: 16,
  },

  label: {
    fontSize: 18,
    marginTop: 10,
  },

  wrapper: {
    minWidth: 200,
  },

  error: {
    color: "red",
    fontWeight: "300",
    marginBottom: 5,
    fontSize: 12,
  },
});

export default InputField;
