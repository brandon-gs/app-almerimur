import React, { useState } from "react";
import {
  Button,
  DateInput,
  SelectInput,
  StyledText,
  TextInput,
} from "components/";
import { useNavigation } from "@react-navigation/core";
import { useThunkDispatch } from "hooks/";
import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EditIcon from "assets/Edit.svg";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import actions from "store/actions";
import { theme } from "theme/";
import { changeNameKey } from "../../helpers/objects";

const TRAVELS = ["1", "2", "3", "4"];

interface FormEditDriverWorkProps {
  id: number;
  title: string;
}

function FormEditDriverWork({ id, title }: FormEditDriverWorkProps) {
  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();
  const navigation = useNavigation();
  const {
    clients,
    projects,
    user: { token },
    loader: { isVisible },
  } = useSelector((state) => state);

  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState(defaultErrors);
  const [apiError, setApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editable, setEditable] = useState(false);

  /** Get clients, projects, machines  */
  React.useEffect(() => {
    const getData = async () => {
      thunkDispatch(actions.enableLoader());
      await thunkDispatch(actions.getClientsFromApi(token));
      await thunkDispatch(actions.getProjectsFromApi(token));
      const { error, work } = await actions.getDriverWork(token, id);
      if (error) {
        setApiError(true);
      } else {
        const _values = formatToDriverValues(work);
        setValues(_values);
      }
      thunkDispatch(actions.disableLoader());
    };
    getData();
    setIsLoading(false);
  }, []);

  const updateErrors = (_errors: CreateWorkFormError) =>
    setErrors({ ...errors, ..._errors });

  const handleOnChangeSelect = (name: keyof CreateWorkForm) => (
    value: string | Date
  ) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

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
      // TODO: call an update API
    }
    // Disable loader
    await thunkDispatch(actions.disableLoader());
  };

  const enableEditMode = () => setEditable(true);

  const closeWork = async () => {
    try {
      await thunkDispatch(actions.finishDriverWork(token, id));
      navigation.navigate("FinishStep", {
        message: "Has cerrado tu trabajo correctamente",
      });
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  return !isVisible || !isLoading ? (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, paddingVertical: 24 }}>
        <KeyboardAwareScrollView>
          <StyledText color={theme.colors.secondary} align="center" size={3}>
            {title}
          </StyledText>
          <View style={styles.root}>
            <SelectInput
              placeholder="Cliente"
              options={clients}
              value={values.client}
              style={styles.select}
              labelError={errors.client}
              onChange={handleOnChangeSelect("client")}
              editable={editable}
            />
            <SelectInput
              options={projects}
              editable={editable}
              style={styles.select}
              placeholder="Proyecto"
              value={values.project}
              labelError={errors.project}
              onChange={handleOnChangeSelect("project")}
            />
            <DateInput
              placeholder="Fecha"
              editable={editable}
              style={styles.select}
              labelError={errors.date}
              value={values.date}
              onChange={handleOnChangeSelect("date")}
            />
            <TextInput
              label="Vehículo"
              labelAlign="left"
              editable={editable}
              color={theme.colors.secondary}
              value={values.vehicle}
              labelError={errors.vehicle}
              onChangeText={handleOnChangeSelect("vehicle")}
            />
            <TextInput
              labelAlign="left"
              editable={editable}
              label="Concepto de trabajo"
              color={theme.colors.secondary}
              value={values.concept}
              labelError={errors.concept}
              onChangeText={handleOnChangeSelect("concept")}
            />
            <TextInput
              editable={editable}
              label="Horas"
              labelAlign="left"
              value={values.hours}
              labelError={errors.hours}
              keyboardType="numeric"
              color={theme.colors.secondary}
              onChangeText={handleOnChangeSelect("hours")}
            />
            <SelectInput
              placeholder="Viajes realizados"
              editable={editable}
              options={TRAVELS}
              value={values.travels}
              style={styles.select}
              labelError={errors.travels}
              onChange={handleOnChangeSelect("travels")}
            />
            <TextInput
              label="Comentarios"
              labelAlign="left"
              editable={editable}
              value={values.comments}
              labelError={errors.comments}
              color={theme.colors.secondary}
              onChangeText={handleOnChangeSelect("comments")}
            />
            {editable && (
              <Button
                text="Guardar cambios"
                onPress={onSubmit}
                style={[styles.button, { width: 302, marginTop: 16 }]}
                styleText={{
                  size: 2.5,
                  color: theme.colors.light,
                  children: "Guardar cambios",
                }}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      {!editable && (
        <View style={styles.modalEditContainer}>
          <View>
            <EditIcon onPress={enableEditMode} />
          </View>
          <Button
            text="Cerrar trabajo"
            onPress={closeWork}
            style={styles.button}
            styleText={{
              size: 2.5,
              color: theme.colors.light,
              children: "Cerrar trabajo",
            }}
          />
        </View>
      )}
    </View>
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
    backgroundColor: theme.colors.primary,
    width: 172,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  modalSpacing: {
    width: "100%",
    height: 160,
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

const formatToDriverValues = (work: DriverWork) => {
  let _work = work as any;
  _work = changeNameKey(_work, "driver_work_client_name", "client");
  _work = changeNameKey(_work, "driver_work_project_name", "project");
  _work = changeNameKey(_work, "driver_work_date", "date");
  _work = changeNameKey(_work, "driver_work_vehicle_name", "vehicle");
  _work = changeNameKey(_work, "driver_work_concept", "concept");
  _work = changeNameKey(_work, "driver_work_hours", "hours");
  _work = changeNameKey(_work, "driver_work_travels", "travels");
  _work = changeNameKey(_work, "driver_work_comments", "comments");
  const currentWork = _work;
  if (currentWork.date) {
    currentWork.date = new Date(currentWork.date);
  }
  return currentWork;
};

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

export default FormEditDriverWork;
