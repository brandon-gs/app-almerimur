import { axios } from "api/";
import { ReduxThunkAction } from "store/types";
import { UPDATE_MESSAGE } from "./message";

export const UPDATE_PROJECTS = "UPDATE_PROJECTS";

const getProjectsFromApi = (token: string): ReduxThunkAction => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/get_projects.php", {
        headers: {
          authorization: token,
        },
      });
      const projects = data.projects ? data.projects : [];
      dispatch({
        type: UPDATE_PROJECTS,
        payload: projects,
      });
    } catch (e) {
      dispatch({
        type: UPDATE_MESSAGE,
        payload:
          "No se puede crear un trabajo en estos momentos, intente más tarde.",
      });
    }
  };
};

export default {
  getProjectsFromApi,
};
