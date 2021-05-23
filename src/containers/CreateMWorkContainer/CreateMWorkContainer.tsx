import React, { useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from "react-native";
import {
  Button,
  DateInput,
  RechangeInput,
  SelectInput,
  TextInput,
} from "components/";
import { theme } from "theme/";
import { ScrollView } from "react-native-gesture-handler";
import { useThunkDispatch } from "hooks/";
import actions from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MessageTypes } from "store/reducers/message";

function CreateMWork() {
  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();
  const navigation = useNavigation();

  const {
    user: { token },
    modal: { isOpen },
    clients,
    machines,
  } = useSelector((state) => state);

  const [firstTime, setFirstTime] = useState(true);
  const [rechanges, setRechanges] = useState<RechangeWorkFrom[]>([
    { title: "", number: "" },
  ]);
  const [rechangesErrors, setRechangesErrors] = useState<
    RechangeWorkFormError[]
  >([{ index: 0, title: false, number: false }]);
  const [values, setValues] = useState<CreateMWorkForm>(defaultValues);
  const [errors, setErrors] = useState<CreateMWorkFormError>(defaultErrors);

  const addRechange = () => {
    setRechanges((rechanges) => [...rechanges, { title: "", number: "" }]);
    setRechangesErrors((error) => [
      ...error,
      { index: rechanges.length, title: false, number: false },
    ]);
  };

  const handleRechangeChange = (input: "title" | "number", index: number) => (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const _rechanges = [...rechanges];
    // Update value
    _rechanges[index][input] = e.nativeEvent.text;
    setRechanges(_rechanges);
    // Remove errors
    const _rechangesErrors = [...rechangesErrors];
    _rechangesErrors[index][input] = false;
    setRechangesErrors(_rechangesErrors);
  };

  /** Function that create a work and executes when press accept on modal */
  const createWork = async () => {
    const { error, message } = await thunkDispatch(
      actions.createMechanicWork(token, values, rechanges)
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

  /** Get clients, projects, machines  */
  useEffect(() => {
    const getData = async () => {
      thunkDispatch(actions.enableLoader());
      await thunkDispatch(actions.getClientsFromApi(token));
      await thunkDispatch(actions.getMachinesFromApi(token));
      thunkDispatch(actions.disableLoader());
      setFirstTime(false);
    };
    // Always getData if change screen
    navigation.addListener("focus", async () => {
      await getData();
      dispatch(actions.setModalDecline(closeModal));
      updateErrors(defaultErrors);
    });
    navigation.addListener("blur", () => {
      setValues(defaultValues);
      setErrors(defaultErrors);
      setRechanges([{ title: "", number: "" }]);
      setRechangesErrors([{ index: 0, title: false, number: false }]);
      setFirstTime(true);
    });
  }, [errors, values]);

  const handleOnChangeSelect = (name: keyof CreateMWorkForm) => (
    value: string | Date
  ) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const updateErrors = (_errors: CreateMWorkFormError) =>
    setErrors({ ...errors, ..._errors });

  const onSubmit = async () => {
    // Enable loader
    await thunkDispatch(actions.enableLoader());
    // Get errors
    let _errors = errors;
    let hasError = false;
    await Promise.all(
      Object.keys(values).map((key) => {
        // Add custom errors
        const currentValue = values[key as keyof CreateMWorkForm];
        // Check if rechanges has errors
        if (key === "rechanges") {
          if (rechanges.length === 0) {
            setRechangesErrors([]);
          } else {
            const _rechangesErrors = rechanges.map((rechange, index) => {
              const error: RechangeWorkFormError = {
                index,
                title: false,
                number: false,
              };
              if (!rechange.title) {
                error.title = true;
              }
              if (!rechange.number) {
                error.number = true;
              }
              return error;
            });
            setRechangesErrors(_rechangesErrors);
          }
        }
        // Check if value is empty
        if (!currentValue) {
          _errors[key as keyof CreateMWorkFormError] = true;
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
          options={clients}
          value={values.client}
          labelError={errors.client}
          style={styles.select}
          onChange={handleOnChangeSelect("client")}
        />
        <SelectInput
          options={machines}
          placeholder="Maquinas"
          value={values.machine}
          style={styles.select}
          labelError={errors.machine}
          onChange={handleOnChangeSelect("machine")}
        />
        <DateInput
          placeholder="Fecha"
          style={styles.select}
          labelError={errors.date}
          value={values.date}
          onChange={handleOnChangeSelect("date")}
        />
        <TextInput
          labelAlign="left"
          label="Horas"
          color={theme.colors.secondary}
          value={values.hours}
          keyboardType="numeric"
          style={styles.select}
          labelError={errors.hours}
          onChangeText={handleOnChangeSelect("hours")}
        />
        <TextInput
          labelAlign="left"
          label="Trabajos"
          color={theme.colors.secondary}
          value={values.works}
          style={styles.select}
          labelError={errors.works}
          onChangeText={handleOnChangeSelect("works")}
        />
        {rechanges.map((rechange, index) => {
          return (
            <RechangeInput
              key={`rechange-${index}`}
              index={index}
              showAdd={index + 1 === rechanges.length}
              textInput={{
                label: "Recambios",
                value: rechange.title,
                onChange: handleRechangeChange("title", index),
              }}
              numberInput={{
                label: "#",
                value: rechange.number,
                onChange: handleRechangeChange("number", index),
              }}
              errors={rechangesErrors}
              onPressAdd={addRechange}
              style={styles.select}
            />
          );
        })}
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
    marginBottom: 64,
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

const defaultValues: CreateMWorkForm = {
  client: "",
  date: null,
  hours: "",
  machine: "",
  works: "",
  rechanges: [],
};

const defaultErrors: CreateMWorkFormError = {
  client: false,
  date: false,
  hours: false,
  machine: false,
  works: false,
  rechanges: false,
};

export default CreateMWork;
