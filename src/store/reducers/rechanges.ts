import { UPDATE_RECHANGES } from "store/actions/rechanges";
import { AnyAction } from "redux";

const initialState: RechangeStore[] = [];

const rechangesReducer = (
  state: RechangeStore[] = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case UPDATE_RECHANGES:
      return action.payload;
    default:
      return state;
  }
};

export default rechangesReducer;
