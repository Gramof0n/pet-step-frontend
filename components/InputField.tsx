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

/*
  OVO JE JOS JEDAN BITAN SHIT ZA REUSEOVANJE 

  Sve u svemu, ovo je generican input field koji sadrzi mali label iznad (kao naslov)
  sam input field da se pise u njega i error field koji se prikaze kad pukne greska
  (GRESKA CE SE PRIKAZATI SAMO AKO JE U ONOM FORMATU KOJI SAM NAPISAO U mapError.ts)

  Kako se koristi shit:

  *U BILO KOJOJ KOMPONENTI DJE OCES DA IMAS INPUT*
  <InputField name="NESTO" label="NESTO" ...ostali shit za stilizovanje/>

  Zapravo primjer upotrebe:
  
   <InputField
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              name="password"
              autoCapitalize="none"
              label="Password"
              secureTextEntry
            />
*/

type Props = TextInputProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label: string;
  };

const InputField = (props: Props) => {
  const [_, { error }] = useField(props);
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
