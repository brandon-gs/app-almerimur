import { useNavigation } from "@react-navigation/core";
import { SelectInput, StyledText } from "components/";
import { formatDate } from "helpers/";
import { useThunkDispatch } from "hooks/";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import actions from "store/actions";
import { instanceOfDriverWorks } from "store/reducers/works";
import { theme } from "theme/";

function HistoryContainer() {
  const thunkDispatch = useThunkDispatch();
  const navigator = useNavigation();

  const [currentWorks, setCurrentWorks] = useState<
    DriverWorksState | MechanicWorksState
  >([]);

  const {
    user: { token },
    works: { dates, works },
  } = useSelector((state) => state);

  useEffect(() => {
    const updateWorks = async () => {
      thunkDispatch(actions.enableLoader());
      setCurrentWorks(works);
      if (instanceOfDriverWorks(works)) {
        await thunkDispatch(actions.getDriverWorkDates(token, works));
      } else {
        await thunkDispatch(actions.getMechanicWorkDates(token, works));
      }
      thunkDispatch(actions.disableLoader());
    };
    updateWorks();
  }, [works]);

  useEffect(() => {
    const getData = async () => {
      thunkDispatch(actions.enableLoader());
      if (instanceOfDriverWorks(works)) {
        await thunkDispatch(actions.getDriverWorks(token));
      } else {
        await thunkDispatch(actions.getMechanicWorks(token));
      }
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
            const work = currentWorks[indexInWorks];
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
      {Object.keys(dates).length > 0 ? (
        <FlatList
          style={{ zIndex: -100 }}
          data={Object.keys(dates)}
          renderItem={RenderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <View style={styles.message}>
          <StyledText size={3.5} align="center" color={theme.colors.secondary}>
            No tienes trabajos creados
          </StyledText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },
  message: {
    height: "100%",
    marginTop: 32,
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
