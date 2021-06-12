import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

export default function TextInput(props: any) {
  return (
    <View style={styles.container}>
      <Input style={styles.input}
      underlineColor="transparent"
      mode="outlined"
      theme={{colors: { primary: '#000'}}}
      {...props}
      autoCompleteType="cc-number"/>

    {props.description && !props.errorText ? (
      <Text style={styles.description}>{props.description}</Text>
    ) : null}
    {props.errorText ? <Text style={styles.error}>{props.errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,

  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
