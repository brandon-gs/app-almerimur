import {
  LOGOUT,
  SET_USER,
  UPDATE_USER_PROFILE,
  UPDATE_USER_IMAGE,
} from "../actions/user";
import { AnyAction } from "redux";

const initialState: User = {
  id_user: "",
  contract: "",
  createdAt: new Date(),
  email: "",
  hourly: "",
  image: "",
  job: "",
  name: "",
  password: "",
  role: "",
  token: "",
  updatedAt: new Date(),
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
