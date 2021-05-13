import { ReduxThunkAction } from "store/types";

export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const HIDE_MESSAGE = "HIDE_MESSAGE";

const updateGlobalMessage = (message: MessageState): ReduxThunkAction => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_MESSAGE,
      payload: message,
    });
  };
};

const hideGlobalMessage = (): ReduxThunkAction => {
  return (dispatch) => {
    dispatch({
      type: HIDE_MESSAGE,
    });
  };
};

export default {
  updateGlobalMessage,
  hideGlobalMessage,
};
