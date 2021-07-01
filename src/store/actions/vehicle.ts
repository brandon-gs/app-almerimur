import { axios } from "api/";
import { ReduxThunkAction } from "store/types";
import { UPDATE_MESSAGE } from "./message";

export const UPDATE_VEHICLES = "UPDATE_VEHICLES";

const getVehiclesFromApi = (token: string): ReduxThunkAction => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/get_machines.php", {
        headers: {
          authorization: token,
        },
      });
      const vehicles = data.machines ? data.machines : [];
      dispatch({
        type: UPDATE_VEHICLES,
        payload: vehicles,
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
  getVehiclesFromApi,
};
