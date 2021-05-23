import { Background, StyledText } from "components/";
import { ReadFormMechanicWork } from "containers/";
import React from "react";

export default function ReadDriverWork(props: any) {
  const { values, title } = props.route.params
    ? props.route.params
    : { values: null, title: "" };

  const canRenderScreen = Boolean(values && title);

  return canRenderScreen ? (
    <>
      <Background />
      <ReadFormMechanicWork title={title} values={values} />
    </>
  ) : (
    <StyledText>Error al editar el trabajo, intentelo de nuevo</StyledText>
  );
}
