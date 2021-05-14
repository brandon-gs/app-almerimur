import {
  LOGOUT,
  SET_USER,
  UPDATE_USER_PROFILE,
  UPDATE_USER_IMAGE,
} from "../actions/user";
import { AnyAction } from "redux";

const initialState: User = {
  user_id: "",
  user_contract: "",
  user_email: "",
  user_hourly: "",
  user_image: "",
  user_job: "",
  user_name: "",
  user_password: "",
  user_role: "",
  token: "",
};

const userReducer = (state: User = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    case UPDATE_USER_PROFILE:
      return { ...state, ...action.payload };
    case UPDATE_USER_IMAGE:
      return { ...state, image: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
