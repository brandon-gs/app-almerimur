import { AnyAction } from "redux";

const initialState: WorksState = [];

const clientsReducer = (
  state: WorksState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default clientsReducer;
