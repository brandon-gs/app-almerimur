import React from "react";
import { StyleSheet, View } from "react-native";
import Work from "../Work";

function instanceOfA(object: any): object is DriverWork {
  return "driver_work_id" in object;
}

function ListWorks({ works }: ListWorksProps) {
  const [currentWorks, setCurrentWorks] = React.useState(works);

  React.useEffect(() => {
    setCurrentWorks(works);
  }, [works]);

  return (
    <View style={styles.root}>
      {currentWorks
        .reverse()
        .map((work: DriverWork | MechanicWork, index: number) => {
          if (instanceOfA(work)) {
            return (
              <Work
                key={work.driver_work_id}
                title={`Trabajo ${currentWorks.length - index}`}
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
        })}
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
