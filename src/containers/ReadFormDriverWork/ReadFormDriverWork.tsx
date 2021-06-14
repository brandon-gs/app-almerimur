import { useNavigation } from "@react-navigation/core";
import {
  Button,
  DateInput,
  SelectInput,
  StyledText,
  TextInput,
} from "components/";
import { useThunkDispatch } from "hooks/";
import React from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import actions from "store/actions";
import { theme } from "theme/";

interface ReadFormDriverWorkProps {
  title: string;
  values: DriverWork;
}

export default function ReadFormDriverWork({
  title,
  values,
}: ReadFormDriverWorkProps) {
  const [work, setWork] = React.useState(values);
  const [showClientName, setShowClientName] = React.useState(false);
  const [showProjectName, setShowProjectName] = React.useState(false);
  const [showVehicleName, setShowVehicleName] = React.useState(false);

  const thunkDispatch = useThunkDispatch();

  const {
    user: { token },
    loader: { isVisible },
    clients,
    projects,
    vehicles,
  } = useSelector((state) => state);

  const navigator = useNavigation();
  const onChange = () => {};

  const goBackHistory = () => {
    navigator.navigate("History");
  };

  // Get clients, projects and vehicles and assign the name
  React.useEffect(() => {
    const getData = async () => {
      thunkDispatch(actions.enableLoader());
      await thunkDispatch(actions.getClientsFromApi(token));
      await thunkDispatch(actions.getProjectsFromApi(token));
      await thunkDispatch(actions.getVehiclesFromApi(token));
      thunkDispatch(actions.disableLoader());
    };
    getData();
  }, []);

  // Update client name when do the api call
  React.useEffect(() => {
    const copyWork = Object.assign({}, work);
    clients.forEach((client) => {
      if (client.client_id === values.driver_work_client_id) {
        copyWork.driver_work_client_id = client.client_name;
      }
    });
    setWork(copyWork);
    setShowClientName(true);
  }, [clients]);

  // Update project name when do the api call
  React.useEffect(() => {
    const copyWork = Object.assign({}, work);
    projects.forEach((project) => {
      if (project.project_id === values.driver_work_project_id) {
        copyWork.driver_work_project_id = project.project_name;
      }
    });
    setWork(copyWork);
    setShowProjectName(true);
  }, [projects]);

  // Update vehicle name when do the api call
  React.useEffect(() => {
    const copyWork = Object.assign({}, work);
    vehicles.forEach((vehicle) => {
      if (vehicle.id === values.driver_work_vehicle_id) {
        copyWork.driver_work_vehicle_id = vehicle.name;
      }
    });
    setWork(copyWork);
    setShowVehicleName(true);
  }, [vehicles]);

  const canRender =
    !isVisible && showClientName && showProjectName && showVehicleName;

  return (
    canRender && (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, paddingTop: 24 }}>
          <StyledText color={theme.colors.secondary} align="center" size={3}>
            {title}
          </StyledText>
          <View style={styles.root}>
            <SelectInput
              placeholder="Cliente"
              options={[]}
              value={showClientName ? work.driver_work_client_id : ""}
              style={styles.select}
              labelError={false}
              onChange={onChange}
              editable={false}
            />
            <SelectInput
              style={styles.select}
              placeholder="Proyecto"
              value={showProjectName ? work.driver_work_project_id : ""}
              editable={false}
              onChange={onChange}
            />
            <DateInput
              placeholder="Fecha"
              editable={false}
              style={styles.select}
              value={
                work.driver_work_date
                  ? new Date(work.driver_work_date)
                  : new Date()
              }
              onChange={onChange}
            />
            <TextInput
              label="Vehículo"
              labelAlign="left"
              editable={false}
              color={theme.colors.secondary}
              style={styles.select}
              value={
                !showVehicleName
                  ? ""
                  : work.driver_work_vehicle_id
                  ? work.driver_work_vehicle_id
                  : undefined
              }
              onChangeText={onChange}
            />
            <TextInput
              labelAlign="left"
              editable={false}
              label="Concepto de trabajo"
              color={theme.colors.secondary}
              value={
                work.driver_work_concept ? work.driver_work_concept : undefined
              }
              style={styles.select}
              onChangeText={onChange}
            />
            <TextInput
              editable={false}
              label="Horas"
              labelAlign="left"
              value={
                work.driver_work_hours ? work.driver_work_hours + "" : undefined
              }
              keyboardType="numeric"
              style={styles.select}
              color={theme.colors.secondary}
              onChangeText={onChange}
            />
            <SelectInput
              placeholder="Viajes realizados"
              editable={false}
              value={
                work.driver_work_travels
                  ? work.driver_work_travels + ""
                  : undefined
              }
              style={styles.select}
              onChange={onChange}
            />
            <TextInput
              label="Comentarios"
              labelAlign="left"
              editable={false}
              value={work.driver_work_comments}
              style={styles.select}
              color={theme.colors.secondary}
              onChangeText={onChange}
            />
          </View>
        </ScrollView>
        <View style={styles.modalEditContainer}>
          <Button
            text="Volver"
            onPress={goBackHistory}
            style={styles.button}
            styleText={{
              size: 2.5,
              color: theme.colors.light,
              children: "Volver",
            }}
          />
        </View>
      </View>
    )
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
  button: {
    backgroundColor: theme.colors.primary,
    width: 172,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  modalEditContainer: {
    height: 90,
    backgroundColor: theme.colors.light,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
