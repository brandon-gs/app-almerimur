import { ReduxThunkAction } from "store/types";

export const ENABLE_LOADER = "ENABLE_LOADER";
export const DISABLE_LOADER = "DISABLE_LOADER";

const enableLoader = (): ReduxThunkAction => {
  return (dispatch) => {
    dispatch({
      type: ENABLE_LOADER,
    });
  };
};

const disableLoader = (): ReduxThunkAction => {
  return (dispatch) => {
    dispatch({
      type: DISABLE_LOADER,
    });
  };
};

export default {
  enableLoader,
  disableLoader,
};
