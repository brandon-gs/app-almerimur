import { AnyAction } from "redux";
import {
  FINISH_DRIVER_WORK,
  UPDATE_WORKS,
  CLEAR_WORKS,
} from "../actions/works";

const initialState: WorksState = [];

const clientsReducer = (
  state: WorksState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case UPDATE_WORKS:
      return action.payload;
    case FINISH_DRIVER_WORK:
      if (instanceOfDriverWorks(state)) {
        const finishedWorks = state.map(mapAndFinishWork(action.payload));
        return finishedWorks;
      }
      return state;
    // return finishWork;
    case CLEAR_WORKS:
      return [];
    default:
      return state;
  }
};

const mapAndFinishWork = (id: number) => (work: DriverWork) => {
  if (work.driver_work_id === id) {
    const finishedWork = work;
    finishedWork.driver_work_finished = true;
  }
  return work;
};

export function instanceOfDriverWorks(array: any): array is DriverWork[] {
  return "driver_work_id" in array[0];
}

export default clientsReducer;
