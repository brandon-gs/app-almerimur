import { DefaultRootState, useDispatch } from "react-redux";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { ReduxThunkAction } from "src/store/types";

export interface ReduxAction<A> extends Action<string> {
  value: A;
}

export type ThunkPromiseAction<R, A = any> = ThunkAction<
  Promise<R>,
  DefaultRootState,
  any,
  ReduxAction<A>
>;
export type ThunkDispatchFunction = <T = any>(
  action: ThunkPromiseAction<T> | ReduxAction<T> | ReduxThunkAction
) => Promise<T> | T;

export interface ThunkDispatchProp {
  dispatch: ThunkDispatchFunction;
}

export type ReduxDispatch<S> = ThunkDispatch<
  DefaultRootState,
  any,
  ReduxAction<S>
>;

export type StateGetter = () => DefaultRootState;

const useThunkDispatch = () => useDispatch() as ThunkDispatchFunction;

export default useThunkDispatch;
