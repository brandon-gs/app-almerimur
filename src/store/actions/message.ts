import { ReduxThunkAction } from "store/types";

export const UPDATE_MESSAGE = "UPDATE_MESSAGE";

const updateGlobalMessage = (message: MessageState): ReduxThunkAction => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_MESSAGE,
      payload: message,
    });
  };
};

export default {
  updateGlobalMessage,
};
