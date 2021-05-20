import { Background, StyledText } from "components/";
import { FormEditDriverWork } from "containers/";
import React from "react";

export default function EditDriverWork(props: any) {
  const { id, title } = props.route.params
    ? props.route.params
    : { id: null, title: null };

  const canRenderScreen = Boolean(id && title);

  return canRenderScreen ? (
    <>
      <Background />
      <FormEditDriverWork id={id} title={title} />
    </>
  ) : (
    <StyledText>Error al editar el trabajo, intentelo de nuevo</StyledText>
  );
}
