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
    loader: { isVisible },
    clients,
    machines,
  } = useSelector((state) => state);

  const [work, setWork] = useState(values);
  const [showClientName, setShowClientName] = React.useState(false);
  const [showMachineName, setShowMachineName] = React.useState(false);
  const [rechanges, setRechanges] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      thunkDispatch(actions.enableLoader());
      await thunkDispatch(actions.getClientsFromApi(token));
      await thunkDispatch(actions.getMachinesFromApi(token));
      await thunkDispatch(actions.getRechangesFromApi(token));
      thunkDispatch(actions.disableLoader());
    };
    getData();
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

  // Update client name when do the api call
  React.useEffect(() => {
    const copyWork = Object.assign({}, work);
    clients.forEach((client) => {
      if (client.client_id === work.mechanic_work_client_id) {
        copyWork.mechanic_work_client_id = client.client_name;
      }
    });
    setWork(copyWork);
    setShowClientName(true);
  }, [clients]);

  // Update machine name when do the api call
  React.useEffect(() => {
    const copyWork = Object.assign({}, work);
    machines.forEach((machine) => {
      if (machine.machine_id === work.mechanic_work_machine_id) {
        copyWork.mechanic_work_machine_id = machine.machine_name;
      }
    });
    setWork(copyWork);
    setShowMachineName(true);
  }, [machines]);

  const onChange = () => {};

  const canRender = showClientName && showMachineName && !isVisible;

  if (!canRender) {
    return null;
  }

  return (
    <ScrollView style={{ flex: 1, paddingVertical: 24 }}>
      <StyledText color={theme.colors.secondary} align="center" size={3}>
        {title}
      </StyledText>
      <View style={styles.root}>
        <SelectInput
          placeholder="Cliente"
          options={[]}
          value={work.mechanic_work_client_id}
          style={styles.select}
          labelError={false}
          editable={false}
          onChange={onChange}
        />
        <SelectInput
          options={[]}
          placeholder="Maquinas"
          value={work.mechanic_work_machine_id}
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
            work.mechanic_work_date
              ? new Date(work.mechanic_work_date)
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
            work.mechanic_work_hours ? work.mechanic_work_hours : undefined
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
            work.mechanic_work_works ? work.mechanic_work_works : undefined
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
