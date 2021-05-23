import { AnyAction } from "redux";
import {
  FINISH_DRIVER_WORK,
  UPDATE_WORKS,
  CLEAR_WORKS,
  SET_DRIVER_WORK_DATES,
} from "../actions/works";

const initialState: WorksState = {
  works: [],
  dates: {},
};

const clientsReducer = (
  state: WorksState = initialState,
  action: AnyAction
): WorksState => {
  switch (action.type) {
    case UPDATE_WORKS:
      return { ...state, works: action.payload };
    case FINISH_DRIVER_WORK:
      if (instanceOfDriverWorks(state.works)) {
        const finishedWorks = state.works.map(mapAndFinishWork(action.payload));
        return { ...state, works: finishedWorks };
      }
      return state;
    // return finishWork;
    case CLEAR_WORKS:
      return { works: [], dates: {} };
    case SET_DRIVER_WORK_DATES:
      return { ...state, dates: action.payload };
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
  return array[0] ? "driver_work_id" in array[0] : false;
}

export default clientsReducer;
