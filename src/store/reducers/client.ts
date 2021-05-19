import { UPDATE_CLIENTS } from "../actions/client";
import { AnyAction } from "redux";

const initialState: ClientsState = [];

const clientsReducer = (
  state: ClientsState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case UPDATE_CLIENTS:
      return action.payload;
    default:
      return state;
  }
};

export default clientsReducer;
