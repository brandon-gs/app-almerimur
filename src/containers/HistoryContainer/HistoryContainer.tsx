import { useNavigation } from "@react-navigation/core";
import { SelectInput } from "components/";
import { formatDate } from "helpers/";
import { useThunkDispatch } from "hooks/";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import actions from "store/actions";
import { instanceOfDriverWorks } from "store/reducers/works";

function HistoryContainer() {
  const thunkDispatch = useThunkDispatch();
  const navigator = useNavigation();

  const {
    user: { token },
    works: { dates, works },
  } = useSelector((state) => state);

  useEffect(() => {
    const getData = async () => {
      thunkDispatch(actions.enableLoader());
      if (instanceOfDriverWorks(works)) {
        await thunkDispatch(actions.getDriverWorkDates(token, works));
      } else {
        await thunkDispatch(actions.getMechanicWorkDates(token, works));
      }
      thunkDispatch(actions.disableLoader());
    };

    getData();
  }, []);

  const RenderItem = ({ item, index }: { item: string; index: number }) => {
    const options = dates[item].map((work: any) => {
      return `Trabajo ${work.id + 1}`;
    });
    return (
      <SelectInput
        key={`${item}-${index}`}
        options={options}
        placeholder={formatDate(new Date(item))}
        style={styles.select}
        onPressOption={(option) => {
          const indexFromLabel = option.split(" ").pop();
          if (indexFromLabel) {
            const indexInWorks = parseInt(indexFromLabel) - 1;
            const work = works[indexInWorks];
            navigator.navigate("ReadDriverWork", {
              title: option,
              values: work,
            });
          }
        }}
        positionOptions="relative"
        onChange={() => {}}
      />
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        style={{ zIndex: -100 }}
        data={Object.keys(dates)}
        renderItem={RenderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },
  select: {
    marginVertical: 16,
  },
});

export function instanceOfDriverDate(
  date: any
): date is { driver_work_date: string } {
  return "driver_work_date" in date;
}

export default HistoryContainer;
