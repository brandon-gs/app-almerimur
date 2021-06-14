import {
  DateInput,
  RechangeInput,
  SelectInput,
  StyledText,
  TextInput,
} from "components/";
import { useThunkDispatch } from "hooks/";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import actions from "store/actions";
import { theme } from "theme/";

interface ReadFormDriverWorkProps {
  title: string;
  values: MechanicWork;
}

export default function ReadFormDriverWork({
  title,
  values,
}: ReadFormDriverWorkProps) {
  const thunkDispatch = useThunkDispatch();
  const {
    rechanges: rechangesStore,
    user: { token },
  } = useSelector((state) => state);
  const [rechanges, setRechanges] = useState<any[]>([]);

  useEffect(() => {
    const getRechanges = async () => {
      await thunkDispatch(actions.getRechangesFromApi(token));
    };
    getRechanges();
  }, []);

  useEffect(() => {
    const updateRechanges = () => {
      if (values.rechanges) {
        const formatedRechanges = values.rechanges.map((rechange) => {
          const newRechange: any = rechange;
          rechangesStore.forEach((rechangeApi) => {
            if (rechange.rechange_id === rechangeApi.id) {
              newRechange.title = rechangeApi.title;
            }
          });
          return newRechange;
        });
        setRechanges(formatedRechanges);
      }
    };
    updateRechanges();
  }, [rechangesStore]);

  const onChange = () => {};

  return (
    <ScrollView style={{ flex: 1, paddingVertical: 24 }}>
      <StyledText color={theme.colors.secondary} align="center" size={3}>
        {title}
      </StyledText>
      <View style={styles.root}>
        <SelectInput
          placeholder="Cliente"
          options={[]}
          value={values.mechanic_work_client_name}
          style={styles.select}
          labelError={false}
          editable={false}
          onChange={onChange}
        />
        <SelectInput
          options={[]}
          placeholder="Maquinas"
          value={values.mechanic_work_machine_name}
          style={styles.select}
          labelError={false}
          editable={false}
          onChange={onChange}
        />
        <DateInput
          placeholder="Fecha"
          style={styles.select}
          labelError={false}
          value={
            values.mechanic_work_date
              ? new Date(values.mechanic_work_date)
              : new Date()
          }
          editable={false}
          onChange={onChange}
        />
        <TextInput
          labelAlign="left"
          label="Horas"
          color={theme.colors.secondary}
          value={
            values.mechanic_work_hours ? values.mechanic_work_hours : undefined
          }
          keyboardType="numeric"
          style={styles.select}
          labelError={false}
          editable={false}
          onChangeText={onChange}
        />
        <TextInput
          labelAlign="left"
          label="Trabajos"
          color={theme.colors.secondary}
          value={
            values.mechanic_work_works ? values.mechanic_work_works : undefined
          }
          style={styles.select}
          labelError={false}
          editable={false}
          onChangeText={onChange}
        />
        {rechanges &&
          rechanges.map((rechange, index) => {
            return rechange ? (
              <RechangeInput
                showAdd={false}
                editable={false}
                key={`rechange-${index}`}
                index={index}
                textInput={{
                  value: rechange.title,
                  onChange: onChange,
                }}
                numberInput={{
                  label: "#",
                  value: rechange.mechanic_rechange_number,
                  onChange: onChange,
                }}
                errors={[]}
                onPressAdd={onChange}
                style={styles.select}
              />
            ) : null;
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    marginTop: 32,
    marginBottom: 56,
  },
  select: {
    marginBottom: 24,
  },
});
