import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, DateInput, SelectInput, TextInput } from "components/";
import { theme } from "theme/";
import { ScrollView } from "react-native-gesture-handler";
import { useThunkDispatch } from "hooks/";
import actions from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MessageTypes } from "store/reducers/message";

const TRAVELS = ["1", "2", "3", "4"];

function CreateWork() {
  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();
  const navigation = useNavigation();

  const {
    user: { token },
    modal: { isOpen },
    clients,
    projects,
    vehicles,
  } = useSelector((state) => state);

  const [firstTime, setFirstTime] = useState(true);
  const [values, setValues] = useState<CreateWorkForm>(defaultValues);
  const [errors, setErrors] = useState<CreateWorkFormError>(defaultErrors);

  const formatValues = () => {
    const formValues = Object.assign({}, values);
    // Replace the client name with the client id
    clients.forEach((client) => {
      if (client.client_name === formValues.client) {
        formValues.client = client.client_id;
      }
    });
    // Replace the project name with the project id
    projects.forEach((project) => {
      if (project.project_name === formValues.project) {
        formValues.project = project.project_id;
      }
    });
    // Replace the vehicle name with the vehicle id
    vehicles.forEach((vehicle) => {
      if (vehicle.machine_name === formValues.vehicle) {
        formValues.vehicle = vehicle.machine_id;
      }
    });
    return formValues;
  };

  /** Function that create a work and executes when press accept on modal */
  const createWork = async () => {
    const formValues = formatValues();
    const { error, message } = await thunkDispatch(
      actions.createDriverWork(token, formValues)
    );
    if (error) {
      thunkDispatch(
        actions.updateGlobalMessage({
          message: message,
          show: true,
          type: MessageTypes.Danger,
        })
      );
    } else {
      await thunkDispatch(actions.getDriverWorks(token));
      thunkDispatch(
        actions.updateGlobalMessage({
          message: "",
          show: false,
          type: MessageTypes.Danger,
        })
      );
      dispatch(actions.hideModal());
      navigation.navigate("FinishStep", {
        message: "Tu trabajo se ha creado correctamente",
      });
    }
  };

  /** Function to execute when decline the modal */
  const closeModal = () => {
    dispatch(actions.hideModal());
  };

  /** Get clients, projects, vehicles  */
  useEffect(() => {
    const getData = async () => {
      thunkDispatch(actions.enableLoader());
      await thunkDispatch(actions.getClientsFromApi(token));
      await thunkDispatch(actions.getProjectsFromApi(token));
      await thunkDispatch(actions.getVehiclesFromApi(token));
      thunkDispatch(actions.disableLoader());
    };
    setFirstTime(false);
    // Always getData if change screen
    navigation.addListener("focus", async () => {
      await getData();
      dispatch(actions.setModalDecline(closeModal));
      updateErrors(defaultErrors);
    });
    navigation.addListener("blur", () => {
      setValues(defaultValues);
      setErrors(defaultErrors);
      setFirstTime(true);
    });
  }, [errors, values]);

  const handleOnChangeSelect = (name: keyof CreateWorkForm) => (
    value: string | Date
  ) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const updateErrors = (_errors: CreateWorkFormError) =>
    setErrors({ ...errors, ..._errors });

  // Set modal accept function
  useEffect(() => {
    dispatch(actions.setModalAccept(createWork));
  }, [values]);

  const onSubmit = async () => {
    // Enable loader
    await thunkDispatch(actions.enableLoader());
    // Get errors
    let _errors = errors;
    let hasError = false;
    await Promise.all(
      Object.keys(values).map((key) => {
        // Add custom errors
        const currentValue = values[key as keyof CreateWorkForm];
        // Check if value is empty
        if (!currentValue) {
          _errors[key as keyof CreateWorkFormError] = true;
          hasError = true;
          return true;
        }
      })
    );
    updateErrors(_errors);
    // Show modal if has errors
    if (hasError) {
      dispatch(actions.showModal());
    } else {
      await createWork();
      navigation.navigate("FinishStep", {
        message: "Tu trabajo se ha creado correctamente",
      });
      dispatch(actions.hideModal());
    }
    // Set modal accept function
    dispatch(actions.setModalAccept(createWork));
    // Disable loader
    await thunkDispatch(actions.disableLoader());
  };

  return !firstTime ? (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={styles.root}>
        <SelectInput
          placeholder="Cliente"
          options={clients.map((client) => client.client_name)}
          value={values.client}
          labelError={errors.client}
          style={styles.select}
          onChange={handleOnChangeSelect("client")}
        />
        <SelectInput
          options={projects.map((project) => project.project_name)}
          placeholder="Proyecto"
          value={values.project}
          style={styles.select}
          labelError={errors.project}
          onChange={handleOnChangeSelect("project")}
        />
        <DateInput
          placeholder="Fecha"
          style={styles.select}
          labelError={errors.date}
          value={values.date}
          onChange={handleOnChangeSelect("date")}
        />
        <SelectInput
          options={vehicles.map((vehicle) => vehicle.machine_name)}
          placeholder="Vehículo"
          value={values.vehicle}
          style={styles.select}
          labelError={errors.vehicle}
          onChange={handleOnChangeSelect("vehicle")}
        />
        <TextInput
          labelAlign="left"
          label="Concepto de trabajo"
          color={theme.colors.secondary}
          value={values.concept}
          style={styles.select}
          labelError={errors.concept}
          onChangeText={handleOnChangeSelect("concept")}
        />
        <TextInput
          label="Horas"
          labelAlign="left"
          value={values.hours}
          labelError={errors.hours}
          keyboardType="numeric"
          style={styles.select}
          color={theme.colors.secondary}
          onChangeText={handleOnChangeSelect("hours")}
        />
        <SelectInput
          placeholder="Viajes realizados"
          options={TRAVELS}
          value={values.travels}
          style={styles.select}
          labelError={errors.travels}
          onChange={handleOnChangeSelect("travels")}
        />
        <TextInput
          label="Comentarios"
          labelAlign="left"
          value={values.comments}
          labelError={errors.comments}
          color={theme.colors.secondary}
          style={styles.select}
          onSubmitEditing={onSubmit}
          onChangeText={handleOnChangeSelect("comments")}
        />
        <Button
          text="Crear"
          styleText={{
            color: theme.colors.light,
            children: "Crear",
            size: 2.5,
          }}
          style={styles.button}
          onPress={onSubmit}
        ></Button>
      </View>
      {isOpen && <View style={styles.modalSpacing}></View>}
    </ScrollView>
  ) : null;
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
    marginTop: 8,
    backgroundColor: theme.colors.primary,
    width: 302,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  modalSpacing: {
    width: "100%",
    height: 160,
  },
});

const defaultValues: CreateWorkForm = {
  client: "",
  comments: "",
  concept: "",
  date: null,
  hours: "",
  project: "",
  travels: "",
  vehicle: "",
};

const defaultErrors: CreateWorkFormError = {
  client: false,
  comments: false,
  concept: false,
  date: false,
  hours: false,
  project: false,
  travels: false,
  vehicle: false,
};

export default CreateWork;
