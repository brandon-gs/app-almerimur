import { UPDATE_MACHINES } from "store/actions/machine";
import { AnyAction } from "redux";

const initialState: MachinesState = [];

const machinesReducer = (
  state: MachinesState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case UPDATE_MACHINES:
      return action.payload;
    default:
      return state;
  }
};

export default machinesReducer;
