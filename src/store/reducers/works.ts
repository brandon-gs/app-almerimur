import { AnyAction } from "redux";
import { UPDATE_WORKS } from "../actions/works";

const initialState: WorksState = [];

const clientsReducer = (
  state: WorksState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case UPDATE_WORKS:
      return action.payload;
    default:
      return state;
  }
};

export default clientsReducer;
