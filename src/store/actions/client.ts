import { axios } from "api/";
import { ReduxThunkAction } from "store/types";
import { UPDATE_MESSAGE } from "./message";

export const UPDATE_CLIENTS = "UPDATE_CLIENTS";

const getClientsFromApi = (token: string): ReduxThunkAction => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/get_clients.php", {
        headers: {
          authorization: token,
        },
      });
      const clients = data.clients.map((client: Client) => client.client_name);
      dispatch({
        type: UPDATE_CLIENTS,
        payload: clients,
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
  getClientsFromApi,
};
