import { UPDATE_PROJECTS } from "store/actions/project";
import { AnyAction } from "redux";

const initialState: ProjectsState = [];

const projectsReducer = (
  state: ProjectsState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case UPDATE_PROJECTS:
      return action.payload;
    default:
      return state;
  }
};

export default projectsReducer;
