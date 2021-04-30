import { DefaultRootState, useDispatch } from "react-redux";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

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
  action: ThunkPromiseAction<T> | ReduxAction<T>
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

const useThunkDispatch = () => useDispatch();

export default useThunkDispatch;
