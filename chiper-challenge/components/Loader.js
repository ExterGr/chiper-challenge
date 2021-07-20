import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator color="#232323" size="large"></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Loader;
