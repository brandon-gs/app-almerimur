import { DefaultRootState } from "react-redux";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

export type ReduxThunkAction = ThunkAction<
  void,
  DefaultRootState,
  unknown,
  AnyAction
>;
