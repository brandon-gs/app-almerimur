import { UPDATE_VEHICLES } from "store/actions/vehicle";
import { AnyAction } from "redux";

const initialState: VehiclesState = [];

const vehiclesReducer = (
  state: VehiclesState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case UPDATE_VEHICLES:
      return action.payload;
    default:
      return state;
  }
};

export default vehiclesReducer;
