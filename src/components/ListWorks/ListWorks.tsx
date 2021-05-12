import React from "react";
import { StyleSheet, View } from "react-native";
import Work from "../Work";

function ListWorks({ works }: ListWorksProps) {
  return (
    <View style={styles.root}>
      {works.map((work) => (
        <Work key={work._id} {...work} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
});

export default ListWorks;
