import { SET_USER } from "../actions/user";
import { AnyAction } from "redux";

const initialState: User = {
  token: "",
  name: "",
};

function userReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default userReducer;
