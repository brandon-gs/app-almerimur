import { ReduxThunkAction } from "../types";

// Define action types
export const SET_USER = "SET_USER";

// Define action thunk
const login = (): ReduxThunkAction => {
  return async (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: { token: "1234566", name: "Brandon Garcia" },
    });
  };
};

export default {
  login,
};
