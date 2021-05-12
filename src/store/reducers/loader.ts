import { ENABLE_LOADER, DISABLE_LOADER } from "../actions/loader";
import { AnyAction } from "redux";

const initialState: LoaderState = {
  isVisible: false,
};

const messageReducer = (
  state: LoaderState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case ENABLE_LOADER:
      return { ...state, isVisible: true };
    case DISABLE_LOADER:
      return { ...state, isVisible: false };
    default:
      return state;
  }
};

export default messageReducer;
