import { axios } from "api/";
import { ReduxThunkAction } from "store/types";
import { UPDATE_MESSAGE } from "./message";

export const UPDATE_RECHANGES = "UPDATE_RECHANGES";

const getRechangesFromApi = (token: string): ReduxThunkAction => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/rechange/get.php", {
        headers: {
          authorization: token,
        },
      });
      const rechanges = await Promise.all(
        data.rechanges.map((rechange: Rechange) => ({
          title: rechange.rechange_title,
          id: rechange.rechange_id,
        }))
      );
      console.log("Rechanges from api");
      console.log(rechanges);
      dispatch({
        type: UPDATE_RECHANGES,
        payload: rechanges,
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
  getRechangesFromApi,
};
