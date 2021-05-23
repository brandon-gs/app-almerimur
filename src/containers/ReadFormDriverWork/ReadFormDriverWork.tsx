import { DateInput, SelectInput, StyledText, TextInput } from "components/";
import React from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { theme } from "theme/";

interface ReadFormDriverWorkProps {
  title: string;
  values: DriverWork;
}

export default function ReadFormDriverWork({
  title,
  values,
}: ReadFormDriverWorkProps) {
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
          value={values.driver_work_client_name}
          style={styles.select}
          labelError={false}
          onChange={onChange}
          editable={false}
        />
        <SelectInput
          style={styles.select}
          placeholder="Proyecto"
          value={values.driver_work_project_name}
          editable={false}
          onChange={onChange}
        />
        <DateInput
          placeholder="Fecha"
          editable={false}
          style={styles.select}
          value={new Date()}
          onChange={onChange}
        />
        <TextInput
          label="Vehículo"
          labelAlign="left"
          editable={false}
          color={theme.colors.secondary}
          style={styles.select}
          value={
            values.driver_work_vehicle_name
              ? values.driver_work_vehicle_name
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
            values.driver_work_concept ? values.driver_work_concept : undefined
          }
          style={styles.select}
          onChangeText={onChange}
        />
        <TextInput
          editable={false}
          label="Horas"
          labelAlign="left"
          value={
            values.driver_work_hours ? values.driver_work_hours + "" : undefined
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
            values.driver_work_travels
              ? values.driver_work_travels + ""
              : undefined
          }
          style={styles.select}
          onChange={onChange}
        />
        <TextInput
          label="Comentarios"
          labelAlign="left"
          editable={false}
          value={values.driver_work_comments}
          style={styles.select}
          color={theme.colors.secondary}
          onChangeText={onChange}
        />
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
