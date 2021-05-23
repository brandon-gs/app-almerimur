import { Background, StyledText } from "components/";
import { ReadFormDriverWork } from "containers/";
import React from "react";

export default function ReadDriverWork(props: any) {
  const { values, title } = props.route.params
    ? props.route.params
    : { values: null, title: "" };

  const canRenderScreen = Boolean(values && title);

  return canRenderScreen ? (
    <>
      <Background />
      <ReadFormDriverWork title={title} values={values} />
    </>
  ) : (
    <StyledText>Error al editar el trabajo, intentelo de nuevo</StyledText>
  );
}
