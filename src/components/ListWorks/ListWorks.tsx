import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Work from "../Work";

function instanceOfA(object: any): object is DriverWork {
  return "driver_work_id" in object;
}

function ListWorks({ works }: ListWorksProps) {
  const RenderItem = ({
    item,
    index,
  }: {
    index: number;
    item: DriverWork | MechanicWork;
  }) => {
    const work = item;
    if (instanceOfA(work)) {
      return (
        <Work
          key={work.driver_work_id}
          title={`Trabajo ${works.length - index}`}
          id={work.driver_work_id}
          enabled={work.driver_work_finished}
        />
      );
    }
    return (
      <Work
        key={work.mechanic_work_id}
        title={`Trabajo ${index + 1}`}
        id={work.mechanic_work_id}
        enabled={work.mechanic_work_finished}
      />
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        data={works}
        renderItem={RenderItem}
        keyExtractor={(_, index) => index.toString()}
      />
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
