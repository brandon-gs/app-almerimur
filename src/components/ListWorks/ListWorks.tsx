import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Work from "../Work";

export function instanceOfA(object: any): object is DriverWork {
  return "driver_work_id" in object;
}

function ListWorks({ works, getWorks }: ListWorksProps) {
  const RenderItem = ({
    item,
  }: {
    index: number;
    item: DriverWork | MechanicWork;
  }) => {
    const work = item;
    if (instanceOfA(work)) {
      return (
        <Work
          key={work.driver_work_id}
          title={`Trabajo ${work.id + 1}`}
          id={work.driver_work_id}
          enabled={work.driver_work_finished === "0"}
        />
      );
    }
    return (
      <Work
        key={work.mechanic_work_id}
        title={`Trabajo ${work.id + 1}`}
        id={work.mechanic_work_id}
        enabled={work.mechanic_work_finished === "0"}
      />
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        data={[...works].reverse()}
        renderItem={RenderItem}
        keyExtractor={(_, index) => index.toString()}
        onRefresh={getWorks}
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
