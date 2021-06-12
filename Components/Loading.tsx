import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "../core/theme";

export default function TextInput() {
  return (
    <View style={styles.loadingWhrapper}>
      <ActivityIndicator
        size="large"
        animating={true}
        color={theme.colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingWhrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
});
