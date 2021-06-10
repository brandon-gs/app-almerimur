import { UPDATE_RECHANGES } from "store/actions/rechanges";
import { AnyAction } from "redux";

const initialState: MachinesState = [];

const rechangesReducer = (
  state: RechangesList = initialState,
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
